import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for active section
  useEffect(() => {
    const sections = navLinks.map(l => document.querySelector(l.href)).filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.1, duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
    }),
  };

  return (
    <>
      <motion.nav
        animate={{
          backgroundColor: scrolled ? "hsl(var(--background) / 0.6)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          borderBottomColor: scrolled ? "hsl(var(--border) / 0.3)" : "transparent",
        }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 border-b border-transparent"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-serif text-2xl tracking-tight text-foreground hover:text-primary transition-colors duration-300"
          >
            RH
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                  activeSection === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
                {activeSection === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="h-0.5 bg-primary mt-1 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {/* Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 group md:hidden"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="w-6 h-0.5 bg-foreground group-hover:bg-primary transition-colors duration-300"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-0.5 bg-foreground group-hover:bg-primary transition-colors duration-300"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="w-6 h-0.5 bg-foreground group-hover:bg-primary transition-colors duration-300"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-background flex items-center justify-center md:hidden"
          >
            <div className="grain-overlay absolute inset-0" />
            <nav className="relative z-10 flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  custom={i}
                  variants={linkVariants}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    const target = document.querySelector(link.href);
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`font-serif text-2xl md:text-3xl transition-colors duration-300 underline-animation ${
                    activeSection === link.href ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
