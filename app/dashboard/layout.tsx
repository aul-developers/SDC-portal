import type React from "react";
import { DesktopSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
