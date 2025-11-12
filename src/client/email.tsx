import { useAgent } from "agents/react";
import { useState } from "react";
import { useSession } from "@/server/auth/client";
import { Navigate } from "react-router";
import { AuthenticatingSkeleton } from "@/client/components/auth/authenticatingSkeleton";

export default function EmailPreviewPage() {
  const { data, isPending } = useSession();
  if (isPending) {
    return <AuthenticatingSkeleton />;
  }
  if (!data?.user) {
    return <Navigate to="/signin" />;
  }

  return <EmailPreview agentName={data.user.id} />;
}

function EmailPreview({ agentName }: { agentName: string }) {
  const [state, setState] = useState<{ emailHtml: string }>({ emailHtml: "" });

  useAgent({
    agent: "agent",
    name: agentName,
    onStateUpdate: (newState) => setState(newState as { emailHtml: string })
  });

  // biome-ignore lint/security/noDangerouslySetInnerHtml: Email HTML content needs to be rendered as-is for preview
  return <div dangerouslySetInnerHTML={{ __html: state.emailHtml }} />;
}
