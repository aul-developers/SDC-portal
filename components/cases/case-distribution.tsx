"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function CaseDistribution() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Sample data
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Academic Dishonesty", "Behavioral Misconduct", "Property Damage", "Substance Violations", "Other"],
        datasets: [
          {
            data: [38, 27, 14, 12, 9],
            backgroundColor: ["#1a56db", "#374151", "#4f46e5", "#f59e0b", "#6b7280"],
            borderColor: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.raw as number
                return `${label}: ${value}%`
              },
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="h-[300px] w-full">
      <canvas ref={chartRef} />
    </div>
  )
}
