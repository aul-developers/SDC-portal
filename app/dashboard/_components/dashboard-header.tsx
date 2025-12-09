"use client";

import { Button } from "@/components/ui/button";
import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

export function DashboardHeader() {
  const [currentDate, setCurrentDate] = useState("");

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
          Good Morning, Admin
        </h1>
        <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
          Here's what's happening today.
        </p>
      </div>
    </div>
  );
}
