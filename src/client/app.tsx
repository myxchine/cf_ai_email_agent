import { useSession } from "@/server/auth/client";
import { Navigate } from "react-router";
import { AuthenticatingSkeleton } from "@/client/components/auth/authenticatingSkeleton";
import AuthHeader from "./components/auth/header";
import { Toaster } from "sonner";

export default function Home() {
  const { data, isPending } = useSession();

  if (isPending) {
    return <AuthenticatingSkeleton />;
  }
  if (!data?.user) {
    return <Navigate to="/signin" />;
  }
  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="flex flex-col h-svh max-h-svh fixed top-0 left-0 right-0 bottom-0 overflow-hidden">
        <AuthHeader name={data.user.name} />
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 flex-1 min-h-0 p-3 md:p-4">
          <MobileViewToggle agentName={data.user.id} />
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import { MessageSquare, Mail } from "lucide-react";
import { AgentInterface } from "@/client/components/agents/chat-interface";
import { EmailPreview } from "@/client/components/agents/email-preview";

type ViewType = "agent" | "email";

export function MobileViewToggle({ agentName }: { agentName: string }) {
  const [mobileView, setMobileView] = useState<ViewType>("agent");

  return (
    <>
      <div className="flex gap-2 md:hidden mb-2">
        <button
          type="button"
          onClick={() => setMobileView("agent")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
            mobileView === "agent"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black/10"
          }`}
        >
          <MessageSquare className="size-4" />
          <span>Ai Agent</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileView("email")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
            mobileView === "email"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black/10"
          }`}
        >
          <Mail className="size-4" />
          <span>Email Preview</span>
        </button>
      </div>
      <div
        className={`md:max-w-xl w-full flex-1 min-h-0 flex flex-col p-6 pb-0 border rounded-3xl border-black/10 ${mobileView === "agent" ? "flex" : "hidden"} md:flex`}
      >
        <AgentInterface agentName={agentName} />
      </div>
      <div
        className={`w-full min-w-1/2 border flex-1 min-h-0 flex flex-col rounded-3xl border-black/10 overflow-hidden ${mobileView === "email" ? "flex" : "hidden"} md:flex`}
      >
        <EmailPreview agentName={agentName} />
      </div>
    </>
  );
}
