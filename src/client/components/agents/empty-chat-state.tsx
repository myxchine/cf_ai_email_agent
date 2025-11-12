import { MessageSquare, Sparkles, ArrowUp } from "lucide-react";

export function EmptyChatState() {
  return (
    <div className="flex-1 overflow-y-auto px-4 pt-12 pb-48 gap-6 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-md text-center">
        <div className="relative">
          <div className="relative bg-black/5 border border-black/10 rounded-full p-6">
            <MessageSquare className="size-8 md:size-12 text-black/40" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-sans text-black/80 tracking-tight">
            Start a conversation
          </h3>
          <p className="text-sm text-black/60 font-mono leading-relaxed">
            Send a message below to begin chatting with your agent. Ask
            questions, request actions, or explore what your agent can do.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/10 text-xs text-black/60">
            <Sparkles className="w-3 h-3" />
            <span>Ask anything</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/10 text-xs text-black/60">
            <ArrowUp className="w-3 h-3" />
            <span>Press Enter to send</span>
          </div>
        </div>
      </div>
    </div>
  );
}
