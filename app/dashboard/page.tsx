import { DashboardHeader } from "./_components/dashboard-header";
import { DashboardBanner } from "./_components/dashboard-banner";
import { MetricCards } from "./_components/metric-cards";
import { RecentActivities } from "./_components/recent-activities";
import { RightPanel } from "./_components/right-panel";
import { PendingApprovals } from "./_components/pending-approvals";
import { createClient } from "@/utils/supabase/server";
import {
  getDashboardMetrics,
  getRecentActivities,
  getPendingApprovals,
} from "@/actions/dashboard";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Parallel data fetching
  const [metrics, activities, approvals] = await Promise.all([
    getDashboardMetrics(),
    getRecentActivities(),
    getPendingApprovals(),
  ]);

  const user = session?.user;
  const role = user?.user_metadata?.role || "viewer";
  const isSuperAdmin =
    role === "super_admin" ||
    user?.email === "softdevelopers@aul.edu.ng" ||
    user?.email === "softdeveloper@aul.edu.ng";

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
        <MetricCards metrics={metrics} />
      </div>

      {/* Bottom Section: Activity & Right Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Activity Column */}
        <div className="xl:col-span-2 space-y-8">
          {/* Pending Approvals (Super Admin Only) */}
          {isSuperAdmin && <PendingApprovals initialApprovals={approvals} />}

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
            <RecentActivities activities={activities} />
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
