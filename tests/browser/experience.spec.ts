import { test, expect, type Page } from "@playwright/test";

async function brief(page: Page) {
  await page.goto("/contact");
  await page.getByRole("radio", { name: "Residential Construction", exact: true }).check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("radio", { name: "Residential", exact: true }).check();
  await page.getByRole("radio", { name: "Independent house", exact: true }).check();
  await page.getByLabel("Number of floors").fill("2");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("Project location").fill("Bengaluru");
  await page.getByLabel("Approximate plot size").fill("1200 sq ft");
  await page.getByRole("radio", { name: "Vacant plot", exact: true }).check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("Full name").fill("Test Visitor");
  await page.getByLabel("Email address").fill("visitor@example.com");
  await page.getByRole("button", { name: "Review your brief" }).click();
}

test("scroll story, service accordion, project link and responsive layout", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Built with vision/ }),
  ).toBeVisible();
  await expect.poll(() => page.locator('.hero-image img').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBeTruthy();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1400);
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-hero.png`,
  });
  await page.getByRole("button", { name: /Planning & approvals/ }).click();
  await expect(
    page.getByText("A stronger start for your project."),
  ).toBeVisible();
  await expect(page.getByText("From first idea to final key.")).toBeHidden();
  for (const id of [
    "approach",
    "expertise",
    "journey",
    "selected-work",
    "enquiry",
  ]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      )
      .toBeTruthy();
    await page.waitForTimeout(900);
    await page.screenshot({
      path: `test-results/${testInfo.project.name}-${id}.png`,
    });
  }
  await expect(
    page.getByRole("form", { name: "Project enquiry" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("validation, focus, category reset, and preserved back navigation", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(
    page.getByText("Choose the service you’re interested in."),
  ).toBeVisible();
  await page.getByRole("radio", { name: "Residential Construction", exact: true }).check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("radio", { name: "Residential", exact: true }).check();
  await page.getByRole("radio", { name: "Independent house", exact: true }).check();
  await page.getByLabel("Number of floors").fill("0");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByLabel("Number of floors")).toBeFocused();
  await expect(page.getByText(/Enter a whole number/)).toBeVisible();
  await page.getByRole("radio", { name: "Commercial", exact: true }).check();
  await expect(
    page.getByRole("radio", { name: "Independent house", exact: true }),
  ).toHaveCount(0);
  await expect(page.locator('input[name="projectType"]:checked')).toHaveCount(
    0,
  );
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(
    page.getByRole("radio", { name: "Residential Construction", exact: true }),
  ).toBeChecked();
});

test("review, provider error, retry, pending state and successful confirmation", async ({
  page,
}, testInfo) => {
  let attempt = 0;
  const keys: string[] = [];
  await page.route("**/api/contact", async (route) => {
    attempt++;
    keys.push(route.request().headers()["idempotency-key"]);
    const payload = route.request().postDataJSON();
    expect(payload.email).toBe("visitor@example.com");
    await new Promise((resolve) => setTimeout(resolve, 400));
    await route.fulfill({
      status: attempt === 1 ? 502 : 200,
      contentType: "application/json",
      body: JSON.stringify(
        attempt === 1
          ? { error: "The email service is unavailable. Please try again." }
          : { success: true, acknowledgementSent: true },
      ),
    });
  });
  await brief(page);
  await expect(
    page.getByRole("heading", { name: "A clear picture. Ready to send." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Edit Contact", exact: true }).click();
  await page.getByLabel("Email address").fill("invalid");
  await page.getByRole("button", { name: "Review your brief" }).click();
  await expect(page.getByText(/Enter a valid email address/)).toBeVisible();
  await page.getByLabel("Email address").fill("visitor@example.com");
  await page.getByRole("button", { name: "Review your brief" }).click();
  await page.getByRole("button", { name: "Send project enquiry" }).click();
  await expect(
    page.getByRole("button", { name: "Sending enquiry…" }),
  ).toBeDisabled();
  await expect(page.getByRole("form", { name: "Project enquiry" }).getByRole("alert")).toContainText(
    "The email service is unavailable",
  );
  await expect(
    page.getByText("visitor@example.com", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Send project enquiry" }).click();
  await expect(
    page.getByRole("heading", { name: "Thank you, Test." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Thank you, Test." }),
  ).toBeFocused();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `test-results/${testInfo.project.name}-success.png` });
  expect(attempt).toBe(2);
  expect(keys[0]).toBe(keys[1]);
});

test("navigation accessibility and reduced motion", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".hero-image")).toHaveCSS("transform", "none");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toBeFocused();
    await page.getByRole("button", { name: "Open navigation" }).click();
    await drawer.getByRole("link", { name: /Contact/ }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(drawer).toBeHidden();
  } else {
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Skip to content" }),
    ).toBeFocused();
  }
});

test("API rejects malformed and incomplete submissions without sending", async ({
  request,
}) => {
  const malformed = await request.post("/api/contact", { data: "{" });
  expect(malformed.status()).toBe(400);
  const incomplete = await request.post("/api/contact", {
    data: { email: "invalid", fullName: " " },
  });
  expect(incomplete.status()).toBe(400);
});
