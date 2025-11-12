import { tool } from "ai";
import { z } from "zod/v3";
import { getCurrentAgent } from "agents";
import { sendEmail as sendEmailFunction } from "@/server/email";
import type { Agent } from "./AIEmailAgent";
import { templateEmailHtml } from "@/server/agents/AIEmailAgent";

const editEmailHtml = tool({
  description:
    "the tool to edit the email html, you should use a lot of modern cool styling and keep it minimal and clean and professional unless the user asks for something else",
  inputSchema: z.object({ html: z.string() }),
  execute: async ({ html }) => {
    const { agent } = getCurrentAgent<Agent>();

    function throwError(msg: string): string {
      throw new Error(msg);
    }

    if (!agent) {
      return throwError("Agent not found");
    }

    agent.setState({ emailHtml: html });
    return `Email HTML updated`;
  }
});

const sendEmail = tool({
  description:
    "the tool to send an email to someone once email is ready (maybe ask to make sure the user is ready to send the current email generated) make sure you have all the feilds you need from the user and if it seems important make sure to ask for all confirmations before sending email.",
  inputSchema: z.object({
    subject: z.string(),
    recipientName: z.string(),
    recipientEmail: z.string(),
    senderName: z.string(),
    replyToEmail: z.string()
  }),
  execute: async ({
    subject,
    recipientName,
    recipientEmail,
    senderName,
    replyToEmail
  }) => {
    const { agent } = getCurrentAgent<Agent>();

    function throwError(msg: string): string {
      throw new Error(msg);
    }

    if (!agent) {
      return throwError("Agent not found");
    }
    const htmlContent = agent.state.emailHtml;
    return sendEmailFunction({
      htmlContent,
      subject,
      recipientName,
      recipientEmail,
      senderName,
      replyToEmail
    });
  }
});

const resetEmail = tool({
  description:
    "the tool to reset the current email back to the default template if user asks to start over and make a new email and so on.",
  inputSchema: z.void(),
  execute: async () => {
    const { agent } = getCurrentAgent<Agent>();

    function throwError(msg: string): string {
      throw new Error(msg);
    }

    if (!agent) {
      return throwError("Agent not found");
    }

    agent.setState({ emailHtml: templateEmailHtml });
    return "Email reset to default template";
  }
});

export const tools = {
  resetEmail,
  editEmailHtml,
  sendEmail
};
