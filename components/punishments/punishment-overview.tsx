"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export function PunishmentOverview() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Sample data
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Warning",
          "Probation",
          "Suspension",
          "Community Service",
          "Expulsion",
        ],
        datasets: [
          {
            label: "Current Semester",
            data: [45, 28, 12, 18, 5],
            backgroundColor: "#6366f1",
            borderColor: "#6366f1",
            borderWidth: 1,
            borderRadius: 4,
          },
          {
            label: "Previous Semester",
            data: [38, 32, 15, 10, 8],
            backgroundColor: "#e5e7eb",
            borderColor: "#d1d5db",
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
            align: "end",
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: 12,
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="h-[300px] w-full">
      <canvas ref={chartRef} />
    </div>
  );
}
