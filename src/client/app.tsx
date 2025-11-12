import { AgentInterface } from "@/client/components/agents/chat-interface";
import { EmailPreview } from "@/client/components/agents/email-preview";
import { useSession } from "@/server/auth/client";
import { Navigate } from "react-router";
import { AuthenticatingSkeleton } from "@/client/components/auth/authenticatingSkeleton";
import AuthHeader from "./components/auth/header";

export default function Home() {
  const { data, isPending } = useSession();
  if (isPending) {
    return <AuthenticatingSkeleton />;
  }
  if (!data?.user) {
    return <Navigate to="/signin" />;
  }
  return (
    <div className="flex flex-col h-svh ">
      <AuthHeader name={data.user.name} />
      <div className="flex flex-col md:flex-row gap-2 md:gap-8 h-full p-3 md:p-4">
        <div className="md:max-w-xl w-full h-full p-6 pb-0 border rounded-3xl border-black/10">
          <AgentInterface agentName={data.user.id} />
        </div>
        <div className="w-full min-w-1/2 hidden md:block border h-full rounded-3xl border-black/10 overflow-hidden">
          <EmailPreview agentName={data.user.id} />
        </div>
      </div>
    </div>
  );
}
