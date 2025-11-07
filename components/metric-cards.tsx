import { Card, CardContent } from "@/components/ui/card";
import { getDashboardMetrics } from "@/lib/utils";
import {
  FileText,
  AlertTriangle,
  Calendar,
  Clock,
  CheckCheckIcon,
} from "lucide-react";

const metrics = [
  {
    title: "Total Cases",
    value: "247",
    description: "+12% from last semester",
    icon: FileText,
    iconColor: "text-sdc-blue",
    bgColor: "bg-sdc-blue/10",
  },
  {
    title: "Active Punishments",
    value: "32",
    description: "8 ending this month",
    icon: AlertTriangle,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    title: "Cases This Month",
    value: "18",
    description: "-4% from last month",
    icon: Calendar,
    iconColor: "text-sdc-teal",
    bgColor: "bg-sdc-teal/10",
  },
  {
    title: "Pending Review",
    value: "9",
    description: "3 high priority",
    icon: Clock,
    iconColor: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
];

export async function MetricCards() {
  const response = await getDashboardMetrics("/punishment/dashboard/");
  console.log(response);

  const newMetrics = [
    {
      title: "Active Punshiments",
      value: response.active,
      icon: AlertTriangle,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Completed Punshiments",
      value: response.completed,
      icon: CheckCheckIcon,
      iconColor: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Pending Punshiments",
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
