const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");

function load(file, dependencies) {
  const output = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;
  const module = { exports: {} };
  new Function("require", "module", "exports", output)(
    (name) => dependencies[name] || require(name),
    module,
    module.exports,
  );
  return module.exports;
}
const validation = load("lib/enquiry.ts", {});
const valid = {
  service: "Residential Construction",
  projectCategory: "Residential",
  projectType: "Independent house",
  floors: "2",
  location: "Bengaluru",
  plotSize: "1200 sq ft",
  builtUpArea: "",
  siteStatus: "Vacant plot",
  fullName: "Test Visitor",
  email: "visitor@example.com",
  phone: "",
};
function handler(responses, calls) {
  return load("app/api/contact/route.ts", {
    "@/lib/enquiry": validation,
    resend: {
      Resend: class {
        emails = {
          send: async (...args) => {
            calls.push(args);
            const response = responses.shift();
            if (response instanceof Error) throw response;
            return response;
          },
        };
      },
    },
  }).POST;
}
const request = (body) =>
  new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": "test-request-key-12345678",
    },
    body: JSON.stringify(body),
  });

test("schema rejects blank text, invalid email, floors, phone and category mismatch", () => {
  for (const patch of [
    { fullName: "  " },
    { email: "wrong" },
    { floors: "0" },
    { floors: "1.5" },
    { phone: "abc1234" },
    { projectCategory: "Commercial" },
    { service: "invalid" },
  ])
    assert.equal(
      validation.enquirySchema.safeParse({ ...valid, ...patch }).success,
      false,
    );
  assert.equal(validation.enquirySchema.safeParse(valid).success, true);
});
test("API never reports success on provider rejection and retries use idempotency", async () => {
  process.env.RESEND_API_KEY = "test-only";
  const calls = [];
  const response = await handler(
    [{ error: { name: "validation_error" } }],
    calls,
  )(request(valid));
  assert.equal(response.status, 502);
  assert.equal(calls.length, 1);
  assert.equal(calls[0][1].idempotencyKey, "enquiry-test-request-key-12345678");
});
test("accepted enquiry remains successful if acknowledgement fails", async () => {
  process.env.RESEND_API_KEY = "test-only";
  const calls = [];
  const response = await handler(
    [{ data: { id: "test" }, error: null }, new Error("provider unavailable")],
    calls,
  )(request(valid));
  assert.deepEqual(await response.json(), {
    success: true,
    acknowledgementSent: false,
  });
  assert.equal(calls.length, 2);
  assert.equal(calls[0][0].replyTo, valid.email);
});
test("valid enquiry and acknowledgement return confirmed success", async () => {
  const response = await handler(
    [{ data: { id: "test" } }, { data: { id: "ack" } }],
    [],
  )(request(valid));
  assert.deepEqual(await response.json(), {
    success: true,
    acknowledgementSent: true,
  });
});
test("invalid request is rejected before any provider call", async () => {
  const calls = [];
  const response = await handler(
    [],
    calls,
  )(request({ ...valid, email: "bad" }));
  assert.equal(response.status, 400);
  assert.equal(calls.length, 0);
});
