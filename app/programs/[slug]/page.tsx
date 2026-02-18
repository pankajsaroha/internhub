import { programs } from "../ProgramData";
import { notFound } from "next/navigation";

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
        <main className="page-wrapper">
            <div className="page-container">
                <section className="page-header">
                    <h1>{program.title}</h1>
                    <p>{program.tagline}</p>
                    <p className="program-meta-inline">
                        {program.duration} · {program.level} · {program.mode}
                    </p>
                    <div className="program-actions">
                        <a href={`/apply?program=${slug}`} className="primary-btn">
                            Apply Now
                        </a>
                        <a href={`/quiz/${slug}`} className="primary-btn quiz-btn">
                            Start Quiz
                        </a>
                    </div>
                </section>

                <section className="page-section">
                    <h2>What You'll Learn</h2>
                    <ul>
                        {program.learningOutcomes.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section className="page-section">
                    <h2>Tech Stack</h2>
                    <ul>
                        {program.techStack.map((stack, i) => (
                            <li key={i}>
                                <strong>{stack.category}:</strong> {stack.items.join(", ")}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="page-section">
                    <h2>Who This Program Is For</h2>
                    <ul>
                        {program.idealFor.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section className="page-section">
                    <h2>Who This Program Is NOT For</h2>
                    <ul>
                        {program.notFor.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section className="page-section">
                    <h2>How the Program Works</h2>
                    <ol>
                        <li>Apply for the program</li>
                        <li>Get access to the project roadmap</li>
                        <li>Work on guided, real-world tasks</li>
                        <li>Receive feedback and iterate</li>
                        <li>Build strong, portfolio-ready skills</li>
                    </ol>
                </section>

                <section className="page-section">
                    <h2>FAQs</h2>
                    {program.faqs.map((faq, i) => (
                        <div key={i} className="faq">
                            <strong>{faq.q}</strong>
                            <p>{faq.a}</p>
                        </div>
                    ))}
                </section>
            </div>
        </main>
    );
}
