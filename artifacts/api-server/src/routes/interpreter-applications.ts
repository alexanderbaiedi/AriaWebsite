import { Router, type IRouter } from "express";
import { EmailConfigurationError, sendEmail } from "../lib/email";
import { logger } from "../lib/logger";

type InterpreterApplication = {
  fullName: string;
  phone: string;
  email: string;
  languages: string;
};

type ValidationErrors = Partial<Record<keyof InterpreterApplication, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const router: IRouter = Router();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readField(body: Record<string, unknown>, field: keyof InterpreterApplication): string {
  const value = body[field];
  return typeof value === "string" ? value.trim() : "";
}

function parseApplication(body: unknown): {
  data: InterpreterApplication;
  errors: ValidationErrors;
} {
  const source = isRecord(body) ? body : {};
  const data: InterpreterApplication = {
    fullName: readField(source, "fullName"),
    phone: readField(source, "phone"),
    email: readField(source, "email"),
    languages: readField(source, "languages"),
  };
  const errors: ValidationErrors = {};

  if (!data.fullName) errors.fullName = "Full name is required.";
  if (!data.phone) errors.phone = "Phone number is required.";
  if (!data.email) {
    errors.email = "Email address is required.";
  } else if (!emailPattern.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!data.languages) errors.languages = "Languages spoken is required.";

  return { data, errors };
}

function buildEmailBody(data: InterpreterApplication, submittedAt: string): string {
  return [
    "New interpreter application submitted from the ARIA careers form.",
    "",
    `Full name: ${data.fullName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Languages spoken: ${data.languages}`,
    `Submitted timestamp: ${submittedAt}`,
  ].join("\n");
}

router.post("/interpreter-applications", async (req, res) => {
  const { data, errors } = parseApplication(req.body);

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ ok: false, errors });
    return;
  }

  const recipient = process.env.INTERPRETER_APPLICATION_RECIPIENT_EMAIL?.trim();
  const from = process.env.EMAIL_FROM_ADDRESS?.trim();

  if (!recipient || !from) {
    logger.error(
      {
        missing: {
          INTERPRETER_APPLICATION_RECIPIENT_EMAIL: !recipient,
          EMAIL_FROM_ADDRESS: !from,
        },
      },
      "Interpreter application email configuration is incomplete",
    );
    res.status(500).json({ ok: false, message: "Application email is not configured." });
    return;
  }

  const submittedAt = new Date().toISOString();

  try {
    await sendEmail({
      to: recipient,
      from,
      replyTo: data.email,
      subject: `New Interpreter Application - ${data.fullName}`,
      text: buildEmailBody(data, submittedAt),
    });

    res.status(201).json({ ok: true });
  } catch (err) {
    if (err instanceof EmailConfigurationError) {
      logger.error({ err }, "Interpreter application email provider is not configured");
      res.status(500).json({ ok: false, message: "Application email is not configured." });
      return;
    }

    logger.error({ err }, "Failed to send interpreter application email");
    res.status(502).json({ ok: false, message: "Application could not be sent." });
  }
});

export default router;
