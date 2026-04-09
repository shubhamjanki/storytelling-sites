import { Suspense, lazy } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin, Instagram, MessageCircle, MapPin, Download, ExternalLink } from "lucide-react";
import portrait from "@/assets/portrait-hero.png";

const Lanyard = lazy(() => import("@/components/Lanyard"));

const socialLinks = [
  { icon: Mail, href: "mailto:hello@example.com", label: "Email", color: "hover:bg-yellow-400" },
  { icon: Github, href: "https://github.com", label: "GitHub", color: "hover:bg-yellow-400" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:bg-yellow-400" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "hover:bg-yellow-400" },
  { icon: MessageCircle, href: "https://wa.me/", label: "WhatsApp", color: "hover:bg-yellow-400" },
];

const contributions = [
  { icon: "🌿", name: "agave" },
  { icon: "🐚", name: "mollusk" },
  { icon: "🌊", name: "surfpool" },
  { icon: "🔮", name: "magicblock" },
  { icon: "⚡", name: "scilla" },
];

const ProfileSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="profile" className="py-20 md:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Lanyard 3D Component */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-[400px] md:h-[550px] rounded-2xl overflow-hidden border border-border/30 bg-background/50"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <Lanyard position={[0, 0, 30]} gravity={[0, -40, 0]} />
            </Suspense>
          </motion.div>

          {/* Right: Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Name & Hire Badge */}
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                Subhajit Chaudhury
              </h2>
              <span className="inline-block px-4 py-1.5 rounded-full border-2 border-accent text-accent text-sm font-semibold">
                Hire me!
              </span>
            </div>

            {/* Bio */}
            <div className="space-y-3">
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-mono">
                I like building things in <span className="text-foreground font-bold">Rust</span>, mostly tools and experiments
                that solve problems I face myself. I believe the best way to
                learn is by doing, breaking things, and rebuilding them
                better.
              </p>
              <p className="text-muted-foreground text-base md:text-lg font-mono">
                My PRs are in <span className="text-foreground font-bold">Surfpool</span> and <span className="text-foreground font-bold">Scilla</span>.
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Jamshedpur, India</span>
            </div>

            {/* Contributions */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Notable open-source repositories I've contributed to:</p>
              <div className="flex flex-wrap gap-4">
                {contributions.map((c) => (
                  <span key={c.name} className="flex items-center gap-1.5 text-sm text-foreground">
                    <span>{c.icon}</span>
                    <span>{c.name}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-accent/90 text-accent-foreground flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent/30"
                  title={link.label}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/90 text-accent-foreground text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
              >
                <ExternalLink className="w-4 h-4" />
                Proof of Work
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/90 text-accent-foreground text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
              >
                <Download className="w-4 h-4" />
                CV
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/90 text-accent-foreground text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
              >
                OSS
              </a>
            </div>

            {/* Portrait on mobile */}
            <div className="lg:hidden flex justify-center pt-4">
              <img
                src={portrait}
                alt="Profile"
                className="w-48 h-48 rounded-2xl object-cover shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
