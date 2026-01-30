import Link from "next/link";

export default function HowItWorksPage() {
    return (
        <section className="page-container">
            {/* ================= HEADER ================= */}
            <header className="how-header">
                <h1>How InternHub Works</h1>
                <p>
                    InternHub is a project-based learning platform focused on real skills,
                    practical experience, and honest outcomes.
                </p>
            </header>

            {/* ================= STEPS ================= */}
            <div className="how-content">
                <section className="how-step">
                    <h2>1. Choose a Program</h2>
                    <p>
                        Browse our programs based on your interests and current skill level.
                        Each program clearly outlines what you’ll learn, the tools involved,
                        and who the program is designed for.
                    </p>

                    <Link href="/programs" className="text-link">
                        Browse Programs →
                    </Link>
                </section>

                <section className="how-step">
                    <h2>2. Apply for the Program</h2>
                    <p>
                        When you apply, you’ll fill out a short application form. We ask about
                        your background, learning goals, and availability so we can assess
                        whether the program is a good fit for you.
                    </p>
                </section>

                <section className="how-step">
                    <h2>3. Application Review</h2>
                    <p>
                        Every application is reviewed manually. This helps us maintain
                        quality, set the right expectations, and ensure meaningful feedback
                        later in the program.
                    </p>

                    <p className="muted">
                        You’ll receive an email update after your application is reviewed.
                    </p>
                </section>

                <section className="how-step">
                    <h2>4. Work on Assigned Tasks</h2>
                    <p>
                        If accepted, you’ll receive structured tasks with clear problem
                        statements, expected outcomes, and submission guidelines.
                    </p>

                    <ul>
                        <li>Hands-on, real-world inspired tasks</li>
                        <li>Focused on problem-solving and implementation</li>
                        <li>No spoon-feeding or shortcut learning</li>
                    </ul>
                </section>

                <section className="how-step">
                    <h2>5. Feedback & Iteration</h2>
                    <p>
                        Your work is reviewed and feedback is provided. You’re encouraged to
                        improve, iterate, and think like a practitioner rather than just a
                        learner.
                    </p>
                </section>

                <section className="how-step">
                    <h2>6. Program Completion</h2>
                    <p>
                        Completion is not automatic. A program is considered complete only
                        when assigned tasks are submitted and meet expected quality
                        standards.
                    </p>
                </section>

                <section className="how-step">
                    <h2>7. Certificate of Completion</h2>
                    <p>
                        Certificates are issued only after successful completion and review
                        of assigned work.
                    </p>

                    <ul>
                        <li>Certificates are not guaranteed</li>
                        <li>They are not issued on enrollment</li>
                        <li>They reflect actual work done</li>
                    </ul>

                    <p className="muted">
                        Eligible participants receive certificates via email.
                    </p>
                </section>
            </div>

            {/* ================= WHAT WE ARE NOT ================= */}
            <section className="how-warning">
                <h2>What InternHub Is Not</h2>
                <ul>
                    <li>Not a paid internship</li>
                    <li>No stipend</li>
                    <li>No guaranteed placement</li>
                    <li>No instant certificates</li>
                    <li>No shortcut learning</li>
                </ul>
            </section>

            {/* ================= WHAT YOU GAIN ================= */}
            <section className="how-benefits">
                <h2>What You Gain</h2>
                <ul>
                    <li>Real project experience</li>
                    <li>Strong portfolio-ready work</li>
                    <li>Structured guidance</li>
                    <li>Practical problem-solving skills</li>
                    <li>A credible certificate (when earned)</li>
                </ul>
            </section>

            {/* ================= FAQ ================= */}
            <section className="how-faq">
                <h2>FAQs</h2>

                <div className="faq">
                    <strong>Is InternHub a paid internship?</strong>
                    <p>No. InternHub is an unpaid, learning-focused program.</p>
                </div>

                <div className="faq">
                    <strong>Is placement guaranteed?</strong>
                    <p>No. We focus on skills and projects, not job promises.</p>
                </div>

                <div className="faq">
                    <strong>When do I receive the certificate?</strong>
                    <p>
                        Certificates are issued only after successful completion and review
                        of assigned tasks.
                    </p>
                </div>

                <div className="faq">
                    <strong>How do I contact you?</strong>
                    <p>
                        You can reach us via the{" "}
                        <Link href="/contact" className="text-link">
                            Contact page
                        </Link>
                        .
                    </p>
                </div>
            </section>

            {/* ================= FINAL CTA ================= */}
            <footer className="how-cta">
                <h2>Ready to Start?</h2>
                <p>Explore programs and apply when you’re ready to commit.</p>

                <Link href="/programs" className="primary-btn">
                    Explore Programs
                </Link>
            </footer>
        </section>
    );
}
