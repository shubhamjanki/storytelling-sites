import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  musicPlaying?: boolean;
  onToggleMusic?: () => void;
}

const Navbar = ({ musicPlaying, onToggleMusic }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-serif-display italic tracking-tight text-gray-900 hover:opacity-80 transition-opacity select-none"
        >
          Shubham Pandey
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8 font-body">
          <a
            href="/developer#about"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            About
          </a>
          <a
            href="/developer#skills"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Skills
          </a>
          <a
            href="/developer#work"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Projects
          </a>
          <a
            href="https://github.com/shubhamjanki"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            GitHub
          </a>
          <Link
            to="/blogs"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Blog
          </Link>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3 font-body">
          {/* Music Button: Hidden on Home Page for exact visual styling match */}
          {!isHomePage && onToggleMusic && (
            <button
              onClick={onToggleMusic}
              className="relative flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white/90 backdrop-blur-sm text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
              aria-label={musicPlaying ? "Pause music" : "Play music"}
            >
              {musicPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
              {musicPlaying && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-green-400"
                  animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </button>
          )}

          {/* Contact Pill Button */}
          <a
            href="/developer#contact"
            className="rounded-full border border-gray-200 bg-white px-5 py-1.5 text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all shadow-sm"
          >
            Contact
          </a>

          {/* Search Button */}
          <button
            className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all shadow-sm"
            aria-label="Search"
          >
            <Search size={15} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
