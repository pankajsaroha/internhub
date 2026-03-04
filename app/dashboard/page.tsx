"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Script from "next/script";

interface Application {
    id: string;
    program: string;
    application_status: string;
    created_at: string;
    assigned_track: string;
    experience_level: string;
}

interface Certificate {
    certificate_id: string;
    program: string;
    payment_status: string;
    created_at: string;
}

function renderProgramIcon(slug: string) {
    switch (slug) {
        case "frontend-development":
            return (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="14" rx="2" stroke="#3b82f6" strokeWidth="2" />
                    <path d="M3 8h18" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="6" cy="6" r="1" fill="#3b82f6" />
                    <circle cx="9" cy="6" r="1" fill="#3b82f6" />
                </svg>
            );
        case "backend-development":
            return (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="3" width="16" height="6" rx="2" stroke="#6366f1" strokeWidth="2" />
                    <rect x="4" y="10" width="16" height="6" rx="2" stroke="#6366f1" strokeWidth="2" />
                    <circle cx="8" cy="6" r="1" fill="#6366f1" />
                    <circle cx="8" cy="13" r="1" fill="#6366f1" />
                </svg>
            );
        case "full-stack-development":
            return (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3l8 4-8 4-8-4 8-4z" stroke="#22c55e" strokeWidth="2" />
                    <path d="M4 11l8 4 8-4" stroke="#22c55e" strokeWidth="2" />
                    <path d="M4 15l8 4 8-4" stroke="#22c55e" strokeWidth="2" />
                </svg>
            );
        case "java-programming":
            return (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M8 17h6a3 3 0 003-3V7H5v7a3 3 0 003 3z" stroke="#a855f7" strokeWidth="2" />
                    <path d="M17 9h1a2 2 0 010 4h-1" stroke="#a855f7" strokeWidth="2" />
                    <path
                        d="M9 3s2 1 2 3-2 2-2 4"
                        stroke="#a855f7"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            );
        case "python-programming":
            return (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3c4 0 4 2 4 4H8c0-2 0-4 4-4z" stroke="#10b981" strokeWidth="2" />
                    <path d="M12 21c-4 0-4-2-4-4h8c0 2 0 4-4 4z" stroke="#10b981" strokeWidth="2" />
                    <circle cx="10" cy="6" r="1" fill="#10b981" />
                    <circle cx="14" cy="18" r="1" fill="#10b981" />
                </svg>
            );
        case "go-programming":
            return (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12h10l-3-3" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
                    <path d="M14 12l-3 3" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="18" cy="12" r="2" stroke="#0ea5e9" strokeWidth="2" />
                </svg>
            );
        default:
            return <span>🎯</span>;
    }
}

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [applications, setApplications] = useState<Application[]>([]);
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'CERTIFICATES'>('OVERVIEW');
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/login");
                return;
            }
            setUser(session.user);
            fetchData(session.user.email!);
        };

        checkAuth();
    }, [router]);

    const fetchData = async (email: string) => {
        setIsLoading(true);
        // Fetch Applications
        const { data: apps } = await supabase
            .from("applications")
            .select("*")
            .eq("email", email)
            .order("created_at", { ascending: false });

        // Fetch Certificates
        const { data: certs } = await supabase
            .from("certificates")
            .select("*")
            .eq("email", email)
            .order("created_at", { ascending: false });

        setApplications(apps || []);
        setCertificates(certs || []);
        setIsLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    const handlePayment = async (cert: Certificate) => {
        const res = await loadRazorpay();
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: 49900, // Amount in paise (499 INR)
            currency: "INR",
            name: "Inzivoo",
            description: `Payment for ${cert.program} Certificate`,
            image: "/logo.png",
            handler: async (response: any) => {
                if (response.razorpay_payment_id) {
                    setIsLoading(true);
                    const { error } = await supabase
                        .from("certificates")
                        .update({ payment_status: "PAID" })
                        .eq("certificate_id", cert.certificate_id);

                    if (error) {
                        alert("Payment successful but database update failed. Please contact support.");
                    } else {
                        // Refresh to show download button
                        if (user) fetchData(user.email);
                    }
                    setIsLoading(false);
                }
            },
            prefill: {
                name: user?.email?.split('@')[0],
                email: user?.email,
            },
            theme: {
                color: "#3b82f6",
            },
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    if (isLoading) {
        return (
            <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading your dashboard...</p>
            </div>
        );
    }

    return (
        <main className="dashboard-page">
            <div className="dashboard-header">
                <div className="container">
                    <div className="header-info">
                        <h1>Welcome, {user?.email?.split('@')[0]}</h1>
                        <p>Track your learning progress and certificates</p>
                    </div>
                </div>
            </div>

            <nav className="dashboard-nav">
                <div className="container">
                    <button
                        className={`dashboard-nav-link ${activeTab === 'OVERVIEW' ? 'active' : ''}`}
                        onClick={() => setActiveTab('OVERVIEW')}
                    >
                        My Applications
                    </button>
                    <button
                        className={`dashboard-nav-link ${activeTab === 'CERTIFICATES' ? 'active' : ''}`}
                        onClick={() => setActiveTab('CERTIFICATES')}
                    >
                        Certificates
                    </button>
                    <button className="dashboard-nav-link" onClick={() => router.push("/submit")}>Submit Project</button>
                </div>
            </nav>

            <div className="container">
                {/* Applications Section */}
                {activeTab === 'OVERVIEW' && (
                    <section className="premium-section">
                        <div className="section-header">
                            <div className="header-title-group">
                                <h2>My Ongoing Applications</h2>
                                <span className="badge">{applications.length}</span>
                            </div>
                        </div>

                        {applications.length > 0 ? (
                            <div className="premium-list">
                                {applications.map((app) => (
                                    <div key={app.id} className="premium-card">
                                        <div className="card-media">
                                            <div className="media-placeholder">
                                                {renderProgramIcon(app.program)}
                                            </div>
                                        </div>
                                        <div className="card-content">
                                            <div className="card-top">
                                                <h3>{app.program.replace(/-/g, ' ').toUpperCase()}</h3>
                                                <div className={`status-pill ${app.application_status.toLowerCase()}`}>
                                                    {app.application_status}
                                                </div>
                                            </div>
                                            <div className="card-bottom">
                                                <p>Experience: {app.experience_level}</p>
                                                <p className="timestamp">Applied on {new Date(app.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <p>You haven't applied for any programs yet.</p>
                                <button onClick={() => router.push("/apply")} className="btn-secondary">Explore Programs</button>
                            </div>
                        )}
                    </section>
                )}

                {/* Certificates Section */}
                {activeTab === 'CERTIFICATES' && (
                    <section className="premium-section">
                        <div className="section-header">
                            <div className="header-title-group">
                                <h2>Earned Certificates</h2>
                                <span className="badge">{certificates.length}</span>
                            </div>
                        </div>

                        {certificates.length > 0 ? (
                            <div className="premium-list">
                                {certificates.map((cert) => (
                                    <div key={cert.certificate_id} className="premium-card">
                                        <div className="card-media">
                                            <div className="media-placeholder cert-icon">🏆</div>
                                        </div>
                                        <div className="card-content">
                                            <div className="card-top">
                                                <h3>{cert.program}</h3>
                                                <div className={`status-pill ${cert.payment_status.toLowerCase()}`}>
                                                    {cert.payment_status}
                                                </div>
                                            </div>
                                            <div className="card-bottom">
                                                <p>ID: {cert.certificate_id}</p>
                                                <div className="card-actions">
                                                    {cert.payment_status === "PAID" ? (
                                                        <button
                                                            className="btn-primary-small"
                                                            onClick={() => window.open(`/api/certificates/pdf?id=${cert.certificate_id}`, '_blank')}
                                                        >
                                                            Download Certificate
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn-primary-small"
                                                            onClick={() => handlePayment(cert)}
                                                        >
                                                            Pay & Download
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <p>Complete your tasks to earn certificates.</p>
                                <button onClick={() => setActiveTab('OVERVIEW')} className="btn-secondary">View Applications</button>
                            </div>
                        )}
                    </section>
                )}
            </div>

        </main>
    );
}
