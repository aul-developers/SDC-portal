"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { storeSession } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { toast } from "sonner";
import { Mail, Lock, EyeOff, Eye, AlertCircle, UserCog } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createClient } from "@/utils/supabase/client";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formUserEmailInputRef = useRef<HTMLInputElement>(null);
  const formPasswordInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (searchParams.get("unauthorized")) {
      setShowUnauthorizedModal(true);
    }
  }, [searchParams]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    if (formUserEmailInputRef.current && formPasswordInputRef.current) {
      const email = formUserEmailInputRef.current.value;
      const password = formPasswordInputRef.current.value;

      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Login timed out - Network slow")),
            60000,
          ),
        );

        const startTime = performance.now();

        // Direct API call instead of using Supabase client (temporary workaround)
        const authResponse = (await Promise.race([
          fetch(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=password`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
              },
              body: JSON.stringify({ email, password }),
            },
          ),
          timeoutPromise,
        ])) as Response;

        if (!authResponse.ok) {
          const errorData = await authResponse.json();
          toast.error(
            errorData.error_description ||
              errorData.msg ||
              "Invalid credentials",
          );
          setIsLoading(false);
          return;
        }

        const authData = await authResponse.json();

        // Set the session using Server Action
        const { success, error: sessionError } = await storeSession(
          authData.access_token,
          authData.refresh_token,
        );

        if (sessionError || !success) {
          toast.error(sessionError || "Failed to create session");
          setIsLoading(false);
          return;
        }

        if (success) {
          setIsSuccess(true);
          toast.success("Signed in successfully");
          // Use hard navigation to force full server re-render with fresh session data
          window.location.href = "/dashboard";
        }
      } catch (err: any) {
        toast.error(err.message || "Something went wrong during login");
        setIsLoading(false);
      }
    } else {
      toast.error("Please fill in all fields");
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* (Dialog remains same) */}
      <Dialog
        open={showUnauthorizedModal}
        onOpenChange={setShowUnauthorizedModal}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <DialogTitle className="text-center text-xl">
              Unauthorized Access
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              You must be signed in to access the dashboard. Please enter your
              credentials below to continue.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button
              onClick={() => setShowUnauthorizedModal(false)}
              className="w-full bg-sdc-navy hover:bg-sdc-navy/90"
            >
              Okay
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="relative group">
          <Mail className="absolute left-0 top-3 h-5 w-5 text-gray-400 transition-colors" />
          <Input
            placeholder="email@aul.edu.ng"
            ref={formUserEmailInputRef}
            autoCapitalize="none"
            autoComplete="username"
            autoCorrect="off"
            disabled={isLoading}
            required
            className="pl-8 border-0 border-b border-gray-200 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-gray-200 focus-visible:ring-offset-0 bg-transparent h-10 placeholder:text-gray-500 font-medium transition-none"
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
              className="pl-8 border-0 border-b border-gray-200 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-gray-200 focus-visible:ring-offset-0 bg-transparent h-10 placeholder:text-gray-500 font-medium tracking-widest transition-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="sr-only">Select Role</Label>
          <Select defaultValue="super_admin" name="role">
            <SelectTrigger className="w-full h-10 border-0 border-b border-gray-200 rounded-none shadow-none focus:ring-0 px-0">
              <div className="flex items-center gap-3 text-gray-500">
                <UserCog className="h-5 w-5" />
                <SelectValue placeholder="Select Role" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="super_admin">Super Admin</SelectItem>
              <SelectItem value="board_member">Board Member</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-8">
          <Button
            type="submit"
            className="w-full bg-sdc-navy hover:bg-sdc-navy/90 text-white rounded-full h-12 shadow-md flex justify-center items-center gap-2 group"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingButton
                text={isSuccess ? "Redirecting..." : "Verifying..."}
              />
            ) : (
              <>
                <span className="font-semibold text-lg">Sign In</span>
                <span className="bg-white/10 rounded-full p-1">
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
    </>
  );
}
