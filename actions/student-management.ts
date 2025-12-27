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
            console.error("Error fetching student:", error);
            return { error: error.message };
        }

        // Fetch related cases to determine disciplinary status
        const { data: cases, error: casesError } = await supabase
            .from("cases")
            .select("*")
            .eq("student_id", student.id)
            .order("created_at", { ascending: false });

        if (casesError) {
            console.error("Error fetching cases:", casesError);
            // Don't fail the whole profile if cases fail
            return { student, cases: [] };
        }

        return { student, cases };
    } catch (error: any) {
        console.error("Error getting student profile:", error);
        return { error: error.message };
    }
}
