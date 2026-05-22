import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    icon: "⚡",
    title: "Web App Development",
    description: "Building scalable, high-performance web applications with React and modern JavaScript frameworks.",
    tags: ["React", "TypeScript", "Responsive Design"],
  },
  {
    icon: "🔗",
    title: "REST API & Backend",
    description: "Creating robust backend systems and RESTful APIs with Node.js, Express, and MongoDB.",
    tags: ["Node.js", "Express", "MongoDB"],
  },
  {
    icon: "🎨",
    title: "UI Implementation",
    description: "Transforming designs from Figma and mockups into pixel-perfect, interactive user interfaces.",
    tags: ["Figma to Code", "CSS", "Tailwind"],
  },
  {
    icon: "🌐",
    title: "Responsive Websites",
    description: "SEO-optimized, mobile-first websites that look perfect on all devices and drive conversions.",
    tags: ["SEO", "Mobile-First", "Performance"],
  },
];

const ServicesSection = () => {
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
          <p className="text-sm text-accent mb-3 font-serif-display italic">/ What I Build</p>
          <h2 className="text-3xl md:text-5xl font-light text-foreground">
            Services & <span className="font-serif-display italic">Expertise</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            I help businesses and startups bring their ideas to life with modern, scalable web solutions.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className="text-4xl mb-4 inline-block"
                  whileHover={{ scale: 1.2, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {service.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors duration-200"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Border glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                animate={inView ? { boxShadow: "0 0 20px rgba(var(--accent), 0.1)" } : {}}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-14"
        >
          <p className="text-muted-foreground mb-5">
            Ready to start your project?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-medium text-foreground hover:shadow-lg hover:shadow-accent/40 hover:scale-105 transition-all duration-300"
          >
            <span>Let's Work Together</span>
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

export default ServicesSection;
