"use client";

import React, { useState } from "react";

const PROGRAM_MAP: Record<string, string> = {
    backend: "Backend Development",
    frontend: "Frontend Development",
    fullstack: "Full Stack Development",
    java: "Java Development",
    python: "Python Development",
    go: "Go Development",
};

interface FormData {
    full_name: string;
    email: string;
    program: string;
    applicant_type: string;
    student_year: string;
    experience_level: string;
    agreed_to_terms: boolean;
}

interface ApplyFormProps {
    initialProgram?: string;
}

export default function ApplyForm({ initialProgram }: ApplyFormProps) {
    const [formData, setFormData] = useState<FormData>({
        full_name: "",
        email: "",
        program: initialProgram || "",
        applicant_type: "STUDENT",
        student_year: "",
        experience_level: "",
        agreed_to_terms: false,
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

        setFormData((prev) => ({
            ...prev,
            [name]: val,
        }));

        // Clear error when user starts typing
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validate = () => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        if (!formData.full_name.trim()) newErrors.full_name = "Full name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.program) newErrors.program = "Please select a program";

        if (formData.applicant_type === "STUDENT") {
            if (!formData.student_year) {
                newErrors.student_year = "Year of study is required";
            } else {
                const year = parseInt(formData.student_year);
                if (isNaN(year) || year < 1 || year > 4) {
                    newErrors.student_year = "Year must be between 1 and 4";
                }
            }
        } else if (formData.applicant_type === "WORKING_PROFESSIONAL") {
            if (!formData.experience_level) {
                newErrors.experience_level = "Years of experience is required";
            }
        }

        if (!formData.agreed_to_terms) {
            newErrors.agreed_to_terms = "You must agree to the terms";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        setErrors({});

        try {
            const response = await fetch("/api/apply", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to submit application");
            }

            setIsSuccess(true);
        } catch (err: any) {
            console.error("Submission error:", err);
            setErrors({ full_name: err.message || "Something went wrong. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="success-message" data-aos="zoom-in">
                <div className="success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h3>Application Received!</h3>
                <p>Thank you for applying to Inzivoo. We will review your application and get back to you soon.</p>
                <button onClick={() => setIsSuccess(false)} className="btn-primary">Apply for another program</button>
            </div>
        );
    }

    return (
        <form className="premium-form" onSubmit={handleSubmit} data-aos="fade-up">
            <div className="form-grid">
                {/* Full Name */}
                <div className="form-group">
                    <label htmlFor="full_name">Full Name</label>
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={errors.full_name ? "error" : ""}
                    />
                    {errors.full_name && <span className="error-text">{errors.full_name}</span>}
                </div>

                {/* Email */}
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={errors.email ? "error" : ""}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                {/* Program */}
                <div className="form-group">
                    <label htmlFor="program">Program of Interest</label>
                    <select
                        id="program"
                        name="program"
                        value={formData.program}
                        onChange={handleChange}
                        className={errors.program ? "error" : ""}
                    >
                        <option value="">Select a program</option>
                        {Object.entries(PROGRAM_MAP).map(([key, label]) => (
                            <option key={key} value={key}>
                                {label}
                            </option>
                        ))}
                    </select>
                    {errors.program && <span className="error-text">{errors.program}</span>}
                </div>

                {/* Applicant Type */}
                <div className="form-group">
                    <label htmlFor="applicant_type">Applicant Type</label>
                    <select
                        id="applicant_type"
                        name="applicant_type"
                        value={formData.applicant_type}
                        onChange={handleChange}
                    >
                        <option value="STUDENT">Student</option>
                        <option value="WORKING_PROFESSIONAL">Working Professional</option>
                    </select>
                </div>

                {/* Student Year - Conditional for STUDENTS */}
                {formData.applicant_type === "STUDENT" && (
                    <div className="form-group animate-slide">
                        <label htmlFor="student_year">Current Year of Study</label>
                        <input
                            type="number"
                            id="student_year"
                            name="student_year"
                            value={formData.student_year}
                            onChange={handleChange}
                            placeholder="1-4"
                            min="1"
                            max="4"
                            className={errors.student_year ? "error" : ""}
                        />
                        {errors.student_year && <span className="error-text">{errors.student_year}</span>}
                    </div>
                )}

                {/* Experience Level - Conditional for WORKING PROFESSIONALS */}
                {formData.applicant_type === "WORKING_PROFESSIONAL" && (
                    <div className="form-group animate-slide">
                        <label htmlFor="experience_level">Years of Experience</label>
                        <input
                            type="number"
                            id="experience_level"
                            name="experience_level"
                            value={formData.experience_level}
                            onChange={handleChange}
                            placeholder="e.g. 2"
                            min="0"
                            className={errors.experience_level ? "error" : ""}
                        />
                        {errors.experience_level && <span className="error-text">{errors.experience_level}</span>}
                    </div>
                )}
            </div>

            {/* Terms Agreement */}
            <div className="form-terms">
                <label className="checkbox-container">
                    <input
                        type="checkbox"
                        name="agreed_to_terms"
                        checked={formData.agreed_to_terms}
                        onChange={handleChange}
                    />
                    <span className="checkmark"></span>
                    <p className="terms-text">
                        I understand that Inzivoo is an unpaid, learning-focused program with no placement guarantees,
                        and certificates are issued only after successful completion and review.
                    </p>
                </label>
                {errors.agreed_to_terms && <span className="error-text">{errors.agreed_to_terms}</span>}
            </div>

            <button type="submit" className="btn-primary form-submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
        </form>
    );
}
