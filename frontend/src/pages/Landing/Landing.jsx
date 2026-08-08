import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import Hero from "../../components/landing/Hero";
import ProblemSection from "../../components/landing/ProblemSection";
import Features from "../../components/landing/Features";
// import ProductPreview from "../../components/landing/ProductPreview";
import HowItWorks from "../../components/landing/HowItWorks";


export default function Landing() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      <main>
        <Hero />
        <ProblemSection />
        <Features />
        <HowItWorks />

        {/* <ProductPreview /> */}
      </main>

      <Footer />
    </div>
  );
}