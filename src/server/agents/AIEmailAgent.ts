import { AIChatAgent } from "agents/ai-chat-agent";
import {
  streamText,
  type StreamTextOnFinishCallback,
  stepCountIs,
  createUIMessageStream,
  convertToModelMessages,
  createUIMessageStreamResponse,
  type ToolSet
} from "ai";
import { tools } from "./tools";
import { groq } from "@/server/agents/ai/groq";

interface EmailState {
  emailHtml: string;
}
export const templateEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Email Title</title>
    <style type="text/css">
        /* Basic reset styles */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

        /* Apple link color fix */
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }
    </style>
</head>

<body style="margin: 0 !important; padding: 0 !important; background-color: #f4f4f4;">

    <div style="display: none; font-size: 1px; color: #f4f4f4; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        This is your preview text. Keep it short and sweet!
    </div>


    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 20px 0 20px 0;" bgcolor="#f4f4f4">

                <table border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden;">

                    <tr>
                        <td align="left" style="padding: 30px 30px 20px 30px; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; color: #333333;">
                            Your Company
                        </td>
                    </tr>
                    <tr>
                        <td align="left" style="padding: 30px 30px 30px 30px; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #555555;">
                            
                            <h1 style="font-size: 22px; font-weight: bold; color: #333333; margin: 0 0 15px 0;">
                                This is Your Main Headline
                            </h1>
                            
                            <p style="margin: 0 0 15px 0;">
                                Hi [First Name],
                            </p>
                            <p style="margin: 0 0 15px 0;">
                                This is a paragraph of text. It's clean, simple, and designed to be highly readable. We're using tables for layout to ensure it works everywhere, even in Outlook.
                            </p>
                            <p style="margin: 0;">
                                Feel free to customize this text to fit your needs. You can add more paragraphs, lists, or other elements as required.
                            </p>

                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 0 30px 40px 30px;">
                            <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                                <tr>
                                    <td align="center" style="border-radius: 5px;" bgcolor="#007bff">
                                        <a href="https://www.your-link-here.com" target="_blank" style="display: inline-block; padding: 12px 25px; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none; border-radius: 5px;">
                                            Click Here
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 30px 30px 30px 30px; background-color: #fafafa; border-top: 1px solid #eeeeee;">
                            <p style="margin: 0 0 10px 0; font-family: Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #999999;">
                                You are receiving this email because you opted in at our website.
                            </p>
                            <p style="margin: 0 0 10px 0; font-family: Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #999999;">
                                <a href="https://www.your-link-here.com/unsubscribe" target="_blank" style="color: #999999; text-decoration: underline;">Unsubscribe</a>
                                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                                <a href="https://www.your-link-here.com/preferences" target="_blank" style="color: #999999; text-decoration: underline;">Manage Preferences</a>
                            </p>
                            <p style="margin: 0; font-family: Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #999999;">
                                &copy; 2025 Your Company. All rights reserved.<br>
                                123 Main Street, Anytown, USA 12345
                            </p>
                        </td>
                    </tr>
                    </table>
                </td>
        </tr>
    </table>
    </body>
</html>`;

export class Agent extends AIChatAgent<Env, EmailState> {
  initialState = {
    emailHtml: templateEmailHtml
  };

  async onChatMessage(
    onFinish: StreamTextOnFinishCallback<ToolSet>,
    _options?: { abortSignal?: AbortSignal }
  ) {
    const allTools = {
      ...tools
    } as ToolSet;

    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        const result = streamText({
          system: `You are a professional email designer in html and css and copy writer. You are to work with the user to bring their email to life helping them by suggesting and updating the email as they ask.
          
          The current email html is: ${this.state.emailHtml}`,
          messages: convertToModelMessages(this.messages),
          model: groq("moonshotai/kimi-k2-instruct-0905"),
          tools: allTools,
          onFinish: onFinish as unknown as StreamTextOnFinishCallback<
            typeof allTools
          >,
          stopWhen: stepCountIs(10)
        });

        writer.merge(result.toUIMessageStream());
      }
    });

    return createUIMessageStreamResponse({ stream });
  }
}
