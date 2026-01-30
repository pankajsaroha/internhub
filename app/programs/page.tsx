import Link from "next/link";
import { programs } from "./ProgramData";

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
                {programs.map((program) => (
                    <Link
                        key={program.slug}
                        href={`/programs/${program.slug}`}
                        className="program-card"
                    >
                        <h2>{program.title}</h2>
                        <p className="tagline">{program.tagline}</p>

                        <div className="program-meta">
                            <span>{program.duration}</span>
                            <span>{program.level}</span>
                        </div>

                        <span className="view-link">View Program →</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
