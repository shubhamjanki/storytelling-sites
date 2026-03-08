import { motion } from "framer-motion";
import portrait from "@/assets/portrait.png";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const logos = ["React.js", "Node.js", "MongoDB", "Express.js", "JavaScript"];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Full neon gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(var(--neon-glow)/0.3)] to-[hsl(var(--neon)/0.6)]" />

      <div className="container relative z-10 mx-auto px-6 pt-24">
        {/* Award badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-lg">✦</span> MERN Stack Developer
          </span>
        </motion.div>

        {/* Centered heading with portrait behind */}
        <div className="relative text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-[0.95] relative z-20"
          >
            Hi I'm Shubham
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-serif-display italic font-medium text-foreground leading-[0.9] relative z-10 -mt-2 md:-mt-4"
          >
            Web Developer
          </motion.p>

          {/* Portrait - centered, overlapping behind text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-0 w-64 md:w-80 lg:w-96 z-[15] translate-y-[30%]"
          >
            <img
              src={portrait}
              alt="Shubham Pandey – Web Developer"
              className="w-full grayscale mix-blend-multiply"
            />
          </motion.div>
        </div>

        {/* Availability + Description row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative z-20 flex flex-col md:flex-row items-center justify-between mt-16 md:mt-24"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur-sm px-5 py-2 text-sm text-foreground">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            Available for new opportunities
          </span>

          <p className="max-w-xs text-sm text-foreground/80 text-right mt-4 md:mt-0 leading-relaxed">
            passionate about building scalable, responsive web applications that connect users with value.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="relative z-20 flex justify-end mt-6"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <span>→</span> Get in Touch
          </a>
        </motion.div>

        {/* Logo strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="relative z-20 mt-16 flex flex-wrap justify-center gap-8 text-sm text-foreground/50"
        >
          {logos.map((logo) => (
            <span key={logo} className="flex items-center gap-1.5">
              <span className="h-4 w-4 rounded-full border border-foreground/20" />
              {logo}
            </span>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-16 pb-16 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto relative z-20"
        >
          <div className="col-span-2 row-span-2 overflow-hidden rounded-2xl bg-surface shadow-lg">
            <img src={project1} alt="AI Mock Interview" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="overflow-hidden rounded-2xl bg-surface shadow-lg">
            <img src={project2} alt="Aayuvardan" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="overflow-hidden rounded-2xl bg-surface shadow-lg">
            <img src={project3} alt="Maxton" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="col-span-2 overflow-hidden rounded-2xl bg-surface shadow-lg">
            <img src={project4} alt="Music Player" className="w-full h-full object-cover aspect-[2/1]" loading="lazy" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
