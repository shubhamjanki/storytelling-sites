import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WorkSection from "@/components/WorkSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import useAmbientMusic from "@/hooks/useAmbientMusic";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const { start: startMusic } = useAmbientMusic();

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const handleEnter = useCallback(() => {
    startMusic();
  }, [startMusic]);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={handleLoaderComplete} onEnter={handleEnter} />}
      </AnimatePresence>
      <motion.div
        className="min-h-screen bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Navbar />
        <HeroSection loaderDone={!loading} />
        <AboutSection />
        <ProcessSection />
        <TestimonialsSection />
        <WorkSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
