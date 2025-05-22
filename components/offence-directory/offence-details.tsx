"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileEdit,
  AlertTriangle,
  FileText,
  Clock,
  Users,
  Shield,
  BookOpen,
  LinkIcon,
  Calendar,
  Bookmark,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

// Mock data for offence details with standardized format
const offenceDetailsData = {
  a1: {
    id: "a1",
    code: "ACA-001",
    name: "Plagiarism",
    description:
      "Using another's work without proper attribution or citation, presenting someone else's ideas, words, or creative products as one's own.",
    category: "Academic Integrity",
    categoryId: "academic",
    severity: "major",
    standardPunishment: "Academic probation, Grade reduction",
    precedents: 24,
    lastUpdated: "2023-12-15",
    owner: "Academic Affairs Committee",
    inEffect: true,
    guidelines: [
      "First offense: Zero on assignment, educational program on academic integrity",
      "Second offense: Failure in course, academic probation",
      "Third offense: Suspension or expulsion consideration",
    ],
    factors: [
      "Extent of plagiarism (minor citation errors vs. wholesale copying)",
      "Student's academic level (first-year vs. graduate student)",
      "Intent (accidental vs. deliberate)",
      "Prior offenses",
    ],
    recentCases: [
      {
        id: "case123",
        date: "2023-04-15",
        student: "Anonymous",
        details: "Undergraduate student submitted a paper with 40% unattributed content",
        outcome: "Zero on assignment, academic probation for 1 semester",
      },
      {
        id: "case124",
        date: "2023-03-22",
        student: "Anonymous",
        details: "Graduate student plagiarized significant portions of research proposal",
        outcome: "Course failure, academic probation for 2 semesters",
      },
      {
        id: "case125",
        date: "2023-02-10",
        student: "Anonymous",
        details: "First-year student with minor citation errors",
        outcome: "Warning, resubmission allowed with grade penalty",
      },
    ],
    relatedPolicies: [
      {
        name: "Academic Integrity Policy",
        link: "#",
      },
      {
        name: "Student Code of Conduct",
        link: "#",
      },
      {
        name: "Graduate Student Handbook",
        link: "#",
      },
    ],
    statistics: {
      totalCases: 24,
      byYear: [
        { year: 2020, count: 5 },
        { year: 2021, count: 7 },
        { year: 2022, count: 8 },
        { year: 2023, count: 4 },
      ],
      byOutcome: [
        { outcome: "Warning", count: 3 },
        { outcome: "Zero on Assignment", count: 12 },
        { outcome: "Course Failure", count: 7 },
        { outcome: "Suspension", count: 2 },
      ],
      byDepartment: [
        { department: "Computer Science", count: 8 },
        { department: "Business", count: 6 },
        { department: "Engineering", count: 5 },
        { department: "Arts & Humanities", count: 3 },
        { department: "Other", count: 2 },
      ],
    },
  },
  b2: {
    id: "b2",
    code: "BEH-002",
    name: "Harassment",
    description:
      "Unwelcome conduct based on protected characteristics including but not limited to race, color, religion, sex, national origin, disability, or sexual orientation.",
    category: "Behavioral Misconduct",
    categoryId: "behavioral",
    severity: "severe",
    standardPunishment: "Suspension, Mandatory counseling",
    precedents: 14,
    lastUpdated: "2024-01-10",
    owner: "Student Conduct Office",
    inEffect: true,
    guidelines: [
      "First offense: Disciplinary probation, mandatory education program, no-contact order if applicable",
      "Second offense: Suspension, mandatory counseling",
      "Third offense: Expulsion consideration",
    ],
    factors: [
      "Nature and severity of the conduct",
      "Impact on the affected individual(s)",
      "Prior behavioral issues",
      "Willingness to acknowledge harm and take responsibility",
    ],
    recentCases: [
      {
        id: "case223",
        date: "2023-05-12",
        student: "Anonymous",
        details: "Student engaged in persistent unwanted contact with another student",
        outcome: "Disciplinary probation for 1 year, no-contact order",
      },
      {
        id: "case224",
        date: "2023-04-03",
        student: "Anonymous",
        details: "Student made repeated discriminatory comments in class setting",
        outcome: "Suspension for 1 semester, mandatory diversity training",
      },
      {
        id: "case225",
        date: "2023-02-28",
        student: "Anonymous",
        details: "Student created hostile environment in residence hall",
        outcome: "Relocation to different housing, disciplinary probation",
      },
    ],
    relatedPolicies: [
      {
        name: "Anti-Harassment Policy",
        link: "#",
      },
      {
        name: "Student Code of Conduct",
        link: "#",
      },
      {
        name: "Title IX Policy",
        link: "#",
      },
    ],
    statistics: {
      totalCases: 14,
      byYear: [
        { year: 2020, count: 3 },
        { year: 2021, count: 4 },
        { year: 2022, count: 5 },
        { year: 2023, count: 2 },
      ],
      byOutcome: [
        { outcome: "Disciplinary Probation", count: 6 },
        { outcome: "Suspension", count: 5 },
        { outcome: "Expulsion", count: 1 },
        { outcome: "Other", count: 2 },
      ],
      byDepartment: [
        { department: "Residence Life", count: 6 },
        { department: "Various Academic", count: 5 },
        { department: "Campus Activities", count: 2 },
        { department: "Other", count: 1 },
      ],
    },
  },
}

