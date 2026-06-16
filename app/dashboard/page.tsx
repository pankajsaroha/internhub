"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Trophy, Flame, Target, CheckCircle2, 
  ArrowRight, Zap, Star, Layout, 
  Award, Clock, ChevronRight, Activity, Terminal
} from "lucide-react";
import Link from "next/link";

const PROGRAM_LABEL_MAP: Record<string, string> = {
    backend: "Backend Development",
    frontend: "Frontend Development",
    fullstack: "Full Stack Development",
    java: "Java Development",
    python: "Python Development",
    go: "Go Development",
};

interface Application {
    id: string;
    program: string;
    application_status: string;
    created_at: string;
    assigned_track: string;
    experience_level: string;
    full_name?: string | null;
}

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [displayName, setDisplayName] = useState<string>("User");
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Mock data for gamification (In a real app, these would come from DB)
    const stats = {
        streak: 12,
        xp: 2450,
        completed: 3,
        rank: "System Architect"
    };

    const currentProjectTasks = [
        { id: 1, text: "Define System Requirements", completed: true },
        { id: 2, text: "Design Database Schema", completed: true },
        { id: 3, text: "Implement Core API Logic", completed: false },
        { id: 4, text: "Setup Load Balancer", completed: false },
    ];

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/login");
                return;
            }
            setUser(session.user);
            setDisplayName(session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "Learner");
            fetchData(session.user.email!);
        };
        checkAuth();
    }, [router]);

    const fetchData = async (email: string) => {
        setIsLoading(true);
        const normalizedEmail = (email || "").trim().toLowerCase();
        const { data: apps } = await supabase
            .from("applications")
            .select("*")
            .eq("email", normalizedEmail)
            .order("created_at", { ascending: false });

        setApplications((apps as Application[]) || []);
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="font-bold text-secondary">Syncing your progress...</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background pb-20">
            {/* Dashboard Header */}
            <header className="py-12 border-b border-border bg-muted/30">
                <div className="container">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-black tracking-tight">Welcome back, {displayName}</h1>
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-black">
                                    <Flame className="h-3.5 w-3.5 fill-current" /> {stats.streak} Day Streak
                                </div>
                            </div>
                            <p className="text-secondary">Your engineering journey is 65% complete this week.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="glass-card px-6 py-3 rounded-2xl border border-border flex items-center gap-4 shadow-sm">
                                <div className="text-right">
                                    <div className="text-[10px] font-black uppercase text-secondary tracking-widest">Total XP</div>
                                    <div className="text-xl font-black text-primary">{stats.xp.toLocaleString()}</div>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Star className="h-5 w-5 text-primary fill-current" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container py-12">
                <div className="grid lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Active Focus */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Progress Tracker Card */}
                        <section className="glass-card p-8 rounded-[32px] border border-border shadow-xl overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl" />
                            
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <div className="text-xs font-black uppercase text-primary tracking-widest mb-2">Current Project</div>
                                        <h2 className="text-2xl font-black mb-1">Distributed Key-Value Store</h2>
                                        <p className="text-secondary text-sm">Phase 2: Core Implementation</p>
                                    </div>
                                    <div className="relative w-24 h-24 flex items-center justify-center">
                                        <svg className="w-full h-full -rotate-90">
                                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted" />
                                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={251} strokeDashoffset={251 * (1 - 0.65)} className="text-primary transition-all duration-1000" />
                                        </svg>
                                        <span className="absolute text-lg font-black italic">65%</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold flex items-center gap-2">
                                        <Target className="h-4 w-4 text-primary" /> Task Checklist
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {currentProjectTasks.map((task) => (
                                            <div key={task.id} className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${task.completed ? 'bg-emerald-500/5 border-emerald-500/20 opacity-70' : 'bg-muted/50 border-border hover:border-primary/50'}`}>
                                                <div className={`w-5 h-5 rounded-md flex items-center justify-center ${task.completed ? 'bg-emerald-500 text-white' : 'border-2 border-border'}`}>
                                                    {task.completed && <CheckCircle2 className="h-3 w-3" />}
                                                </div>
                                                <span className={`text-sm font-medium ${task.completed ? 'line-through' : ''}`}>{task.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button className="mt-10 btn btn-primary w-full py-4 flex items-center justify-center gap-2 group">
                                    Continue Building <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </section>

                        {/* Recent Activity / Applications */}
                        <section className="space-y-4">
                            <div className="flex justify-between items-center px-2">
                                <h2 className="text-xl font-black">Ongoing Tracks</h2>
                                <Link href="/dashboard/applications" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                                    View All <ChevronRight className="h-3 w-3" />
                                </Link>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {applications.length > 0 ? applications.map((app) => (
                                    <div key={app.id} className="glass-card p-6 rounded-2xl border border-border hover:border-primary/30 transition-all flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                                            <Zap className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="text-sm font-bold">{PROGRAM_LABEL_MAP[app.program] || app.program}</div>
                                            <div className="text-[10px] text-secondary font-bold uppercase tracking-wider">{app.application_status}</div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-secondary opacity-30" />
                                    </div>
                                )) : (
                                    <div className="col-span-2 p-12 text-center border-2 border-dashed border-border rounded-[32px]">
                                        <p className="text-secondary mb-4">No active tracks found.</p>
                                        <Link href="/programs" className="btn btn-secondary px-6 py-3 text-sm">Explore Tracks</Link>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Recommendations & Stats */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Stats Bento */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="glass-card p-6 rounded-2xl border border-border text-center">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                                    <Award className="h-5 w-5 text-emerald-500" />
                                </div>
                                <div className="text-2xl font-black">{stats.completed}</div>
                                <div className="text-[10px] text-secondary font-bold uppercase">Completed</div>
                            </div>
                            <div className="glass-card p-6 rounded-2xl border border-border text-center">
                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
                                    <Activity className="h-5 w-5 text-blue-500" />
                                </div>
                                <div className="text-2xl font-black">Top 5%</div>
                                <div className="text-[10px] text-secondary font-bold uppercase">Ranking</div>
                            </div>
                        </div>

                        {/* Recommendation Card */}
                        <section className="glass-card p-8 rounded-[32px] border border-primary/20 bg-primary/[0.03] relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <Zap className="h-6 w-6 text-primary animate-pulse" />
                            </div>
                            <div className="text-xs font-black uppercase text-primary tracking-widest mb-4">Up Next</div>
                            <h3 className="text-xl font-black mb-2">Build a High-Scale API Gateway</h3>
                            <p className="text-sm text-secondary mb-6 leading-relaxed">
                                Master request routing, rate limiting, and auth patterns used in production.
                            </p>
                            <button className="w-full py-4 rounded-xl bg-foreground text-background font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                                Unlock Level <Clock className="h-4 w-4" />
                            </button>
                        </section>

                        {/* Recent Badges */}
                        <section className="glass-card p-6 rounded-[32px] border border-border">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-sm font-black uppercase text-secondary tracking-widest">Recent Badges</h3>
                                <Link href="/dashboard/certificates" className="text-[10px] font-black uppercase text-primary hover:underline">
                                    Certificates
                                </Link>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center border border-border group" title="Early Bird">
                                    <Clock className="h-6 w-6 text-secondary group-hover:text-primary transition-colors" />
                                </div>
                                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center border border-border group" title="Code Master">
                                    <Terminal className="h-6 w-6 text-secondary group-hover:text-primary transition-colors" />
                                </div>
                                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center border border-border group" title="Top Contributor">
                                    <Award className="h-6 w-6 text-secondary group-hover:text-primary transition-colors" />
                                </div>
                                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center border border-border group opacity-30">
                                    <Star className="h-6 w-6 text-secondary" />
                                </div>
                            </div>
                        </section>
                    </div>

                </div>
            </div>
        </main>
    );
}
