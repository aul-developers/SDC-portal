"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FileText,
  AlertTriangle,
  Gavel,
  LogOut,
  Menu,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useState } from "react";

// ... existing routes ...

export function MobileSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-sdc-navy">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 w-72 bg-white border-r border-gray-100 z-[100]"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Mobile navigation sidebar
        </SheetDescription>
        <SidebarContent pathname={pathname} setIsOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  );
}

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-white shadow-xl border-r border-gray-100">
      <SidebarContent pathname={pathname} />
    </div>
  );
}

function SidebarContent({
  pathname,
  setIsOpen,
}: {
  pathname: string;
  setIsOpen?: (open: boolean) => void;
}) {
  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Clean Header - No Semi-Circle */}
      <div className="h-20 flex items-center px-6 border-b border-gray-100">
        <div className="relative w-10 h-10 mr-3">
          <Image
            src="/logo.png"
            alt="Anchor University Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div>
          <h1 className="text-sdc-navy font-bold text-lg leading-none">
            SDC Portal
          </h1>
          <span className="text-[10px] bg-sdc-navy text-white px-1.5 py-0.5 rounded-full font-medium tracking-wide">
            ADMIN
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <div className="mb-2 px-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Overview
          </p>
        </div>
        {routes.map((route) => {
          const isActive = pathname === route.href;
          return (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setIsOpen?.(false)}
              className={cn(
                "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                isActive
                  ? "bg-sdc-navy text-white shadow-md shadow-sdc-navy/20"
                  : "text-gray-500"
              )}
            >
              <route.icon
                className={cn(
                  "h-5 w-5 mr-3 transition-colors",
                  isActive ? "text-white" : "text-gray-400"
                )}
              />
              {route.label}
            </Link>
          );
        })}
      </div>

      {/* Logout / User */}
      <div className="p-4 border-t border-gray-100 mt-auto">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="h-10 w-10 rounded-full bg-gray-100 border border-white shadow-sm flex items-center justify-center text-sdc-navy font-bold">
            AD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-sdc-navy truncate">
              Admin User
            </p>
            <p className="text-xs text-gray-500 truncate">Dean's Office</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 font-medium h-10 px-4"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
