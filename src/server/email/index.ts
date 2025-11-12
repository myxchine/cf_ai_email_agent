import { env } from "cloudflare:workers";

interface EmailData {
  sender: {
    name: string;
    email: string;
  };

  to: {
    name: string;
    email: string;
  }[];
  subject: string;
  htmlContent: string;
  replyTo: {
    name: string;
    email: string;
  };
}

export async function sendEmail({
  htmlContent,
  subject,
  recipientName,
  recipientEmail,
  senderName,
  replyToEmail
}: {
  htmlContent: string;
  subject: string;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  replyToEmail: string;
}): Promise<boolean> {
  const confirmationEmailData: EmailData = {
    sender: { name: senderName, email: "noreply@vesqa.com" },
    replyTo: { name: senderName, email: replyToEmail },
    to: [{ name: recipientName, email: recipientEmail }],
    subject,
    htmlContent
  };

  const emailKey = env.EMAIL_KEY;

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": emailKey,
        "content-type": "application/json"
      },
      body: JSON.stringify(confirmationEmailData)
    });

    if (!response.ok) {
      console.error("Error sending email:", response);
      throw new Error(response.statusText);
    }

    console.log("Email sent successfully");

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(`Failed to send email: ${error}`);
  }
}
