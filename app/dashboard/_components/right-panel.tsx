"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Bell, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function RightPanel() {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Balance/Status Card - Updated for Anchor University (Purple/Pink/Cyan) */}
      <div className="rounded-[20px] bg-gradient-to-br from-sdc-navy to-sdc-navy-light p-6 text-white shadow-2xl shadow-sdc-navy/30 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-sdc-pink/20 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-sdc-blue/20 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none"></div>

        <div className="relative z-10">
          <p className="text-sm font-medium text-white/80 mb-1">
            Committee Status
          </p>
          <h2 className="text-3xl font-bold mb-6 tracking-wide">In Session</h2>

          <div className="space-y-3">
            <Link href="/dashboard/session-logs">
              <Button className="w-full bg-white text-sdc-navy font-bold justify-between rounded-xl h-12 shadow-lg mb-3">
                <span>View Session Logs</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard/cases">
              <Button
                variant="outline"
                className="w-full bg-white/10 border-white/20 text-white justify-between rounded-xl h-12"
              >
                <span>Submit Report</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Alerts / Payment Methods Section */}
      <div className="rounded-[20px] bg-white p-6 shadow-sm border border-sdc-gray-light flex-1">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-sdc-navy text-lg">System Alerts</h3>
          <Link href="/dashboard/alerts/create">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full bg-sdc-gray-bg"
            >
              <Plus className="h-4 w-4 text-sdc-navy" />
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {/* Alert Item 1 */}
          <Link href="/dashboard/alerts/1" className="block">
            <div className="flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer group">
              <div className="h-10 w-10 rounded-full bg-sdc-pink-dim flex items-center justify-center text-sdc-pink">
                <Bell className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sdc-navy text-sm">
                  New Appeal Request
                </p>
                <p className="text-xs text-sdc-gray">Today, 09:30 AM</p>
              </div>
              <Button size="icon" variant="ghost" className="opacity-100">
                <ChevronRight className="h-4 w-4 text-sdc-gray" />
              </Button>
            </div>
          </Link>

          {/* Alert Item 2 */}
          <Link href="/dashboard/alerts/2" className="block">
            <div className="flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer group">
              <div className="h-10 w-10 rounded-full bg-sdc-blue-dim flex items-center justify-center text-sdc-blue">
                <CreditCard className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sdc-navy text-sm">
                  Audit Completed
                </p>
                <p className="text-xs text-sdc-gray">Yesterday</p>
              </div>
              <Button size="icon" variant="ghost" className="opacity-100">
                <ChevronRight className="h-4 w-4 text-sdc-gray" />
              </Button>
            </div>
          </Link>

          {/* Alert Item 3 */}
          <Link href="/dashboard/alerts/3" className="block">
            <div className="flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer group">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <CreditCard className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sdc-navy text-sm">
                  Case Closed #204
                </p>
                <p className="text-xs text-sdc-gray">2 days ago</p>
              </div>
              <Button size="icon" variant="ghost" className="opacity-100">
                <ChevronRight className="h-4 w-4 text-sdc-gray" />
              </Button>
            </div>
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-sdc-gray-light">
          <Link href="/dashboard/notifications" className="block w-full">
            <Button
              variant="outline"
              className="w-full rounded-xl border-dashed border-2 border-sdc-gray text-sdc-gray font-medium"
            >
              View All Notifications
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
