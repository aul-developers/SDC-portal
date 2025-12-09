"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Bell } from "lucide-react";

export function DashboardBanner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1: Pending Action */}
      <div className="bg-sdc-navy text-white rounded-[24px] p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none transition-colors"></div>
        <div className="relative z-10">
          <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center mb-4 text-white">
            <Bell className="h-5 w-5" />
          </div>
          <h3 className="text-3xl font-bold mb-1">3</h3>
          <p className="text-white/70 text-sm font-medium">
            Pending Case Files
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs font-medium text-white/50 cursor-pointer">
            <span>Review now</span>
            <span>&rarr;</span>
          </div>
        </div>
      </div>

      {/* Card 2: Next Hearing */}
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-50/50 transition-all group">
        <div className="h-10 w-10 bg-sdc-blue/10 rounded-full flex items-center justify-center mb-4 text-sdc-blue">
          <Calendar className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-bold text-sdc-navy mb-1">Next Hearing</h3>
        <p className="text-gray-400 text-sm">Tomorrow, 10:00 AM</p>

        <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex -space-x-2">
            <Avatar className="h-6 w-6 border-2 border-white">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-gray-200 text-[10px] text-gray-500">
                JD
              </AvatarFallback>
            </Avatar>
            <Avatar className="h-6 w-6 border-2 border-white">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-gray-200 text-[10px] text-gray-500">
                MK
              </AvatarFallback>
            </Avatar>
          </div>
          <span className="text-xs font-bold text-sdc-blue cursor-pointer">
            View Details
          </span>
        </div>
      </div>

      {/* Card 3: Quick Action */}
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-50/50 transition-all flex flex-col justify-between group cursor-pointer">
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
      </div>
    </div>
  );
}
