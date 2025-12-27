"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/auth-context";
import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

export function DashboardHeader() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    );
  }, []);

  return (
    <div className="flex items-center justify-between mb-2">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-sdc-navy tracking-tight">
          {greeting || "Hello"},{" "}
          {user?.user_metadata?.full_name?.split(" ")[0] || "User"}
        </h1>
        <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
          Here's what's happening today.
        </p>
      </div>
    </div>
  );
}
