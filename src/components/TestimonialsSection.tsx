import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote: "Working with Shubham was seamless from start to finish. He understood our goals quickly, asked the right questions, and delivered a design system that scaled perfectly with our growing modern best app.",
    name: "Aayuvardan Lifescience",
    role: "Client – Business Website",
    initials: "AL",
  },
  {
    quote: "Shubham brought our product vision to life with incredible attention to detail. His ability to balance business needs with user empathy made our platform not just beautiful — but genuinely useful.",
    name: "Maxton LifeScience",
    role: "Client – Healthcare Platform",
    initials: "ML",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-surface" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-px max-w-5xl mx-auto bg-border/50 rounded-3xl overflow-hidden">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 * i, ease: "easeOut" }}
              className="bg-background p-8 md:p-10 relative group"
            >
              {/* Quote mark */}
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + 0.2 * i, duration: 0.4 }}
                className="absolute top-8 right-8 text-4xl font-serif-display text-foreground/10 select-none"
              >
                "
              </motion.span>

              {/* Quote text */}
              <p className="text-sm md:text-base leading-relaxed text-foreground/80 pr-8 mb-8">
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="h-10 w-10 rounded-full neon-gradient-solid flex items-center justify-center text-xs font-bold text-foreground">
                  {t.initials}
                </div>
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