"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function CasesByCategory() {
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
            backgroundColor: ["#2563eb", "#0891b2", "#4f46e5", "#d97706", "#94a3b8"],
            borderColor: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              padding: 15,
              font: {
                size: 11,
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
    <div className="h-[250px] w-full">
      <canvas ref={chartRef} />
    </div>
  )
}
