import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const technologies = [
  { name: "Python", icon: "🐍" },
  { name: "JavaScript", icon: "⚡" },
  { name: "TypeScript", icon: "🔷" },
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🟢" },
  { name: "GitHub", icon: "🐙" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Express", icon: "🚂" },
  { name: "Git", icon: "🔀" },
  { name: "REST APIs", icon: "🔗" },
  { name: "HTML5", icon: "🌐" },
  { name: "CSS3", icon: "🎨" },
];

const MarqueeRow = ({ reverse = false }: { reverse?: boolean }) => {
  const items = [...technologies, ...technologies];

  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex shrink-0 gap-6 py-4"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {items.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="group flex items-center gap-3 rounded-full border border-border bg-card px-6 py-3 transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_hsl(var(--neon)/0.15)]"
          >
            <span className="text-xl">{tech.icon}</span>
            <span className="text-sm font-medium text-foreground whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const TechSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-4 font-serif-display italic">
            / Technologies
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-foreground">
            Tools I{" "}
            <span className="font-serif-display italic text-gradient-neon">
              work with
            </span>
          </h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex flex-col gap-4"
      >
        <MarqueeRow />
        <MarqueeRow reverse />
      </motion.div>
    </section>
  );
};

export default TechSection;
