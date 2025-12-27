export interface PunishmentPrediction {
    type: string;
    title: string;
    description: string;
    severity: "low" | "medium" | "high" | "critical";
    duration_type: string;
    duration?: number; // Estimated days
    confidence: number;
    reasoning: string;
}

export function predictPunishment(
    offenseTitle: string,
    offenseDescription: string
): PunishmentPrediction | null {
    const text = `${offenseTitle} ${offenseDescription}`.toLowerCase();

    // HEURISTIC RULES for Anchor University

    // 1. Examination Malpractice
    if (text.includes("exam") || text.includes("cheat") || text.includes("malpractice") || text.includes("copy")) {
        return {
            type: "suspension",
            title: "Suspension for Examination Malpractice",
            description: "Student used unauthorized materials during an examination. Zero in the course + 1 semester suspension.",
            severity: "high",
            duration_type: "semesters",
            confidence: 0.92,
            reasoning: "Detected keywords related to examination integrity. University policy mandates suspension for first-time offenders."
        };
    }

    // 2. Theft / Stealing
    if (text.includes("steal") || text.includes("theft") || text.includes("stole") || text.includes("rob")) {
        return {
            type: "suspension",
            title: "Suspension for Theft",
            description: "Student was found guilty of theft. Requires restitution and suspension.",
            severity: "high",
            duration_type: "semesters",
            confidence: 0.88,
            reasoning: "Theft is a major misconduct. Standard procedure involves restitution and suspension."
        };
    }

    // 3. Fighting / Assault
    if (text.includes("fight") || text.includes("assault") || text.includes("beat") || text.includes("hit")) {
        return {
            type: "suspension",
            title: "Indefinite Suspension for Physical Assault",
            description: "Physical altercation causing harm. Immediate suspension pending review.",
            severity: "critical",
            duration_type: "permanent",
            confidence: 0.95,
            reasoning: "Physical violence is zero-tolerance. Detected 'fight'/'assault' keywords."
        };
    }

    // 4. Cultism
    if (text.includes("cult") || text.includes("fraternity") || text.includes("initiation")) {
        return {
            type: "expulsion",
            title: "Expulsion for Cultism",
            description: "Involvement in cult activities. Immediate expulsion.",
            severity: "critical",
            duration_type: "permanent",
            confidence: 0.99,
            reasoning: "Cultism attracts the highest penalty (Expulsion) under university regulations."
        };
    }

    // 5. Dress Code / Indecent Dressing
    if (text.includes("dress") || text.includes("indecent") || text.includes("cloth")) {
        return {
            type: "written_warning",
            title: "Warning for Indecent Dressing",
            description: "Violation of university dress code.",
            severity: "low",
            duration_type: "days",
            confidence: 0.85,
            reasoning: "Minor misconduct. Usually warrants a warning or counseling."
        };
    }

    // 6. Default Fallback (General Misconduct)
    if (text.length > 10) {
        return {
            type: "community_service",
            title: "Community Service for Misconduct",
            description: "General misconduct requiring correction.",
            severity: "medium",
            duration_type: "weeks",
            confidence: 0.60,
            reasoning: "General misconduct detected but no specific category matched. Suggesting community service."
        };
    }

    return null;
}
