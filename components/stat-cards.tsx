"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { FileText, AlertTriangle, Calendar, Clock, TrendingUp, TrendingDown } from "lucide-react"

const metrics = [
  {
    id: "total-cases",
    title: "Total Cases",
    value: 247,
    change: 12,
    trend: "up",
    description: "from last semester",
    icon: FileText,
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    textColor: "text-blue-600",
  },
  {
    id: "active-punishments",
    title: "Active Punishments",
    value: 32,
    change: 8,
    trend: "neutral",
    description: "ending this month",
    icon: AlertTriangle,
    color: "bg-gradient-to-br from-amber-500 to-amber-600",
    textColor: "text-amber-600",
  },
  {
    id: "cases-this-month",
    title: "Cases This Month",
    value: 18,
    change: 4,
    trend: "down",
    description: "from last month",
    icon: Calendar,
    color: "bg-gradient-to-br from-cyan-500 to-cyan-600",
    textColor: "text-cyan-600",
  },
  {
    id: "pending-review",
    title: "Pending Review",
    value: 9,
    change: 3,
    trend: "up",
    description: "high priority",
    icon: Clock,
    color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    textColor: "text-indigo-600",
  },
]

export function StatCards() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className={cn(
            "group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all duration-300",
            hoveredCard === metric.id ? "shadow-md" : "shadow-sm",
          )}
          onMouseEnter={() => setHoveredCard(metric.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">{metric.title}</p>
              <h3 className="text-3xl font-bold">{metric.value}</h3>
              <div className="flex items-center gap-1">
                {metric.trend === "up" && <TrendingUp className="h-4 w-4 text-emerald-500" />}
                {metric.trend === "down" && <TrendingDown className="h-4 w-4 text-rose-500" />}
                <span
                  className={cn(
                    "text-xs font-medium",
                    metric.trend === "up" && "text-emerald-500",
                    metric.trend === "down" && "text-rose-500",
                    metric.trend === "neutral" && "text-gray-500",
                  )}
                >
                  {metric.change} {metric.description}
                </span>
              </div>
            </div>

            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform duration-300",
                metric.color,
                hoveredCard === metric.id ? "scale-110" : "scale-100",
              )}
            >
              <metric.icon className="h-6 w-6" />
            </div>
          </div>

          <div
            className={cn(
              "absolute bottom-0 left-0 h-1 w-full transition-transform duration-300",
              metric.color,
              hoveredCard === metric.id ? "scale-x-100" : "scale-x-0",
              "origin-left",
            )}
          />
        </div>
      ))}
    </div>
  )
}
