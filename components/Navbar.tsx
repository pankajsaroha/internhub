"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const navbarRef = useRef<HTMLElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Initial session check
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        // Check Admin session
        const checkAdmin = () => {
            const adminSecret = sessionStorage.getItem("admin_secret");
            setIsAdmin(!!adminSecret);
        };
        checkAdmin();

        // Listen for Admin Sync Events
        window.addEventListener("admin-login", checkAdmin);
        window.addEventListener("admin-logout", checkAdmin);

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            // If user logs in, ensure admin is cleared to avoid mixed states
            if (session) {
                sessionStorage.removeItem("admin_secret");
                setIsAdmin(false);
            }
        });

        return () => {
            subscription.unsubscribe();
            window.removeEventListener("admin-login", checkAdmin);
            window.removeEventListener("admin-logout", checkAdmin);
        };
    }, []);

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

    const handleLogout = async () => {
        await supabase.auth.signOut();
        sessionStorage.removeItem("admin_secret");
        setIsAdmin(false);
        setIsMenuOpen(false);
        router.push("/");
        router.refresh();
    };

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

                {user ? (
                    <>
                        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                        <button onClick={handleLogout} className="nav-logout-btn">Logout</button>
                    </>
                ) : isAdmin ? (
                    <>
                        <Link href="/admin" onClick={() => setIsMenuOpen(false)}>Admin Portal</Link>
                        <button onClick={handleLogout} className="nav-logout-btn">Logout</button>
                    </>
                ) : (
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                )}

                <Link href="/apply" className="btn-primary" onClick={() => setIsMenuOpen(false)}>Apply Now</Link>
            </nav>
        </header>
    );
}
