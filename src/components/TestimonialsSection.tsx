import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote: "Working with Elian was seamless from start to finish. He understood our goals quickly, nailed the right aesthetic, and delivered a design system that scaled perfectly with our growing product line.",
    name: "Daniel Reed",
    role: "Founder of Moxie",
  },
  {
    quote: "Elian brought our product vision to life with incredible attention to detail. His ability to balance functionality with user empathy made our platform feel beautiful — and genuinely useful.",
    name: "Sarah Chen",
    role: "Product Manager at FinCo",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-surface" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * i }}
              className="glass-card rounded-2xl p-8"
            >
              <p className="text-2xl leading-relaxed mb-2 text-muted-foreground/40">"</p>
              <p className="text-sm leading-relaxed text-foreground/80">{t.quote}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full neon-gradient-solid" />
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
