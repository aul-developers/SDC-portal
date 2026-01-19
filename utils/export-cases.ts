import { Case, Student } from "@/app/_types";

interface ExportCase {
    id: number | string;
    title: string;
    status: string;
    offence_type: string;
    priority: string;
    incident_date: string;
    academic_session?: string;
    description?: string;
    students?: Student[];
}

// Export cases to CSV format
export function exportToCSV(cases: ExportCase[], filename?: string): void {
    if (cases.length === 0) {
        alert("No cases to export");
        return;
    }

    // Define CSV headers
    const headers = [
        "Case ID",
        "Title",
        "Status",
        "Offence Type",
        "Priority",
        "Incident Date",
        "Academic Session",
        "Student Name",
        "Matric Number",
        "Description",
    ];

    // Convert cases to CSV rows
    const rows = cases.map((caseItem) => {
        const studentName = caseItem.students?.[0]?.full_name || "N/A";
        const matricNumber = caseItem.students?.[0]?.matric_number || caseItem.students?.[0]?.matricNumber || "N/A";

        return [
            caseItem.id,
            `"${(caseItem.title || "").replace(/"/g, '""')}"`,
            caseItem.status,
            caseItem.offence_type,
            caseItem.priority,
            caseItem.incident_date,
            caseItem.academic_session || "N/A",
            `"${studentName.replace(/"/g, '""')}"`,
            matricNumber,
            `"${(caseItem.description || "").replace(/"/g, '""')}"`,
        ].join(",");
    });

    // Combine headers and rows
    const csvContent = [headers.join(","), ...rows].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const defaultFilename = `sdc_cases_export_${dateStr}.csv`;

    link.setAttribute("href", url);
    link.setAttribute("download", filename || defaultFilename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Generate formatted text report (for copy/print)
export function generateTextReport(cases: ExportCase[]): string {
    if (cases.length === 0) {
        return "No cases to report.";
    }

    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    let report = `
STUDENT DISCIPLINE COMMITTEE
CASE REPORT
Generated: ${dateStr}
Total Cases: ${cases.length}
${"=".repeat(60)}

`;

    cases.forEach((caseItem, index) => {
        const studentName = caseItem.students?.[0]?.full_name || "N/A";
        const matricNumber = caseItem.students?.[0]?.matric_number || caseItem.students?.[0]?.matricNumber || "N/A";

        report += `
Case ${index + 1}: #${caseItem.id}
${"-".repeat(40)}
Title: ${caseItem.title}
Status: ${caseItem.status}
Offence Type: ${caseItem.offence_type}
Priority: ${caseItem.priority}
Incident Date: ${caseItem.incident_date}
Academic Session: ${caseItem.academic_session || "N/A"}
Student: ${studentName} (${matricNumber})
Description: ${caseItem.description || "No description"}

`;
    });

    return report;
}

// Filter cases by academic session
export function filterByAcademicSession(
    cases: ExportCase[],
    session: string
): ExportCase[] {
    if (!session || session === "all") {
        return cases;
    }
    return cases.filter((c) => c.academic_session === session);
}
