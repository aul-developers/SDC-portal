import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Clock, CheckCircle, Calendar } from "lucide-react"

// Mock data for punishments (same as in punishment-status-list.tsx)
const mockPunishments = [
  {
    id: "1",
    name: "Late Homework",
    student: "Alice Smith",
    teacher: "Mr. Johnson",
    startDate: "2024-01-20",
    endDate: "2024-02-20",
    status: "completed",
  },
  {
    id: "2",
    name: "Disruptive Behavior",
    student: "Bob Williams",
    teacher: "Ms. Davis",
    startDate: "2024-02-10",
    endDate: "2024-03-10",
    status: "active",
  },
  {
    id: "3",
    name: "Incomplete Assignment",
    student: "Charlie Brown",
    teacher: "Mr. Johnson",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    status: "pending",
  },
  {
    id: "4",
    name: "Cheating",
    student: "Diana Miller",
    teacher: "Ms. Davis",
    startDate: "2024-03-15",
    endDate: "2024-04-15",
    status: "active",
  },
  {
    id: "5",
    name: "Bullying",
    student: "Eve Taylor",
    teacher: "Mr. Johnson",
    startDate: "2024-04-01",
    endDate: "2024-05-01",
    status: "completed",
  },
  {
    id: "6",
    name: "Truancy",
    student: "Frank Moore",
    teacher: "Ms. Davis",
    startDate: "2024-04-10",
    endDate: "2024-05-10",
    status: "active",
  },
  {
    id: "7",
    name: "Vandalism",
    student: "Grace Wilson",
    teacher: "Mr. Johnson",
    startDate: "2024-05-01",
    endDate: "2024-05-31",
    status: "pending",
  },
  {
    id: "8",
    name: "Theft",
    student: "Harry Anderson",
    teacher: "Ms. Davis",
    startDate: "2024-05-15",
    endDate: "2024-06-15",
    status: "active",
  },
  {
    id: "9",
    name: "Fighting",
    student: "Ivy White",
    teacher: "Mr. Johnson",
    startDate: "2024-06-01",
    endDate: "2024-07-01",
    status: "completed",
  },
  {
    id: "10",
    name: "Cyberbullying",
    student: "Jack Black",
    teacher: "Ms. Davis",
    startDate: "2024-06-10",
    endDate: "2024-07-10",
    status: "active",
  },
  {
    id: "11",
    name: "Plagiarism",
    student: "Karen Green",
    teacher: "Mr. Johnson",
    startDate: "2024-07-01",
    endDate: "2024-07-31",
    status: "pending",
  },
  {
    id: "12",
    name: "Alcohol Use",
    student: "Liam Blue",
    teacher: "Ms. Davis",
    startDate: "2024-07-15",
    endDate: "2024-08-15",
    status: "active",
  },
  {
    id: "13",
    name: "Drug Use",
    student: "Mia Red",
    teacher: "Mr. Johnson",
    startDate: "2024-08-01",
    endDate: "2024-09-01",
    status: "completed",
  },
  {
    id: "14",
    name: "Smoking",
    student: "Noah Yellow",
    teacher: "Ms. Davis",
    startDate: "2024-08-10",
    endDate: "2024-09-10",
    status: "active",
  },
  {
    id: "15",
    name: "Weapons Possession",
    student: "Olivia Purple",
    teacher: "Mr. Johnson",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    status: "pending",
  },
  {
    id: "16",
    name: "Arson",
    student: "Peter Orange",
    teacher: "Ms. Davis",
    startDate: "2024-09-15",
    endDate: "2024-10-15",
    status: "active",
  },
  {
    id: "17",
    name: "Extortion",
    student: "Quinn Gray",
    teacher: "Mr. Johnson",
    startDate: "2024-10-01",
    endDate: "2024-11-01",
    status: "completed",
  },
  {
    id: "18",
    name: "Hacking",
    student: "Ryan Silver",
    teacher: "Ms. Davis",
    startDate: "2024-10-10",
    endDate: "2024-11-10",
    status: "active",
  },
  {
    id: "19",
    name: "Identity Theft",
    student: "Sophia Gold",
    teacher: "Mr. Johnson",
    startDate: "2024-11-01",
    endDate: "2024-12-01",
    status: "pending",
  },
  {
    id: "20",
    name: "Trespassing",
    student: "Thomas Bronze",
    teacher: "Ms. Davis",
    startDate: "2024-11-15",
    endDate: "2024-12-15",
    status: "active",
  },
]

// Count punishments by status
const activePunishments = mockPunishments.filter((p) => p.status === "active").length
const pendingPunishments = mockPunishments.filter((p) => p.status === "pending").length
const completedPunishments = mockPunishments.filter((p) => p.status === "completed").length

// Count punishments ending this month
const currentDate = new Date()
const currentMonth = currentDate.getMonth()
const currentYear = currentDate.getFullYear()
const endingThisMonth = mockPunishments.filter((p) => {
  const endDate = new Date(p.endDate)
  return endDate.getMonth() === currentMonth && endDate.getFullYear() === currentYear && p.status === "active"
}).length

const metrics = [
  {
    title: "Active Punishments",
    value: activePunishments.toString(),
    description: "Currently in effect",
    icon: AlertTriangle,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    title: "Pending Punishments",
    value: pendingPunishments.toString(),
    description: "Not yet started",
    icon: Clock,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Completed Punishments",
    value: completedPunishments.toString(),
    description: "Successfully fulfilled",
    icon: CheckCircle,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Ending This Month",
    value: endingThisMonth.toString(),
    description: "Due for completion",
    icon: Calendar,
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
]

export function PunishmentMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-sdc-gray">{metric.title}</p>
                <h3 className="mt-2 text-3xl font-semibold text-sdc-navy">{metric.value}</h3>
                <p className="mt-1 text-xs text-sdc-gray">{metric.description}</p>
              </div>
              <div className={`rounded-full p-3 ${metric.bgColor}`}>
                <metric.icon className={`h-6 w-6 ${metric.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
