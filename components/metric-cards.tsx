import { Card, CardContent } from "@/components/ui/card";
import { getDashboardMetrics } from "@/lib/utils";
import {
  FileText,
  AlertTriangle,
  Calendar,
  Clock,
  CheckCheckIcon,
} from "lucide-react";

export async function MetricCards() {
  const response = await getDashboardMetrics("/punishment/dashboard/");
  console.log(response);

  const newMetrics = [
    {
      title: "Active Punishments",
      value: response.active,
      icon: AlertTriangle,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Completed Punishments",
      value: response.completed,
      icon: CheckCheckIcon,
      iconColor: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Pending Punishments",
      value: response.pending,
      icon: Clock,
      iconColor: "text-rose-500",
      bgColor: "bg-rose-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {newMetrics.map((metric, index) => (
        <Card
          key={index}
          className="shadow-card hover:shadow-card-hover transition-shadow"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-sdc-gray">
                  {metric.title}
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-sdc-navy">
                  {metric.value}
                </h3>
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
