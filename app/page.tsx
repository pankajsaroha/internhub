import type { Metadata } from "next";
import Hero from "../components/Hero";
import Programs from "../components/Programs";
import Certificate from "../components/Certificate";
import Steps from "../components/Steps";
import Testimonials from "../components/Testimonials";

export const metadata: Metadata = {
  title: "Project-Based Training and Programming Quizzes",
  description:
    "Explore Inzivoo project-based training programs, technical quizzes, practical learning paths, and certificates for software learners.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Inzivoo",
    url: "https://inzivoo.com",
    logo: "https://inzivoo.com/icon.png",
    description:
      "Inzivoo is a project-based learning platform offering technical training programs, programming quizzes, and completion certificates.",
    sameAs: ["https://inzivoo.com"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <Programs />
      <Certificate />
      <Steps />
      <Testimonials />
    </>
  );
}
