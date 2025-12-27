"use client";

import { DashboardHeader } from "./_components/dashboard-header";
import { DashboardBanner } from "./_components/dashboard-banner";
import { MetricCards } from "./_components/metric-cards";
import { RecentActivities } from "./_components/recent-activities";
import { RightPanel } from "./_components/right-panel";
import { PendingApprovals } from "./_components/pending-approvals";
import { useAuth } from "@/app/context/auth-context";

import { getDashboardMetrics } from "@/actions/dashboard";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<{
    pendingHearings: number;
    nextHearing?: any;
  }>({
    pendingHearings: 0,
    nextHearing: null,
  });

  useEffect(() => {
    async function loadMetrics() {
      const data = await getDashboardMetrics();
      setMetrics({
        pendingHearings: data.pendingHearings,
        nextHearing: data.nextHearing,
      });
    }
    loadMetrics();
  }, []);

  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 h-full">
      {/* Header Section */}
      <DashboardHeader />

      {/* Banner / Profile Card */}
      <DashboardBanner
        pendingCount={metrics.pendingHearings}
        nextHearing={metrics.nextHearing}
      />

      {/* Stats Row */}
      <div className="pt-2">
        <MetricCards />
      </div>

      {/* Bottom Section: Activity & Right Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Activity Column */}
        <div className="xl:col-span-2 space-y-8">
          {/* Pending Approvals (Super Admin Only) */}
          {user?.role === "super_admin" && <PendingApprovals />}

          {/* Recent Cases Table */}
          <div className="bg-white rounded-[30px] p-5 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-xl text-sdc-navy">Recent Cases</h3>
              <div className="flex gap-2">
                <select className="text-sm bg-gray-50 border-none rounded-lg px-3 py-1 font-medium text-gray-500 outline-none">
                  <option>This Week</option>
                </select>
              </div>
            </div>
            <RecentActivities />
          </div>
        </div>

        {/* Right Panel Column */}
        <div className="xl:col-span-1">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
