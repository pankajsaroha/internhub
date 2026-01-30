export default function Certificate() {
    return (
        <section className="certificate" data-aos="fade-up">
            <div className="cert-text">
                <h2>Certificate of Completion</h2>

                <p>
                    After successfully completing the program and submitting your
                    project, you’ll receive a Certificate of Completion from InternHub.
                </p>

                <ul>
                    <li>✔ Confirms completion of structured project-based training</li>
                    <li>✔ Demonstrates practical learning & consistency</li>
                    <li>✔ Can be used as proof of learning on resumes & profiles</li>
                </ul>

                <p>
                    This certificate represents completion of a learning program only. It
                    does not indicate employment or job placement.
                </p>
            </div>

            {/* Certificate SVG Preview */}
            <div className="cert-image">
                <svg
                    width="260"
                    height="180"
                    viewBox="0 0 260 180"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        x="4"
                        y="4"
                        width="252"
                        height="172"
                        rx="14"
                        fill="#FFFFFF"
                        stroke="#6366F1"
                        strokeWidth="2"
                    />
                    <rect x="20" y="28" width="120" height="10" rx="5" fill="#6366F1" />
                    <rect x="20" y="50" width="180" height="8" rx="4" fill="#CBD5E1" />
                    <rect x="20" y="68" width="160" height="8" rx="4" fill="#CBD5E1" />

                    <circle cx="200" cy="120" r="18" fill="#22C55E" />
                    <path
                        d="M192 120l6 6 10-12"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </section>
    );
}
