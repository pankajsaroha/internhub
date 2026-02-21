"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navbarRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!isMenuOpen) {
            return;
        }

        const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
            if (!navbarRef.current) {
                return;
            }

            if (!navbarRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("touchstart", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("touchstart", handleOutsideClick);
        };
    }, [isMenuOpen]);

    return (
        <header className="navbar" ref={navbarRef}>
            <Link href="/" className="logo">
                <Image
                    src="/Inzivoo9.png"
                    alt="INZIVOO"
                    width={150}
                    height={30}
                    priority
                    className="brand-logo-image"
                />  
            </Link>

            <button
                type="button"
                className="menu-toggle"
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((prev) => !prev)}
            >
                <span />
                <span />
                <span />
            </button>

            <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
                <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link href="/quiz" onClick={() => setIsMenuOpen(false)}>Quizzes</Link>
                <Link href="/programs" onClick={() => setIsMenuOpen(false)}>Programs</Link>
                <Link href="/how-it-works" onClick={() => setIsMenuOpen(false)}>How It Works</Link>
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                <Link href="/apply" className="btn-primary" onClick={() => setIsMenuOpen(false)}>Apply Now</Link>
            </nav>
        </header>
    );
}
