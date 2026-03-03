import Link from "next/link";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-top">
                <div className="footer-brand">
                    <h3>Inzivoo</h3>
                    <p>
                        Inzivoo is a global project-based learning platform focused on
                        helping learners build practical skills through real-world
                        projects.
                    </p>
                </div>

                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/how-it-works">How It Works</Link></li>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/terms">Terms & Conditions</Link></li>
                        <li><Link href="/privacy">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>Contact</h4>
                    <p>Email: info@inzivoo.com</p>
                    <p>Mode: Online (Global)</p>
                </div>
            </div>

            <div className="footer-disclaimer">
                <p>
                    <strong>Disclaimer:</strong> Inzivoo is a project-based learning and
                    skill development platform. We do not provide employment, paid
                    internships, job placement, or job guarantees. All certificates issued
                    represent successful completion of training programs only.
                    Participation does not create an employer–employee relationship.
                </p>
            </div>

            <div className="footer-bottom">
                <p>© 2026 Inzivoo. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
