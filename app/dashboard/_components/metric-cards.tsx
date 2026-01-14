"use client";

import { AlertTriangle, Clock, CheckCheckIcon, BarChart } from "lucide-react";

interface MetricCardsProps {
  metrics: {
    totalCases: number;
    activeCases: number;
    pendingHearings: number;
    resolvedCases: number;
  };
}

export function MetricCards({ metrics }: MetricCardsProps) {
  const active = metrics.activeCases;
  const completed = metrics.resolvedCases;
  const pending = metrics.pendingHearings;
  const total = metrics.totalCases;

  const newMetrics = [
    {
      title: "Total Cases",
      value: total,
      icon: BarChart,
      iconColor: "text-sdc-navy",
      bgColor: "bg-white",
    },
    {
      title: "Active",
      value: active,
      icon: AlertTriangle,
      iconColor: "text-sdc-pink",
      bgColor: "bg-white",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock,
      iconColor: "text-sdc-warning",
      bgColor: "bg-white",
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCheckIcon,
      iconColor: "text-sdc-blue",
      bgColor: "bg-white",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
      {newMetrics.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="rounded-[24px] bg-white p-6 shadow-sm border border-gray-50/50 flex flex-col justify-between h-36"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">
                  {item.title}
                </p>
                <div className="text-4xl font-bold text-sdc-navy tracking-tight">
                  {item.value}
                </div>
              </div>
              <div
                className={`p-3 rounded-2xl ${
                  item.bgColor !== "bg-white" ? item.bgColor : "bg-gray-50"
                } flex items-center justify-center`}
              >
                <Icon className={`h-6 w-6 ${item.iconColor}`} />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-auto">
              <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
                Live Data
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
