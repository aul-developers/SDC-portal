
// Common Types
export interface Student {
    id: string;
    matric_number: string;
    full_name: string;
    department?: string;
    level?: string;
}

export interface APIResponse<T> {
    message: string;
    status: number;
    data: T;
}

// Case Management Types
export interface Case {
    id: number;
    title: string;
    description?: string;
    incident_date: string;
    priority: "High" | "medium" | "Low";
    status: string;
    case_type: "Individual" | "Grouped";
    offence_type: string;
    students: Student[];
    reported_by?: string;
    documents?: string[];
    created_at?: string;
    updated_at?: string;
}


// Punishment Types
export interface Punishment {
    id: string;
    student: Student;
    case_id: number;
    punishment_type: string;
    start_date: string;
    end_date: string;
    status: "Active" | "Completed" | "Pending";
    description?: string;
}

export interface DashboardMetrics {
    active: number;
    completed: number;
    pending: number;
    total: number;
}
