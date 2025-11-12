import { useAgentChat } from "agents/ai-react";
import { useAgent } from "agents/react";
import type { UIMessage } from "@ai-sdk/react";

export function AgentInterface({ agentName }: { agentName: string }) {
  const agent = useAgent({
    agent: "agent",
    name: agentName,
    onStateUpdate: (newState) => console.log("newState", newState)
  });

  const { messages } = useAgentChat<unknown, UIMessage<{ createdAt: string }>>({
    agent
  });

  console.log("messages", messages);

  return (
    <div className="h-full w-full flex flex-col relative">
      {messages.map((m) => {
        return (
          <div key={m.id} className={`flex gap-3 flex-row`}>
            {m.parts.map((part) => {
              if (part.type === "text") {
                return <div key={part.type}>{part.text}</div>;
              }
              return <div key={part.type}>{part.type}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
}
