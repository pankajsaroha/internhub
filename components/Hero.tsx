export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-content" data-aos="fade-up">
                <div className="hero-text">
                    <h1>
                        Learn by Building <br />
                        <span>Real-World Projects</span>
                    </h1>

                    <p>
                        InternHub helps students and beginners gain practical skills through
                        structured, project-based learning programs designed to simulate
                        real industry work.
                    </p>

                    <p>
                        Build projects. Get guidance. Earn proof of learning.
                    </p>

                    <button className="btn-primary">Get Started</button>
                    <button className="btn-secondary" style={{ marginLeft: "12px" }}>
                        Explore Programs
                    </button>
                </div>

                {/* SVG Illustration */}
                <div className="hero-image">
                    <svg
                        width="360"
                        height="280"
                        viewBox="0 0 360 280"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect x="20" y="30" width="320" height="200" rx="16" fill="#EEF2FF" />
                        <rect x="40" y="60" width="200" height="16" rx="8" fill="#6366F1" />
                        <rect x="40" y="90" width="260" height="10" rx="5" fill="#CBD5E1" />
                        <rect x="40" y="110" width="240" height="10" rx="5" fill="#CBD5E1" />
                        <rect x="40" y="130" width="180" height="10" rx="5" fill="#CBD5E1" />

                        <circle cx="270" cy="150" r="28" fill="#3B82F6" />
                        <path
                            d="M260 150l8 8 14-16"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
}
