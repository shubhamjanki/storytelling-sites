import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Instagram, MessageCircle } from "lucide-react";

const socials = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/shubhampandey",
    color: "hover:border-[hsl(210,80%,55%)] hover:shadow-[0_0_24px_hsl(210,80%,55%,0.2)]",
    label: "Let's connect professionally",
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/shubhampandey",
    color: "hover:border-foreground hover:shadow-[0_0_24px_hsl(0,0%,50%,0.15)]",
    label: "Check out my code",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/shubhampandey",
    color: "hover:border-[hsl(330,70%,55%)] hover:shadow-[0_0_24px_hsl(330,70%,55%,0.2)]",
    label: "Follow my journey",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    url: "https://wa.me/919999999999",
    color: "hover:border-accent hover:shadow-[0_0_24px_hsl(var(--accent)/0.25)]",
    label: "Chat with me directly",
  },
];

const SocialSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm text-muted-foreground mb-4 font-serif-display italic">
            / Connect
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-foreground">
            Find me{" "}
            <span className="font-serif-display italic text-gradient-neon">
              everywhere
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {socials.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className={`group flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 transition-all duration-300 ${social.color}`}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full border border-border bg-background transition-colors duration-300 group-hover:border-accent">
                <social.icon
                  size={24}
                  className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
                />
              </div>
              <span className="text-base font-medium text-foreground">
                {social.name}
              </span>
              <span className="text-xs text-muted-foreground text-center">
                {social.label}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
