import { PROJECTS, Project } from "./registry";

/**
 * Maps UI applicant details to registry filtering criteria.
 */
export function getAssignmentCriteria(applicantType: string, experienceLevel: string, program: string) {
    const normalizedApplicantType = (applicantType || "").trim().toUpperCase();
    const normalizedExperience = (experienceLevel || "").trim();
    const normalizedProgram = (program || "").trim().toLowerCase();

    const experienceMap: Record<string, string> = {
        "No prior experience": "no-prior",
        "Basic Understanding": "basic",
        "Built Small Projects": "built-small",
        "Production level": "production"
    };

    if (normalizedApplicantType === "STUDENT") {
        return { category: "student" as const, experience: experienceMap[normalizedExperience] || "no-prior" };
    } else {
        // Professionals now support the same experience-level buckets.
        // Program is still captured in the application record for reporting.
        void normalizedProgram;
        return {
            category: "professional" as const,
            experience: experienceMap[normalizedExperience] || "basic"
        };
    }
}

/**
 * Randomly selects projects strictly by category + experience.
 * This keeps assignment aligned with the applicant's experience level.
 */
export function selectRandomProjects(
    category: "student" | "professional",
    experience: string,
    count: number = 3
): Project[] {
    const exactMatch = PROJECTS.filter(
        (p) => p.category === category && p.experience === experience
    );
    const shuffled = [...exactMatch].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
}
