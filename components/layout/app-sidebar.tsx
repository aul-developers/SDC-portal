"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Users,
  FileText,
  AlertTriangle,
  Gavel,
  LogOut,
  Menu,
  Settings,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useAuth } from "@/app/context/auth-context";

// Base routes available to everyone (filtered later)
const baseRoutes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    roles: ["super_admin", "board_member", "viewer"],
  },
  {
    label: "Audit Logs",
    icon: FileText,
    href: "/dashboard/audit-logs",
    roles: ["super_admin"],
  },
  {
    label: "Cases",
    icon: FileText,
    href: "/dashboard/cases",
    roles: ["super_admin", "board_member", "viewer"],
  },
  {
    label: "Punishments",
    icon: Gavel,
    href: "/dashboard/punishments",
    roles: ["super_admin", "board_member", "viewer"],
  },
  {
    label: "Offences",
    icon: AlertTriangle,
    href: "/dashboard/offences",
    roles: ["super_admin", "board_member", "viewer"],
  },
  {
    label: "Students",
    icon: Users,
    href: "/dashboard/students",
    roles: ["super_admin", "board_member", "viewer"],
  },
  {
    label: "User Management",
    icon: UserCog,
    href: "/dashboard/users",
    roles: ["super_admin"], // Restricted
  },
  {
    label: "Approvals",
    icon: FileText, // Using FileText or maybe CheckSquare if available, but FileText is imported
    href: "/dashboard/approvals",
    roles: ["super_admin"],
  },
];

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

export function DesktopSidebar({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 z-[40] bg-white shadow-xl border-r border-gray-100 transition-all duration-200",
        isCollapsed ? "md:w-20" : "md:w-72"
      )}
    >
      <SidebarContent
        pathname={pathname}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
    </div>
  );
}

function SidebarContent({
  pathname,
  setIsOpen,
  isCollapsed,
  setIsCollapsed,
}: {
  pathname: string;
  setIsOpen?: (open: boolean) => void;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
}) {
  const { user, logout, isLoading } = useAuth();

  // Filter routes based on user role
  // OPTIMIZATION: If loading, assume 'viewer' role to show common routes immediately.
  // Middleware protects the page, so we can be optimistic about presence of basic access.
  const effectiveRole = user?.role || (isLoading ? "viewer" : null);

  const routes = baseRoutes.filter(
    (route) => effectiveRole && route.roles.includes(effectiveRole)
  );

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Toggle Button for Desktop */}
      {setIsCollapsed && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 h-6 w-6 rounded-full border shadow-md bg-white text-gray-500 hover:text-sdc-navy z-50 hidden md:flex"
        >
          {isCollapsed ? (
            <Menu className="h-3 w-3" />
          ) : (
            <Menu className="h-3 w-3" />
          )}
        </Button>
      )}

      {/* Header */}
      <div
        className={cn(
          "h-20 flex items-center border-b border-gray-100 transition-all duration-200 ease-in-out",
          isCollapsed ? "justify-center px-0 bg-white" : "px-6"
        )}
      >
        <div
          className={cn(
            "relative transition-all duration-200 ease-in-out shrink-0",
            isCollapsed ? "w-8 h-8" : "w-10 h-10 mr-3"
          )}
        >
          <Image
            src="/logo.png"
            alt="Anchor University Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div
          className={cn(
            "overflow-hidden whitespace-nowrap transition-all duration-200 ease-in-out",
            isCollapsed
              ? "w-0 opacity-0 scale-95"
              : "w-auto opacity-100 scale-100"
          )}
        >
          <div className="flex flex-col">
            <h1 className="text-sdc-navy font-bold text-lg leading-none">
              SDC Portal
            </h1>
            <span className="text-[10px] bg-sdc-navy text-white px-1.5 py-0.5 rounded-full font-medium tracking-wide w-fit mt-1 uppercase">
              {effectiveRole ? effectiveRole.replace("_", " ") : "Viewer"}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div
        className={cn(
          "flex-1 py-6 space-y-1 overflow-y-auto overflow-x-hidden transition-all duration-200 ease-in-out",
          isCollapsed ? "px-2" : "px-4"
        )}
      >
        <div
          className={cn(
            "mb-2 px-4 overflow-hidden transition-all duration-200 ease-in-out",
            isCollapsed ? "h-0 opacity-0" : "h-auto opacity-100"
          )}
        >
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
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
                "group flex items-center text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden",
                isCollapsed
                  ? "justify-center p-3 w-10 mx-auto"
                  : "px-4 py-3 w-full",
                isActive
                  ? "bg-sdc-navy text-white shadow-md shadow-sdc-navy/20"
                  : "text-gray-500 hover:text-sdc-navy"
              )}
              title={isCollapsed ? route.label : undefined}
            >
              <div className="relative flex items-center justify-center shrink-0">
                <route.icon
                  className={cn(
                    "transition-colors duration-200",
                    isCollapsed ? "h-5 w-5" : "h-5 w-5 mr-3",
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-sdc-navy"
                  )}
                />
              </div>
              <span
                className={cn(
                  "whitespace-nowrap transition-all duration-200 ease-in-out",
                  isCollapsed
                    ? "w-0 opacity-0 translate-x-10 absolute"
                    : "w-auto opacity-100 translate-x-0 relative"
                )}
              >
                {route.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* User Profile Dropdown */}
      <div className="p-4 border-t border-gray-100 mt-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full p-0 transition-all duration-200 ease-in-out h-auto",
                isCollapsed ? "justify-center" : "justify-start"
              )}
            >
              <div className="flex items-center gap-3 px-2 py-2 w-full">
                <Avatar className="h-8 w-8 rounded-lg bg-sdc-navy text-white">
                  <AvatarImage
                    src={user?.user_metadata?.avatar_url}
                    alt={user?.user_metadata?.full_name}
                  />
                  <AvatarFallback className="rounded-lg bg-sdc-navy text-white font-medium">
                    {user?.user_metadata?.full_name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "flex flex-col items-start overflow-hidden transition-all duration-200 ease-in-out",
                    isCollapsed
                      ? "w-0 opacity-0 hidden"
                      : "w-auto opacity-100 block"
                  )}
                >
                  <p className="text-sm font-bold text-sdc-navy truncate w-[120px] text-left">
                    {user?.user_metadata?.full_name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate w-[120px] text-left">
                    {user?.email}
                  </p>
                </div>
                {!isCollapsed && (
                  <Settings className="ml-auto h-4 w-4 text-gray-400" />
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            align="end"
            forceMount
            side={isCollapsed ? "right" : "top"}
          >
            <Link href="/dashboard/profile">
              <DropdownMenuItem
                className={cn(
                  "cursor-pointer",
                  pathname.includes("/profile") && "bg-gray-100"
                )}
              >
                <Users className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>

            {user?.role !== "viewer" && (
              <Link href="/dashboard/settings">
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer",
                    pathname.includes("/settings") && "bg-gray-100"
                  )}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </Link>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 cursor-pointer"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
