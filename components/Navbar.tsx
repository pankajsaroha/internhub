import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <header className="navbar">
            <Link href="/" className="logo">
                <Image
                    src="/Inzivoo9.png"
                    alt="INZIVOO"
                    width={220}
                    height={30}
                    priority
                    className="brand-logo-image"
                />  
            </Link>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/quiz">Quizzes</Link>
                <Link href="/programs">Programs</Link>
                <Link href="/how-it-works">How It Works</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/apply" className="btn-primary">Apply Now</Link>
            </nav>
        </header>
    );
}
