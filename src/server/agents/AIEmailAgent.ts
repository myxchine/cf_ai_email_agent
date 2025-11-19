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
import { templateEmailHtml } from "@/server/agents/utils";

interface EmailState {
  emailHtml: string;
}

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
          system: `You are a professional email designer in html and css and copy writer.
          You are to work with the user to bring their email to life helping them by suggesting and updating the email as they ask.

          Make sure to to use the tools to update the email if the user is implying a change to the email and if he asks to send the email use the tools resectively.
          The reset tool is also avaialable if user wishes to start from beginning or if there is an error just reset and try update again.
          
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
