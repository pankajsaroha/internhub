import Hero from "../components/Hero";
import CertificationsSection from "../components/CertificationsSection";
import ResourceHub from "../components/ResourceHub";
import ProjectDemo from "../components/ProjectDemo";
import RealProjects from "../components/RealProjects";
import LearningPath from "../components/LearningPath";
import Outcome from "../components/Outcome";

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
      <CertificationsSection />
      <ResourceHub />
      <ProjectDemo />
      <RealProjects />
      <LearningPath />
      <Outcome />
    </>
  );
}
