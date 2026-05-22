import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const engagementModels = [
  {
    icon: "⏱️",
    title: "Hourly Rate",
    description: "Flexible engagement for ongoing work, consultations, or tasks that are hard to scope upfront.",
    rate: "$25 - $35/hr",
    ideal: "Best for: Retainers, ongoing support, hourly consultations",
    perks: ["Flexible duration", "Transparent billing", "As-needed availability"],
  },
  {
    icon: "📦",
    title: "Fixed Price Project",
    description: "Perfect for well-defined projects with clear scope and deliverables. Includes detailed breakdown.",
    rate: "$500 - $5,000+",
    ideal: "Best for: Website builds, app development, feature implementation",
    perks: ["Predictable cost", "Clear timeline", "Full project ownership"],
  },
  {
    icon: "📈",
    title: "Retainer Agreement",
    description: "Recurring monthly engagement for ongoing maintenance, updates, and optimization.",
    rate: "$800 - $2,500/mo",
    ideal: "Best for: Long-term partnerships, continuous support, scaling",
    perks: ["Priority support", "Dedicated time", "Discounted rates"],
  },
  {
    icon: "🚀",
    title: "Performance-Based",
    description: "Revenue share or milestone-based compensation for high-growth projects.",
    rate: "Custom",
    ideal: "Best for: Startups, partnerships, equity opportunities",
    perks: ["Aligned incentives", "Flexible terms", "Growth partnership"],
  },
];

const EngagementSection = () => {
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
          <p className="text-sm text-accent mb-3 font-serif-display italic">/ How We Work</p>
          <h2 className="text-3xl md:text-5xl font-light text-foreground">
            Engagement <span className="font-serif-display italic">Models</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Flexible arrangements to match your project needs. Pick what works best for you.
          </p>
        </motion.div>

        {/* Engagement Models Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12"
        >
          {engagementModels.map((model, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group relative p-6 md:p-7 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm hover:border-accent/40 hover:from-white/10 transition-all duration-300"
            >
              {/* Accent line */}
              <div className="absolute top-0 left-0 h-1 w-12 bg-gradient-to-r from-accent to-transparent rounded-full group-hover:w-24 transition-all duration-300" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon & Title Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <motion.span
                      className="text-3xl inline-block"
                      whileHover={{ scale: 1.2, rotate: 8 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {model.icon}
                    </motion.span>
                    <h3 className="text-lg font-semibold text-foreground mt-3 group-hover:text-accent transition-colors">
                      {model.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-accent font-semibold">{model.rate}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {model.description}
                </p>

                {/* Ideal For */}
                <p className="text-xs text-muted-foreground mb-4 p-3 rounded-lg bg-white/5 border border-white/5">
                  <span className="font-medium text-foreground/70">{model.ideal.split(":")[0]}:</span> {model.ideal.split(":")[1]}
                </p>

                {/* Perks */}
                <div className="space-y-2">
                  {model.perks.map((perk, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.05 }}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent/60" />
                      {perk}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12"
        >
          <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 text-center">
            <p className="text-2xl font-bold text-accent">1-3 weeks</p>
            <p className="text-xs text-muted-foreground mt-1">Average project turnaround</p>
          </div>
          <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 text-center">
            <p className="text-2xl font-bold text-accent">100%</p>
            <p className="text-xs text-muted-foreground mt-1">Upfront transparency on scope</p>
          </div>
          <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 text-center">
            <p className="text-2xl font-bold text-accent">24/7</p>
            <p className="text-xs text-muted-foreground mt-1">Email & chat support</p>
          </div>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="max-w-3xl mx-auto p-6 md:p-8 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <span>💡</span> How We Start
          </h3>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-muted-foreground">
              <span className="text-accent">1.</span>
              <span><strong className="text-foreground">Discovery Call</strong> — 30 min free consultation to understand your needs</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <span className="text-accent">2.</span>
              <span><strong className="text-foreground">Detailed Proposal</strong> — Timeline, deliverables, and cost breakdown</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <span className="text-accent">3.</span>
              <span><strong className="text-foreground">Kick-off</strong> — 50% upfront (fixed) or first month for retainers, 50% on delivery</span>
            </li>
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-14"
        >
          <p className="text-muted-foreground mb-5">
            Ready to discuss your project?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-medium text-foreground hover:shadow-lg hover:shadow-accent/40 hover:scale-105 transition-all duration-300"
            >
              <span>Book a Call</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </a>
            <a
              href="mailto:your@email.com"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-8 py-3 text-sm font-medium text-accent hover:bg-accent/20 transition-all duration-300"
            >
              Send Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EngagementSection;
