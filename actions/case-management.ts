"use server";

import { createClient } from "@supabase/supabase-js";
import { logAuditAction } from "@/actions/audit";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);

interface StudentData {
    full_name: string;
    matric_number: string;
    department?: string;
    faculty?: string;
    level?: string;
    email?: string;
    phone?: string;
}

interface CaseData {
    title: string;
    description: string;
    offence_type: string;
    incident_date: string;
    incident_time: string;
    location: string;
    priority: string;
    reported_by: string;
    reporter_mail: string;
    reporters_phone: string;
    status: string;
    academic_session: string; // e.g., "2025/2026"
}

export async function createCase(caseData: CaseData, studentData: StudentData) {
    try {
        let studentId: string | undefined;

        const { data: existingStudent, error: fetchError } = await supabase
            .from("students")
            .select("id")
            .eq("matric_number", studentData.matric_number)
            .maybeSingle();

        if (fetchError) {
            return { success: false, error: fetchError.message };
        }

        if (existingStudent) {
            studentId = existingStudent.id;
        } else {
            const { data: newStudent, error: createError } = await supabase
                .from("students")
                .insert({
                    full_name: studentData.full_name,
                    matric_number: studentData.matric_number,
                    department: studentData.department,
                    faculty: studentData.faculty,
                    level: studentData.level,
                })
                .select("id")
                .single();

            if (createError) {
                return { success: false, error: createError.message };
            }
            studentId = newStudent.id;

            await logAuditAction("STUDENT_CREATED", { studentId, matric: studentData.matric_number });
        }

        const { data, error } = await supabase
            .from("cases")
            .insert({
                ...caseData,
                student_id: studentId,
            })
            .select()
            .single();

        if (error) {
            return { success: false, error: error.message };
        }

        await logAuditAction("CASE_CREATED", { caseId: data.id, title: caseData.title, studentId });

        return { success: true, message: "Case created successfully", data };
    } catch (error: any) {
        return { success: false, error: error.message || "Unknown error" };
    }
}
