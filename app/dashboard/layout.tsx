"use client";
import type React from "react";
import { DesktopSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";
import { Toaster } from "sonner";
import { useState } from "react";

import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-full relative font-sans bg-sdc-slate-bg min-h-screen">
      {/* Desktop Sidebar - Fixed */}
      <DesktopSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content Area */}
      <main
        className={`transition-all duration-300 h-full flex flex-col ${
          isCollapsed ? "md:pl-20" : "md:pl-72"
        }`}
      >
        <Header />
        <div
          id="dashboard-content"
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8"
        >
          {children}
        </div>
      </main>
    </div>
  );
}
