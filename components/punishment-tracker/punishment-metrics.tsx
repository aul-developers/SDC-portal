"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export function PunishmentMetrics() {
  const [data, setData] = useState({
    activeCases: 0,
    pendingHearings: 0,
    resolvedCases: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();

    // Subscribe to realtime changes? Optional, but good for "Tracker"
    // For now, just fetch once on mount
  }, []);

  const fetchMetrics = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // Fetch counts for each status
      // We can do this in one query if we want, or parallel queries
      // Parallel is cleaner with Supabase count

      const [active, pending, completed] = await Promise.all([
        supabase
          .from("punishments")
          .select("*", { count: "exact", head: true })
          .eq("status", "Active"),
        supabase
          .from("punishments")
          .select("*", { count: "exact", head: true })
          .eq("status", "Pending"),
        supabase
          .from("punishments")
          .select("*", { count: "exact", head: true })
          .eq("status", "Completed"),
      ]);

      setData({
        activeCases: active.count || 0,
        pendingHearings: pending.count || 0,
        resolvedCases: completed.count || 0,
      });
    } catch (error) {
      console.error("Error fetching punishment metrics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const metrics = [
    {
      title: "Active Punishments",
      value: data.activeCases.toString(),
      description: "Currently in effect",
      icon: AlertTriangle,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      title: "Pending Punishments",
      value: data.pendingHearings.toString(),
      description: "Not yet started",
      icon: Clock,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Completed Punishments",
      value: data.resolvedCases.toString(),
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
                <div className="mt-2 h-9 flex items-center">
                  {isLoading ? (
                    <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    <h3 className="text-3xl font-semibold text-sdc-navy">
                      {metric.value}
                    </h3>
                  )}
                </div>
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
