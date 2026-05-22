import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface NavbarProps {
  musicPlaying?: boolean;
  onToggleMusic?: () => void;
}

const Navbar = ({ musicPlaying, onToggleMusic }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <span className="text-lg font-serif-display italic tracking-tight text-foreground">
          Shubham Pandey
        </span>
        <div className="hidden md:flex items-center gap-8">
          {["About", "Work", "Blog", "Contact"].map((item) => (
            <a
              key={item}
              href={`/#${item.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {onToggleMusic && (
            <button
              onClick={onToggleMusic}
              className="relative flex items-center justify-center w-9 h-9 rounded-full border border-border bg-background/80 backdrop-blur-sm text-foreground hover:border-accent transition-colors duration-300"
              aria-label={musicPlaying ? "Pause music" : "Play music"}
            >
              {musicPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
              {musicPlaying && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-accent"
                  animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </button>
          )}
          <a
            href="/#contact"
            className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
