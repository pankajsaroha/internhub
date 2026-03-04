"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState<"EMAIL" | "OTP">("EMAIL");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const router = useRouter();

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: "", text: "" });

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: true,
            },
        });

        if (error) {
            setMessage({ type: "error", text: error.message });
        } else {
            setStep("OTP");
            setMessage({ type: "success", text: "OTP sent to your email!" });
        }
        setIsLoading(false);
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: "", text: "" });

        const { error } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: "email",
        });

        if (error) {
            setMessage({ type: "error", text: error.message });
            setIsLoading(false);
        } else {
            // Keep isLoading true during redirect to keep button state
            setTimeout(() => {
                router.push("/dashboard");
                router.refresh();
            }, 1000);
        }
    };

    return (
        <main className="page-container">
            <div className="apply-header" data-aos="fade-down">
                <h1>{step === "EMAIL" ? "Welcome Back" : "Verify OTP"}</h1>
                <p className="subtitle">
                    {step === "EMAIL"
                        ? "Enter your email to receive a 6-digit login code."
                        : `We sent a code to ${email}`}
                </p>
            </div>

            <div className="compact-form-wrapper" data-aos="zoom-in">
                {message.text && (
                    <div className={`alert ${message.type}`}>
                        {message.text}
                    </div>
                )}

                {step === "EMAIL" ? (
                    <form className="premium-form" onSubmit={handleSendOtp}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary form-submit" disabled={isLoading}>
                            {isLoading ? "Sending..." : "Send OTP"}
                        </button>
                    </form>
                ) : (
                    <form className="premium-form" onSubmit={handleVerifyOtp}>
                        <div className="form-group">
                            <label>6-Digit Code</label>
                            <input
                                type="text"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="000000"
                                required
                                className="otp-input"
                            />
                        </div>
                        <button type="submit" className="btn-primary form-submit" disabled={isLoading}>
                            {isLoading ? "Verifying..." : "Verify & Login"}
                        </button>
                        <button
                            type="button"
                            className="btn-link"
                            onClick={() => setStep("EMAIL")}
                            disabled={isLoading}
                        >
                            Change Email
                        </button>
                    </form>
                )}
            </div>
        </main>
    );
}
