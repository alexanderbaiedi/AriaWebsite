type SendEmailInput = {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
};

type ResendErrorResponse = {
  message?: string;
  name?: string;
};

export class EmailConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmailConfigurationError";
  }
}

export async function sendEmail(input: SendEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new EmailConfigurationError("RESEND_API_KEY is required to send email.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: input.from,
      to: [input.to],
      subject: input.subject,
      text: input.text,
      reply_to: input.replyTo,
    }),
  });

  if (!response.ok) {
    let message = `Resend returned ${response.status}.`;

    try {
      const data = (await response.json()) as ResendErrorResponse;
      if (data.message) message = data.message;
    } catch {
      // Keep the status-based message if Resend does not return JSON.
    }

    throw new Error(message);
  }
}
