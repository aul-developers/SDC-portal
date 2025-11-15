"use client";
import type React from "react";
import { Sidebar } from "@/components/sidebar";
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
        const response = await checkUser("/status/");
        if (response.message === false) {
          return router.push("/");
        }
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar />
      <div className="flex-1 overflow-auto">{children}</div>
      <Toaster />
    </div>
  );
}
