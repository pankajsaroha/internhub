import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Programs from "../components/Programs";
import Certificate from "../components/Certificate";
import Steps from "../components/Steps";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import AOSInit from "../components/AOSInit";

export default function Home() {
  return (
    <>
      <Hero />
      <Programs />
      <Certificate />
      <Steps />
      <Testimonials />
      <AOSInit />
    </>
  );
}
