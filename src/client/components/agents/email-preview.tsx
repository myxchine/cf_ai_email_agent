import { useAgentConnectionStatus } from "@/client/hooks/useAgentConnectionStatus";
import { useAgent } from "agents/react";
import { useState, useEffect } from "react";
import { ArrowDown, Loader2 } from "lucide-react";

export function EmailPreview({ agentName }: { agentName: string }) {
  const [isIframeReady, setIsIframeReady] = useState(false);
  const [state, setState] = useState<{ emailHtml: string }>({ emailHtml: "" });

  const agent = useAgent({
    agent: "agent",
    name: agentName,
    onStateUpdate: (newState) => setState(newState as { emailHtml: string })
  });

  const connectionStatus = useAgentConnectionStatus(agent);
  const isConnected = connectionStatus === "connected";

  useEffect(() => {
    if (!isConnected) {
      setIsIframeReady(false);
    }
  }, [isConnected]);

  // Create a data URL for the email content to use in iframe
  const emailDataUrl = state.emailHtml
    ? `data:text/html;charset=utf-8,${encodeURIComponent(state.emailHtml)}`
    : "about:blank";

  if (!isConnected) {
    return <EmailPreviewLoadingSkeleton />;
  }

  return (
    <div className="h-full w-full flex flex-col gap-4 md:gap-8 relative bg-black/5 p-2 md:p-8 pb-0">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="size-14 md:size-18 bg-black/10 rounded-full animate-pulse" />
        <div className="flex flex-col gap-1 md:gap-3">
          <div className="w-[150px] md:w-[200px] h-4 md:h-6 rounded bg-black/10 animate-pulse" />
          <div className="flex items-center gap-1">
            <ArrowDown className="size-3 text-black/40 animate-pulse" />
            <div className="w-[100px] h-3 rounded bg-black/10 animate-pulse" />
          </div>
        </div>
      </div>
      {!isIframeReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <EmailPreviewLoadingSkeleton />
        </div>
      )}
      <iframe
        src={emailDataUrl}
        className="w-full h-full border-0 email-preview"
        title="Email Preview"
        sandbox="allow-same-origin allow-scripts"
        onLoad={() => setIsIframeReady(true)}
      />
    </div>
  );
}

function EmailPreviewLoadingSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto mx-auto px-4 pb-48 gap-4 flex flex-col items-center justify-center h-full ">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-black/40 animate-spin" />
        <p className="text-sm text-black/60">Loading email preview...</p>
      </div>
    </div>
  );
}
