import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { num: "01", title: "Discover", desc: "Understanding user needs, product goals, and challenges through research and strategy." },
  { num: "02", title: "Design", desc: "Transforming insights into intuitive wireframes, prototypes, and visual design systems." },
  { num: "03", title: "Deliver", desc: "Testing, refining, and launching the final product with clarity and precision." },
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
          className="text-center mb-16"
        >
          <p className="text-sm text-muted-foreground mb-2">/ Our Process Explained</p>
          <h2 className="text-3xl md:text-4xl font-light text-foreground">
            Here's how it <span className="font-serif-display italic">works</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * i }}
              className="glass-card rounded-2xl p-8 text-center relative"
            >
              <span className="text-4xl font-light text-muted-foreground/30">{step.num}</span>
              <h3 className="mt-4 text-xl font-medium text-foreground">{step.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 w-8 h-px border-t border-dashed border-accent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
