import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import Hero from "../../components/landing/Hero";
import ProblemSection from "../../components/landing/ProblemSection";
import HowItWorks from "../../components/landing/HowItWorks";
import Features from "../../components/landing/Features";
import ProductPreview from "../../components/landing/ProductPreview";
import Team from "../../components/landing/Team";

export default function Landing() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <Features />
        <ProductPreview />
        <Team />
      </main>
      <Footer />
    </div>
  );
}