// Category colors for consistency
const categoryColors = {
  academic: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  behavioral: "bg-red-100 text-red-800 hover:bg-red-200",
  residential: "bg-green-100 text-green-800 hover:bg-green-200",
  administrative: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  safety: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  technology: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
  substance: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  legal: "bg-gray-100 text-gray-800 hover:bg-gray-200",
}

// Severity badge colors
const severityColors = {
  minor: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  moderate: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  major: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  severe: "bg-red-100 text-red-800 hover:bg-red-200",
}

interface OffenceDetailsProps {
  offenceId: string
}

export function OffenceDetails({ offenceId }: OffenceDetailsProps) {
  // For a real application, you would fetch the offence details based on the ID
  // For this example, we'll use mock data
  const offence = offenceDetailsData[offenceId as keyof typeof offenceDetailsData] || offenceDetailsData.a1 // Fallback to a default if not found

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-xs bg-gray-50">
                  {offence.code}
                </Badge>
                {offence.inEffect ? (
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">Active</Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Inactive</Badge>
                )}
              </div>
              <CardTitle className="mt-2 text-2xl">{offence.name}</CardTitle>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge
                  variant="secondary"
                  className={categoryColors[offence.categoryId as keyof typeof categoryColors]}
                >
                  <BookOpen className="mr-1 h-3 w-3" />
                  {offence.category}
                </Badge>
                <Badge className={severityColors[offence.severity as keyof typeof severityColors]}>
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  {offence.severity.charAt(0).toUpperCase() + offence.severity.slice(1)} Severity
                </Badge>
              </div>
            </div>
            <Button className="gap-2">
              <FileEdit className="h-4 w-4" /> Edit Offence
            </Button>
          </CardHeader>
          <CardContent>
            <p className="mt-1 text-muted-foreground">{offence.description}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-2">
                <Shield className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Standard Punishment</p>
                  <p className="text-sm text-muted-foreground">{offence.standardPunishment}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Owner</p>
                  <p className="text-sm text-muted-foreground">{offence.owner}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-sm text-muted-foreground">{offence.lastUpdated}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Bookmark className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Precedent Cases</p>
                  <p className="text-sm text-muted-foreground">{offence.precedents} documented cases</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Case Distribution</CardTitle>
            <CardDescription>Historical case outcomes</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-4">
              {offence.statistics.byOutcome.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-medium text-muted-foreground">{item.outcome}</div>
                    <div className="font-medium">{item.count}</div>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full bg-blue-600"
                      style={{
                        width: `${(item.count / offence.statistics.totalCases) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              {offence.statistics.totalCases} total cases
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="guidelines" className="w-full">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="guidelines" className="flex items-center gap-2">
            <Shield className="h-4 w-4" /> Guidelines
          </TabsTrigger>
          <TabsTrigger value="precedents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Precedents
          </TabsTrigger>
          <TabsTrigger value="factors" className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> Factors
          </TabsTrigger>
          <TabsTrigger value="policies" className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4" /> Policies
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guidelines" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Standard Punishment Guidelines</CardTitle>
              <CardDescription>
                Guidelines for applying consistent sanctions based on circumstances and precedents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {offence.guidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div
                      className={cn(
                        "mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-white",
                        index === 0 && "bg-blue-500",
                        index === 1 && "bg-yellow-500",
                        index === 2 && "bg-red-500",
                      )}
                    >
                      {index + 1}
                    </div>
                    <span className="flex-1">{guideline}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="precedents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Case Precedents</CardTitle>
              <CardDescription>
                Anonymized examples of recent cases and their outcomes to guide decision-making
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Circumstances</TableHead>
                    <TableHead>Outcome</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {offence.recentCases.map((caseItem) => (
                    <TableRow key={caseItem.id}>
                      <TableCell className="font-medium">{caseItem.date}</TableCell>
                      <TableCell>{caseItem.details}</TableCell>
                      <TableCell>{caseItem.outcome}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="factors" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Consideration Factors</CardTitle>
              <CardDescription>
                Key factors to consider when assessing violations and determining appropriate sanctions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {offence.factors.map((factor, index) => (
                  <Card key={index} className="border-dashed bg-gray-50">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-100 text-blue-600">
                        {index + 1}
                      </div>
                      <div className="text-sm">{factor}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Related Policies</CardTitle>
              <CardDescription>Policies and documents related to this type of offence</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {offence.relatedPolicies.map((policy, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <a
                        href={policy.link}
                        className="flex items-center justify-between gap-2 p-4 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">{policy.name}</span>
                        </div>
                        <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
