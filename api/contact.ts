const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "info@breakingwalls.co";
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Venus Website <info@breakingwalls.co>";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
};

function json(res: any, status: number, body: Record<string, unknown>) {
  res.status(status).json(body);
}

async function readBody(req: any): Promise<ContactPayload> {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string") {
    return JSON.parse(req.body || "{}");
  }

  let rawBody = "";
  for await (const chunk of req) {
    rawBody += chunk;
  }

  return rawBody ? JSON.parse(rawBody) : {};
}

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

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { error: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Contact email is not configured: missing RESEND_API_KEY.");
    return json(res, 503, {
      error: "Email service is not configured yet. Please email info@breakingwalls.co directly.",
    });
  }

  let payload: ContactPayload;
  try {
    payload = await readBody(req);
  } catch {
    return json(res, 400, { error: "Invalid request body." });
  }

  if (sanitize(payload.company, 120)) {
    return json(res, 200, { ok: true });
  }

  const name = sanitize(payload.name, 120);
  const email = sanitize(payload.email, 254);
  const message = sanitize(payload.message, 4000);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !emailPattern.test(email) || message.length < 10) {
    return json(res, 400, {
      error: "Please provide a name, valid email, and message.",
    });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const subject = `Venus website contact from ${name}`;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: email,
      subject,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <h2>New message from Venus: The Last Ascent</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error("Resend contact email failed", {
      status: resendResponse.status,
      error: errorText,
    });

    return json(res, 502, {
      error: "Email could not be sent right now.",
    });
  }

  return json(res, 200, { ok: true });
}
