import Link from "next/link";

export default function Navbar() {
    return (
        <header className="navbar">
            <Link href="/" className="logo">
                Intern<span>Hub</span>
            </Link>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/programs">Programs</Link>
                <Link href="/how-it-works">How It Works</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/apply" className="btn-primary">Apply Now</Link>
            </nav>
        </header>
    );
}
