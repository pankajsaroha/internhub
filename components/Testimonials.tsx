export default function Testimonials() {
    return (
        <section className="testimonials" data-aos="fade-up">
            <h2>What Learners Say</h2>

            <div className="testimonial-cards">
                <div className="testimonial">
                    <p>
                        “The projects helped me understand how real applications are built.
                        Very practical.”
                    </p>
                    <h4>Computer Science Student</h4>
                    <span>Beginner</span>
                </div>

                <div className="testimonial">
                    <p>
                        “Clear steps and hands-on learning. I actually finished projects
                        instead of quitting halfway.”
                    </p>
                    <h4>Self Learner</h4>
                    <span>Career Switcher</span>
                </div>

                <div className="testimonial">
                    <p>
                        “Great platform to build confidence before applying for jobs.”
                    </p>
                    <h4>Graduate</h4>
                    <span>Fresher</span>
                </div>
            </div>
        </section>
    );
}
