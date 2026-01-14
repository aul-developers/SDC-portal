"use server";

import { createClient } from "@/utils/supabase/server";

export async function getStudentProfile(matricNumber: string) {
    const supabase = createClient();
    try {
        const { data: student, error } = await supabase
            .from("students")
            .select("*")
            .eq("matric_number", matricNumber)
            .single();

        if (error) {
            return null;
        }

        const { data: cases, error: casesError } = await supabase
            .from("cases")
            .select("*")
            .eq("student_id", student.id)
            .order("created_at", { ascending: false });

        if (casesError) {
            return { student, cases: [] };
        }

        return { student, cases };
    } catch (error: any) {
        return null;
    }
}
