import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Download,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import portrait from "@/assets/portrait-hero.png";

const socialLinks = [
  { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: MessageCircle, href: "https://wa.me/", label: "WhatsApp" },
];

const contributions = [
  { icon: "✦", name: "agave" },
  { icon: "◌", name: "mollusk" },
  { icon: "≈", name: "surfpool" },
  { icon: "◻", name: "magicblock" },
  { icon: "✧", name: "scilla" },
];

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];
const actionButtonClass =
  "inline-flex items-center gap-2 rounded-xl border border-border/70 bg-accent/90 px-4 py-2 text-sm font-medium text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5";

const ProfileLanyardVisual = () => {
  return (
    <div className="relative h-[400px] md:h-[550px] overflow-hidden rounded-[2rem] border border-border/40 bg-card/70 shadow-[0_24px_80px_hsl(var(--foreground)/0.08)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--accent)/0.18),transparent_34%),radial-gradient(circle_at_0%_100%,hsl(var(--foreground)/0.06),transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 flex justify-center" aria-hidden="true">
        <div className="h-14 w-px bg-border/80" />
      </div>
      <div className="absolute left-1/2 top-14 h-24 w-44 -translate-x-1/2" aria-hidden="true">
        <div className="absolute left-[3.3rem] top-0 h-24 w-px origin-top -rotate-[18deg] bg-border/80" />
        <div className="absolute right-[3.3rem] top-0 h-24 w-px origin-top rotate-[18deg] bg-border/80" />
        <div className="absolute left-1/2 top-[4.55rem] h-4 w-14 -translate-x-1/2 rounded-full border border-border/70 bg-muted/70" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -5 }}
        animate={{ opacity: 1, y: [0, 12, 0], rotate: [-5, 4, -3, 2, -5] }}
        transition={{
          opacity: { duration: 0.6, ease: easing },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute left-1/2 top-24 w-[min(20rem,78%)] -translate-x-1/2"
      >
        <div className="rounded-[1.75rem] border border-border/70 bg-background/90 p-4 shadow-[0_18px_60px_hsl(var(--foreground)/0.16)] backdrop-blur-sm">
          <div className="mb-3 flex justify-center">
            <span className="h-3.5 w-16 rounded-full border border-border/70 bg-muted/70" />
          </div>

          <div className="overflow-hidden rounded-[1.25rem] border border-border/60 bg-muted">
            <img
              src={portrait}
              alt="Portrait of Shubham"
              loading="lazy"
              className="h-60 w-full object-cover object-top"
            />
          </div>

          <div className="mt-4 space-y-1">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">Profile card</p>
            <h3 className="text-2xl font-semibold text-foreground">Shubham</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Motion-focused developer building clean, experimental interfaces.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl border border-border/60 bg-muted/40 px-4 py-3">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Stack</p>
              <p className="mt-1 text-foreground">React · Node</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-muted/40 px-4 py-3">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Focus</p>
              <p className="mt-1 text-foreground">Design systems</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute inset-x-6 bottom-6 rounded-full border border-border/60 bg-background/75 px-4 py-3 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground backdrop-blur-sm">
        Lanyard-inspired profile visual
      </div>
    </div>
  );
};

const ProfileSection = () => {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="profile" className="relative bg-background py-20 md:py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: easing }}
          >
            <ProfileLanyardVisual />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: easing }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Subhajit Chaudhury
              </h2>
              <span className="inline-flex rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
                Hire me!
              </span>
            </div>

            <div className="space-y-3 font-mono text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                I like building things in <span className="font-bold text-foreground">Rust</span>, mostly tools and
                experiments that solve problems I face myself. I believe the best way to learn is by doing, breaking
                things, and rebuilding them better.
              </p>
              <p>
                My PRs are in <span className="font-bold text-foreground">Surfpool</span> and <span className="font-bold text-foreground">Scilla</span>.
              </p>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Jamshedpur, India</span>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Notable open-source repositories I&apos;ve contributed to:</p>
              <div className="flex flex-wrap gap-4">
                {contributions.map((item) => (
                  <span key={item.name} className="inline-flex items-center gap-2 text-sm text-foreground">
                    <span className="text-muted-foreground">{item.icon}</span>
                    <span>{item.name}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-accent/90 text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}

              <button type="button" className={actionButtonClass}>
                <ExternalLink className="h-4 w-4" />
                Proof of Work
              </button>
              <button type="button" className={actionButtonClass}>
                <Download className="h-4 w-4" />
                CV
              </button>
              <button type="button" className={actionButtonClass}>OSS</button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
