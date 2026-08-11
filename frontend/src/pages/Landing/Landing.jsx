import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import Hero from "../../components/landing/Hero";
import ProblemSection from "../../components/landing/ProblemSection";
import Features from "../../components/landing/Features";
import HowItWorks from "../../components/landing/HowItWorks";
import Team from "../../components/landing/Team";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0B0D12] text-white">
      <Navbar />

      <main id="top">
        <Hero />
        <ProblemSection />
        <Features />
        <HowItWorks />
        <Team />
      </main>

      <Footer />
    </div>
  );
}