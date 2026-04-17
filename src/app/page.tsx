import Navigation from "@/components/Navigation";
import StarField, { ShootingStars } from "@/components/StarField";
import FloatingPlanets from "@/components/FloatingPlanets";
import Aurora from "@/components/Aurora";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import ZodiacSigns from "@/components/ZodiacSigns";
import DailyHoroscopes from "@/components/DailyHoroscopes";
import BirthChart from "@/components/BirthChart";
import Compatibility from "@/components/Compatibility";
import Testimonials from "@/components/Testimonials";
import FooterCTA from "@/components/FooterCTA";

export default function Home() {
  return (
    <>
      {/* Background layers (fixed, behind everything) */}
      <StarField />
      <ShootingStars />
      <FloatingPlanets />
      <Aurora />

      {/* Smooth scroll driver (no UI) */}
      <SmoothScroll />

      {/* Navigation (fixed) */}
      <Navigation />

      {/* Main scroll container */}
      <main id="main-content" className="relative z-10">
        <Hero />

        {/* Section divider */}
        <div className="cosmic-divider mx-6" />

        <ZodiacSigns />

        <div className="cosmic-divider mx-6" />

        <DailyHoroscopes />

        <div className="cosmic-divider mx-6" />

        <BirthChart />

        <div className="cosmic-divider mx-6" />

        <Compatibility />

        <div className="cosmic-divider mx-6" />

        <Testimonials />

        <FooterCTA />
      </main>
    </>
  );
}
