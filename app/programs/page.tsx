import Link from "next/link";
import { programs } from "./ProgramData";

const programCardStyle: Record<string, { accent: string; tag: string }> = {
    "frontend-development": {
        accent: "program-card-blue",
        tag: "Frontend",
    },
    "backend-development": {
        accent: "program-card-indigo",
        tag: "Backend",
    },
    "full-stack-development": {
        accent: "program-card-green",
        tag: "Full Stack",
    },
    "java-programming": {
        accent: "program-card-purple",
        tag: "Java",
    },
    "python-programming": {
        accent: "program-card-emerald",
        tag: "Python",
    },
    "go-programming": {
        accent: "program-card-sky",
        tag: "Go",
    },
};

function renderProgramIcon(slug: string) {
    switch (slug) {
        case "frontend-development":
            return (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="14" rx="2" stroke="#3b82f6" strokeWidth="2" />
                    <path d="M3 8h18" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="6" cy="6" r="1" fill="#3b82f6" />
                    <circle cx="9" cy="6" r="1" fill="#3b82f6" />
                </svg>
            );
        case "backend-development":
            return (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="3" width="16" height="6" rx="2" stroke="#6366f1" strokeWidth="2" />
                    <rect x="4" y="10" width="16" height="6" rx="2" stroke="#6366f1" strokeWidth="2" />
                    <circle cx="8" cy="6" r="1" fill="#6366f1" />
                    <circle cx="8" cy="13" r="1" fill="#6366f1" />
                </svg>
            );
        case "full-stack-development":
            return (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3l8 4-8 4-8-4 8-4z" stroke="#22c55e" strokeWidth="2" />
                    <path d="M4 11l8 4 8-4" stroke="#22c55e" strokeWidth="2" />
                    <path d="M4 15l8 4 8-4" stroke="#22c55e" strokeWidth="2" />
                </svg>
            );
        case "java-programming":
            return (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M8 17h6a3 3 0 003-3V7H5v7a3 3 0 003 3z" stroke="#a855f7" strokeWidth="2" />
                    <path d="M17 9h1a2 2 0 010 4h-1" stroke="#a855f7" strokeWidth="2" />
                    <path
                        d="M9 3s2 1 2 3-2 2-2 4"
                        stroke="#a855f7"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            );
        case "python-programming":
            return (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3c4 0 4 2 4 4H8c0-2 0-4 4-4z" stroke="#10b981" strokeWidth="2" />
                    <path d="M12 21c-4 0-4-2-4-4h8c0 2 0 4-4 4z" stroke="#10b981" strokeWidth="2" />
                    <circle cx="10" cy="6" r="1" fill="#10b981" />
                    <circle cx="14" cy="18" r="1" fill="#10b981" />
                </svg>
            );
        case "go-programming":
            return (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12h10l-3-3" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
                    <path d="M14 12l-3 3" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="18" cy="12" r="2" stroke="#0ea5e9" strokeWidth="2" />
                </svg>
            );
        default:
            return null;
    }
}

export default function ProgramsPage() {
    return (
        <section className="page-container programs-page">
            <header className="programs-header">
                <h1>Our Programs</h1>
                <p>
                    Carefully designed, project-based programs to help you build real
                    skills and strong portfolios.
                </p>
            </header>

            <div className="programs-grid">
                {programs.map((program) => {
                    const style = programCardStyle[program.slug];
                    return (
                        <Link
                            key={program.slug}
                            href={`/programs/${program.slug}`}
                            className={`program-card ${style?.accent ?? ""}`}
                        >
                            <div className="program-icon-wrap">
                                {renderProgramIcon(program.slug)}
                            </div>
                            <span className="program-tag-pill">{style?.tag ?? "Program"}</span>

                            <h2>{program.title}</h2>
                            <p className="tagline">{program.tagline}</p>

                            <div className="program-meta">
                                <span>{program.duration}</span>
                                <span>{program.level}</span>
                            </div>

                            <span className="view-link">View Program →</span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
