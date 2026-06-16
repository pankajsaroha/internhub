"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { 
  Menu, X, User, ChevronDown, LayoutDashboard, 
  FileText, Award, LogOut, Send, BookOpen, 
  ShieldCheck, BrainCircuit, Layers, Cpu, Server, Zap 
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial session check
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setIsAdmin(session?.user?.email === "pankajsaroha01@gmail.com");
            setIsLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setIsAdmin(session?.user?.email === "pankajsaroha01@gmail.com");
        });

        // Close dropdown on outside click
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            subscription.unsubscribe();
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsProfileOpen(false);
        window.location.href = "/";
    };

    return (
        <header className="navbar glass border-b border-border sticky top-0 z-[100] transition-all duration-300">
            <div className="container flex justify-between items-center h-full px-4 lg:px-6">
                <Link href="/" className="brand flex items-center gap-3 group">
                    <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-primary/20">
                        <span className="text-white font-bold text-xl">I</span>
                    </div>
                    <span className="brand-name font-black text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">INZIVOO</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/programs" className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-2">
                        <BookOpen className="h-4 w-4 opacity-50" /> Programs
                    </Link>
                    <div className="relative group/nav">
                        <Link href="/system-design" className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1.5 py-6">
                            <ShieldCheck className="h-4 w-4 opacity-50" /> System Design
                            <ChevronDown className="h-3 w-3 transition-transform group-hover/nav:rotate-180" />
                        </Link>
                        
                        <div className="absolute top-full -left-4 w-[480px] pt-2 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 transform group-hover/nav:translate-y-0 translate-y-2 z-50">
                            <div className="glass-card p-6 rounded-3xl border border-border shadow-2xl overflow-hidden grid grid-cols-2 gap-4">
                                <Link href="/system-design/architecture" className="flex gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-all group/item">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                                        <Layers className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-widest text-primary mb-1">Architecture</div>
                                        <div className="text-sm font-bold mb-1">System Design</div>
                                        <div className="text-[10px] text-secondary leading-tight">Distributed systems & scaling.</div>
                                    </div>
                                </Link>

                                <Link href="/system-design/internals" className="flex gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-all group/item">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                                        <Cpu className="h-5 w-5 text-indigo-500" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-widest text-primary mb-1">Runtimes</div>
                                        <div className="text-sm font-bold mb-1">Language Internals</div>
                                        <div className="text-[10px] text-secondary leading-tight">Go, Java & Rust deep dives.</div>
                                    </div>
                                </Link>

                                <Link href="/system-design/infrastructure" className="flex gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-all group/item">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                                        <Server className="h-5 w-5 text-emerald-500" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-widest text-primary mb-1">Infrastructure</div>
                                        <div className="text-sm font-bold mb-1">Cloud Native</div>
                                        <div className="text-[10px] text-secondary leading-tight">Kubernetes & Platform engineering.</div>
                                    </div>
                                </Link>

                                <Link href="/system-design/interviews" className="flex gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-all group/item">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                                        <ShieldCheck className="h-5 w-5 text-amber-500" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-widest text-primary mb-1">Interviews</div>
                                        <div className="text-sm font-bold mb-1">FAANG Series</div>
                                        <div className="text-[10px] text-secondary leading-tight">Master technical interviews.</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Link href="/quiz" className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-2">
                        <BrainCircuit className="h-4 w-4 opacity-50" /> Quizzes
                    </Link>
                    
                    <div className="h-5 w-px bg-border/60 mx-1" />
                    
                    <ThemeToggle />

                    <div className="flex items-center min-w-[40px] justify-end relative" ref={dropdownRef}>
                        {isLoading ? (
                            <div className="h-9 w-9 bg-muted animate-pulse rounded-full" />
                        ) : (
                            <>
                                {user || isAdmin ? (
                                    <div className="relative">
                                        <button 
                                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                                            className="flex items-center gap-1.5 p-1 hover:bg-muted/50 rounded-full transition-all border border-transparent hover:border-border"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                                                <User className="h-4 w-4 text-primary" />
                                            </div>
                                            <ChevronDown className={`h-3.5 w-3.5 text-secondary transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isProfileOpen && (
                                            <div className="absolute right-0 mt-3 w-64 glass-card rounded-2xl border border-border shadow-2xl z-50 py-3 overflow-hidden animate-in fade-in zoom-in slide-in-from-top-2 duration-200">
                                                <div className="px-5 py-3 border-b border-border/50 mb-2">
                                                    <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Account Active</p>
                                                    <p className="text-sm truncate font-bold text-foreground">{user?.email}</p>
                                                </div>
                                                
                                                <div className="px-2 space-y-1">
                                                    <Link href="/gamification" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-all group" onClick={() => setIsProfileOpen(false)}>
                                                        <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            <Zap className="h-4 w-4 text-orange-500 fill-current" />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">My Progression</div>
                                                            <div className="text-[10px] text-secondary">Level 10 • Architect</div>
                                                        </div>
                                                    </Link>
                                                    
                                                    <div className="h-px bg-border my-2" />
                                                    
                                                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-all group" onClick={() => setIsProfileOpen(false)}>
                                                        <LayoutDashboard className="h-4 w-4 text-secondary group-hover:text-primary" /> Dashboard
                                                    </Link>
                                                    <Link href="/dashboard/applications" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-all group" onClick={() => setIsProfileOpen(false)}>
                                                        <FileText className="h-4 w-4 text-secondary group-hover:text-primary" /> My Applications
                                                    </Link>
                                                    <Link href="/dashboard/certificates" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-all group" onClick={() => setIsProfileOpen(false)}>
                                                        <Award className="h-4 w-4 text-secondary group-hover:text-primary" /> Certificates
                                                    </Link>
                                                    <Link href="/submit" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-all group" onClick={() => setIsProfileOpen(false)}>
                                                        <Send className="h-4 w-4 text-secondary group-hover:text-primary" /> Submit Project
                                                    </Link>
                                                </div>
                                                
                                                <div className="h-px bg-border/50 my-2 mx-4" />
                                                
                                                <div className="px-2">
                                                    <button 
                                                        onClick={handleLogout}
                                                        className="flex w-full items-center gap-3 px-3 py-2 text-sm font-bold text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                                                    >
                                                        <LogOut className="h-4 w-4" /> Logout
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link href="/login" className="px-5 py-2 text-sm font-bold bg-primary text-white rounded-full hover:opacity-90 transition-all shadow-md shadow-primary/20">
                                        Login
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </nav>

                <button className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>
            
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden glass border-t border-border animate-in slide-in-from-top-4 duration-300">
                    <div className="container py-8 flex flex-col gap-5">
                        <Link href="/programs" className="text-lg font-bold flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                           <BookOpen className="h-5 w-5 text-primary" /> Programs
                        </Link>
                        <Link href="/articles" className="text-lg font-bold flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                           <BookOpen className="h-5 w-5 text-primary" /> Engineering Blog
                        </Link>
                        <Link href="/system-design" className="text-lg font-bold flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                           <BrainCircuit className="h-5 w-5 text-primary" /> System Design
                        </Link>
                        <Link href="/quiz" className="text-lg font-bold flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                           <BrainCircuit className="h-5 w-5 text-primary" /> Quizzes
                        </Link>
                        
                        <div className="h-px bg-border w-full my-2" />
                        
                        {user ? (
                            <>
                                <Link href="/dashboard" className="text-lg font-bold flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                                    <LayoutDashboard className="h-5 w-5 text-secondary" /> Dashboard
                                </Link>
                                <button onClick={handleLogout} className="text-left text-lg font-bold text-destructive flex items-center gap-3">
                                    <LogOut className="h-5 w-5" /> Logout
                                </button>
                            </>
                        ) : (
                            <Link href="/login" className="btn btn-primary text-center py-4" onClick={() => setIsMenuOpen(false)}>
                                Login to Platform
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
