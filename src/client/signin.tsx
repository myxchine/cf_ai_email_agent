import { Navigate, useSearchParams } from "react-router";
import SignInButton from "./SignInButton";
import { useSession } from "@/server/auth/client";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const { data, isPending, error } = useSession();
  const params = searchParams[0];
  const authError = params?.get("error");
  if (data?.user) {
    return <Navigate to="/agent" replace />;
  }

  return (
    <section className="flex-1 flex items-center justify-center px-6 py-16 md:px-8">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-6">
          <span className="chip">Get Started</span>
        </div>
        <h1 className="mb-4">Sign in to your account</h1>
        <p className="text-black/70 mb-8">
          Sign in or create an account with your Google account to get started
          on MailAgent today.
        </p>

        {isPending ? (
          <div className="card p-8 flex flex-col items-center justify-center">
            <Loader2 className="size-8 animate-spin text-black/60 mb-4" />
            <p className="text-sm text-black/60">Authenticating...</p>
          </div>
        ) : (
          <div className="card p-8">
            <SignInButton />
            {error && (
              <div className="mt-6 p-4 rounded-(--rounded-radius) bg-red-50 border border-red-200">
                <p className="text-sm text-red-700 font-medium">
                  Error: {error.statusText}
                </p>
              </div>
            )}
            {authError && (
              <div className="mt-6 p-4 rounded-(--rounded-radius) bg-red-50 border border-red-200">
                <p className="text-sm text-red-700 font-medium">
                  Error: {authError}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 card p-4">
          <p className="text-xs text-black/60">
            <span className="font-medium text-black/80">Secure:</span> We use
            Google OAuth for authentication. Your account is protected with
            industry-standard security.
          </p>
        </div>
      </div>
    </section>
  );
}
