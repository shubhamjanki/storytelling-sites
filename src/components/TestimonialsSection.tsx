import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote: "Shubham delivered a clean, responsive website that perfectly represented our brand. His attention to detail and understanding of modern web technologies made the project a smooth experience.",
    name: "Aayuvardan Lifescience",
    role: "Client – Business Website",
  },
  {
    quote: "Working with Shubham on our healthcare platform was excellent. He built dynamic components, ensured cross-browser compatibility, and delivered a professional result on time.",
    name: "Maxton LifeScience",
    role: "Client – Healthcare Platform",
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
