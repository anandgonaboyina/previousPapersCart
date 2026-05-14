"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type ViewState = "login" | "signup" | "forgot";

export default function AuthPage() {
  // Toggle between login, signup, and forgot password views
  const [view, setView] = useState<ViewState>("login");
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/60 backdrop-blur-sm animate-in fade-in duration-300">

      {/* Glassy Form Container */}
      <div className="relative w-full max-w-md bg-sky-900/40 backdrop-blur-xl border border-sky-700/50 rounded-3xl p-8 shadow-2xl shadow-sky-900/50">

        {/* Close Button - ALWAYS routes back to home reliably */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-5 right-5 text-sky-200 hover:text-white transition-colors bg-sky-950/50 hover:bg-sky-800/80 p-2 rounded-full border border-sky-700/50"
          title="Close and go back home"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {view === "forgot" ? (
          // ================= FORGOT PASSWORD VIEW =================
          <>
            <div className="text-center mb-8 pt-2">
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                Reset Password
              </h2>
              <p className="text-sky-200 text-sm">
                Enter your email and we'll send you a link to reset your password.
              </p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-sky-100 mb-1.5 ml-1">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-sky-950/60 border border-sky-800/60 text-white placeholder-sky-500/50 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all shadow-inner shadow-sky-950/50"
                  placeholder="you@student.edu"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-500 shadow-lg shadow-sky-600/30 hover:shadow-sky-500/50 transition-all duration-300 transform active:scale-[0.98]"
              >
                Send Reset Link
              </button>
            </form>

            <div className="mt-8 text-center border-t border-sky-800/50 pt-6">
              <p className="text-sm text-sky-200">
                Remember your password?{" "}
                <button
                  type="button"
                  onClick={() => setView("login")}
                  className="font-semibold text-sky-400 hover:text-white transition-colors"
                >
                  Log in
                </button>
              </p>
            </div>
          </>
        ) : (
          // ================= LOGIN AND SIGN UP VIEW =================
          <>
            <div className="text-center mb-8 pt-2">
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                {view === "login" ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-sky-200 text-sm">
                {view === "login"
                  ? "Enter your details to access your account."
                  : "Sign up to get started with PrepPapers."}
              </p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {/* Only show Full Name field if signing up */}
              {view === "signup" && (
                <div>
                  <label className="block text-sm font-medium text-sky-100 mb-1.5 ml-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-sky-950/60 border border-sky-800/60 text-white placeholder-sky-500/50 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all shadow-inner shadow-sky-950/50"
                    placeholder="John Doe"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-sky-100 mb-1.5 ml-1">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-sky-950/60 border border-sky-800/60 text-white placeholder-sky-500/50 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all shadow-inner shadow-sky-950/50"
                  placeholder="you@student.edu"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5 ml-1">
                  <label className="block text-sm font-medium text-sky-100">Password</label>
                  {view === "login" && (
                    <button
                      type="button"
                      onClick={() => setView("forgot")}
                      className="text-xs text-sky-400 hover:text-white transition-colors"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl bg-sky-950/60 border border-sky-800/60 text-white placeholder-sky-500/50 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all shadow-inner shadow-sky-950/50"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-500 shadow-lg shadow-sky-600/30 hover:shadow-sky-500/50 transition-all duration-300 transform active:scale-[0.98]"
              >
                {view === "login" ? "Log In" : "Sign Up"}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-sky-800/50 pt-6">
              <p className="text-sm text-sky-200">
                {view === "login" ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setView(view === "login" ? "signup" : "login")}
                  className="font-semibold text-sky-400 hover:text-white transition-colors"
                >
                  {view === "login" ? "Sign up" : "Log in"}
                </button>
              </p>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
