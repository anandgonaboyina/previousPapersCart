"use client";

import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md">
        <button
          onClick={() => router.push("/")}
          className="absolute -top-12 right-2 sm:-right-4 text-sky-200 hover:text-white transition-colors bg-sky-950/50 hover:bg-sky-800/80 p-2 rounded-full border border-sky-700/50 z-50 cursor-pointer"
          title="Close and go back home"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex w-full items-center justify-center">
          <SignUp routing="hash" signInUrl="/sign-in" />
        </div>
      </div>
    </div>
  );
}