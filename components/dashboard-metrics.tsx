"use client"

import { useState } from "react"
import { AlertTriangle, Calendar, Clock, FileText, TrendingDown, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const metrics = [
  {
    id: "total-cases",
    title: "Total Cases",
    value: 247,
    change: 12,
    trend: "up",
    description: "from last semester",
    icon: FileText,
    color: "bg-sdc-primary",
  },
  {
    id: "active-punishments",
    title: "Active Punishments",
    value: 32,
    change: 8,
    trend: "neutral",
    description: "ending this month",
    icon: AlertTriangle,
    color: "bg-sdc-warning",
  },
  {
    id: "cases-this-month",
    title: "Cases This Month",
    value: 18,
    change: 4,
    trend: "down",
    description: "from last month",
    icon: Calendar,
    color: "bg-sdc-secondary",
  },
  {
    id: "pending-review",
    title: "Pending Review",
    value: 9,
    change: 3,
    trend: "up",
    description: "high priority",
    icon: Clock,
    color: "bg-sdc-accent",
  },
]

export function DashboardMetrics() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className={cn(
            "group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all duration-300",
            hoveredCard === metric.id ? "shadow-md" : "shadow-sm",
            hoveredCard !== null && hoveredCard !== metric.id ? "opacity-90" : "opacity-100",
          )}
          onMouseEnter={() => setHoveredCard(metric.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div
            className={cn(
              "absolute left-0 top-0 h-full w-1.5 transition-all duration-300",
              metric.color,
              hoveredCard === metric.id ? "opacity-100" : "opacity-80",
            )}
          />

          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{metric.title}</p>
              <h3 className="mt-2 text-3xl font-bold text-gray-800">{metric.value}</h3>
              <div className="mt-2 flex items-center gap-1">
                {metric.trend === "up" && <TrendingUp className="h-4 w-4 text-sdc-success" />}
                {metric.trend === "down" && <TrendingDown className="h-4 w-4 text-sdc-danger" />}
                <span
                  className={cn(
                    "text-xs font-medium",
                    metric.trend === "up" && "text-sdc-success",
                    metric.trend === "down" && "text-sdc-danger",
                    metric.trend === "neutral" && "text-gray-500",
                  )}
                >
                  {metric.change} {metric.description}
                </span>
              </div>
            </div>
            <div
              className={cn(
                "rounded-full p-3 transition-all duration-300",
                `${metric.color.replace("bg-", "bg-")}/10`,
                hoveredCard === metric.id ? "scale-110" : "scale-100",
              )}
            >
              <metric.icon
                className={cn("h-5 w-5 transition-all duration-300", metric.color.replace("bg-", "text-"))}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
