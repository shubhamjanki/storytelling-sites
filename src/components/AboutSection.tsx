import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { label: "React.js", color: "bg-blue-400", position: "top-0 left-0" },
  { label: "Node.js", color: "bg-accent", position: "top-0 right-0" },
  { label: "MongoDB", color: "bg-accent", position: "top-1/4 right-8" },
  { label: "Express.js", color: "bg-orange-400", position: "bottom-1/4 left-4" },
  { label: "REST APIs", color: "bg-purple-400", position: "bottom-0 right-0" },
  { label: "JavaScript", color: "bg-red-400", position: "bottom-0 left-8" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="pb-40 pt-32" ref={ref}>
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <p className="text-sm text-muted-foreground mb-4 font-serif-display italic">/ Hello!</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Floating skill badges */}
          <div className="hidden md:block">
            {skills.map((skill, i) => (
              <motion.span
                key={skill.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className={`absolute ${skill.position} z-10 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-4 py-2 text-xs text-foreground shadow-sm backdrop-blur-xl`}
              >
                <span className={`h-2 w-2 rounded-full ${skill.color}`} />
                {skill.label}
              </motion.span>
            ))}
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-5xl font-light leading-snug text-foreground text-center px-8 md:px-20"
          >
            focus is on blending clear strategy, thoughtful design, and user empathy to{" "}
            <span className="font-serif-display italic">craft experiences that solve real problems</span>
          </motion.h2>

          {/* Mobile skill badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex md:hidden flex-wrap justify-center gap-2"
          >
            {skills.map((skill) => (
              <span
                key={skill.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-3 py-1.5 text-xs text-foreground backdrop-blur-xl"
              >
                <span className={`h-2 w-2 rounded-full ${skill.color}`} />
                {skill.label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
