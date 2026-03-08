import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { num: "01", title: "Discover", desc: "Understanding your goals, users, and challenges through research and strategy." },
  { num: "02", title: "Design", desc: "Transforming insights into intuitive, beautiful, and functional product experiences." },
  { num: "03", title: "Deliver", desc: "Testing, refining, and launching the final product with clarity and precision." },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 md:py-36 bg-surface overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm text-muted-foreground mb-3 font-serif-display italic">/ Our Projects Explained</p>
          <h2 className="text-3xl md:text-5xl font-light text-foreground">
            Here's how it <span className="font-serif-display italic">works</span>
          </h2>
        </motion.div>

        {/* Staggered cards with curved connectors */}
        <div className="relative max-w-5xl mx-auto">
          {/* SVG curved connectors */}
          <svg
            className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 500"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Line from card 1 top-right to card 2 top-left */}
            <motion.path
              d="M300 320 C350 320 350 100 420 100"
              stroke="hsl(var(--accent))"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
            />
            <motion.circle
              cx="300"
              cy="320"
              r="5"
              fill="hsl(var(--accent))"
              stroke="hsl(var(--background))"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 }}
            />
            <motion.circle
              cx="420"
              cy="100"
              r="5"
              fill="hsl(var(--accent))"
              stroke="hsl(var(--background))"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.2 }}
            />

            {/* Line from card 2 bottom-right to card 3 top-left */}
            <motion.path
              d="M620 350 C660 350 660 280 700 250 C730 230 740 200 720 180"
              stroke="hsl(var(--accent))"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.2, delay: 1.0, ease: "easeInOut" }}
            />
            <motion.circle
              cx="620"
              cy="350"
              r="5"
              fill="hsl(var(--accent))"
              stroke="hsl(var(--background))"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.0 }}
            />
            <motion.circle
              cx="720"
              cy="180"
              r="5"
              fill="hsl(var(--accent))"
              stroke="hsl(var(--background))"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.8 }}
            />
          </svg>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-start">
            {steps.map((step, i) => {
              // Staggered vertical positions: 01 lower, 02 higher, 03 lower
              const yOffset = i === 1 ? "md:-mt-12" : "md:mt-20";
              // Slight rotation for organic feel
              const rotation = i === 0 ? "-rotate-2" : i === 1 ? "rotate-1" : "rotate-2";

              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 60, rotate: 0 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 * i, ease: "easeOut" }}
                  whileHover={{ scale: 1.04, rotate: 0, y: -8 }}
                  className={`${yOffset} relative`}
                >
                  <div
                    className={`${rotation} glass-card rounded-3xl p-8 md:p-10 relative transition-all duration-500 hover:rotate-0 hover:shadow-xl hover:shadow-accent/10 group cursor-default`}
                  >
                    {/* Large faded number */}
                    <span className="text-6xl md:text-7xl font-bold text-foreground/[0.06] leading-none block mb-6 transition-colors duration-300 group-hover:text-foreground/[0.12]">
                      {step.num}
                    </span>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-serif-display italic text-foreground mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>

                    {/* Subtle accent dot */}
                    <motion.div
                      className="absolute top-6 right-6 w-2 h-2 rounded-full bg-accent"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;