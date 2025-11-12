"use client";

import { SpinnerIcon, UserIcon } from "@/client/components/icons";
import { useSession } from "@/server/auth/client";
import { Link } from "react-router";
import { Suspense } from "react";

export default function AccountButton() {
  return (
    <Suspense fallback={<Loading />}>
      <Middleware />
    </Suspense>
  );
}

function Middleware() {
  const session = useSession();
  if (session.isPending) {
    return <Loading />;
  }
  if (!session?.data?.user) {
    return <SignInButton />;
  }
  return <AccountLink />;
}

function AccountLink() {
  return (
    <Link
      className="btn-round-small md:pr-4! flex flex-row gap-1 items-center justify-center"
      to="/agent"
    >
      <UserIcon className="size-5" />
      <span className="hidden md:block">Agent</span>
    </Link>
  );
}

function SignInButton() {
  return (
    <Link className="btn-round-small" to="/signin">
      Sign in
    </Link>
  );
}

function Loading() {
  return (
    <button type="button" className="btn-round-small px-6 text-white" disabled>
      <SpinnerIcon
        className="size-4 animate-spin  text-white"
        fill="#ffffff"
        stroke="#ffffff"
      />
    </button>
  );
}
