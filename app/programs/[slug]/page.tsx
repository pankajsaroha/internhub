import { programs } from "../ProgramData";
import { notFound } from "next/navigation";
import { getApplyLink } from "../getApplyLink";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function ProgramDetailPage({ params }: Props) {
    const { slug } = await params;
    const program = programs.find((p) => p.slug === slug);

    if (!program) {
        return notFound();
    }

    return (
        <>
            {/* ================= FULL-WIDTH HERO ================= */}
            <header className="program-hero">
                <div className="program-hero-content">
                    <h1>{program.title}</h1>
                    <p className="subtitle">{program.tagline}</p>

                    <div className="meta">
                        <span>🕒 {program.duration}</span>
                        <span>🎯 {program.level}</span>
                        <span>💻 {program.mode}</span>
                    </div>

                    <div className="program-highlights">
                        <span>Project-based learning</span>
                        <span>Hands-on tasks</span>
                        <span>Feedback-driven</span>
                        <span>No placement promises</span>
                    </div>

                    <a href={`/apply?program=${slug}`} className="primary-btn">
                        Apply Now
                    </a>
                </div>
            </header>

            {/* ================= CONSTRAINED CONTENT ================= */}
            <section className="page-container">
                <div className="program-layout">
                    <div className="program-content">
                        {/* WHAT YOU'LL LEARN */}
                        <section className="program-section">
                            <h2>What You’ll Learn</h2>
                            <ul>
                                {program.learningOutcomes.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        {/* TECH STACK */}
                        <section className="program-section">
                            <h2>Tech Stack</h2>

                            <div className="tech-stack">
                                {program.techStack.map((stack, i) => (
                                    <div key={i} className="tech-row">
                                        <span className="tech-label">{stack.category}</span>
                                        <span className="tech-items">
                                            {stack.items.join(", ")}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* WHO IT'S FOR */}
                        <section className="program-section">
                            <h2>Who This Program Is For</h2>
                            <ul>
                                {program.idealFor.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        {/* WHO IT'S NOT FOR */}
                        <section className="program-section">
                            <h2>Who This Program Is NOT For</h2>
                            <ul>
                                {program.notFor.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        {/* HOW IT WORKS */}
                        <section className="program-section">
                            <h2>How the Program Works</h2>
                            <ol>
                                <li>Apply for the program</li>
                                <li>Get access to the project roadmap</li>
                                <li>Work on guided, real-world tasks</li>
                                <li>Receive feedback and iterate</li>
                                <li>Build strong, portfolio-ready skills</li>
                            </ol>
                        </section>

                        {/* FAQ */}
                        <section className="program-section">
                            <h2>FAQs</h2>
                            {program.faqs.map((faq, i) => (
                                <div key={i} className="faq">
                                    <strong>{faq.q}</strong>
                                    <p>{faq.a}</p>
                                </div>
                            ))}
                        </section>
                    </div>

                    {/* ================= CTA ================= */}
                    <footer className="program-cta">
                        <h2>Ready to build real projects?</h2>
                        <p>Apply now and start learning by doing.</p>

                        <a href={`/apply?program=${slug}`} className="primary-btn">
                            Apply Now
                        </a>
                    </footer>

                    {/* ================= STICKY APPLY ================= */}
                    <div className="sticky-apply">
                        <span>{program.title}</span>
                        <a href={`/apply?program=${slug}`} className="primary-btn">
                            Apply Now
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
