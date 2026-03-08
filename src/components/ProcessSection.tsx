import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { num: "01", title: "Discover", desc: "Understanding user needs, product goals, and challenges through research and strategy." },
  { num: "02", title: "Design", desc: "Transforming insights into wireframes, prototypes, and scalable product architecture." },
  { num: "03", title: "Deliver", desc: "Testing, optimizing, and launching the final product with clarity and precision." },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-surface" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm text-muted-foreground mb-2 font-serif-display italic">/ My Process Explained</p>
          <h2 className="text-3xl md:text-5xl font-light text-foreground">
            Here's how it <span className="font-serif-display italic">works</span>
          </h2>
        </motion.div>

        {/* Staggered layout: 01 left-bottom, 02 center-top, 03 right-bottom */}
        <div className="relative max-w-5xl mx-auto">
          {/* Decorative curved line */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-px">
            <svg className="w-full h-24 -mt-12" viewBox="0 0 800 100" fill="none" preserveAspectRatio="none">
              <path d="M0 80 C200 80 200 20 400 20 C600 20 600 80 800 80" stroke="hsl(var(--accent))" strokeWidth="2" strokeDasharray="8 8" opacity="0.4" />
            </svg>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-end">
            {/* 01 - bottom */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0 }}
              className="md:mt-16"
            >
              <div className="glass-card rounded-2xl p-8 text-center relative hover:shadow-lg transition-shadow">
                <span className="text-5xl font-light text-muted-foreground/20">{steps[0].num}</span>
                <h3 className="mt-4 text-xl font-serif-display italic text-foreground">{steps[0].title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{steps[0].desc}</p>
              </div>
            </motion.div>

            {/* 02 - elevated */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:-mt-8"
            >
              <div className="glass-card rounded-2xl p-8 text-center relative hover:shadow-lg transition-shadow border-accent/20">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full neon-gradient-solid flex items-center justify-center">
                  <span className="text-xs font-bold text-foreground">✦</span>
                </div>
                <span className="text-5xl font-light text-muted-foreground/20">{steps[1].num}</span>
                <h3 className="mt-4 text-xl font-serif-display italic text-foreground">{steps[1].title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{steps[1].desc}</p>
              </div>
            </motion.div>

            {/* 03 - bottom */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:mt-16"
            >
              <div className="glass-card rounded-2xl p-8 text-center relative hover:shadow-lg transition-shadow">
                <span className="text-5xl font-light text-muted-foreground/20">{steps[2].num}</span>
                <h3 className="mt-4 text-xl font-serif-display italic text-foreground">{steps[2].title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{steps[2].desc}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
