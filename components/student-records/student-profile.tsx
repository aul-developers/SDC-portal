"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Building,
  AlertTriangle,
  FileText,
  Download,
} from "lucide-react";
import { getStudentProfile } from "@/actions/student-management";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StudentProfileProps {
  matricNumber: string;
}

export function StudentProfile({ matricNumber }: StudentProfileProps) {
  const [profile, setProfile] = useState<any>(null);
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const result = await getStudentProfile(matricNumber);
      if (result.error) {
        setError(result.error);
        toast.error("Failed to load student profile");
      } else {
        setProfile(result.student);
        setCases(result.cases || []);
      }
      setLoading(false);
    }
    loadData();
  }, [matricNumber]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="text-center p-12 text-gray-500">Student not found.</div>
    );
  }

  // Determine Status
  const activeCases = cases.filter(
    (c) => c.status !== "Closed" && c.status !== "Resolved"
  );
  const hasActiveRecord = activeCases.length > 0;
  const currentSanction = hasActiveRecord ? activeCases[0].title : null; // Simplified logic

  return (
    <div className="space-y-6">
      {/* Student Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-border">
            <AvatarImage
              src={"/profile-placeholder.png"} // Default placeholder
              alt={profile.full_name}
            />
            <AvatarFallback className="text-xl">
              {profile.full_name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold text-sdc-navy">
                {profile.full_name}
              </h2>
              <Badge variant="outline" className="ml-2">
                {profile.matric_number}
              </Badge>
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-sdc-gray">
              <GraduationCap className="h-4 w-4" />
              <span>
                {profile.department || "No Department"},{" "}
                {profile.level || "N/A"}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-sdc-gray">
              <Building className="h-4 w-4" />
              <span>{profile.faculty || "No Faculty"}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 md:items-end">
          <div className="flex items-center gap-2">
            <Badge
              className={
                hasActiveRecord
                  ? "bg-amber-500 hover:bg-amber-600"
                  : "bg-emerald-500 hover:bg-emerald-600"
              }
            >
              {hasActiveRecord ? "Active Record" : "Clear Record"}
            </Badge>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export Profile
          </Button>
        </div>
      </div>

      <Separator />

      {/* Student Details Tabs */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="academic">Academic Record</TabsTrigger>
          <TabsTrigger value="disciplinary">Disciplinary Status</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-sdc-gray" />
                  <div>
                    <p className="text-sm text-sdc-gray">Email Address</p>
                    <p className="font-medium text-sdc-navy">
                      {profile.email || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-sdc-gray" />
                  <div>
                    <p className="text-sm text-sdc-gray">Phone Number</p>
                    <p className="font-medium text-sdc-navy">
                      {profile.phone || "N/A"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Personal Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-sdc-gray" />
                    <div>
                      <p className="text-sm text-sdc-gray">Enrollment Date</p>
                      <p className="font-medium text-sdc-navy">
                        {profile.created_at
                          ? new Date(profile.created_at).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Academic Record Tab */}
        <TabsContent value="academic" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Summary</CardTitle>
              <CardDescription>
                Overview of academic performance and achievements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center py-8 text-gray-500">
              <p>Academic records integration is currently unavailable.</p>
              <p className="text-sm">
                Please check the University Portal for full transcripts.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Disciplinary Status Tab */}
        <TabsContent value="disciplinary" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Disciplinary Status</CardTitle>
              <CardDescription>
                Current disciplinary standing and active sanctions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div
                  className={`rounded-lg p-4 text-center ${
                    hasActiveRecord
                      ? "bg-amber-50 text-amber-700"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  <p className="text-sm font-medium">Record Status</p>
                  <p className="mt-1 text-xl font-bold">
                    {hasActiveRecord ? "Active Record" : "Clear Record"}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-sm font-medium text-gray-700">
                    Total Cases
                  </p>
                  <p className="mt-1 text-xl font-bold text-gray-700">
                    {cases.length}
                  </p>
                </div>
              </div>

              {hasActiveRecord && currentSanction && (
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium text-sdc-navy">
                    Active Disciplinary Measure
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-500" />
                      <div>
                        <p className="font-medium text-sdc-navy">
                          {currentSanction}
                        </p>
                        <p className="text-sm text-sdc-gray">
                          See case details for more info.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {cases.length > 0 && (
                <div className="rounded-md border mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Case Title</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cases.map((c: any) => (
                        <TableRow key={c.id}>
                          <TableCell>
                            {c.incident_date ||
                              new Date(c.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{c.title}</TableCell>
                          <TableCell>{c.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              <div className="flex justify-center mt-4">
                {/* Could link to full case history view */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
