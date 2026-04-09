import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProfileCard from "@/components/ProfileCard";
import portrait from "@/assets/portrait.png";
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

// Replaced static visual with interactive Lanyard component

const ProfileSection = () => {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="profile" className="relative bg-background py-20 md:py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left column: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: easing }}
            className="h-full flex items-center justify-center"
          >
            <ProfileCard
              avatarUrl={portrait}
              name="Shubham Pandey"

              handle="shubham"
              status="Available"
              contactText="Get in Touch"
              enableTilt={true}
              enableMobileTilt={false}
              showUserInfo={true}
              title="Software Engineer"
              
              onContactClick={() => console.log('Contact clicked')}
              behindGlowColor="rgba(125, 190, 255, 0.67)"
              iconUrl="/assets/demo/iconpattern.png"
              behindGlowEnabled
              innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
                        />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: easing }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Shubham Pandey
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
