"use client";

import React, { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const PROGRAM_LABEL_MAP: Record<string, string> = {
    backend: "Backend Development",
    frontend: "Frontend Development",
    fullstack: "Full Stack Development",
    java: "Java Development",
    python: "Python Development",
    go: "Go Development",
};

interface ApplicationRecord {
    id: string;
    program: string;
    assigned_track: string | null;
    application_status: string;
    github_link: string | null;
}

type LooseApplicationRow = {
    id: string;
    program?: string;
    assigned_track?: string | null;
    application_status: string;
    github_link?: string | null;
};

export default function SubmitPage() {
    const [user, setUser] = useState<any>(null);
    const [applications, setApplications] = useState<ApplicationRecord[]>([]);
    const [selectedApp, setSelectedApp] = useState("");
    const [githubLinks, setGithubLinks] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const router = useRouter();
    const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/login");
                return;
            }
            setUser(session.user);
            fetchApplications(session.user.email!);
        };

        checkAuth();

    }, [router]);

    useEffect(() => {
        return () => {
            if (redirectTimeoutRef.current) {
                clearTimeout(redirectTimeoutRef.current);
            }
        };
    }, []);

    const fetchApplications = async (email: string) => {
        const { data, error } = await supabase
            .from("applications")
            .select("*")
            .eq("email", email);

        if (error) {
            console.error("Error fetching applications:", error.message, error);
            setMessage({ type: "error", text: error.message || "Failed to fetch applications." });
            return;
        }

        // Show only currently assigned programs in submit dropdown
        const rows: LooseApplicationRow[] = data || [];
        const normalized: ApplicationRecord[] = rows.map((row) => {
            return {
                id: row.id,
                program: row.program || "",
                assigned_track: row.assigned_track ?? null,
                application_status: row.application_status,
                github_link: row.github_link ?? null,
            };
        });
        setApplications(normalized.filter(app => app.application_status === "ASSIGNED"));
    };

    const parseGithubLinks = (raw: string): string[] => {
        return raw
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
    };

    const isValidHttpUrl = (value: string): boolean => {
        try {
            const url = new URL(value);
            return url.protocol === "http:" || url.protocol === "https:";
        } catch {
            return false;
        }
    };

    const handleSubmitProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedApp) {
            setMessage({ type: "error", text: "Please select an application." });
            return;
        }

        const links = parseGithubLinks(githubLinks);
        if (links.length === 0) {
            setMessage({ type: "error", text: "Please add at least one GitHub/project link." });
            return;
        }

        const invalidLinks = links.filter((l) => !isValidHttpUrl(l));
        if (invalidLinks.length > 0) {
            setMessage({ type: "error", text: `Invalid link(s): ${invalidLinks.join(", ")}` });
            return;
        }

        setIsSubmitting(true);
        setMessage({ type: "", text: "" });

        const { error } = await supabase
            .from("applications")
            .update({
                application_status: "SUBMITTED",
                github_link: links.join(", "),
                submitted_at: new Date().toISOString()
            })
            .eq("id", selectedApp);

        if (error) {
            setMessage({ type: "error", text: error.message });
        } else {
            setMessage({ type: "", text: "" });
            setShowSuccessModal(true);
            redirectTimeoutRef.current = setTimeout(() => {
                router.push("/dashboard");
            }, 2500);
        }
        setIsSubmitting(false);
    };

    return (
        <main className="dashboard-page">
            <div className="dashboard-header">
                <div className="container">
                    <div className="header-info">
                        <h1>Submit Your Project</h1>
                        <p>Provide your implementation details for review.</p>
                    </div>
                </div>
            </div>

            <nav className="dashboard-nav">
                <div className="container">
                    <button className="dashboard-nav-link" onClick={() => router.push("/dashboard")}>Overview</button>
                    <button className="dashboard-nav-link active">Submit Project</button>
                </div>
            </nav>

            <div className="container">
                <div style={{ maxWidth: '800px', margin: '40px auto 0' }}>
                    <div className="apply-form-wrapper" data-aos="fade-up">
                        {message.type === "error" && message.text && (
                            <div className={`alert ${message.type}`}>
                                {message.text}
                            </div>
                        )}

                        <form className="premium-form" onSubmit={handleSubmitProject}>
                            <div className="form-group">
                                <label>Assigned Program</label>
                                <select
                                    value={selectedApp}
                                    onChange={(e) => {
                                        const appId = e.target.value;
                                        setSelectedApp(appId);
                                        const app = applications.find((a) => a.id === appId);
                                        setGithubLinks(app?.github_link || "");
                                    }}
                                    required
                                >
                                    <option value="">Select your assigned program</option>
                                    {applications.map((app) => (
                                        <option key={app.id} value={app.id}>
                                            {PROGRAM_LABEL_MAP[app.program] || app.program || "Assigned Program"}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>GitHub Repository / Project URL(s)</label>
                                <input
                                    type="text"
                                    value={githubLinks}
                                    onChange={(e) => setGithubLinks(e.target.value)}
                                    placeholder="https://github.com/you/project-1"
                                    required
                                />
                                <small style={{ color: "#64748b" }}>
                                    Add one or more links. For multiple projects, separate links with commas.
                                </small>
                            </div>

                            <button type="submit" className="btn-primary form-submit" disabled={isSubmitting || applications.length === 0}>
                                {isSubmitting ? "Submitting..." : "Submit for Review"}
                            </button>
                        </form>

                        {applications.length === 0 && (
                            <p className="warning-text" style={{ textAlign: 'center', marginTop: '20px', color: '#ef4444' }}>
                                You don't have any active project assignments to submit.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {showSuccessModal && (
                <div className="submit-modal-overlay" role="dialog" aria-modal="true">
                    <div className="submit-modal-card">
                        <h3>Submitted Successfully</h3>
                        <p>
                            Great work. Your project link(s) are submitted for review.
                            You will be redirected to your dashboard in a moment.
                        </p>
                        <div className="submit-modal-actions">
                            <button
                                type="button"
                                className="btn-primary"
                                onClick={() => {
                                    if (redirectTimeoutRef.current) {
                                        clearTimeout(redirectTimeoutRef.current);
                                    }
                                    router.push("/dashboard");
                                }}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
