import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WorkSection from "@/components/WorkSection";
import ExperienceSection from "@/components/ExperienceSection";
import TechSection from "@/components/TechSection";
import ContactSection from "@/components/ContactSection";
import SocialSection from "@/components/SocialSection";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import ScrollUnmask from "@/components/ScrollUnmask";
import useAmbientMusic from "@/hooks/useAmbientMusic";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const { start: startMusic, pause: pauseMusic } = useAmbientMusic();

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const handleEnter = useCallback(() => {
    startMusic();
    setMusicPlaying(true);
  }, [startMusic]);

  const handleToggleMusic = useCallback(() => {
    const isNowPlaying = pauseMusic();
    setMusicPlaying(!!isNowPlaying);
  }, [pauseMusic]);

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
        <Navbar musicPlaying={musicPlaying} onToggleMusic={handleToggleMusic} />
        <HeroSection loaderDone={!loading} />
        <AboutSection />
        <ScrollUnmask>
          <TechSection />
        </ScrollUnmask>
        <ProcessSection />
        <ScrollUnmask>
          <TestimonialsSection />
        </ScrollUnmask>
        <ScrollUnmask>
          <WorkSection />
        </ScrollUnmask>
        <ExperienceSection />
        <ScrollUnmask>
          <ContactSection />
        </ScrollUnmask>
        <SocialSection />
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
