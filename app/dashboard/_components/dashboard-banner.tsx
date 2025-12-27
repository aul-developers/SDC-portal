"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Bell } from "lucide-react";
import Link from "next/link";

interface DashboardBannerProps {
  pendingCount?: number;
  nextHearing?: {
    date: string;
    time: string;
    id: string;
  } | null;
}

export function DashboardBanner({
  pendingCount = 0,
  nextHearing,
}: DashboardBannerProps) {
  const hearingDate = nextHearing
    ? new Date(nextHearing.date).toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
      })
    : "No upcoming hearings";

  const hearingTime = nextHearing?.time
    ? new Date(`1970-01-01T${nextHearing.time}`).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1: Pending Action */}
      <div className="bg-sdc-navy text-white rounded-[24px] p-6 relative overflow-hidden group transition-all hover:shadow-lg">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none transition-colors"></div>
        <div className="relative z-10">
          <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center mb-4 text-white">
            <Bell className="h-5 w-5" />
          </div>
          <h3 className="text-3xl font-bold mb-1">{pendingCount}</h3>
          <p className="text-white/70 text-sm font-medium">
            Pending Case Files
          </p>

          <Link
            href="/dashboard/cases?status=Pending"
            className="mt-6 flex items-center gap-2 text-xs font-medium text-white/50 hover:text-white transition-colors cursor-pointer w-fit"
          >
            <span>Review now</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Card 2: Next Hearing */}
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-50/50 transition-all group hover:shadow-md">
        <div className="h-10 w-10 bg-sdc-blue/10 rounded-full flex items-center justify-center mb-4 text-sdc-blue">
          <Calendar className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-bold text-sdc-navy mb-1">Next Hearing</h3>
        <p className="text-gray-400 text-sm">
          {nextHearing
            ? `${hearingDate}, ${hearingTime}`
            : "No hearings scheduled"}
        </p>

        <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex -space-x-2 opacity-50">
            {/* Creating placeholder avatars to keep design consistent but muted */}
            <Avatar className="h-6 w-6 border-2 border-white">
              <AvatarFallback className="bg-gray-100 text-[10px] text-gray-400">
                ?
              </AvatarFallback>
            </Avatar>
          </div>
          {nextHearing ? (
            <Link
              href={`/dashboard/cases/${nextHearing.id}`}
              className="text-xs font-bold text-sdc-blue hover:text-sdc-blue/80 transition-colors cursor-pointer"
            >
              View Details
            </Link>
          ) : (
            <span className="text-xs text-gray-300">No details</span>
          )}
        </div>
      </div>

      {/* Card 3: Quick Action */}
      <Link
        href="/dashboard/audit-logs"
        className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-50/50 transition-all flex flex-col justify-between group cursor-pointer hover:shadow-md"
      >
        <div>
          <div className="h-10 w-10 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-600">
            <div className="h-2 w-2 bg-current rounded-full"></div>
          </div>
          <h3 className="text-lg font-bold text-sdc-navy">System Status</h3>
          <p className="text-gray-400 text-sm mt-1">All systems operational</p>
        </div>

        <div className="w-full bg-gray-50 rounded-full h-1 mt-4 overflow-hidden">
          <div className="bg-green-500 w-full h-full rounded-full"></div>
        </div>
      </Link>
    </div>
  );
}
