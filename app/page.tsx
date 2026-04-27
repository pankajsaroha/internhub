import Hero from "../components/Hero";
import CertificationsSection from "../components/CertificationsSection";
import ResourceHub from "../components/ResourceHub";
import ProjectDemo from "../components/ProjectDemo";
import RealProjects from "../components/RealProjects";
import LearningPath from "../components/LearningPath";
import Outcome from "../components/Outcome";

export default function Home() {
  return (
    <>
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
