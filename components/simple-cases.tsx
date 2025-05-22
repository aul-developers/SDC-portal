import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recentCases = [
  {
    id: "SDC-2024-089",
    student: {
      name: "Michael Brown",
      id: "STU-45678",
      image: "/monogram-mb.png",
    },
    offence: "Academic Dishonesty",
    date: "May 8, 2024",
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
    date: "May 7, 2024",
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
    date: "May 6, 2024",
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
    date: "May 5, 2024",
    status: "resolved",
    priority: "low",
  },
]

export function SimpleCases() {
  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="pb-3 pr-4 text-sm font-medium text-gray-500">Case ID</th>
              <th className="pb-3 px-4 text-sm font-medium text-gray-500">Student</th>
              <th className="pb-3 px-4 text-sm font-medium text-gray-500">Offence</th>
              <th className="pb-3 px-4 text-sm font-medium text-gray-500">Date</th>
              <th className="pb-3 px-4 text-sm font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {recentCases.map((caseItem) => (
              <tr key={caseItem.id} className="hover:bg-gray-50">
                <td className="py-4 pr-4 text-sm font-medium text-gray-900">{caseItem.id}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
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
                      <div className="font-medium text-gray-900">{caseItem.student.name}</div>
                      <div className="text-xs text-gray-500">{caseItem.student.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">{caseItem.offence}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{caseItem.date}</td>
                <td className="px-4 py-4">
                  <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                    {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-center">
        <button className="text-sm font-medium text-gray-900 hover:underline">View All Cases</button>
      </div>
    </div>
  )
}
