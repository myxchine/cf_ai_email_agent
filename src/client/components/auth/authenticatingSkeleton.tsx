import { Loader2 } from "lucide-react";
export function AuthenticatingSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-48 gap-4 flex flex-col items-center w-full justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-black/40 animate-spin" />
        <p className="text-sm text-black/60">Authenticating...</p>
      </div>
    </div>
  );
}
