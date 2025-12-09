import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Clock, CheckCircle, Calendar } from "lucide-react";

// Mock data for punishments (same as in punishment-status-list.tsx)

import { DashboardMetrics } from "@/app/_types";
import { MOCK_METRICS } from "@/app/dashboard/_data/mock-data";

// Mock data for punishments (same as in punishment-status-list.tsx)

export function PunishmentMetrics() {
  // Count punishments ending this month

  const data = MOCK_METRICS;
  const isLoading = false;

  // const currentDate = new Date();
  // const currentMonth = currentDate.getMonth();
  // const currentYear = currentDate.getFullYear();
  // const endingThisMonth = mockPunishments.filter((p) => {
  //     const endDate = new Date(p.endDate);
  //     return (
  //         endDate.getMonth() === currentMonth &&
  //         endDate.getFullYear() === currentYear &&
  //         p.status === "active"
  //     );
  // }).length;

  const metrics = [
    {
      title: "Active Punishments",
      value: data?.activeCases.toString(),
      description: "Currently in effect",
      icon: AlertTriangle,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      title: "Pending Punishments",
      value: data?.pendingHearings.toString(),
      description: "Not yet started",
      icon: Clock,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Completed Punishments",
      value: data?.resolvedCases.toString(),
      description: "Successfully fulfilled",
      icon: CheckCircle,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-sdc-gray">
                  {metric.title}
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-sdc-navy">
                  {isLoading ? "Loading value...." : metric.value}
                </h3>
                <p className="mt-1 text-xs text-sdc-gray">
                  {metric.description}
                </p>
              </div>
              <div className={`rounded-full p-3 ${metric.bgColor}`}>
                <metric.icon className={`h-6 w-6 ${metric.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
