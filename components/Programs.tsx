export default function Programs() {
    return (
        <section className="programs" data-aos="fade-up">
            <h2>Our Learning Programs</h2>

            <p style={{ maxWidth: "720px", margin: "14px auto 50px", color: "#6b7280" }}>
                Choose from focused learning tracks designed to help you build
                real-world skills through hands-on, project-based programs.
            </p>

            <div className="cards">
                {/* Frontend */}
                <div className="card card-blue">
                    <div className="program-icon blue">
                        {/* Browser / UI */}
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="4" width="18" height="14" rx="2" stroke="#3b82f6" strokeWidth="2" />
                            <path d="M3 8h18" stroke="#3b82f6" strokeWidth="2" />
                            <circle cx="6" cy="6" r="1" fill="#3b82f6" />
                            <circle cx="9" cy="6" r="1" fill="#3b82f6" />
                        </svg>
                    </div>

                    <span className="program-tag">Frontend</span>
                    <h3>Frontend Development</h3>
                    <p>
                        Build modern, responsive user interfaces using real-world layouts,
                        components, and workflows.
                    </p>
                    <button>Explore</button>
                </div>

                {/* Backend */}
                <div className="card card-indigo">
                    <div className="program-icon indigo">
                        {/* Server */}
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                            <rect x="4" y="3" width="16" height="6" rx="2" stroke="#6366f1" strokeWidth="2" />
                            <rect x="4" y="10" width="16" height="6" rx="2" stroke="#6366f1" strokeWidth="2" />
                            <circle cx="8" cy="6" r="1" fill="#6366f1" />
                            <circle cx="8" cy="13" r="1" fill="#6366f1" />
                        </svg>
                    </div>

                    <span className="program-tag">Backend</span>
                    <h3>Backend Development</h3>
                    <p>
                        Design APIs, handle databases, and implement server-side logic using
                        industry-style architectures.
                    </p>
                    <button>Explore</button>
                </div>

                {/* Full Stack */}
                <div className="card card-green">
                    <div className="program-icon green">
                        {/* Layers */}
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                            <path d="M12 3l8 4-8 4-8-4 8-4z" stroke="#22c55e" strokeWidth="2" />
                            <path d="M4 11l8 4 8-4" stroke="#22c55e" strokeWidth="2" />
                            <path d="M4 15l8 4 8-4" stroke="#22c55e" strokeWidth="2" />
                        </svg>
                    </div>

                    <span className="program-tag">Full Stack</span>
                    <h3>Full Stack Development</h3>
                    <p>
                        Work across frontend and backend to build complete, end-to-end
                        applications.
                    </p>
                    <button>Explore</button>
                </div>

                {/* Java */}
                <div className="card card-purple">
                    <div className="program-icon purple">
                        {/* Java cup (recognizable) */}
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                            <path d="M8 17h6a3 3 0 003-3V7H5v7a3 3 0 003 3z"
                                stroke="#a855f7" strokeWidth="2" />
                            <path d="M17 9h1a2 2 0 010 4h-1"
                                stroke="#a855f7" strokeWidth="2" />
                            <path d="M9 3s2 1 2 3-2 2-2 4"
                                stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>

                    <span className="program-tag">Language</span>
                    <h3>Java Programming</h3>
                    <p>
                        Strengthen your programming fundamentals by building structured,
                        object-oriented projects in Java.
                    </p>
                    <button>Explore</button>
                </div>

                {/* Python */}
                <div className="card card-emerald">
                    <div className="program-icon emerald">
                        {/* Python-style snake */}
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 3c4 0 4 2 4 4H8c0-2 0-4 4-4z"
                                stroke="#10b981" strokeWidth="2" />
                            <path
                                d="M12 21c-4 0-4-2-4-4h8c0 2 0 4-4 4z"
                                stroke="#10b981" strokeWidth="2" />
                            <circle cx="10" cy="6" r="1" fill="#10b981" />
                            <circle cx="14" cy="18" r="1" fill="#10b981" />
                        </svg>
                    </div>

                    <span className="program-tag">Language</span>
                    <h3>Python Programming</h3>
                    <p>
                        Learn Python through hands-on projects focused on logic, automation,
                        and real-world use cases.
                    </p>
                    <button>Explore</button>
                </div>

                {/* Go */}
                <div className="card card-sky">
                    <div className="program-icon sky">
                        {/* Go-style speed */}
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                            <path d="M4 12h10l-3-3"
                                stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
                            <path d="M14 12l-3 3"
                                stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="18" cy="12" r="2"
                                stroke="#0ea5e9" strokeWidth="2" />
                        </svg>
                    </div>

                    <span className="program-tag">Language</span>
                    <h3>Go Programming</h3>
                    <p>
                        Build high-performance, concurrent applications using Go with a
                        focus on backend systems.
                    </p>
                    <button>Explore</button>
                </div>
            </div>
        </section>
    );
}
