"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Gavel, FileText, Tag, LayoutGrid } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SmartAssignDialog } from "./smart-assign-dialog";
import {
  getOffenceDetails,
  getAllCategories,
  getCategoryForOffence,
} from "./punishment-handbook";

interface CaseForPunishment {
  id: number;
  title: string;
  offence_type: string;
  description: string;
  incident_date: string;
  priority: string;
  student_id: string;
  status: string;
  students: Array<{
    full_name: string;
    matric_number: string;
    department: string;
    level: string;
  }>;
}

interface StudentGroup {
  studentId: string;
  studentName: string;
  student: any;
  cases: CaseForPunishment[];
}

export function CasesForPunishment() {
  const [allCases, setAllCases] = useState<CaseForPunishment[]>([]); // Store all raw cases before grouping
  const [groupedCases, setGroupedCases] = useState<StudentGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState("Initializing...");
  const [error, setError] = useState<string | null>(null);
  const [selectedCases, setSelectedCases] = useState<CaseForPunishment[]>([]);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = getAllCategories();

  useEffect(() => {
    fetchCasesWithoutPunishment();

    // Safety timeout
    const timer = setTimeout(() => {
      setLoading((l) => {
        if (l) {
          setError("Request timed out. Please check your connection.");
          return false;
        }
        return l;
      });
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const fetchCasesWithoutPunishment = async () => {
    setLoading(true);
    setLoadingStatus("Connecting to database...");
    setError(null);
    const supabase = createClient();

    try {
      setLoadingStatus("Checking existing punishments...");
      const { data: punishmentsData } = await supabase
        .from("punishments")
        .select("case_id, related_cases")
        .eq("status", "Active");

      const sentencedCaseIds = new Set<string>();
      punishmentsData?.forEach((p) => {
        if (p.case_id) sentencedCaseIds.add(String(p.case_id));
        if (Array.isArray(p.related_cases)) {
          p.related_cases.forEach((rc: string) =>
            sentencedCaseIds.add(String(rc)),
          );
        } else if (typeof p.related_cases === "string") {
          try {
            const parsed = JSON.parse(p.related_cases);
            if (Array.isArray(parsed))
              parsed.forEach((rc: string) => sentencedCaseIds.add(String(rc)));
          } catch (e) {
            sentencedCaseIds.add(String(p.related_cases));
          }
        }
      });

      setLoadingStatus("Fetching case records...");
      const { data: casesData, error: casesError } = await supabase
        .from("cases")
        .select(
          `
          id,
          title,
          offence_type,
          description,
          incident_date,
          priority,
          student_id,
          status
        `,
        )
        .order("incident_date", { ascending: false });

      if (casesError) throw casesError;

      if (!casesData || casesData.length === 0) {
        setGroupedCases([]);
        return;
      }

      const pendingCases = casesData.filter(
        (c) => !sentencedCaseIds.has(String(c.id)) && c.status !== "Resolved",
      );

      if (pendingCases.length === 0) {
        setGroupedCases([]);
        return;
      }

      setLoadingStatus("Loading student details...");
      const studentIds = pendingCases.map((c) => c.student_id).filter(Boolean);

      let groups: StudentGroup[] = [];

      let finalCases = pendingCases;

      if (studentIds.length > 0) {
        const { data: studentsData } = await supabase
          .from("students")
          .select("id, full_name, matric_number, department, level")
          .in("id", studentIds);

        const studentMap = new Map(studentsData?.map((s) => [s.id, s]));

        finalCases = pendingCases.map((caseItem) => ({
          ...caseItem,
          students: [
            studentMap.get(caseItem.student_id) || {
              full_name: "Unknown Student",
              matric_number: "N/A",
              department: "N/A",
              level: "N/A",
            },
          ],
        }));
      } else {
        finalCases = pendingCases.map((caseItem) => ({
          ...caseItem,
          students: [
            {
              full_name: "Unknown Student",
              matric_number: "N/A",
              department: "N/A",
              level: "N/A",
            },
          ],
        }));
      }

      setAllCases(finalCases as CaseForPunishment[]);
    } catch (err: any) {
      console.error("Error details:", err);
      setError(err.message || "Failed to load cases.");
    } finally {
      setLoading(false);
      setLoadingStatus("");
    }
  };

  // Filter and group cases whenever allCases or selectedCategory changes
  useEffect(() => {
    if (loading) return;

    let filtered = allCases;

    if (selectedCategory !== "all") {
      filtered = allCases.filter((c) => {
        const category = getCategoryForOffence(c.offence_type);
        return category?.id === selectedCategory;
      });
    }

    // Group by student
    const groupMap = new Map<string, StudentGroup>();

    filtered.forEach((c) => {
      const student = c.students[0];
      const key = String(c.student_id);

      if (!groupMap.has(key)) {
        groupMap.set(key, {
          studentId: key,
          studentName: student.full_name,
          student: student,
          cases: [],
        });
      }
      groupMap.get(key)?.cases.push(c);
    });

    setGroupedCases(Array.from(groupMap.values()));
  }, [allCases, selectedCategory, loading]);

  const handleAssignClick = (cases: CaseForPunishment[]) => {
    setSelectedCases(cases);
    setShowAssignDialog(true);
  };

  const handleAssignSuccess = () => {
    fetchCasesWithoutPunishment();
    setShowAssignDialog(false);
    setSelectedCases([]);
  };

  // Helper to get color for category
  const getCategoryColor = (offenceType: string) => {
    // We don't have direct category but we can guess or fetch details
    const details = getOffenceDetails(offenceType);
    // Determine category based on keywords if needed, or just style
    // But getOffenceDetails returns the whole offence object, we need to know its category
    // The current handbook structure returns full objects.
    // Let's settle for simple badges.
    return "bg-slate-100 text-slate-700";
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-gray-500">
          <div className="animate-pulse">
            <p>Loading cases...</p>
            <p className="text-xs text-gray-400 mt-1">{loadingStatus}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="py-8 text-center text-red-600">
          <p>{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={fetchCasesWithoutPunishment}
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (groupedCases.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-gray-500">
          <Gavel className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>No cases pending punishment assignment.</p>
          <p className="text-sm mt-2">All cases have been processed.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold">
              Pending Cases (Grouped by Student)
            </h3>
            <p className="text-sm text-gray-600">
              {groupedCases.length} student
              {groupedCases.length !== 1 ? "s" : ""} waiting for judgment
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Filter by Category:
            </span>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4">
          {groupedCases.map((group) => (
            <Card
              key={group.studentId}
              className="hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="border-b bg-gray-50/50 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {group.studentName
                        ? group.studentName.substring(0, 2).toUpperCase()
                        : "??"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-sdc-navy">
                      {group.studentName}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {group.student.matric_number} • {group.student.department}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => handleAssignClick(group.cases)}
                  className="bg-sdc-blue hover:bg-sdc-blue/90 text-white"
                >
                  <Gavel className="mr-2 h-4 w-4" />
                  Assign Punishment ({group.cases.length})
                </Button>
              </div>

              <CardContent className="p-0">
                <div className="divide-y">
                  {group.cases.map((caseItem) => {
                    const details = getOffenceDetails(caseItem.offence_type);
                    return (
                      <div
                        key={caseItem.id}
                        className="p-4 flex items-start justify-between hover:bg-gray-50 group"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            {/* Primary Category Tag */}
                            <Badge
                              variant="outline"
                              className={`font-medium ${getCategoryColor(caseItem.offence_type)}`}
                            >
                              {caseItem.offence_type}
                            </Badge>

                            {/* Handbook Status Tag (Smart) */}
                            {details ? (
                              <Badge
                                variant="secondary"
                                className="text-[10px] bg-green-50 text-green-700 border-green-200"
                              >
                                <LayoutGrid className="h-3 w-3 mr-1" />
                                Handbook Rule Found
                              </Badge>
                            ) : (
                              <Badge
                                variant="secondary"
                                className="text-[10px] bg-gray-50 text-gray-400"
                              >
                                Uncategorized
                              </Badge>
                            )}

                            <span className="text-xs text-gray-400 flex items-center">
                              <FileText className="h-3 w-3 mr-1" />
                              {new Date(
                                caseItem.incident_date,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {caseItem.title}
                          </p>
                          {details && (
                            <p className="text-xs text-gray-400 italic">
                              Ref: {details.policyReference}
                            </p>
                          )}
                        </div>
                        <Badge
                          className={
                            caseItem.priority === "High"
                              ? "bg-red-100 text-red-700 hover:bg-red-100"
                              : caseItem.priority === "Medium"
                                ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          }
                        >
                          {caseItem.priority}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <SmartAssignDialog
        open={showAssignDialog}
        onOpenChange={setShowAssignDialog}
        cases={selectedCases}
        onSuccess={handleAssignSuccess}
      />
    </>
  );
}
