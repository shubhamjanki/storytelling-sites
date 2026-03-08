import { motion } from "framer-motion";
import portrait from "@/assets/portrait.png";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const logos = ["React.js", "Node.js", "MongoDB", "Express.js", "JavaScript"];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16">
      {/* Neon glow background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px]">
        <div className="w-full h-full neon-gradient rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Award badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <span className="text-lg">✦</span> MERN Stack Developer
          </span>
        </motion.div>

        {/* Main hero content - split layout */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-4">
          {/* Left side - text */}
          <div className="flex-1 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-5xl md:text-7xl lg:text-8xl font-light text-foreground leading-[1.05]"
            >
              Hi I'm Shubham
              <br />
              <span className="font-serif-display italic font-medium">Web Developer</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 flex flex-col md:flex-row items-center md:items-start gap-4"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Available for new opportunities
              </span>
            </motion.div>
          </div>

          {/* Center - portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative w-56 md:w-72 lg:w-80 flex-shrink-0"
          >
            <img
              src={portrait}
              alt="Shubham Pandey – Web Developer"
              className="relative z-10 w-full grayscale-[30%] mix-blend-luminosity"
            />
          </motion.div>

          {/* Right side - description + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex-1 flex flex-col items-center md:items-end text-center md:text-right gap-5"
          >
            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
              MERN stack developer passionate about building scalable, responsive, and performance-optimized web applications.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <span>→</span> Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Logo strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground/60"
        >
          {logos.map((logo) => (
            <span key={logo} className="flex items-center gap-1.5">
              <span className="h-4 w-4 rounded-full border border-muted-foreground/20" />
              {logo}
            </span>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto"
        >
          <div className="col-span-2 row-span-2 overflow-hidden rounded-2xl bg-surface">
            <img src={project1} alt="AI Mock Interview" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="overflow-hidden rounded-2xl bg-surface">
            <img src={project2} alt="Aayuvardan" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="overflow-hidden rounded-2xl bg-surface">
            <img src={project3} alt="Maxton" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="col-span-2 overflow-hidden rounded-2xl bg-surface">
            <img src={project4} alt="Music Player" className="w-full h-full object-cover aspect-[2/1]" loading="lazy" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
