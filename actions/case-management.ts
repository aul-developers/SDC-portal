"use server";

import { createClient } from "@supabase/supabase-js";

// Initialize Service Role Client
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
}

// ... imports
import { logAuditAction } from "@/actions/audit";

export async function createCase(caseData: CaseData, studentData: StudentData) {
    try {
        // ... (existing student logic) ...
        // 1. Handle Student (Find or Create)
        let studentId: string | undefined;

        // Check if student exists
        const { data: existingStudent, error: fetchError } = await supabase
            .from("students")
            .select("id")
            .eq("matric_number", studentData.matric_number)
            .maybeSingle();

        if (fetchError) {
            console.error("Error finding student:", fetchError);
            throw new Error("Failed to verify student existence: " + fetchError.message);
        }

        if (existingStudent) {
            studentId = existingStudent.id;
        } else {
            // Create new student
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
                console.error("Error creating student:", createError);
                throw new Error("Failed to create student record: " + createError.message);
            }
            studentId = newStudent.id;

            // Log Student Creation
            await logAuditAction("STUDENT_CREATED", { studentId, matric: studentData.matric_number });
        }

        // 2. Create Case linked to student
        const { data, error } = await supabase
            .from("cases")
            .insert({
                ...caseData,
                student_id: studentId,
            })
            .select()
            .single();

        if (error) {
            console.error("Error creating case:", error);
            throw new Error("Failed to create case: " + error.message);
        }

        // Log Case Creation
        await logAuditAction("CASE_CREATED", { caseId: data.id, title: caseData.title, studentId });

        return { success: true, message: "Case created successfully", data };
    } catch (error: any) {
        console.error("Server Action createCase Error:", error);
        return { success: false, message: error.message };
    }
}
