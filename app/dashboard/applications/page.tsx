"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  FileText, ArrowLeft, Zap, 
  ExternalLink, Clock, CheckCircle2 
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
}

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/login");
                return;
            }
            fetchData(session.user.email!);
        };
        checkAuth();
    }, [router]);

    const fetchData = async (email: string) => {
        setIsLoading(true);
        const { data: apps } = await supabase
            .from("applications")
            .select("*")
            .eq("email", email.trim().toLowerCase())
            .order("created_at", { ascending: false });

        setApplications((apps as Application[]) || []);
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background py-12">
            <div className="container">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-8 group">
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </Link>

                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight mb-2">My Applications</h1>
                        <p className="text-secondary">Track the status of your engineering track applications.</p>
                    </div>
                    <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-bold">
                        {applications.length} Active Tracks
                    </div>
                </div>

                {applications.length > 0 ? (
                    <div className="grid gap-6">
                        {applications.map((app) => (
                            <div key={app.id} className="glass-card p-8 rounded-[32px] border border-border hover:border-primary/30 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center shrink-0">
                                        <Zap className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">{PROGRAM_LABEL_MAP[app.program] || app.program}</h3>
                                        <div className="flex flex-wrap gap-4 text-xs text-secondary font-bold">
                                            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Applied on {new Date(app.created_at).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> {app.experience_level}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${app.application_status.toLowerCase() === 'approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                        {app.application_status}
                                    </div>
                                    <button className="p-3 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary transition-all">
                                        <ExternalLink className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 glass-card rounded-[40px] border border-border">
                        <FileText className="h-16 w-16 text-muted mx-auto mb-6" />
                        <h2 className="text-2xl font-bold mb-2">No applications yet</h2>
                        <p className="text-secondary mb-8">Start your first engineering track to see it here.</p>
                        <Link href="/programs" className="btn btn-primary px-8 py-4">Explore Programs</Link>
                    </div>
                )}
            </div>
        </main>
    );
}
