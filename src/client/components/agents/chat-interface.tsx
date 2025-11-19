import { useAgentChat } from "agents/ai-react";
import { useAgent } from "agents/react";
import { ConnectionStatusBadge } from "@/client/components/agents/connection-status";
import { useAgentConnectionStatus } from "@/client/hooks/useAgentConnectionStatus";
import { useState, useCallback, useEffect, useRef } from "react";
import { ArrowUp, Square, Loader2, Wrench, CheckCircle2 } from "lucide-react";
import { Streamdown } from "streamdown";
import { EmptyChatState } from "@/client/components/agents/empty-chat-state";
import { toast } from "sonner";

function MessagesLoadingSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-48 gap-4 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-black/40 animate-spin" />
        <p className="text-sm text-black/60">Connecting to agent...</p>
      </div>
    </div>
  );
}

export function AgentInterface({ agentName }: { agentName: string }) {
  const agent = useAgent({
    agent: "agent",
    name: agentName
  });

  const connectionStatus = useAgentConnectionStatus(agent);
  const isConnected = connectionStatus === "connected";

  const [uiError, setUiError] = useState<Error | null>(null);

  const { messages, clearHistory: originalClearHistory, status, sendMessage, stop } = useAgentChat({
    agent,
    onError: (error) => {
      console.error("Agent Chat Error:", error);
      setUiError(error);

      const errorMessage = error.message || "Unknown error";
      const errorType = (error as any).type;

      // Check for rate limit errors
      if (
        errorMessage.includes("Rate limit") ||
        errorMessage.includes("rate_limit") ||
        errorMessage.includes("429") ||
        errorMessage.includes("TPM") ||
        errorMessage.includes("tokens per minute") ||
        errorType === "rate_limit"
      ) {
        toast.error("Rate limit reached", {
          description:
            "The AI is receiving too many requests right now. Please try again in a few seconds."
        });
      }
      // Check for request too large errors
      else if (
        errorMessage.includes("Request too large") ||
        errorMessage.includes("reduce your message size") ||
        errorMessage.includes("413") ||
        (error as any).statusCode === 413 ||
        errorType === "tokens" || // User specified type
        errorType === "context_length_exceeded"
      ) {
        toast.error("Chat history too long", {
          description:
            "The conversation has become too long. Please clear the chat history and try again.",
          action: {
            label: "Clear Chat",
            onClick: () => clearHistory()
          }
        });
      } else {
        toast.error("Error", {
          description: errorMessage
        });
      }
    }
  });

  const clearHistory = useCallback(() => {
    originalClearHistory();
    setUiError(null);
  }, [originalClearHistory]);

  const [agentInput, setAgentInput] = useState("");
  const handleAgentInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAgentInput(e.target.value);
  };

  const handleAgentSubmit = async (
    e: React.FormEvent,
    extraData: Record<string, unknown> = {}
  ) => {
    e.preventDefault();
    if (!agentInput.trim() || !isConnected) return;

    const message = agentInput;
    setAgentInput("");
    setUiError(null); // Clear error on new submission

    await sendMessage(
      {
        role: "user",
        parts: [{ type: "text", text: message }]
      },
      {
        body: extraData
      }
    );
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  useEffect(() => {
    messages.length > 0 && scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (status === "streaming" || status === "submitted") {
      scrollToBottom();
    }
  }, [status, scrollToBottom]);

  // Helper to get the last assistant message
  const lastAssistantMessage = messages
    .filter((m) => m.role === "assistant")
    .pop();

  return (
    <div className="h-full w-full flex flex-col relative min-h-0">
      <div className="p-0 md:p-0 flex items-center justify-between bg-linear-to-b from-white via-white to-transparent absolute top-0 left-0 right-0">
        <ConnectionStatusBadge status={connectionStatus} />
        <button
          type="button"
          onClick={() => clearHistory()}
          disabled={
            status === "streaming" || status === "submitted" || !isConnected
          }
          className="text-sm border border-black/10 hover:cursor-pointer rounded-full px-2 py-1 text-black/60 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear History
        </button>
      </div>

      {/* Messages Container */}
      {!isConnected ? (
        <MessagesLoadingSkeleton />
      ) : messages.length === 0 ? (
        <EmptyChatState />
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          <div className="md:px-4 pt-24 pb-48 gap-4 flex flex-col w-full overflow-y-auto flex-1">
            {messages.map((m, index) => {
              const isUser = m.role === "user";
              const isLastMessage = index === messages.length - 1;
              const isStreamingThisMessage =
                status === "streaming" && isLastMessage;

              return (
                <div
                  key={m.id}
                  className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                >
                  <div
                    className={`flex-1 ${isUser ? "text-right pl-2" : "text-left pr-8"
                      } w-full flex flex-col gap-4`}
                  >
                    {m.parts?.map((part, partIndex) => {
                      const isLastPart =
                        partIndex === (m.parts?.length ?? 0) - 1;

                      if (part.type === "text") {
                        return (
                          <div
                            key={`${m.id}-${partIndex}`}
                            className={`inline-block p-4 w-fit rounded-3xl  ${isUser
                              ? "rounded-br-none ml-auto border border-transparent bg-black/5"
                              : "rounded-bl-none mr-auto bg-black/5 border border-transparent"
                              }`}
                          >
                            <Streamdown
                              isAnimating={isStreamingThisMessage && isLastPart}
                            >
                              {part.text}
                            </Streamdown>
                          </div>
                        );
                      }

                      // Handle tool call parts (only show for assistant messages)
                      // Check for various tool part types including standard AI SDK types
                      const isToolPart =
                        !isUser &&
                        (part.type?.startsWith("tool-") ||
                          part.type === "tool-invocation" ||
                          part.type === "dynamic-tool");

                      if (isToolPart) {
                        let toolName = "Unknown Tool";
                        let toolInput: Record<string, unknown> | undefined;

                        // Handle 'tool-invocation' type (standard AI SDK)
                        if (
                          part.type === "tool-invocation" &&
                          "toolInvocation" in part
                        ) {
                          const invocation = (part as any).toolInvocation;
                          toolName = invocation?.toolName || toolName;
                          toolInput = invocation?.args;
                        }
                        // Handle 'dynamic-tool' type
                        else if (part.type === "dynamic-tool") {
                          toolName = (part as any).toolName || toolName;
                          toolInput = (part as any).args;
                        }
                        // Handle legacy/custom 'tool-NAME' type
                        else if (part.type?.startsWith("tool-")) {
                          const toolNameRaw = part.type.replace("tool-", "");
                          toolName = toolNameRaw
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())
                            .trim();

                          const toolInputRaw = (
                            part as {
                              input?: Record<string, unknown> | unknown;
                            }
                          ).input;

                          toolInput =
                            toolInputRaw &&
                              typeof toolInputRaw === "object" &&
                              !Array.isArray(toolInputRaw)
                              ? (toolInputRaw as Record<string, unknown>)
                              : undefined;
                        }

                        // Determine tool call status:
                        // - Generating: when tool call exists but input is incomplete/empty
                        // - Executing: when tool call has input and is streaming
                        // - Completed: when streaming is done OR it's not the last part of the message

                        // Check if input is "complete" enough to be considered executing
                        // This is a heuristic: if we have keys, we assume it's at least partially generated
                        const hasInput =
                          toolInput && Object.keys(toolInput).length > 0;

                        const isGenerating =
                          isStreamingThisMessage && isLastPart && !hasInput;
                        const isExecuting =
                          isStreamingThisMessage && isLastPart && hasInput;

                        // It is completed if:
                        // 1. We are not streaming this message anymore
                        // 2. OR we are streaming this message, but this is NOT the last part (meaning we moved on to next part)
                        const isCompleted =
                          !isStreamingThisMessage || !isLastPart;

                        return (
                          <div
                            key={`${m.id}-${partIndex}`}
                            className="inline-block p-4 rounded-2xl bg-blue-50 border border-blue-200 max-w-full w-full"
                          >
                            <div className="flex items-start gap-3">
                              <div className="shrink-0 mt-0.5">
                                {(isGenerating || isExecuting) && (
                                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                                )}
                                {isCompleted && (
                                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <Wrench className="w-4 h-4 text-blue-600 shrink-0" />
                                  <span className="font-semibold text-sm text-blue-900">
                                    {toolName}
                                  </span>
                                  {(isGenerating || isExecuting) && (
                                    <span className="text-xs text-blue-600 animate-pulse">
                                      {isGenerating
                                        ? "Generating..."
                                        : "Executing..."}
                                    </span>
                                  )}
                                  {isCompleted && (
                                    <span className="text-xs text-green-600">
                                      Completed
                                    </span>
                                  )}
                                </div>

                                {toolInput &&
                                  Object.keys(toolInput).length > 0 && (
                                    <div className="mb-2">
                                      <div className="bg-white/60 rounded-lg p-2 text-xs font-mono text-blue-800 overflow-x-auto">
                                        <pre className="whitespace-pre-wrap wrap-break-word">
                                          {Object.entries(toolInput).map(
                                            ([key, value]) => {
                                              if (key === "html") {
                                                return "Upadting email";
                                              }
                                              if (key === "htmlContent") {
                                                return null;
                                              }
                                              return (
                                                <div
                                                  key={key}
                                                  className="flex items-center gap-2"
                                                >
                                                  <span className="font-semibold">
                                                    {key}:
                                                  </span>
                                                  <span>{String(value)}</span>
                                                </div>
                                              );
                                            }
                                          )}
                                        </pre>
                                      </div>
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />

            {/* Thinking State: Show when streaming/submitted but no parts yet in the last assistant message */}
            {(status === "streaming" || status === "submitted") &&
              (!lastAssistantMessage ||
                !lastAssistantMessage.parts ||
                lastAssistantMessage.parts.length === 0 ||
                (lastAssistantMessage.parts.length > 0 &&
                  lastAssistantMessage.parts[
                    lastAssistantMessage.parts.length - 1
                  ].type === "text")) && (
                <div className="flex gap-3 flex-row">
                  <div className="flex-1 text-left pr-8 w-full">
                    <div className="inline-block p-4 rounded-2xl bg-gray-50 border border-gray-200 max-w-full w-full">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 mt-0.5">
                          <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-gray-600 animate-pulse">
                              Thinking...
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAgentSubmit(e);
        }}
        className="absolute bottom-0  pb-2 md:pb-4 left-1/2 transform -translate-x-1/2 w-full  z-10 backdrop-blur-sm rounded-t-3xl"
      >
        {uiError && (
          <div className="px-6 mb-2 w-full flex justify-center">
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-full text-sm shadow-sm flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
              <span className="font-medium">Error:</span>
              <span className="line-clamp-1">
                {uiError.message}
              </span>
              <button
                type="button"
                onClick={() => clearHistory()}
                className="ml-2 underline hover:text-red-800 whitespace-nowrap"
              >
                Clear Chat
              </button>
            </div>
          </div>
        )}
        <div className="relative">
          <textarea
            placeholder={
              isConnected ? "Type your message..." : "Connecting to agent..."
            }
            disabled={!isConnected}
            className="w-full bg-white border border-black/20 rounded-3xl p-4 md:p-4 pr-14 text-base placeholder:text-black/40 focus:outline-none focus:border-black focus:ring-0 resize-none min-h-[56px] max-h-[200px] overflow-y-auto disabled:opacity-50 disabled:cursor-not-allowed"
            value={agentInput}
            onChange={(e) => {
              handleAgentInputChange(e);
            }}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing &&
                isConnected
              ) {
                e.preventDefault();
                handleAgentSubmit(e as unknown as React.FormEvent);
              }
            }}
          />
          <div className="absolute right-0 bottom-0 pb-4 pr-2.5">
            {status === "submitted" || status === "streaming" ? (
              <button
                type="button"
                onClick={stop}
                className="w-10 h-10 flex items-center justify-center border border-black text-black hover:opacity-50 hover:cursor-pointer rounded-full transition-colors"
                aria-label="Stop generation"
              >
                <Square size={18} fill="currentColor" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isConnected || agentInput.trim().length === 0}
                className="w-10 h-10 flex items-center justify-center border border-black text-black hover:opacity-50 hover:cursor-pointer rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <ArrowUp size={18} />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
