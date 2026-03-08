import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { label: "Product Design", color: "bg-red-400" },
  { label: "UI Design", color: "bg-accent" },
  { label: "UX Research", color: "bg-blue-400" },
  { label: "Design Systems", color: "bg-accent" },
  { label: "Usability Testing", color: "bg-orange-400" },
  { label: "Brand Identity", color: "bg-purple-400" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">Hello!</p>
          <h2 className="text-3xl md:text-5xl font-light leading-snug text-foreground">
            My focus is on blending clear strategy, thoughtful design, and user empathy to{" "}
            <span className="font-serif-display italic">craft experiences that solve real problems</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          {skills.map((skill) => (
            <span
              key={skill.label}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground"
            >
              <span className={`h-2 w-2 rounded-full ${skill.color}`} />
              {skill.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
