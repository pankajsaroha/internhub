import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Programs from "../components/Programs";
import Certificate from "../components/Certificate";
import Steps from "../components/Steps";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import AOSInit from "../components/AOSInit";

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
