import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote: "Shubham transformed our healthcare platform with a beautiful, intuitive interface. His attention to detail and understanding of our complex workflows made all the difference. Highly recommend.",
    name: "Dr. Rajesh Kumar",
    role: "Founder, Aayuvardan Lifescience",
    company: "Aayuvardan Lifescience",
    logo: "🏥",
    rating: 5,
    verified: true,
  },
  {
    quote: "Working with Shubham was seamless from start to finish. He understood our goals, asked the right questions, and delivered a design system that scaled perfectly with our growing needs.",
    name: "Priya Sharma",
    role: "Product Lead, Maxton LifeScience",
    company: "Maxton LifeScience",
    logo: "⚕️",
    rating: 5,
    verified: true,
  },
  {
    quote: "We needed a professional legal website that conveyed trust and expertise. Shubham delivered exactly that — responsive, modern, and optimized for conversions. Our inquiries increased 40%.",
    name: "Advocate Vikram Singh",
    role: "Managing Partner, Singh & Associates",
    company: "Singh Legal Firm",
    logo: "⚖️",
    rating: 5,
    verified: true,
  },
  {
    quote: "What impressed us most was the technical depth combined with business acumen. Shubham doesn't just build features — he builds solutions. Our team learned so much working with him.",
    name: "Ananya Gupta",
    role: "CTO, TechStartup Collective",
    company: "TechStartup Collective",
    logo: "💻",
    rating: 5,
    verified: true,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="pt-40 pb-28 md:pt-44 md:pb-36" ref={ref}>
      <div className="container relative z-10 mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm text-accent mb-3 font-serif-display italic">/ What Clients Say</p>
          <h2 className="text-3xl md:text-5xl font-light text-foreground">
            Trusted by <span className="font-serif-display italic">Founders & Leaders</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Real feedback from clients who've transformed their vision into reality.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group relative p-6 md:p-8 rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl hover:border-accent/40 hover:from-white/15 transition-all duration-300"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 h-1 w-8 bg-accent rounded-br-lg group-hover:w-12 transition-all duration-300" />

              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="text-sm"
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>

              {/* Quote mark */}
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-3xl font-serif-display text-accent/20 select-none"
              >
                "
              </motion.span>

              {/* Quote text */}
              <p className="text-sm md:text-base leading-relaxed text-foreground/80 mb-6 font-medium">
                {testimonial.quote}
              </p>

              {/* Author Info */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-4">
                  {/* Logo/Avatar */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="h-14 w-14 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/30 flex items-center justify-center text-2xl flex-shrink-0"
                  >
                    {testimonial.logo}
                  </motion.div>

                  {/* Name & Role */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{testimonial.role}</p>
                    <p className="text-xs text-accent/70 mt-1 font-medium flex items-center gap-1">
                      {testimonial.verified && <span>✓</span>}
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-16 pt-16 border-t border-white/10"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">4+</p>
            <p className="text-xs text-muted-foreground mt-1">Satisfied Clients</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">100%</p>
            <p className="text-xs text-muted-foreground mt-1">5-Star Rating</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">15+</p>
            <p className="text-xs text-muted-foreground mt-1">Projects Delivered</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">100%</p>
            <p className="text-xs text-muted-foreground mt-1">On-Time Delivery</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-14"
        >
          <p className="text-muted-foreground mb-5">
            Ready to join our list of satisfied clients?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-medium text-foreground hover:shadow-lg hover:shadow-accent/40 hover:scale-105 transition-all duration-300"
          >
            <span>Start Your Project</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
