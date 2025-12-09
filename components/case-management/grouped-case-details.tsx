"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  FileText,
  User,
  BookOpen,
  AlertTriangle,
  Users,
  Gavel,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFetch } from "@/hooks/useFetch";
import { caseFormSchema, involvedStudentSchema } from "./create-case-form";

// Mock grouped case details data

interface GroupedCaseDetailsProps {
  groupedCaseId: number;
}

export function GroupedCaseDetails({ groupedCaseId }: GroupedCaseDetailsProps) {
  const { data } = useFetch<caseFormSchema>(
    `/get/specific/case/${groupedCaseId}/`
  );
  const caseDetails: caseFormSchema | null = Array.isArray(data)
    ? data[0]
    : data;
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0">
        <div className="flex items-start space-x-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sdc-blue/10">
            <Users className="h-8 w-8 text-sdc-blue" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold text-sdc-navy">
                {caseDetails?.title}
              </h2>
              <Badge
                className={cn(
                  "px-2 py-1",
                  caseDetails?.priority === "High" && "bg-red-500 text-white",
                  caseDetails?.priority === "Medium" &&
                    "bg-amber-500 text-white",
                  caseDetails?.priority === "Low" && "bg-green-500 text-white"
                )}
              >
                {caseDetails?.priority && caseDetails.priority.length > 0
                  ? caseDetails.priority.charAt(0).toUpperCase() +
                    caseDetails.priority.slice(1)
                  : "Unknown"}{" "}
                Priority Priority
              </Badge>
            </div>
            <p className="mt-1 text-sm text-sdc-gray max-w-2xl">
              {caseDetails?.description}
            </p>
            <div className="mt-2 flex items-center space-x-2 text-sm text-sdc-gray">
              <Users className="h-4 w-4" />
              <span>{caseDetails?.students?.length} students involved</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-sdc-gray">Case ID:</span>
            <span className="font-semibold text-sdc-navy">
              {caseDetails?.id}
            </span>
          </div>
        </div>
      </div>

      <Separator />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          {/* <TabsTrigger value="hearings">Hearings</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger> */}
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  Offence Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <BookOpen className="mt-0.5 h-5 w-5 text-sdc-blue" />
                  <div>
                    <p className="font-medium text-sdc-navy">
                      {caseDetails?.offence_type}
                    </p>
                    <p className="text-sm text-sdc-gray">
                      {caseDetails?.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-sdc-gray" />
                  <div>
                    <p className="text-sm text-sdc-gray">Incident Date</p>
                    <p className="font-medium text-sdc-navy">
                      {new Date(
                        caseDetails?.incident_date as string
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-sdc-gray" />
                  <div>
                    <p className="text-sm text-sdc-gray">Reported By</p>
                    <p className="font-medium text-sdc-navy">
                      {caseDetails?.reported_by}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-medium">
                                    Disciplinary Action
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {caseDetails.punishment ? (
                                    <>
                                        <div className="flex items-start space-x-3">
                                            <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-500" />
                                            <div>
                                                <p className="font-medium text-sdc-navy">
                                                    {
                                                        caseDetails.punishment
                                                            .type
                                                    }
                                                </p>
                                                <p className="text-sm text-sdc-gray">
                                                    Duration:{" "}
                                                    {
                                                        caseDetails.punishment
                                                            .duration
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Calendar className="h-5 w-5 text-sdc-gray" />
                                            <div>
                                                <p className="text-sm text-sdc-gray">
                                                    Effective Period
                                                </p>
                                                <p className="font-medium text-sdc-navy">
                                                    {new Date(
                                                        caseDetails.punishment.startDate
                                                    ).toLocaleDateString()}{" "}
                                                    -{" "}
                                                    {new Date(
                                                        caseDetails.punishment.endDate
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <FileText className="mt-0.5 h-5 w-5 text-sdc-gray" />
                                            <div>
                                                <p className="text-sm text-sdc-gray">
                                                    Additional Requirements
                                                </p>
                                                <p className="font-medium text-sdc-navy">
                                                    {
                                                        caseDetails.punishment
                                                            .additionalRequirements
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-sm text-sdc-gray">
                                        No disciplinary action assigned yet.
                                    </p>
                                )}
                            </CardContent>
                        </Card> */}
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Students Involved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.isArray(caseDetails?.students) &&
                  caseDetails.students.map((student, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 rounded-lg border p-3"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={"/placeholder.svg"}
                          alt={student.full_name || "Student Avatar"}
                        />
                        <AvatarFallback>
                          {(student.full_name || "Student")
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {student.full_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {student.matric_number}
                        </p>
                        {/* <Badge variant="outline" className="mt-1 text-xs">
                {student.email}
              </Badge> */}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
              <CardDescription>
                Detailed information about all students involved in this case.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Array.isArray(caseDetails?.students) &&
                  caseDetails.students.map((student, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage
                            src={"/placeholder.svg"}
                            alt={student.full_name || "Student Avatar"}
                          />
                          <AvatarFallback>
                            {(student.full_name || "Student")
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-sdc-navy">
                                {student.full_name}
                              </h3>
                              <p className="text-sm text-sdc-gray">
                                {student.matric_number}
                              </p>
                            </div>
                            {/* <Badge variant="outline">{student.role}</Badge> */}
                          </div>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <p className="text-sm font-medium text-sdc-gray">
                                Department
                              </p>
                              <p className="font-medium text-sdc-navy">
                                {student.department}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-sdc-gray">
                                Faculty
                              </p>
                              <p className="font-medium text-sdc-navy">
                                {student.faculty}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-sdc-gray">
                                Level
                              </p>
                              <p className="font-medium text-sdc-navy">
                                {student.level}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-sdc-gray">
                                Email
                              </p>
                              <p className="font-medium text-sdc-navy">
                                {student.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* <TabsContent value="hearings">
                    <Card>
                        <CardHeader>
                            <CardTitle>Group Hearings</CardTitle>
                            <CardDescription>
                                Records of all hearings related to this grouped
                                case.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {caseDetails.hearings.length === 0 ? (
                                <p className="text-center text-sdc-gray">
                                    No hearings scheduled yet.
                                </p>
                            ) : (
                                <div className="space-y-6">
                                    {caseDetails.hearings.map(
                                        (hearing, index) => (
                                            <div
                                                key={index}
                                                className="rounded-lg border p-4"
                                            >
                                                <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-start sm:space-y-0">
                                                    <div>
                                                        <div className="flex items-center space-x-2">
                                                            <h3 className="font-medium text-sdc-navy">
                                                                Group Hearing #
                                                                {index + 1}
                                                            </h3>
                                                            <Badge>
                                                                {hearing.status}
                                                            </Badge>
                                                        </div>
                                                        <div className="mt-2 flex items-center space-x-4">
                                                            <div className="flex items-center space-x-1">
                                                                <Calendar className="h-4 w-4 text-sdc-gray" />
                                                                <span className="text-sm text-sdc-gray">
                                                                    {
                                                                        hearing.date
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <Clock className="h-4 w-4 text-sdc-gray" />
                                                                <span className="text-sm text-sdc-gray">
                                                                    {
                                                                        hearing.time
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <p className="mt-1 text-sm text-sdc-gray">
                                                            Location:{" "}
                                                            {hearing.location}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="shrink-0"
                                                    >
                                                        View Minutes
                                                    </Button>
                                                </div>
                                                <Separator className="my-4" />
                                                <div className="space-y-4">
                                                    <div>
                                                        <p className="text-sm font-medium text-sdc-gray">
                                                            Attendees
                                                        </p>
                                                        <div className="mt-1 flex flex-wrap gap-2">
                                                            {hearing.attendees.map(
                                                                (
                                                                    attendee,
                                                                    i
                                                                ) => (
                                                                    <Badge
                                                                        key={i}
                                                                        variant="outline"
                                                                    >
                                                                        {
                                                                            attendee
                                                                        }
                                                                    </Badge>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-sdc-gray">
                                                            Notes
                                                        </p>
                                                        <p className="mt-1 text-sm text-sdc-navy">
                                                            {hearing.notes}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="documents">
                    <Card>
                        <CardHeader>
                            <CardTitle>Case Documents</CardTitle>
                            <CardDescription>
                                All documents related to this grouped
                                disciplinary case.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {caseDetails.documents.map(
                                    (document, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between rounded-lg border p-3"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded bg-sdc-blue/10 text-sdc-blue">
                                                    <FileText className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sdc-navy">
                                                        {document.name}
                                                    </p>
                                                    <div className="flex items-center space-x-2 text-xs text-sdc-gray">
                                                        <span>
                                                            {document.type}
                                                        </span>
                                                        <span>•</span>
                                                        <span>
                                                            Uploaded by{" "}
                                                            {
                                                                document.uploadedBy
                                                            }
                                                        </span>
                                                        <span>•</span>
                                                        <span>
                                                            {new Date(
                                                                document.uploadDate
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                Download
                                            </Button>
                                        </div>
                                    )
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="timeline">
                    <Card>
                        <CardHeader>
                            <CardTitle>Case Timeline</CardTitle>
                            <CardDescription>
                                Chronological history of all events related to
                                this grouped case.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="relative space-y-6 pl-6 pt-2">
                                <div className="absolute bottom-0 left-2.5 top-0 w-px bg-border" />
                                {caseDetails.timeline.map((event, index) => (
                                    <div key={index} className="relative">
                                        <div className="absolute -left-6 flex h-5 w-5 items-center justify-center rounded-full border border-background bg-sdc-blue">
                                            <div className="h-2 w-2 rounded-full bg-white" />
                                        </div>
                                        <div className="rounded-lg border p-4">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-medium text-sdc-navy">
                                                    {event.action}
                                                </h3>
                                                <div className="flex items-center space-x-1 text-xs text-sdc-gray">
                                                    <Calendar className="h-3.5 w-3.5" />{" "}
                                                    <span>{event.date}</span>{" "}
                                                    <span>•</span>
                                                    <Clock className="h-3.5 w-3.5" />{" "}
                                                    <span>{event.time}</span>
                                                </div>
                                            </div>
                                            <p className="mt-1 text-sm text-sdc-gray">
                                                {event.description}
                                            </p>
                                            <p className="mt-2 text-xs text-sdc-gray">
                                                By: {event.user}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent> */}
      </Tabs>

      {/* <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline">Edit Case</Button>
                {caseDetails.status !== "Resolved" && (
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                        <Gavel className="mr-2 h-4 w-4" /> Pass Group Judgment
                    </Button>
                )}
                <Button className="bg-sdc-blue hover:bg-sdc-blue/90 text-white">
                    Update Status
                </Button>
            </div> */}
    </div>
  );
}
