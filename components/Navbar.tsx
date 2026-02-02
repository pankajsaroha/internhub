import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <header className="navbar">
            <Link href="/" className="logo">
                {/* <Image
                    src="/logo.png"
                    alt="Inzivoo"
                    width={36}
                    height={36}
                    priority
                /> */}
                <span className="brand-name">Inzivoo</span>
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
