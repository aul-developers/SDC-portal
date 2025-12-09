"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Mail, Lock, EyeOff, Eye, Briefcase } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Set auth cookie
    document.cookie = "auth_token=valid; path=/; max-age=86400"; // 1 day
    toast.success("Account created successfully!");
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 sm:p-12">
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="h-16 w-16 mb-6 rounded-2xl bg-sdc-navy text-white flex items-center justify-center shadow-lg shadow-sdc-navy/20">
            <span className="text-2xl font-bold tracking-tighter">AU</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-sdc-navy">
            Sign Up
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            Secure Your Communications with SDC Portal
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="relative group">
            <User className="absolute left-0 top-3 h-5 w-5 text-gray-400 transition-colors" />
            <Input
              required
              placeholder="Full Name"
              className="pl-8 border-0 border-b border-gray-200 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-gray-200 focus-visible:ring-offset-0 bg-transparent h-10 placeholder:text-gray-500 font-medium transition-none"
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <Mail className="absolute left-0 top-3 h-5 w-5 text-gray-400 transition-colors" />
            <Input
              required
              type="email"
              placeholder="user@aul.edu.ng"
              className="pl-8 border-0 border-b border-gray-200 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-gray-200 focus-visible:ring-offset-0 bg-transparent h-10 placeholder:text-gray-500 font-medium transition-none"
            />
          </div>

          {/* Role Selection */}
          <div className="relative group">
            <Briefcase className="absolute left-0 top-3 h-5 w-5 text-gray-400 transition-colors z-10" />
            <div className="pl-8 border-b border-gray-200 group-focus-within:border-sdc-blue transition-colors">
              <Select required>
                <SelectTrigger className="w-full border-none shadow-none p-0 h-10 text-gray-800 font-medium focus:ring-0 focus:ring-offset-0 bg-transparent transition-none">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="sdc_staff">SDC Staff</SelectItem>
                  <SelectItem value="board_trustee">
                    Board of Trustee
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Password */}
          <div className="relative group">
            <Lock className="absolute left-0 top-3 h-5 w-5 text-gray-400 transition-colors" />
            <Input
              required
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pl-8 border-0 border-b border-gray-200 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-gray-200 focus-visible:ring-offset-0 bg-transparent h-10 placeholder:text-gray-500 font-medium transition-none"
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

          {/* Password Requirements */}
          <div className="space-y-2 py-1">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              <span className="text-xs text-gray-400">
                At least 8 characters
              </span>
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-sdc-navy hover:bg-sdc-navy/90 text-white rounded-full h-12 shadow-md hover:shadow-lg transition-all flex justify-center items-center gap-2 group"
            >
              {isLoading ? (
                "Creating Account..."
              ) : (
                <>
                  <span className="font-semibold text-lg">Create Account</span>
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

          {/* Bottom Link - Visible on Mobile */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Already member?{" "}
              <Link
                href="/"
                className="text-blue-600 font-bold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
