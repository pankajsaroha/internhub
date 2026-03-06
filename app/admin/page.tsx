"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Application {
    id: string;
    full_name: string;
    email: string;
    program: string;
    application_status: string;
    github_link?: string;
    created_at: string;
}

export default function AdminPage() {
    const [secret, setSecret] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userSession, setUserSession] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<"APPLIED" | "SUBMITTED" | "IN-REVIEW">("APPLIED");
    const [modal, setModal] = useState<{ show: boolean, title: string, message: string }>({ show: false, title: "", message: "" });
    const router = useRouter();

    useEffect(() => {
        // 1. Check if a normal user is logged in
        import("@/lib/supabase").then(({ supabase }) => {
            supabase.auth.getSession().then(({ data: { session } }) => {
                setUserSession(session);
            });
        });

        // 2. Check for existing admin session
        const savedSecret = sessionStorage.getItem("admin_secret");
        if (savedSecret) {
            setSecret(savedSecret);
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated && secret) {
            fetchApplications();
        }
    }, [isAuthenticated, secret]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (userSession) {
            setModal({
                show: true,
                title: "Action Restricted",
                message: "You are currently logged in with a student account. Please log out from the student dashboard before accessing the Admin Portal."
            });
            return;
        }
        if (secret) {
            sessionStorage.setItem("admin_secret", secret);
            setIsAuthenticated(true);
            // Notify Navbar
            window.dispatchEvent(new Event("admin-login"));
        }
    };

    const handleLogoutAdmin = () => {
        sessionStorage.removeItem("admin_secret");
        setIsAuthenticated(false);
        setSecret("");
        // Notify Navbar
        window.dispatchEvent(new Event("admin-logout"));
        router.push("/");
        router.refresh();
    };

    const fetchApplications = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/applications?statuses=APPLIED,SUBMITTED,IN-REVIEW`, {
                headers: { "x-admin-secret": secret }
            });
            const data = await res.json();
            if (data.applications) {
                setApplications(data.applications);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
        setIsLoading(false);
    };

    const handleAction = async (id: string, action: string) => {
        // We'll skip confirm() for now to keep it simple, or use a custom confirm modal later.
        // For now, let's just replace alerts.
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/actions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-secret": secret
                },
                body: JSON.stringify({ action, applicationId: id })
            });
            const data = await res.json();
            if (data.success) {
                setModal({
                    show: true,
                    title: "Success",
                    message: "Action performed successfully!"
                });
                fetchApplications();
            } else {
                setModal({
                    show: true,
                    title: "Error",
                    message: data.error || "Failed to perform action"
                });
            }
        } catch (error) {
            setModal({
                show: true,
                title: "Error",
                message: "Request failed"
            });
        }
        setIsLoading(false);
    };

    const renderModal = () => {
        if (!modal.show) return null;
        return (
            <div className="modal-overlay" role="dialog" aria-modal="true">
                <div className="modal-card">
                    <h3>{modal.title}</h3>
                    <p>{modal.message}</p>
                    <div className="modal-actions">
                        <button
                            type="button"
                            className="btn-primary"
                            onClick={() => setModal({ ...modal, show: false })}
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (!isAuthenticated) {
        return (
            <div className="login-container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <div className="compact-form-wrapper" style={{ margin: '0 auto' }}>
                    <h1>Admin Access</h1>
                    {userSession && (
                        <p style={{ color: '#ef4444', marginBottom: '20px', fontSize: '14px' }}>
                            You are currently logged in as {userSession.user.email}. <br />
                            Please log out before accessing Admin Portal.
                        </p>
                    )}
                    <form className="premium-form" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Admin Secret Key</label>
                            <input
                                type="password"
                                value={secret}
                                onChange={(e) => setSecret(e.target.value)}
                                placeholder="Enter secret..."
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary form-submit">Login as Admin</button>
                    </form>
                </div>
                {renderModal()}
            </div>
        );
    }

    const filteredApps = applications.filter(app => app.application_status === activeTab);

    return (
        <main className="dashboard-page admin-portal">
            <div className="dashboard-header">
                <div className="container">
                    <div className="header-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <div>
                            <h1>Admin Management Portal</h1>
                            <p>Manage applications, review projects, and issue certificates.</p>
                        </div>
                        <button onClick={handleLogoutAdmin} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                            Logout Admin
                        </button>
                    </div>
                </div>
            </div>

            <nav className="dashboard-nav">
                <div className="container">
                    <button
                        className={`dashboard-nav-link ${activeTab === 'APPLIED' ? 'active' : ''}`}
                        onClick={() => setActiveTab('APPLIED')}
                    >
                        Waiting for Projects ({applications.filter(a => a.application_status === 'APPLIED').length})
                    </button>
                    <button
                        className={`dashboard-nav-link ${activeTab === 'SUBMITTED' ? 'active' : ''}`}
                        onClick={() => setActiveTab('SUBMITTED')}
                    >
                        New Submissions ({applications.filter(a => a.application_status === 'SUBMITTED').length})
                    </button>
                    <button
                        className={`dashboard-nav-link ${activeTab === 'IN-REVIEW' ? 'active' : ''}`}
                        onClick={() => setActiveTab('IN-REVIEW')}
                    >
                        In Review ({applications.filter(a => a.application_status === 'IN-REVIEW').length})
                    </button>
                </div>
            </nav>

            <div className="container" style={{ marginTop: '40px' }}>
                {isLoading && <div className="loading-bar">Updating...</div>}

                <div className="premium-list">
                    {filteredApps.length === 0 ? (
                        <div className="empty-state">No applications in this category.</div>
                    ) : (
                        filteredApps.map((app) => (
                            <div key={app.id} className="premium-card">
                                <div className="card-content">
                                    <div className="card-top">
                                        <h3>{app.full_name} <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#666' }}>({app.email})</span></h3>
                                        <div className={`status-pill ${app.application_status.toLowerCase()}`}>
                                            {app.application_status}
                                        </div>
                                    </div>
                                    <p>Program: <strong>{app.program}</strong></p>
                                    {app.github_link && (
                                        <p>Links: <a href={app.github_link} target="_blank" rel="noopener noreferrer" className="btn-link">{app.github_link}</a></p>
                                    )}
                                    <div className="card-actions" style={{ marginTop: '16px' }}>
                                        {activeTab === "APPLIED" && (
                                            <button
                                                className="btn-primary-small"
                                                onClick={() => handleAction(app.id, "SEND_PROJECTS")}
                                                disabled={isLoading}
                                            >
                                                Send Projects & Assign
                                            </button>
                                        )}
                                        {activeTab === "SUBMITTED" && (
                                            <button
                                                className="btn-primary-small"
                                                onClick={() => handleAction(app.id, "MOVE_TO_REVIEW")}
                                                disabled={isLoading}
                                            >
                                                Move to In-Review
                                            </button>
                                        )}
                                        {activeTab === "IN-REVIEW" && (
                                            <button
                                                className="btn-primary-small"
                                                onClick={() => handleAction(app.id, "COMPLETE_REVIEW")}
                                                style={{ background: '#22c55e' }}
                                                disabled={isLoading}
                                            >
                                                Complete Review & Issue Cert
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {renderModal()}
        </main>
    );
}
