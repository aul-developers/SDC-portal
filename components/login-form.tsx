"use client";

import type React from "react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import LoadingButton from "./LoadingButton";

import { toast } from "sonner";
import { Mail, Lock, EyeOff, Eye, Facebook } from "lucide-react";
// import { useToast } from "./ui/use-toast";

interface loginInfo {
  username: string;
}

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const formUserEmailInputRef = useRef<HTMLInputElement>(null);
  const formPasswordInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    if (formUserEmailInputRef.current && formPasswordInputRef.current) {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const email = formUserEmailInputRef.current.value;
      const password = formPasswordInputRef.current.value;

      // Authenticate
      if (email === "admin.aul.edu.ng" && password === "demo1234") {
        document.cookie = "auth_token=valid; path=/; max-age=86400"; // 1 day
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        toast.error("Invalid credentials. Please use default admin login.");
        setIsLoading(false);
      }
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="relative group">
        <Mail className="absolute left-0 top-3 h-5 w-5 text-gray-400 transition-colors" />
        <Input
  
          placeholder="admin.aul.edu.ng"
          ref={formUserEmailInputRef}
          autoCapitalize="none"
          autoComplete="username"
          autoCorrect="off"
          disabled={isLoading}
          required
          className="pl-8 border-0 border-b border-gray-200 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-gray-200 focus-visible:ring-offset-0 bg-transparent h-10 placeholder:text-gray-800 font-medium transition-none"
        />
      </div>

      <div className="space-y-2">
        <div className="relative group">
          <Lock className="absolute left-0 top-3 h-5 w-5 text-gray-400 transition-colors" />
          <Input

            placeholder="••••••••"
            ref={formPasswordInputRef}
            type={showPassword ? "text" : "password"}
            autoCapitalize="none"
            autoComplete="current-password"
            disabled={isLoading}
            required
            className="pl-8 border-0 border-b border-gray-200 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-gray-200 focus-visible:ring-offset-0 bg-transparent h-10 placeholder:text-gray-400 font-medium tracking-widest transition-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              // Eye icon inline or imported. Showing Eye when hidden, EyeOff when visible is standard but often swapped.
              // Lucide 'Eye' shows eye open. 'EyeOff' shows crossed out.
              // If showPassword is true (text visible), show EyeOff (click to hide).
              // If showPassword is false (dots), show Eye (click to show).
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className="flex justify-end">
          <a
            href="#"
            className="text-xs text-gray-400 hover:text-blue-600 mt-1"
          >
            Forgot password?
          </a>
        </div>
      </div>

      <div className="mt-8">
        <Button
          type="submit"
          className="w-full bg-sdc-navy hover:bg-sdc-navy/90 text-white rounded-full h-12 shadow-md hover:shadow-lg transition-all flex justify-center items-center gap-2 group"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingButton text="Validating..." />
          ) : (
            <>
              <span className="font-semibold text-lg">Sign In</span>
              <span className="bg-white/10 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
