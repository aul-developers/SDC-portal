"use client";

import type React from "react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import LoadingButton from "./LoadingButton";

import { postRequest } from "@/lib/utils";
// import { Toast } from "./ui/toast";
import { toast } from "sonner";
// import { useToast } from "./ui/use-toast";

interface loginInfo {
    username: string;
    password: string;
}

interface PostResponse {
    result: {
        message: string;
    };
}

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const formUserEmailInputRef = useRef<HTMLInputElement>(null);
    const formPasswordInputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        if (formUserEmailInputRef.current && formPasswordInputRef.current) {
            try {
                const loginInfo: loginInfo = {
                    username: formUserEmailInputRef.current.value,
                    password: formPasswordInputRef.current.value,
                };

                console.log(loginInfo);

                const response = await postRequest<loginInfo>(
                    "/sdc/login/",
                    loginInfo
                );
                if (response) {
                    toast.success(response.message);
                }

                setIsLoading(false);
                router.push("/dashboard");
            } catch (error: unknown) {
                console.log(error);

                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : "an Unexpected Error occured";
                setIsLoading(false);
                toast.error(errorMessage);
            }
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="email" className="text-sdc-navy">
                    Email
                </Label>
                <Input
                    // id="email"
                    placeholder="name@example.com"
                    // type="email"
                    ref={formUserEmailInputRef}
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    required
                    className="h-11 border-gray-200 focus-visible:ring-sdc-blue"
                />
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sdc-navy">
                        Password
                    </Label>
                </div>
                <Input
                    id="password"
                    placeholder="••••••••"
                    ref={formPasswordInputRef}
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    disabled={isLoading}
                    required
                    className="h-11 border-gray-200 focus-visible:ring-sdc-blue"
                />
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none text-sdc-gray peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Remember me
                </label>
            </div>
            <Button
                type="submit"
                className="w-full h-11 bg-sdc-blue hover:bg-sdc-blue/90 transition-colors"
                disabled={isLoading}
            >
                {isLoading ? <LoadingButton text="Signing in" /> : "Sign up"}
            </Button>
        </form>
    );
}
