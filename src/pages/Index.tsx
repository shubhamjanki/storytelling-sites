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

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <Loader onComplete={handleLoaderComplete} />}</AnimatePresence>
      <motion.div
        className="min-h-screen bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Navbar />
        <HeroSection />
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
