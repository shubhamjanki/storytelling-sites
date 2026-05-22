import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mx-6 rounded-3xl border border-white/60 bg-white/55 px-6 py-24 text-center shadow-[0_30px_120px_hsl(var(--neon)/0.16)] backdrop-blur-xl"
      >
        <p className="text-sm text-foreground/70 mb-4 font-serif-display italic">/ Let's Talk</p>
        <h2 className="text-4xl md:text-6xl font-light text-foreground leading-tight">
          Let's Make It
          <br />
          <span className="font-serif-display italic">Happen</span>
        </h2>
        <p className="mt-6 max-w-md mx-auto text-sm text-foreground/70 leading-relaxed">
          I'm always open to new opportunities, collaborations, and creative challenges. Let's work together to bring your ideas to life.
        </p>
        <a
          href="mailto:shubhamjanki000@gmail.com"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background hover:opacity-90 transition-opacity"
        >
          <span>→</span> Get In Touch
        </a>
      </motion.div>
    </section>
  );
};

export default ContactSection;
