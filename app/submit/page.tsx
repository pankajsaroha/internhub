"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SubmitPage() {
    const [user, setUser] = useState<any>(null);
    const [applications, setApplications] = useState<any[]>([]);
    const [selectedApp, setSelectedApp] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const router = useRouter();

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

    const fetchApplications = async (email: string) => {
        const { data, error } = await supabase
            .from("applications")
            .select("id, program, application_status")
            .eq("email", email);

        if (error) {
            console.error("Error fetching applications:", error);
            return;
        }

        // Filter for programs that need submission (ASSIGNED or SUBMITTED)
        const filterable = data || [];
        setApplications(filterable.filter(app => ["ASSIGNED", "SUBMITTED"].includes(app.application_status)));
    };

    const handleSubmitProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedApp) {
            setMessage({ type: "error", text: "Please select an application." });
            return;
        }

        setIsSubmitting(true);
        setMessage({ type: "", text: "" });

        const { error } = await supabase
            .from("applications")
            .update({
                application_status: "SUBMITTED",
                submission_link: githubUrl
            })
            .eq("id", selectedApp);

        if (error) {
            setMessage({ type: "error", text: error.message });
        } else {
            setMessage({ type: "success", text: "Project submitted successfully! Redirecting to dashboard..." });
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
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
                        {message.text && (
                            <div className={`alert ${message.type}`}>
                                {message.text}
                            </div>
                        )}

                        <form className="premium-form" onSubmit={handleSubmitProject}>
                            <div className="form-group">
                                <label>Assigned Program</label>
                                <select
                                    value={selectedApp}
                                    onChange={(e) => setSelectedApp(e.target.value)}
                                    required
                                >
                                    <option value="">Select your assigned program</option>
                                    {applications.map((app) => (
                                        <option key={app.id} value={app.id}>
                                            {app.program.replace(/-/g, ' ').toUpperCase()} (Status: {app.application_status})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>GitHub Repository / Project URL</label>
                                <input
                                    type="url"
                                    value={githubUrl}
                                    onChange={(e) => setGithubUrl(e.target.value)}
                                    placeholder="https://github.com/yourusername/project"
                                    required
                                />
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
        </main>
    );
}
