export default function Footer() {
    return (
        <footer>
            <div className="footer-top">
                <div className="footer-brand">
                    <h3>InternHub</h3>
                    <p>
                        InternHub is a global project-based learning platform focused on
                        helping learners build practical skills through real-world
                        projects.
                    </p>
                </div>

                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/terms">Terms & Conditions</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>Contact</h4>
                    <p>Email: support@internhub.com</p>
                    <p>Mode: Online (Global)</p>
                </div>
            </div>

            <div className="footer-disclaimer">
                <p>
                    <strong>Disclaimer:</strong> InternHub is a project-based learning and
                    skill development platform. We do not provide employment, paid
                    internships, job placement, or job guarantees. All certificates issued
                    represent successful completion of training programs only.
                    Participation does not create an employer–employee relationship.
                </p>
            </div>

            <div className="footer-bottom">
                <p>© 2026 InternHub. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
