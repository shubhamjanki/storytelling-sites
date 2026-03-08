import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experience = [
  { role: "Web Developer", company: "Maxton LifeScience", from: "2025", to: "Now" },
  { role: "Web Developer", company: "Aayuvardan Lifescience", from: "2024", to: "2025" },
  { role: "Web Developer", company: "Legal Firm Website", from: "2025", to: "2025" },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto items-start">
          {/* Left - heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm text-muted-foreground mb-3 font-serif-display italic">/ Why me</p>
            <h2 className="text-4xl md:text-5xl font-light text-foreground leading-tight">
              Pushing{" "}
              <span className="font-serif-display italic">Boundaries</span>
              <br />
              since 2023
            </h2>

            <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-sm">
              A web developer passionate about creating scalable digital experiences. I've collaborated on strategic full-stack products that blend usability and aesthetics, focusing on solving problems through a clean code and user-first approach.
            </p>

            <div className="mt-8 flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </motion.div>

          {/* Right - experience list */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-0">
              {experience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center justify-between py-5 border-b border-border"
                >
                  <div>
                    <p className="font-medium text-foreground">{exp.role}</p>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{exp.from}</span>
                    <span>→</span>
                    <span>{exp.to}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center justify-between py-5 border-b border-border mt-6"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full neon-gradient-solid flex items-center justify-center">
                  <span className="text-xs font-bold">SP</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Shubham Pandey</p>
                  <p className="text-sm text-muted-foreground">B.Tech – CSE, AKTU University</p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">2023 – 2027</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
