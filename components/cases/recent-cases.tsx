"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MoreHorizontal, Eye, FileEdit, AlertTriangle } from "lucide-react"

const recentCases = [
  {
    id: "SDC-2024-089",
    student: {
      name: "Michael Brown",
      id: "STU-45678",
      image: "/monogram-mb.png",
    },
    offence: "Academic Dishonesty",
    date: "2024-05-08",
    status: "pending",
    priority: "high",
  },
  {
    id: "SDC-2024-088",
    student: {
      name: "Jessica Lee",
      id: "STU-45123",
      image: "/stylized-jl-logo.png",
    },
    offence: "Behavioral Misconduct",
    date: "2024-05-07",
    status: "scheduled",
    priority: "medium",
  },
  {
    id: "SDC-2024-087",
    student: {
      name: "David Wilson",
      id: "STU-42456",
      image: "/abstract-dw.png",
    },
    offence: "Property Damage",
    date: "2024-05-06",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: "SDC-2024-086",
    student: {
      name: "Sarah Johnson",
      id: "STU-41234",
      image: "/stylized-letters-sj.png",
    },
    offence: "Substance Violation",
    date: "2024-05-05",
    status: "resolved",
    priority: "low",
  },
]

export function RecentCases() {
  const [expandedCase, setExpandedCase] = useState<string | null>(null)

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Case ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Student</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Offence</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Priority</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {recentCases.map((caseItem) => (
              <tr
                key={caseItem.id}
                className={cn(
                  "group transition-colors hover:bg-muted/20",
                  expandedCase === caseItem.id && "bg-muted/20",
                )}
                onClick={() => setExpandedCase(expandedCase === caseItem.id ? null : caseItem.id)}
              >
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium">{caseItem.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={caseItem.student.image || "/placeholder.svg"} alt={caseItem.student.name} />
                      <AvatarFallback>
                        {caseItem.student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{caseItem.student.name}</div>
                      <div className="text-xs text-muted-foreground">{caseItem.student.id}</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{caseItem.offence}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{new Date(caseItem.date).toLocaleDateString()}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Badge
                    className={cn(
                      "px-2 py-0.5 text-xs font-normal",
                      caseItem.status === "pending" && "bg-amber-500 hover:bg-amber-600",
                      caseItem.status === "scheduled" && "bg-blue-500 hover:bg-blue-600",
                      caseItem.status === "in-progress" && "bg-indigo-500 hover:bg-indigo-600",
                      caseItem.status === "resolved" && "bg-emerald-500 hover:bg-emerald-600",
                    )}
                  >
                    {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                  </Badge>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {caseItem.priority === "high" && <AlertTriangle className="h-4 w-4 text-rose-500" />}
                    <span
                      className={cn(
                        "text-xs",
                        caseItem.priority === "high" && "text-rose-500",
                        caseItem.priority === "medium" && "text-amber-500",
                        caseItem.priority === "low" && "text-emerald-500",
                      )}
                    >
                      {caseItem.priority.charAt(0).toUpperCase() + caseItem.priority.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <FileEdit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t px-4 py-2">
        <p className="text-xs text-muted-foreground">Showing 4 of 247 cases</p>
        <Button variant="outline" size="sm" className="text-xs">
          View All Cases
        </Button>
      </div>
    </div>
  )
}
