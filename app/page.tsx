import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogoCarousel from "@/components/LogoCarousel";
import OverviewSection from "@/components/OverviewSection";
import AboutUsSection from "@/components/AboutUsSection";
import Services from "@/components/Services";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white antialiased">
      <Navbar />
      <HeroSection />
      <LogoCarousel />
      <OverviewSection />
      <AboutUsSection />
      <Services />
      <Footer />
    </main>
  );
}