"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const BASE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSefCu9swRQfPpfrX-ngxU6oMq_d6tXvrSnPTDyY3QcUSWAe0Q/viewform";

const PROGRAM_MAP: Record<string, string> = {
    backend: "Backend Development",
    frontend: "Frontend Development",
    fullstack: "Full Stack Development",
    java: "Java Development",
    python: "Python Development",
    go: "Go Development",
};

const ENTRY_ID = "entry.2005620554";

/**
 * Inner client component that uses useSearchParams
 * MUST be wrapped in Suspense
 */
function ApplyContent() {
    const searchParams = useSearchParams();
    const slug = searchParams.get("program");

    const formUrl =
        slug && PROGRAM_MAP[slug]
            ? `${BASE_FORM_URL}?usp=pp_url&${ENTRY_ID}=${encodeURIComponent(
                PROGRAM_MAP[slug]
            )}`
            : BASE_FORM_URL;

    return (
        <section className="page-container">
            {/* HEADER */}
            <header className="apply-header">
                <h1>Apply to InternHub</h1>
                <p>
                    InternHub offers structured, project-based learning programs.
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
                <iframe
                    key={formUrl}
                    src={formUrl}
                    width="100%"
                    height="1400"
                    frameBorder="0"
                >
                    Loading…
                </iframe>
            </div>
        </section>
    );
}

export default function ApplyPage() {
    return (
        <Suspense fallback={<div />}>
            <ApplyContent />
        </Suspense>
    );
}
