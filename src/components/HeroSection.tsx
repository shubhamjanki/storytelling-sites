import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import portrait from "@/assets/portrait-hero.png";
import CursorReveal from "@/components/CursorReveal";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const logos = ["React.js", "Node.js", "MongoDB", "Express.js", "JavaScript"];
const titles = ["Web Developer", "Software Engineer", "Tech Enthusiast", "Vibe Coder"];

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

const titleFontSize: Record<string, string> = {
  "Web Developer": "text-[3rem] sm:text-6xl md:text-7xl lg:text-[8.5rem]",
  "Software Engineer": "text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[7rem]",
  "Tech Enthusiast": "text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[7rem]",
  "Vibe Coder": "text-[3rem] sm:text-6xl md:text-7xl lg:text-[8.5rem]",
};

const HeroSection = ({ loaderDone = false }: { loaderDone?: boolean }) => {
  const ready = loaderDone;
  const sectionRef = useRef<HTMLElement>(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.4]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Typewriter effect
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
        // Pause before deleting
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
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { delay, duration: 0.7, ease: easing },
  });

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (!target.closest("a, button, [role='button']")) {
          window.open("/resume.pdf", "_blank");
        }
      }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(var(--neon-glow)/0.25)] to-[hsl(var(--neon)/0.45)]" />

      <div className="container relative z-10 mx-auto px-6 pt-28 md:pt-32">
        <AnimatePresence>
          {ready && (
            <>
              {/* Badge */}
              <motion.div {...fadeUp(0)} className="flex justify-center mb-8">
                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground tracking-wide">
                  <span className="text-lg">✦</span> MERN Stack Developer
                </span>
              </motion.div>

              {/* Text + Portrait stack */}
              <div className="relative flex flex-col items-center">
                <motion.h1
                  {...fadeUp(0.08)}
                  className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.95] text-center relative z-20"
                >
                  Hi I'm Shubham
                </motion.h1>

                <div className="relative z-10 -mt-1 md:-mt-2 h-[3.5rem] sm:h-[4.5rem] md:h-[5.5rem] lg:h-[9rem] flex items-center justify-center">
                  <p
                    className={`${titleFontSize[titles[titleIndex]]} font-serif-display italic font-medium text-foreground leading-[0.85] text-center whitespace-nowrap`}
                  >
                    {displayText}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                      className="inline-block w-[3px] sm:w-[4px] lg:w-[6px] h-[2.5rem] sm:h-[3.5rem] md:h-[4.5rem] lg:h-[7rem] bg-accent ml-1 align-middle"
                    />
                  </p>
                </div>

                {/* Portrait with gradient glow */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 30 }}
                  animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: 0.12, duration: 0.8, ease: easing }}
                  className="relative z-[15] mx-auto -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-24 w-64 sm:w-72 md:w-80 lg:w-96"
                >
                  {/* Glow */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={ready ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2, duration: 1, ease: easing }}
                    className="absolute inset-0 -inset-x-12 -inset-y-8 rounded-full bg-[radial-gradient(ellipse_at_center,hsl(var(--neon)/0.5)_0%,hsl(var(--neon-glow)/0.3)_40%,transparent_70%)] blur-2xl"
                  />
                  <CursorReveal
                    portrait={portrait}
                    className="relative z-10"
                    imgClassName="object-contain drop-shadow-[0_20px_40px_hsl(var(--neon)/0.3)] [mask-image:radial-gradient(ellipse_65%_60%_at_50%_45%,black_45%,transparent_95%)]"
                  />
                </motion.div>
              </div>

              {/* Availability + Description */}
              <motion.div
                {...fadeUp(0.25)}
                className="relative z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-16 sm:-mt-20 md:-mt-24 gap-4"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur-sm px-5 py-2 text-sm text-foreground shadow-sm">
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-2.5 w-2.5 rounded-full bg-accent"
                  />
                  Available for new opportunities
                </span>

                <p className="max-w-xs text-sm text-foreground/70 sm:text-right leading-relaxed">
                  passionate about building scalable, responsive web applications that connect users with value.
                </p>
              </motion.div>

              {/* CTA */}
              <motion.div {...fadeUp(0.32)} className="relative z-20 flex justify-end mt-5">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>{" "}
                  Get in Touch
                </a>
              </motion.div>

              {/* Logo strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative z-20 mt-14 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
              >
                {logos.map((logo, i) => (
                  <motion.span
                    key={logo}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.06 }}
                    className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-300"
                  >
                    <span className="h-4 w-4 rounded-full border border-border" />
                    {logo}
                  </motion.span>
                ))}
              </motion.div>

              {/* Bento Grid */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.8, ease: easing }}
                className="mt-14 pb-16 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto relative z-20"
              >
                {[
                  { src: project1, alt: "AI Mock Interview", className: "col-span-2 row-span-2" },
                  { src: project2, alt: "Aayuvardan", className: "" },
                  { src: project3, alt: "Maxton", className: "" },
                  { src: project4, alt: "Music Player", className: "col-span-2 aspect-[2/1]" },
                ].map((p) => (
                  <motion.div
                    key={p.alt}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`${p.className} overflow-hidden rounded-2xl bg-surface shadow-lg cursor-pointer`}
                  >
                    <img src={p.src} alt={p.alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;
