import { motion } from "motion/react"
import { NavBar } from "../../components/landingPage/navBar";
import { InfoBlocks } from "../../components/landingPage/InfoBlocks";
import { HeroSection } from "../../components/landingPage/heroSection";
import { StepsSection } from "../../components/landingPage/stepsSection";
import { Footer } from "../../components/footer";
import { Testimonials } from "../../components/landingPage/testimonials";

export const LandingPage = () => {
  return (
    <div className="container scroll-smooth ">
      <NavBar />
      <HeroSection />
      <InfoBlocks />
      <StepsSection />
      <Testimonials />
      <Footer />
    </div>
  );
};
