import { Resend } from "resend";

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "info@breakingwalls.co";
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Venus Website <info@breakingwalls.co>";

export type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
};

export type ContactResponse = {
  status: number;
  body: Record<string, unknown>;
};

function sanitize(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

export async function handleContactSubmission(payload: ContactPayload): Promise<ContactResponse> {
  const resend = getResendClient();
  if (!resend) {
    console.error("Contact email is not configured: missing RESEND_API_KEY.");
    return {
      status: 503,
      body: {
        error: "Email service is not configured yet. Please email info@breakingwalls.co directly.",
      },
    };
  }

  // Honeypot field: bots fill this hidden value, real users should leave it blank.
  if (sanitize(payload.company, 120)) {
    return { status: 200, body: { ok: true } };
  }

  const name = sanitize(payload.name, 120);
  const email = sanitize(payload.email, 254);
  const message = sanitize(payload.message, 4000);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !emailPattern.test(email) || message.length < 10) {
    return {
      status: 400,
      body: {
        error: "Please provide a name, valid email, and message.",
      },
    };
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const subject = `Venus website contact from ${name}`;

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      replyTo: email,
      subject,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <h2>New message from Venus: The Last Ascent</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    if (error) {
      console.error("Resend contact email failed", error);
      return {
        status: 502,
        body: {
          error: "Email could not be sent right now.",
        },
      };
    }
  } catch (error) {
    console.error("Resend contact email request failed", error);
    return {
      status: 502,
      body: {
        error: "Email could not be sent right now.",
      },
    };
  }

  return { status: 200, body: { ok: true } };
}
