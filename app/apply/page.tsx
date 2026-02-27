"use client";
export const dynamic = "force-dynamic";

import ApplyForm from "@/components/ApplyForm";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Inner client component that uses useSearchParams
 * MUST be wrapped in Suspense
 */
function ApplyContent() {
    const searchParams = useSearchParams();
    const slug = searchParams.get("program") || undefined;

    return (
        <section className="page-container">
            {/* HEADER */}
            <header className="apply-header" data-aos="fade-down" suppressHydrationWarning={true}>
                <h1>Apply to Inzivoo</h1>
                <p>
                    Inzivoo offers structured, project-based learning programs.
                    Applications are reviewed manually to ensure a good fit.
                </p>

                <div className="apply-trust">
                    <span>✔ Manual review</span>
                    <span>✔ Project-based learning</span>
                    <span>✔ Certificate on completion</span>
                </div>
            </header>

            {/* FORM */}
            <div className="apply-form-wrapper">
                <ApplyForm initialProgram={slug} />
            </div>
        </section>
    );
}

export default function ApplyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ApplyContent />
        </Suspense>
    );
}
