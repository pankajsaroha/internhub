export default function Steps() {
    return (
        <section className="steps" data-aos="fade-up">
            <h2>How InternHub Works</h2>

            <p style={{ maxWidth: "700px", margin: "15px auto", color: "#555" }}>
                Our learning programs follow a simple, structured flow designed to help
                you learn by building real projects — step by step.
            </p>

            <div className="step-cards">
                <div className="step step-blue">
                    {/* <span className="step-eyebrow step-blue">STEP 1</span> */}
                    <h3>Choose a Program</h3>
                    <p>
                        Select a learning program based on your interest, goals, and current
                        skill level.
                    </p>
                </div>

                <div className="step step-indigo">
                    {/* <span className="step-eyebrow step-indigo">STEP 2</span> */}
                    <h3>Get Project Tasks</h3>
                    <p>
                        Receive structured tasks and clear guidelines that simulate real
                        industry-style work.
                    </p>
                </div>

                <div className="step step-green">
                    {/* <span className="step-eyebrow step-green">STEP 3</span> */}
                    <h3>Build & Learn</h3>
                    <p>
                        Work on tasks at your own pace, apply concepts, and improve through
                        hands-on practice.
                    </p>
                </div>

                <div className="step step-purple">
                    {/* <span className="step-eyebrow step-purple">STEP 4</span> */}
                    <h3>Submit & Get Certified</h3>
                    <p>
                        Submit your completed project and receive a Certificate of
                        Completion after review.
                    </p>
                </div>
            </div>
        </section>
    );
}
