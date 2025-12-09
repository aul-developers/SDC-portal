import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 sm:p-12">
        {/* Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="h-16 w-16 mb-6 rounded-2xl bg-sdc-navy text-white flex items-center justify-center shadow-lg shadow-sdc-navy/20">
            <span className="text-2xl font-bold tracking-tighter">AU</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-sdc-navy">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            Sign in to the Student Disciplinary Portal
          </p>
        </div>

        <div className="mt-8">
          <LoginForm />
        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/signup"
            className="text-sdc-blue font-semibold hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
