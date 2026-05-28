import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

import portrait from "@/assets/portrait-hero.webp";

import CursorReveal from "@/components/CursorReveal";
import Footer from "@/components/Footer";

import project1 from "@/assets/project-1.webp";
import project2 from "@/assets/project-2.webp";
import project3 from "@/assets/project-3.webp";
import project4 from "@/assets/project-4.webp";

const logos = ["React.js", "Node.js", "MongoDB", "Express.js", "JavaScript"];

const titles = [
  "Web Developer",
  "Software Engineer",
  "Tech Enthusiast",
  "Code Tinkerer",
];

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

const titleFontSize: Record<string, string> = {
  "Web Developer": "text-[5.5vw] sm:text-3xl md:text-4xl lg:text-4xl",
  "Software Engineer": "text-[5vw] sm:text-2xl md:text-3xl lg:text-3xl",
  "Tech Enthusiast": "text-[5vw] sm:text-2xl md:text-3xl lg:text-3xl",
  "Code Tinkerer": "text-[5.5vw] sm:text-3xl md:text-4xl lg:text-4xl",
};

const HomeSection = ({ loaderDone = false }: { loaderDone?: boolean }) => {
  const ready = loaderDone;

  const sectionRef = useRef<HTMLElement>(null);

  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const glowScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.4]);

  const glowOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    if (!ready) return;

    const currentTitle = titles[titleIndex];

    if (!isDeleting) {
      if (displayText.length < currentTitle.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        }, 80);

        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsDeleting(true), 1800);

        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);

        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);

        setTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }
  }, [ready, displayText, isDeleting, titleIndex]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },

    animate: ready
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 30 },

    transition: {
      delay,
      duration: 0.7,
      ease: easing,
    },
  });

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-auto overflow-visible"
        onClick={(e) => {
          const target = e.target as HTMLElement;

          if (!target.closest("a, button, [role='button']")) {
            window.open("/resume.pdf", "_blank");
          }
        }}
      >
        {/* Background */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 -top-20 -bottom-96 bg-gradient-to-b from-background via-[hsl(var(--neon-glow)/0.25)] via-[hsl(var(--neon)/0.45)] to-transparent pointer-events-none"
        />

        <div className="container relative z-10 mx-auto px-6 pt-12 pb-0 md:pt-14 w-full">
          <AnimatePresence>
            {ready && (
              <>
                {/* HERO */}
                <motion.div
                  className="relative flex flex-col items-center"
                  style={{
                    y: titleY,
                    opacity: titleOpacity,
                  }}
                >
                  {/* Heading */}
                  <motion.h1
                    {...fadeUp(0.08)}
                    className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[0.95] text-center relative z-20 lg:-mt-4"
                  >
                    Hi I'm Shubham
                  </motion.h1>

                  {/* Animated Title */}
                  <div className="relative z-10 -mt-0.5 md:-mt-1 h-[7vw] sm:h-[2.5rem] md:h-[3rem] lg:h-[3.5rem] flex items-center justify-center">
                    <p
                      className={`${titleFontSize[titles[titleIndex]]} font-serif-display italic font-medium text-foreground leading-[0.85] text-center whitespace-nowrap`}
                    >
                      {displayText}

                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                        className="inline-block w-[3px] sm:w-[4px] lg:w-[5px] h-[1em] bg-accent ml-1 align-middle"
                      />
                    </p>
                  </div>

                  {/* Portrait */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.92,
                      y: 30,
                    }}
                    animate={
                      ready
                        ? {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                          }
                        : {}
                    }
                    transition={{
                      delay: 0.12,
                      duration: 0.8,
                      ease: easing,
                    }}
                    style={{ y: portraitY }}
                    className="relative z-10 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-12 
w-[18%] sm:w-[20%] md:w-[22%] lg:w-[18%] 
mx-auto flex justify-center"
                  >
                    {/* Glow */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.6,
                      }}
                      animate={
                        ready
                          ? {
                              opacity: 1,
                              scale: 1,
                            }
                          : {}
                      }
                      transition={{
                        delay: 0.2,
                        duration: 1,
                        ease: easing,
                      }}
                      style={{
                        scale: glowScale,
                        opacity: glowOpacity,
                      }}
                      className="absolute inset-0 -inset-x-12 -inset-y-8 rounded-full bg-[radial-gradient(ellipse_at_center,hsl(var(--neon)/0.5)_0%,hsl(var(--neon-glow)/0.3)_40%,transparent_70%)] blur-2xl"
                    />

                    <CursorReveal
                      portrait={portrait}
                      className="relative z-10"
                      imgClassName="object-contain drop-shadow-[0_20px_40px_hsl(var(--neon)/0.3)] [mask-image:radial-gradient(ellipse_65%_60%_at_50%_45%,black_45%,transparent_95%)]"
                    />
                  </motion.div>
                </motion.div>

                {/* GLASSMORPHISM CARDS */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.48,
                    duration: 0.8,
                    ease: easing,
                  }}
                  className="relative z-30 -mt-32 sm:-mt-20 md:-mt-20 lg:-mt-30 max-w-6xl mx-auto"
                >
                  {/* Ambient glow behind cards */}
                  <div className="absolute inset-0 flex justify-center pointer-events-none">
                    <div className="w-[80%] h-56 bg-[radial-gradient(circle,hsl(var(--neon)/0.2)_0%,transparent_70%)] blur-3xl" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 relative">
                    {/* Card 1 — Developer Portfolio */}
                    <motion.div
                      whileHover={{
                        y: -6,
                        scale: 1.01,
                        transition: { type: "spring", stiffness: 300, damping: 20 }
                      }}
                      className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/50 backdrop-blur-xl shadow-[0_15px_35px_-12px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)] transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/5 to-transparent opacity-90 pointer-events-none" />
                      
                      <div className="relative z-10 p-6 md:p-7">
                        <div className="mb-2">
                          <span className="text-[11px] tracking-[0.25em] uppercase text-accent/80 font-semibold">
                            FOR RECRUITERS & TECH TEAMS
                          </span>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mt-1">
                          Developer Portfolio
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2 mt-5">
                          {[
                            "Resume / CV",
                            "Services I Offer",
                            "Projects & Case Studies",
                            "Client Projects",
                            "Skills & Tech Stack",
                            "Testimonials & Reviews",
                            "Work Experience",
                            "Case Studies",
                            "GitHub & Achievements",
                            "Let's Work Together"
                          ].map((item) => (
                            <div key={item} className="flex items-center gap-2.5">
                              <span className="text-accent/80 text-base leading-none">○</span>
                              <span className="text-sm text-foreground/80 font-medium">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        <a
                          href="developer"
                          className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-white/50 px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white/80 hover:shadow-md hover:gap-3 group/btn"
                        >
                          View Developer Portfolio
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="text-accent text-base"
                          >
                            →
                          </motion.span>
                        </a>
                      </div>
                      
                      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-accent/20 shadow-[0_0_15px_rgba(0,255,255,0.2)]" />
                    </motion.div>

                    {/* Card 2 — Freelance Services */}
                    <motion.div
                      whileHover={{
                        y: -6,
                        scale: 1.01,
                        transition: { type: "spring", stiffness: 300, damping: 20 }
                      }}
                      className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/50 backdrop-blur-xl shadow-[0_15px_35px_-12px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)] transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/5 to-transparent opacity-90 pointer-events-none" />
                      
                      <div className="relative z-10 p-6 md:p-7">
                        <div className="mb-2">
                          <span className="text-[11px] tracking-[0.25em] uppercase text-accent/80 font-semibold">
                            FOR CLIENTS & BUSINESSES
                          </span>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mt-1">
                          Freelance Services
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2 mt-5">
                          {[
                            "Services I Offer",
                            "Client Projects",
                            "Testimonials & Reviews",
                            "Case Studies",
                            "Let's Work Together",
                            "Custom Development",
                            "Technical Consulting",
                            "Code Reviews & Audit",
                            "Performance Optimization",
                            "Long-term Support"
                          ].map((item) => (
                            <div key={item} className="flex items-center gap-2.5">
                              <span className="text-accent/80 text-base leading-none">○</span>
                              <span className="text-sm text-foreground/80 font-medium">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        <a
                          href="freelance"
                          className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-white/50 px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white/80 hover:shadow-md hover:gap-3 group/btn"
                        >
                          Explore Freelance Work
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="text-accent text-base"
                          >
                            →
                          </motion.span>
                        </a>
                      </div>
                      
                      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-accent/20 shadow-[0_0_15px_rgba(0,255,255,0.2)]" />
                    </motion.div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      {/* Footer with no top margin */}
      
      </section>
      <div className="mt-10">
        <Footer />
      </div>  
     
    </>
  );
};

export default HomeSection;