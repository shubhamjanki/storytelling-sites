import { useState, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Loader from "@/components/Loader";
import useAmbientMusic from "@/hooks/useAmbientMusic";

const ProfileSection = lazy(() => import("@/components/ProfileSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const EngagementSection = lazy(() => import("@/components/EngagementSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const TechSection = lazy(() => import("@/components/TechSection"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const WorkSection = lazy(() => import("@/components/WorkSection"));
const BlogSection = lazy(() => import("@/components/BlogSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const SocialSection = lazy(() => import("@/components/SocialSection"));
const Footer = lazy(() => import("@/components/Footer"));

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
        className="page-shell min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="global-ambient-bg" aria-hidden="true">
          <div className="ambient-blob ambient-blob-hero" />
          <div className="ambient-blob ambient-blob-profile" />
          <div className="ambient-blob ambient-blob-tech" />
          <div className="ambient-blob ambient-blob-work" />
          <div className="ambient-blob ambient-blob-footer" />
        </div>
        <div className="relative z-10">
          <Navbar musicPlaying={musicPlaying} onToggleMusic={handleToggleMusic} />
          <HeroSection loaderDone={!loading} />
          <Suspense fallback={null}>
            <ProfileSection />
            <ServicesSection />
            <EngagementSection />
            <AboutSection />
            <TechSection />
            <ProcessSection />
            <TestimonialsSection />
            <WorkSection />
            <BlogSection />
            <ExperienceSection />
            <ContactSection />
            <SocialSection />
            <Footer />
          </Suspense>
        </div>
      </motion.div>
    </>
  );
};

export default Index;
