"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserAvatar } from "@/components/common/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileSidebar } from "./app-sidebar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/app/context/auth-context";

export function Header() {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    );
  }, []);

  useEffect(() => {
    const scrollContainer = document.getElementById("dashboard-content");

    const handleScroll = () => {
      const containerScroll = scrollContainer?.scrollTop || 0;
      const windowScroll = window.scrollY;
      setIsScrolled(containerScroll > 10 || windowScroll > 10);
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 md:px-8 py-5 sticky top-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <div className="hidden md:block">
          <h2 className="text-2xl font-bold text-sdc-navy tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-sm text-gray-500">
            Welcome back, {user?.user_metadata?.full_name || "User"}
          </p>
        </div>
        <h2 className="text-xl font-bold text-sdc-navy md:hidden tracking-tight">
          SDC Portal
        </h2>
      </div>

      <div className="flex items-center gap-x-3 ml-auto">
        <Link href="/dashboard/notifications">
          <Button
            size="icon"
            variant="ghost"
            className="relative text-gray-400 rounded-xl"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
          </Button>
        </Link>

        <div className="hidden md:flex items-center px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100 text-sm font-medium text-sdc-navy">
          <span>{date}</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full p-0"
            >
              <UserAvatar
                name={user?.user_metadata?.full_name || "User"}
                avatarUrl={user?.user_metadata?.avatar_url}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.user_metadata?.full_name || "User"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/profile"
                className="cursor-pointer font-medium"
              >
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/settings"
                className="cursor-pointer font-medium"
              >
                Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/"
                className="cursor-pointer text-red-600 font-medium focus:text-red-600"
              >
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
