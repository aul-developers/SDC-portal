"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
// Import DataApiClient
import { DataApiClient } from "@/service/apiClient";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

// Extended interface for details
interface OffenceDetailsType {
  id: number;
  offence: string; // "name" mapped to this
  code?: string;
  description?: string;
  severity: string;
  punishment: string; // "standardPunishment"
  category?: string;
  categoryId?: string;
  precedents?: number;
  lastUpdated?: string;
  owner?: string;
  inEffect?: boolean;
  guidelines?: string[];
  factors?: string[];
  recentCases?: Array<{
    id: string;
    date: string;
    student: string;
    details: string;
    outcome: string;
  }>;
  relatedPolicies?: Array<{
    name: string;
    link: string;
  }>;
  statistics?: {
    totalCases: number;
    byOutcome: Array<{ outcome: string; count: number }>;
  };
}

// Category colors for consistency
const categoryColors: Record<string, string> = {
  academic: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  behavioral: "bg-red-100 text-red-800 hover:bg-red-200",
  residential: "bg-green-100 text-green-800 hover:bg-green-200",
  administrative: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  safety: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  technology: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
  substance: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  legal: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
};

// Severity badge colors
const severityColors: Record<string, string> = {
  minor: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  low: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  moderate: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  major: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  high: "bg-red-100 text-red-800 hover:bg-red-200",
  severe: "bg-red-100 text-red-800 hover:bg-red-200",
};

interface OffenceDetailsProps {
  offenceId: string;
}

export function OffenceDetails({ offenceId }: OffenceDetailsProps) {
  const {
    data: offence,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["offence", offenceId],
    queryFn: async () => {
      const response = await DataApiClient.get<OffenceDetailsType>(
        `/offences/${offenceId}/`,
      );
      return response.data;
    },
    enabled: !!offenceId,
  });

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 animate-pulse">
        Loading offence details...
      </div>
    );
  }

  if (error || !offence) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-lg text-red-600">
        <AlertTriangle className="h-10 w-10 mx-auto mb-2 opacity-50" />
        <p>{error ? "Failed to load offence details" : "Offence not found"}</p>
      </div>
    );
  }

  // Determine category color safely
  const catColor =
    categoryColors[offence.categoryId || "default"] || categoryColors.default;
  // Determine severity color safely
  const sevColor =
    severityColors[offence.severity?.toLowerCase()] || severityColors.moderate;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="font-mono text-xs bg-gray-50"
                >
                  {offence.code || `OFF-${offence.id}`}
                </Badge>
                {offence.inEffect !== false ? (
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                    Active
                  </Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                    Inactive
                  </Badge>
                )}
              </div>
              <CardTitle className="mt-2 text-2xl">{offence.offence}</CardTitle>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className={catColor}>
                  <BookOpen className="mr-1 h-3 w-3" />
                  {offence.category || "General"}
                </Badge>
                <Badge className={sevColor}>
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  {offence.severity} Severity
                </Badge>
              </div>
            </div>
            {/* Edit button could open a dialog if passed down or managed globally */}
            <Button className="gap-2" variant="outline">
              <FileEdit className="h-4 w-4" /> Edit Offence
            </Button>
          </CardHeader>
          <CardContent>
            <p className="mt-1 text-muted-foreground">
              {offence.description || "No description provided."}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-2">
                <Shield className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Standard Punishment</p>
                  <p className="text-sm text-muted-foreground">
                    {offence.punishment || "Not specified"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Owner</p>
                  <p className="text-sm text-muted-foreground">
                    {offence.owner || "SDC Committee"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-sm text-muted-foreground">
                    {offence.lastUpdated || "Recently"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Bookmark className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Precedent Cases</p>
                  <p className="text-sm text-muted-foreground">
                    {offence.precedents || 0} documented cases
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {offence.statistics && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                Case Distribution
              </CardTitle>
              <CardDescription>Historical case outcomes</CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-4">
                {offence.statistics.byOutcome.map(
                  (item: { outcome: string; count: number }, index: number) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <div className="font-medium text-muted-foreground">
                          {item.outcome}
                        </div>
                        <div className="font-medium">{item.count}</div>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full bg-blue-600"
                          style={{
                            width: `${(item.count / (offence.statistics?.totalCases || 1)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ),
                )}
              </div>
              <div className="mt-6 text-center text-sm text-muted-foreground">
                {offence.statistics.totalCases} total cases
              </div>
            </CardContent>
          </Card>
        )}
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
              <CardTitle className="text-lg">
                Standard Punishment Guidelines
              </CardTitle>
              <CardDescription>
                Guidelines for applying consistent sanctions based on
                circumstances and precedents
              </CardDescription>
            </CardHeader>
            <CardContent>
              {offence.guidelines && offence.guidelines.length > 0 ? (
                <ul className="space-y-4">
                  {offence.guidelines.map(
                    (guideline: string, index: number) => (
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
                    ),
                  )}
                </ul>
              ) : (
                <p className="text-muted-foreground italic">
                  No specific guidelines available.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="precedents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Case Precedents</CardTitle>
              <CardDescription>
                Anonymized examples of recent cases and their outcomes to guide
                decision-making
              </CardDescription>
            </CardHeader>
            <CardContent>
              {offence.recentCases && offence.recentCases.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Circumstances</TableHead>
                      <TableHead>Outcome</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {offence.recentCases.map(
                      (caseItem: {
                        id: string;
                        date: string;
                        details: string;
                        outcome: string;
                      }) => (
                        <TableRow key={caseItem.id}>
                          <TableCell className="font-medium">
                            {caseItem.date}
                          </TableCell>
                          <TableCell>{caseItem.details}</TableCell>
                          <TableCell>{caseItem.outcome}</TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground italic">
                  No precedent cases recorded.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="factors" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Consideration Factors</CardTitle>
              <CardDescription>
                Key factors to consider when assessing violations and
                determining appropriate sanctions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {offence.factors && offence.factors.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {offence.factors.map((factor: string, index: number) => (
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
              ) : (
                <p className="text-muted-foreground italic">
                  No specific consideration factors listed.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Related Policies</CardTitle>
              <CardDescription>
                Policies and documents related to this type of offence
              </CardDescription>
            </CardHeader>
            <CardContent>
              {offence.relatedPolicies && offence.relatedPolicies.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-3">
                  {offence.relatedPolicies.map(
                    (policy: { link: string; name: string }, index: number) => (
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
                    ),
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  No related policies linked.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
