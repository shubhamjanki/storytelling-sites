import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32" ref={ref}>
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-6xl font-light text-foreground leading-tight">
            Let's build something
            <br />
            <span className="font-serif-display italic">great together</span>
          </h2>
          <a
            href="mailto:shubhamjanki000@gmail.com"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <span>→</span> Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
