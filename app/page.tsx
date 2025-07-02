import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            {/* Left side - Login form */}
            <div className="flex w-full flex-col justify-center px-4 py-12 sm:w-1/2 sm:px-6 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm">
                    <div className="flex flex-col items-center">
                        <div className="relative h-16 w-16 mb-6 overflow-hidden rounded-xl">
                            <div className="absolute inset-0 bg-sdc-navy"></div>
                            <Image
                                src="/logo.png"
                                alt="AULogo"
                                fill
                                className="mix-blend-overlay"
                                priority
                            />
                        </div>
                        <h2 className="text-2xl font-semibold text-sdc-navy">
                            Student Disciplinary Committee
                        </h2>
                        <p className="mt-2 text-center text-sm text-sdc-gray">
                            Sign in to access the SDC portal
                        </p>
                    </div>

                    <div className="mt-10">
                        <LoginForm />

                        <div className="mt-8 text-center">
                            <Link
                                href="#"
                                className="text-sm font-medium text-sdc-blue hover:text-sdc-blue/80 transition-colors"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden sm:block sm:w-1/2 relative">
                <Image
                    src="/anchor.jpg"
                    alt="University Campus"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-sdc-navy opacity-70"></div>
                <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
                    <div className="max-w-md">
                        <h1 className="text-3xl font-bold mb-6">
                            Student Disciplinary Committee Portal
                        </h1>
                        <p className="text-lg mb-8">
                            Maintaining academic integrity and campus harmony
                            through fair and transparent disciplinary processes.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-white/20 p-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5"
                                    >
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                                    </svg>
                                </div>
                                <p>Secure case management system</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-white/20 p-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                </div>
                                <p>Comprehensive student records</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-white/20 p-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5"
                                    >
                                        <path d="M12 20h9"></path>
                                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                    </svg>
                                </div>
                                <p>Efficient case documentation</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
