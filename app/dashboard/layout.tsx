import type React from "react";
import { Sidebar } from "@/components/sidebar";
import { Toaster } from "sonner";
import { checkUser } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await checkUser("/status/");
  console.log(response);
  if (response.message === false) {
    return redirect("/");
  }
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar />
      <div className="flex-1 overflow-auto">{children}</div>
      <Toaster />
    </div>
  );
}
