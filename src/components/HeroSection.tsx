import { motion } from "framer-motion";
import portrait from "@/assets/portrait.png";

const logos = ["React.js", "Node.js", "MongoDB", "Express.js", "JavaScript"];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Neon glow background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] neon-gradient rounded-full blur-3xl opacity-70" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground"
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
            Available for new opportunities
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light text-foreground leading-[1.1]"
          >
            Hi I'm Elian
            <br />
            <span className="font-serif-display italic font-medium">Product Designer</span>
          </motion.h1>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative my-8 w-64 md:w-80"
          >
            <img
              src={portrait}
              alt="Elian Ross – Product Designer"
              className="relative z-10 w-full grayscale-[30%] mix-blend-luminosity"
            />
          </motion.div>

          {/* Subtext + CTA */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="max-w-md text-muted-foreground mb-6"
          >
            Passionate about creating intuitive digital experiences that connect users with value.
          </motion.p>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <span>→</span> Get in Touch
          </motion.a>

          {/* Trusted */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-10 text-xs text-muted-foreground"
          >
            Trusted by over <strong className="text-foreground">1200+ happy clients</strong> across digital products
          </motion.div>

          {/* Logo strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground/60"
          >
            {logos.map((logo) => (
              <span key={logo} className="flex items-center gap-1.5">
                <span className="h-4 w-4 rounded-full border border-muted-foreground/20" />
                {logo}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
