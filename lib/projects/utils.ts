import { PROJECTS, Project } from "./registry";

/**
 * Maps UI applicant details to registry filtering criteria.
 */
export function getAssignmentCriteria(applicantType: string, experienceLevel: string, program: string) {
    if (applicantType === "STUDENT") {
        const experienceMap: Record<string, string> = {
            "No prior experience": "no-prior",
            "Basic Understanding": "basic",
            "Built Small Projects": "built-small",
            "Production level": "production"
        };
        return { category: "student" as const, experience: experienceMap[experienceLevel] || "no-prior" };
    } else {
        // Professional: Map program to experience key as they are specialized
        const programMap: Record<string, string> = {
            "backend": "backend",
            "java": "backend",
            "python": "backend",
            "go": "backend",
            "frontend": "frontend",
            "fullstack": "fullstack"
        };
        return { category: "professional" as const, experience: programMap[program] || "fullstack" };
    }
}

/**
 * Randomly selects 2-3 projects matching the criteria.
 */
export function selectRandomProjects(category: "student" | "professional", experience: string, count: number = 2): Project[] {
    const filtered = PROJECTS.filter(p => p.category === category && p.experience === experience);

    if (filtered.length === 0) {
        // Fallback to fullstack professional if specialized track is empty
        if (category === "professional") {
            return PROJECTS.filter(p => p.category === "professional" && p.experience === "fullstack").slice(0, count);
        }
        return [];
    }

    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
}
