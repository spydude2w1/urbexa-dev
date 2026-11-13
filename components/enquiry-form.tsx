"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type HTMLInputTypeAttribute,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  commercialTypes,
  emptyEnquiry,
  residentialTypes,
  services,
  siteStatuses,
  stepFields,
  validateEnquiry,
  type EnquiryData,
  type EnquiryErrors,
} from "@/lib/enquiry";

const steps = ["Service", "Project", "Site", "Contact", "Review"];
const headings = [
  "What can we help you build?",
  "Let’s shape the project.",
  "Tell us about your site.",
  "How can we reach you?",
  "A clear picture. Ready to send.",
];
const descriptions = [
  "Select the service closest to what you have in mind.",
  "A few basics help us understand the scale and type of work.",
  "Approximate details are fine at this stage.",
  "We’ll use these details to respond to your project enquiry.",
  "Review your details. You can edit any section before sending.",
];

export function EnquiryForm() {
  const id = useId();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<EnquiryData>({ ...emptyEnquiry });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [serverError, setServerError] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const shouldFocus = useRef(false);
  const submitting = useRef(false);
  const requestKey = useRef<string | null>(null);

  useEffect(() => {
    if (shouldFocus.current) {
      titleRef.current?.focus({ preventScroll: true });
      const top = formRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 100 || top > window.innerHeight / 2)
        formRef.current?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
          block: "start",
        });
    }
  }, [step, status]);

  const changeStep = (next: number) => {
    shouldFocus.current = true;
    setStep(next);
    setServerError("");
  };
  const update = (field: keyof EnquiryData, value: string) => {
    const next = {
      ...data,
      [field]: value,
      ...(field === "projectCategory" ? { projectType: "" } : {}),
    };
    setData(next);
    requestKey.current = null;
    if (errors[field])
      setErrors((prev) => ({ ...prev, [field]: validateEnquiry(next)[field] }));
  };
  const validateField = (field: keyof EnquiryData) =>
    setErrors((prev) => ({ ...prev, [field]: validateEnquiry(data)[field] }));
  const focusError = (field: string) =>
    requestAnimationFrame(() =>
      formRef.current?.querySelector<HTMLElement>(`[name="${field}"]`)?.focus(),
    );

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting.current) return;
    const allErrors = validateEnquiry(data);
    const fields =
      step < 4
        ? stepFields[step]
        : (Object.keys(data) as (keyof EnquiryData)[]);
    const relevant = fields.filter((field) => allErrors[field]);
    if (relevant.length) {
      setErrors(
        Object.fromEntries(relevant.map((field) => [field, allErrors[field]])),
      );
      if (step === 4)
        changeStep(
          stepFields.findIndex((group) => group.includes(relevant[0])),
        );
      focusError(relevant[0]);
      return;
    }
    setErrors({});
    if (step < 4) {
      changeStep(step + 1);
      return;
    }
    submitting.current = true;
    setStatus("sending");
    setServerError("");
    requestKey.current ??= crypto.randomUUID();
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": requestKey.current,
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || result.success !== true)
        throw new Error(
          result.error || "We couldn’t send your enquiry. Please try again.",
        );
      setAcknowledged(result.acknowledgementSent === true);
      shouldFocus.current = true;
      setStatus("success");
    } catch (error) {
      setStatus("idle");
      setServerError(
        error instanceof Error && error.name !== "AbortError"
          ? error.message
          : "The connection timed out. Your details are still here; please try again.",
      );
    } finally {
      clearTimeout(timeout);
      submitting.current = false;
    }
  };

  const field = (
    name: keyof EnquiryData,
    label: string,
    placeholder: string,
    hint?: string,
    type: HTMLInputTypeAttribute = "text",
    autoComplete?: string,
  ) => (
    <div className="enquiry-field">
      <Label htmlFor={`${id}-${name}`}>
        {label}
        {data[name] && !validateEnquiry(data)[name] ? (
          <Check size={14} className="field-check" aria-hidden="true" />
        ) : null}
      </Label>
      <Input
        id={`${id}-${name}`}
        name={name}
        type={type}
        value={data[name]}
        onChange={(event) => update(name, event.target.value)}
        onBlur={() => validateField(name)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!errors[name]}
        aria-describedby={`${id}-${name}-help`}
        required={!["phone", "builtUpArea"].includes(name)}
        min={name === "floors" ? 1 : undefined}
        max={name === "floors" ? 99 : undefined}
        step={name === "floors" ? 1 : undefined}
        maxLength={name === "email" ? 254 : 150}
      />
      <p
        id={`${id}-${name}-help`}
        className={errors[name] ? "field-error" : "field-hint"}
        aria-live="polite"
      >
        {errors[name] || hint}
      </p>
    </div>
  );
  const choices = (
    name: keyof EnquiryData,
    label: string,
    options: readonly string[],
  ) => (
    <fieldset
      className="choice-group"
      aria-describedby={errors[name] ? `${id}-${name}-error` : undefined}
    >
      <legend>{label}</legend>
      <div
        className={`choice-grid ${name === "service" ? "service-choices" : ""}`}
      >
        {options.map((option, i) => (
          <label
            className={`choice-card ${data[name] === option ? "selected" : ""}`}
            key={option}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={data[name] === option}
              onChange={() => update(name, option)}
              aria-invalid={!!errors[name]}
            />
            <span className="choice-index" aria-hidden="true">
              {name === "service" ? `0${i + 1}` : ""}
            </span>
            <span>{option}</span>
            <span className="choice-dot" aria-hidden="true">
              {data[name] === option ? <Check size={12} /> : null}
            </span>
          </label>
        ))}
      </div>
      {errors[name] ? (
        <p id={`${id}-${name}-error`} className="field-error" role="alert">
          {errors[name]}
        </p>
      ) : null}
    </fieldset>
  );

  return (
    <form
      ref={formRef}
      className="enquiry-form"
      onSubmit={submit}
      noValidate
      aria-label="Project enquiry"
      aria-busy={status === "sending"}
    >
      {status === "success" ? (
        <div className="enquiry-success">
          <span className="success-mark">
            <CheckCircle2 size={40} />
          </span>
          <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
          <h3 ref={titleRef} tabIndex={-1}>
            Thank you, {data.fullName.trim().split(" ")[0]}.
          </h3>
          <p role="status">
            Your project enquiry has been received. Our team will review your
            details and get in touch at <strong>{data.email.trim()}</strong>.
          </p>
          {acknowledged ? (
            <p className="field-hint">
              A confirmation email is on its way. Check your spam folder if you
              don’t see it.
            </p>
          ) : null}
          <div className="success-summary">
            <span>YOUR PROJECT</span>
            <strong>{data.service}</strong>
            <span>
              {data.location} · {data.projectType}
            </span>
          </div>
          <a href="/work" className="text-link">
            Explore our work <ArrowUpRight size={17} />
          </a>
        </div>
      ) : (
        <>
          <div className="form-topline">
            <span className="eyebrow">YOUR PROJECT BRIEF</span>
            <span>0{step + 1} / 05</span>
          </div>
          <Progress
            value={(step + 1) * 20}
            aria-label={`Enquiry progress: step ${step + 1} of 5`}
            className="enquiry-progress"
          />
          <ol className="form-steps">
            {steps.map((label, i) => (
              <li
                key={label}
                className={i === step ? "current" : i < step ? "complete" : ""}
                aria-current={i === step ? "step" : undefined}
              >
                <button
                  type="button"
                  disabled={i > step || status === "sending"}
                  onClick={() => changeStep(i)}
                >
                  {i < step ? <Check size={12} /> : <span>{i + 1}</span>}
                  {label}
                </button>
              </li>
            ))}
          </ol>
          <fieldset disabled={status === "sending"} className="form-fields">
            <div className="form-step-panel" key={step}>
              <h3 tabIndex={-1} ref={titleRef}>
                {headings[step]}
              </h3>
              <p className="form-description">{descriptions[step]}</p>
              {step === 0
                ? choices("service", "Select a service", services)
                : null}
              {step === 1 ? (
                <>
                  {choices("projectCategory", "Project category", [
                    "Residential",
                    "Commercial",
                  ])}
                  {data.projectCategory ? (
                    <div className="form-disclosure">
                      {choices(
                        "projectType",
                        "Project type",
                        data.projectCategory === "Residential"
                          ? residentialTypes
                          : commercialTypes,
                      )}
                      {field(
                        "floors",
                        "Number of floors",
                        "e.g. 2",
                        "Include the ground floor, exclude basements. G+1 = 2 floors.",
                        "number",
                      )}
                    </div>
                  ) : (
                    <p className="field-hint">
                      Choose a category to see project types.
                    </p>
                  )}
                </>
              ) : null}
              {step === 2 ? (
                <>
                  {field(
                    "location",
                    "Project location",
                    "City / area",
                    "Bengaluru or a location in Tamil Nadu.",
                    "text",
                    "address-level2",
                  )}
                  {field(
                    "plotSize",
                    "Approximate plot size",
                    "e.g. 30 × 40 ft or 1,200 sq ft",
                    "Include the unit. If you’re still exploring, enter ‘Not sure’.",
                  )}
                  {field(
                    "builtUpArea",
                    "Expected built-up area (optional)",
                    "e.g. 2,500 sq ft",
                    "Total floor area across all levels, if known.",
                  )}
                  {choices("siteStatus", "Current site status", siteStatuses)}
                </>
              ) : null}
              {step === 3 ? (
                <>
                  {field(
                    "fullName",
                    "Full name",
                    "Your name",
                    undefined,
                    "text",
                    "name",
                  )}
                  {field(
                    "email",
                    "Email address",
                    "you@example.com",
                    "Your project response will be sent here.",
                    "email",
                    "email",
                  )}
                  {field(
                    "phone",
                    "Phone number (optional)",
                    "+91",
                    "Include your country code if you’d like us to call.",
                    "tel",
                    "tel",
                  )}
                  <p className="privacy-note">
                    <ShieldCheck size={17} />
                    Your details are used to discuss this project enquiry.
                  </p>
                </>
              ) : null}
              {step === 4 ? (
                <div className="review-groups">
                  {[
                    ["Service", [data.service]],
                    [
                      "Project",
                      [
                        data.projectCategory,
                        data.projectType,
                        `${data.floors} floors`,
                      ],
                    ],
                    [
                      "Site",
                      [
                        data.location,
                        `Plot: ${data.plotSize}`,
                        data.builtUpArea ? `Built-up: ${data.builtUpArea}` : "",
                        data.siteStatus,
                      ],
                    ],
                    ["Contact", [data.fullName, data.email, data.phone]],
                  ].map(([label, values], i) => (
                    <div className="review-group" key={String(label)}>
                      <div>
                        <span className="eyebrow">{label}</span>
                        <button
                          type="button"
                          onClick={() => changeStep(i)}
                          aria-label={`Edit ${label}`}
                        >
                          Edit <ArrowUpRight size={13} />
                        </button>
                      </div>
                      {(values as string[]).filter(Boolean).map((value, n) => (
                        <p key={n}>{value}</p>
                      ))}
                    </div>
                  ))}
                  <p className="field-hint">
                    Submitting sends these details to the Urbexa Projects team
                    for review.
                  </p>
                </div>
              ) : null}
            </div>
          </fieldset>
          {serverError ? (
            <Alert className="submission-error">
              <AlertCircle />
              <AlertTitle>Your enquiry hasn’t been confirmed</AlertTitle>
              <AlertDescription>
                <p>{serverError}</p>
                <a href="mailto:enquiry@urbexaprojects.com">
                  Or email enquiry@urbexaprojects.com
                </a>
              </AlertDescription>
            </Alert>
          ) : null}
          <div className="form-actions">
            <Button
              type="button"
              variant="ghost"
              onClick={() => changeStep(step - 1)}
              disabled={step === 0 || status === "sending"}
              className="back-button"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <Button
              type="submit"
              disabled={status === "sending"}
              className="button-primary"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Sending enquiry…
                </>
              ) : (
                <>
                  {step === 4
                    ? "Send project enquiry"
                    : step === 3
                      ? "Review your brief"
                      : "Continue"}
                  <ArrowRight size={17} />
                </>
              )}
            </Button>
          </div>
          <p className="form-footnote">
            {step === 4
              ? "A conversation, with no commitment to proceed."
              : "Your choices stay with you as you move between steps."}
          </p>
        </>
      )}
    </form>
  );
}
