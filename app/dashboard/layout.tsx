"use client";
import type React from "react";
import { DesktopSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { checkUser } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        // For demo purposes, we are bypassing the strict server-side check if we have the local cookie.
        if (document.cookie.includes("auth_token=valid")) {
          return;
        }

        const response = await checkUser("/status/");
        if (response.message === false) {
          // return router.push("/"); // Temporarily disabled for UI demo
          console.log("Auth check failed but redirect disabled for demo");
        }
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="h-full relative font-sans bg-sdc-slate-bg min-h-screen">
      {/* Desktop Sidebar - Fixed */}
      <DesktopSidebar />

      {/* Main Content Area */}
      <main className="md:pl-72 h-full flex flex-col">
        <Header />
        <div
          id="dashboard-content"
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8"
        >
          {children}
        </div>
      </main>
      <Toaster />
    </div>
  );
}
