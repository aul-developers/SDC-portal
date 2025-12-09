
import { Case, Punishment, Student, DashboardMetrics } from "@/app/_types";

export const MOCK_STUDENTS: Student[] = [
    {
        id: "1",
        matric_number: "SCI/2021/001",
        matricNumber: "SCI/2021/001",
        full_name: "John Doe",
        firstName: "John",
        lastName: "Doe",
        department: "Computer Science",
        level: "300",
    },
    {
        id: "2",
        matric_number: "ENG/2022/045",
        matricNumber: "ENG/2022/045",
        full_name: "Jane Smith",
        firstName: "Jane",
        lastName: "Smith",
        department: "Electrical Engineering",
        level: "200",
    },
    {
        id: "3",
        matric_number: "SOC/2020/112",
        matricNumber: "SOC/2020/112",
        full_name: "Michael Brown",
        firstName: "Michael",
        lastName: "Brown",
        department: "Sociology",
        level: "400",
    },
];

export const MOCK_CASES: Case[] = [
    {
        id: 101,
        caseId: "CASE-101",
        title: "Exam Malpractice",
        description: "Caught with unauthorized materials during GST 101 exam.",
        incident_date: "2024-05-10",
        dateReported: "2024-05-11", // Added
        priority: "High",
        status: "Pending",
        case_type: "Individual",
        offence_type: "Examination",
        students: [MOCK_STUDENTS[0]],
        // reported_by: "Dr. A. Supervisor",
        // created_at: "2024-05-11T10:00:00Z",
    },
    {
        id: 102,
        caseId: "CASE-102",
        title: "Noise Disturbance",
        description: "Playing loud music in hostel after curfew.",
        incident_date: "2024-05-12",
        dateReported: "2024-05-13",
        priority: "Low",
        status: "Resolved",
        case_type: "Grouped",
        offence_type: "Hostel",
        students: [MOCK_STUDENTS[1], MOCK_STUDENTS[2]],
        // reported_by: "Hostel Porter",
        // created_at: "2024-05-13T09:30:00Z",
    },
    {
        id: 103,
        caseId: "CASE-103",
        title: "Fighting",
        description: "Physical altercation at the cafeteria.",
        incident_date: "2024-05-14",
        dateReported: "2024-05-14",
        priority: "medium",
        status: "Active",
        case_type: "Individual",
        offence_type: "Behavioral",
        students: [MOCK_STUDENTS[2]],
        // reported_by: "Security Unit",
        // created_at: "2024-05-14T14:15:00Z",
    },
];

export const MOCK_PUNISHMENTS: Punishment[] = [
    {
        id: "PUN-001",
        student: MOCK_STUDENTS[0],
        case_id: 101,
        punishment_type: "Suspension",
        start_date: "2024-06-01",
        end_date: "2024-06-14",
        status: "Active",
        description: "Two weeks suspension from academic activities.",
    },
    {
        id: "PUN-002",
        student: MOCK_STUDENTS[1],
        case_id: 102,
        punishment_type: "Warning Letter",
        start_date: "2024-05-15",
        end_date: "2024-05-15",
        status: "Completed",
        description: "Official warning letter issued.",
    },
    {
        id: "PUN-003",
        student: MOCK_STUDENTS[2],
        case_id: 103,
        punishment_type: "Community Service",
        start_date: "2024-05-20",
        end_date: "2024-05-27",
        status: "Pending",
        description: "20 hours of community service at the library.",
    },
];

export const MOCK_METRICS: DashboardMetrics = {
    activeCases: 5,
    resolvedCases: 12,
    pendingHearings: 3,
    totalCases: 20,
};
