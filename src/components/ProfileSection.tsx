import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import portraitHero from "@/assets/portrait-hero.png";
import {
  ArrowUpRight,
  Code2,
  Download,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const socialLinks = [
  { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: MessageCircle, href: "https://wa.me/", label: "WhatsApp" },
];

const technologies = [
  { icon: Code2, name: "Rust" },
  { icon: Sparkles, name: "Surfpool" },
  { icon: Sparkles, name: "Scilla" },
  { icon: Sparkles, name: "Agave" },
  { icon: Sparkles, name: "Mollusk" },
  // { icon: Sparkles, name: "MagicBlock" },
  // { icon: Sparkles, name: "Open Source" },
];

const stats = [
  { icon: Zap, value: "2+", label: "Years Exp." },
  { icon: Code2, value: "20+", label: "Projects" },
  { icon: Users, value: "10+", label: "Happy Clients" },
];

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];
const actionButtonClass =
  "inline-flex h-14 items-center gap-3 rounded-2xl border border-white/60 bg-white/55 px-5 text-sm font-medium text-foreground shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent/10";

const ProfileSection = () => {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="profile"
      className="-mt-20 pt-40 pb-20 md:-mt-28 md:pt-52 md:pb-32"
      ref={ref}
    >
      <div className="container relative z-10 mx-auto px-6">
        <div className="pointer-events-none absolute right-0 top-24 hidden h-[420px] w-[420px] rounded-full border border-accent/10 opacity-60 lg:block" />
        <div className="pointer-events-none absolute right-20 top-40 hidden h-48 w-48 rounded-full bg-accent/10 blur-3xl lg:block" />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: easing }}
            className="relative mx-auto w-full max-w-[350px]"
          >
            <div className="absolute -left-12 top-10 hidden grid-cols-7 gap-2 opacity-35 md:grid">
              {Array.from({ length: 49 }).map((_, i) => (
                <span key={i} className="h-1 w-1 rounded-full bg-accent" />
              ))}
            </div>

            <div className="group relative min-h-[570px] overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_88%_82%,hsl(var(--accent)/0.45),transparent_34%),radial-gradient(circle_at_35%_15%,hsl(220_70%_60%/0.16),transparent_36%),linear-gradient(145deg,rgba(15,15,15,0.94),rgba(12,18,13,0.92))] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_100px_hsl(var(--neon)/0.22)]">
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/45 blur-[120px] transition-opacity duration-300 group-hover:opacity-90" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.55)_1px,transparent_0)] [background-size:22px_22px]" />
              <div className="pointer-events-none absolute inset-0 opacity-20 [background:repeating-radial-gradient(ellipse_at_80%_42%,transparent_0,transparent_18px,hsl(var(--accent)/0.22)_19px,hsl(var(--accent)/0.22)_20px)]" />

              <span className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs text-white shadow-sm backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_14px_hsl(var(--accent))]" />
                Available for work
              </span>

              <div className="relative z-10 mt-8">
                <h2 className="text-[3.625rem] font-bold leading-[0.95] tracking-tight text-white">
                  Shubham
                  <span className="block text-accent">Pandey</span>
                </h2>
                <p className="mt-3 text-base text-white/72">Software Engineer</p>
                <span className="mt-5 block h-1 w-[42px] rounded-full bg-accent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center">
                <img
                  src={portraitHero}
                  alt="Shubham Pandey"
                  className="h-[450px] w-[116%] max-w-none translate-x-5 object-contain object-bottom drop-shadow-[0_26px_55px_rgba(0,0,0,0.42)]"
                />
              </div>

              <div className="absolute inset-x-4 bottom-4 z-20 rounded-3xl border border-white/15 bg-white/15 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
                <div className="grid grid-cols-3 divide-x divide-white/10 gap-2">
                  {stats.map((stat) => (
                    <div key={stat.label} className="px-2 py-2 text-center">
                      <stat.icon className="mx-auto mb-2 h-5 w-5 text-accent" />
                      <p className="text-lg font-semibold text-white">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-[10px] text-white/60">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <a
                  href="mailto:hello@example.com"
                  className="mt-4 flex h-12 items-center justify-between rounded-full bg-white px-6 text-sm font-semibold text-[#111111] shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(255,255,255,0.16)]"
                >
                  Get in Touch
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] text-accent transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: easing }}
            className="relative"
          >
            <div className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-3 w-3 rounded-full border-2 border-accent" />
              Hello, I'm
            </div>

            <h2 className="mt-7 text-5xl font-semibold leading-[0.95] tracking-tight text-foreground md:text-7xl">
              Shubham <span className="text-gradient-neon">Pandey</span>
            </h2>

            <span className="mt-7 inline-flex items-center gap-3 rounded-full border border-accent/30 bg-white/55 px-5 py-3 text-sm font-medium text-foreground shadow-sm backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-accent" />
              Available for new opportunities
            </span>

            <div className="mt-8 max-w-2xl space-y-4 text-base leading-8 text-muted-foreground md:text-lg">
              <p>
                I like building things in{" "}
                <span className="font-semibold text-foreground">Rust</span>,
                mostly tools and experiments that solve problems I face myself.
                I believe the best way to learn is by doing, breaking things,
                and rebuilding them better.
              </p>
              <p>
                My PRs are in{" "}
                <span className="font-semibold text-accent">Surfpool</span> and{" "}
                <span className="font-semibold text-accent">Scilla</span>.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                Jamshedpur, India
              </span>
              <span className="h-2 w-2 rounded-full bg-border" />
              <span>GMT +5:30</span>
            </div>

            <div className="my-8 h-px bg-border/80" />

            <div>
              <p className="mb-5 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
                <Code2 className="h-4 w-4 text-accent" />
                Tech I work with
              </p>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex h-12 items-center gap-3 rounded-full border border-white/60 bg-white/55 px-5 text-sm font-medium text-foreground shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10"
                  >
                    <tech.icon className="h-4 w-4 text-accent" />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.label}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-white/55 text-foreground shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent/10"
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}

              <a href="#work" className={actionButtonClass}>
                Proof of Work
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={actionButtonClass}
              >
                <Download className="h-4 w-4" />
                CV
              </a>
              <a href="#work" className={actionButtonClass}>
                <Code2 className="h-4 w-4" />
                OSS
              </a>
            </div>

            <div className="pointer-events-none absolute -right-10 top-1/2 hidden h-12 w-12 rounded-full border-4 border-accent/70 bg-accent/10 shadow-[0_0_40px_hsl(var(--neon)/0.35)] lg:block" />
            <div className="pointer-events-none absolute right-16 bottom-24 hidden h-3 w-3 rounded-full border-2 border-accent lg:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
