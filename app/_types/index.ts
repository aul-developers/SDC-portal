export interface APIResponse<T = any> {
    success: boolean;
    message: string;
    data: T;
    count?: number;
    results?: T[];
}

export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    full_name: string; // Added to match usage
    matricNumber: string;
    matric_number: string; // Added to match usage
    department?: string;
    email?: string;
    imageUrl?: string;
    status?: string; // Added to match usage
    level?: string; // Added to match mock data
}

export interface Case {
    id: number;
    caseId: string;
    title: string;
    status: string;
    dateReported: string;
    students: Student[];
    description?: string;
    // Added properties to match usage in unified-case-list.tsx
    offence_type: string;
    case_type: string;
    priority: string;
    incident_date: string;
    academic_session?: string; // e.g., "2024/2025"
}

export interface Punishment {
    id: number | string; // Changed to allow string IDs
    studentName?: string; // Made optional as mock data might use 'student' object
    student?: Student; // Added to match mock data
    case_id?: number; // Added to match mock data
    matricNumber?: string;
    offenceType?: string;
    punishmentType?: string; // Mismapped? mock uses "punishment_type"
    punishment_type?: string; // Added to match mock data
    startDate?: string;
    start_date?: string; // Added to match mock data
    endDate?: string;
    end_date?: string; // Added to match mock data
    description?: string; // Added to match mock data
    status: "Active" | "Completed" | "Pending";
}

export interface DashboardMetrics {
    totalCases: number;
    activeCases: number;
    resolvedCases: number;
    pendingHearings: number;
}
