"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { cn, postRequest } from "@/lib/utils";
import {
  BarChart3,
  FileText,
  Users,
  AlertTriangle,
  BookOpen,
  UserCog,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { Logo } from "./common/Logo";
import { UserProfile } from "./common/UserProfile";

// Update the navigation array to include the correct paths
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Case Management", href: "/dashboard/cases", icon: FileText },
  { name: "Student Records", href: "/dashboard/students", icon: Users },
  {
    name: "Punishment Tracker",
    href: "/dashboard/punishments",
    icon: AlertTriangle,
  },
  { name: "Offence Directory", href: "/dashboard/offences", icon: BookOpen },
  { name: "User Management", href: "/dashboard/users", icon: UserCog },
];

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  async function signOut() {
    const response = await postRequest("/sdc/logout/");

    if (response) {
      toast.success(response.message);
    }

    return router.push("/");
  }

  return (
    <div
      className={cn(
        "flex h-screen flex-col bg-sdc-navy transition-all duration-300 relative",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full bg-white text-sdc-navy shadow-md z-10"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo */}
      <Logo collapsed={collapsed} />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        {navigation.map((item) => {
          // Fix the isActive check to properly handle nested routes
          const isActive =
            pathname === item.href ||
            (pathname.startsWith(item.href) && item.href !== "/dashboard") ||
            (item.href === "/dashboard" && pathname === "/dashboard");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-sdc-blue text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-white",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon
                size={20}
                className={
                  isActive
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                }
              />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <UserProfile collapsed={collapsed} onSignOut={signOut} />
    </div>
  );
}
