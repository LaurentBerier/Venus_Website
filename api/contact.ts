import { handleContactSubmission, type ContactPayload } from "../shared/contact";

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

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { error: "Method not allowed" });
  }

  let payload: ContactPayload;
  try {
    payload = await readBody(req);
  } catch {
    return json(res, 400, { error: "Invalid request body." });
  }
  const result = await handleContactSubmission(payload);
  return json(res, result.status, result.body);
}
