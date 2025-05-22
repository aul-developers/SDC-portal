import { Card, CardContent } from "@/components/ui/card"
import { MetricCards } from "@/components/metric-cards"
import { RecentActivities } from "@/components/recent-activities"
import { QuickActions } from "@/components/quick-actions"

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-8 p-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-sdc-navy">Dashboard</h1>
          <p className="mt-1 text-sm text-sdc-gray">
            Welcome back, Dr. Johnson. Here's an overview of the disciplinary committee.
          </p>
        </div>

        {/* Metrics */}
        <MetricCards />

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Recent Activities */}
          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-sdc-navy">Recent Activities</h2>
              <RecentActivities />
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-sdc-navy">Quick Actions</h2>
              <QuickActions />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
