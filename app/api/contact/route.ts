import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { enquirySchema } from "@/lib/enquiry";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 12000)
      return NextResponse.json(
        { error: "This enquiry is too large. Please shorten your details." },
        { status: 413 },
      );
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { error: "Please send a valid project enquiry." },
      { status: 400 },
    );
  }
  const result = enquirySchema.safeParse(body);
  if (!result.success)
    return NextResponse.json(
      {
        error: "Please check your project details.",
        fields: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey)
    return NextResponse.json(
      {
        error:
          "Enquiries are temporarily unavailable. Please email enquiry@urbexaprojects.com.",
      },
      { status: 503 },
    );
  const data = result.data;
  const key = request.headers.get("Idempotency-Key");
  const idempotencyKey =
    key && /^[a-zA-Z0-9-]{16,80}$/.test(key) ? key : undefined;
  const resend = new Resend(apiKey);
  const from = "Urbexa Projects <noreply@urbexaprojects.com>";
  const text = `New Project Enquiry

SERVICE: ${data.service}

PROJECT DETAILS
Category: ${data.projectCategory}
Type: ${data.projectType}
Floors: ${data.floors}
Location: ${data.location}
Plot size: ${data.plotSize}
Built-up area: ${data.builtUpArea || "Not specified"}
Site status: ${data.siteStatus}

CONTACT INFORMATION
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}

Submitted through the Urbexa Projects website.`;
  try {
    const delivery = await resend.emails.send(
      {
        from,
        to: [
          process.env.CONTACT_RECEIVER_EMAIL || "enquiry@urbexaprojects.com",
        ],
        replyTo: data.email,
        subject: `New Project Enquiry — ${data.service} | ${data.location}`,
        text,
      },
      idempotencyKey
        ? { idempotencyKey: `enquiry-${idempotencyKey}` }
        : undefined,
    );
    if (delivery.error) {
      console.error("Contact delivery rejected:", delivery.error.name);
      return NextResponse.json(
        {
          error:
            "We couldn’t deliver your enquiry. Your details are still here; please try again or email us.",
        },
        { status: 502 },
      );
    }
    // Once the internal enquiry is accepted, an acknowledgement failure must not
    // ask the visitor to resend an already-delivered project brief.
    let acknowledgementSent = false;
    try {
      const acknowledgement = await resend.emails.send(
        {
          from,
          to: [data.email],
          subject: "Project Details Received — Urbexa Projects",
          text: `Thank you for sharing your project details, ${data.fullName}.\n\nWe have received your enquiry for ${data.service} in ${data.location}. Our team will review the information and get in touch.\n\nDevelopment Team | Urbexa Projects`,
        },
        idempotencyKey
          ? { idempotencyKey: `acknowledgement-${idempotencyKey}` }
          : undefined,
      );
      acknowledgementSent = !acknowledgement.error;
      if (acknowledgement.error)
        console.error(
          "Contact acknowledgement rejected:",
          acknowledgement.error.name,
        );
    } catch {
      console.error("Contact acknowledgement unavailable");
    }
    return NextResponse.json({ success: true, acknowledgementSent });
  } catch {
    console.error("Contact delivery unavailable");
    return NextResponse.json(
      {
        error:
          "The email service is unavailable. Please try again or email enquiry@urbexaprojects.com.",
      },
      { status: 502 },
    );
  }
}
