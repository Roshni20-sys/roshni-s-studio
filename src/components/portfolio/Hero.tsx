import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Download, ArrowRight, ArrowDown } from "lucide-react";
import roshniPhoto from "@/assets/roshni-photo.jpeg";
import FloatingParticles from "./FloatingParticles";

const TextReveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: string;
  delay?: number;
  className?: string;
}) => (
  <span className={`inline-block overflow-hidden ${className}`}>
    <motion.span
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block"
    >
      {children}
    </motion.span>
  </span>
);

const AnimatedCounter = ({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, target, { duration: 2, delay: 1.5, ease: [0.22, 1, 0.36, 1] });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, []);

  return (
    <div>
      <span className="block text-2xl font-serif text-foreground">{display}{suffix}</span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
    </div>
  );
};

const MagneticPhoto = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="relative group cursor-pointer"
    >
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: isHovered ? 0.4 : 0.15, scale: isHovered ? 1.15 : 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 rounded-2xl bg-primary blur-[60px] -z-10"
      />

      {/* Rotating decorative frame */}
      <motion.svg animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-[-24px] w-[calc(100%+48px)] h-[calc(100%+48px)]" viewBox="0 0 200 200" fill="none">
        <rect x="4" y="4" width="192" height="192" rx="28" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="60 30 15 30 8 57" strokeLinecap="round" opacity="0.5" />
        <rect x="4" y="4" width="192" height="192" rx="28" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeDasharray="10 190" strokeLinecap="round" opacity="0.9" />
      </motion.svg>

      <motion.svg animate={{ rotate: -360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className="absolute inset-[-44px] w-[calc(100%+88px)] h-[calc(100%+88px)]" viewBox="0 0 200 200" fill="none">
        <rect x="4" y="4" width="192" height="192" rx="32" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeDasharray="40 25 8 25 5 97" strokeLinecap="round" opacity="0.25" />
      </motion.svg>

      {/* Accent dots */}
      <motion.svg animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute inset-[-24px] w-[calc(100%+48px)] h-[calc(100%+48px)]" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="3" r="3" fill="hsl(var(--primary))" opacity="0.8" />
        <circle cx="197" cy="100" r="2" fill="hsl(var(--primary))" opacity="0.4" />
        <circle cx="100" cy="197" r="2.5" fill="hsl(var(--primary))" opacity="0.6" />
      </motion.svg>

      {/* Photo container */}
      <div className="relative w-52 h-60 md:w-80 md:h-[360px] lg:w-[380px] lg:h-[440px] rounded-2xl overflow-hidden border border-border/30 transition-all duration-700 group-hover:border-primary/40 group-hover:shadow-[0_0_50px_hsl(var(--primary)/0.2)]">
        <img
          src={roshniPhoto}
          alt="Roshni Hembrom — AI & Full-Stack Developer"
          className="w-full h-full object-cover object-center grayscale contrast-[1.08] brightness-[0.95] transition-all duration-1000 ease-out group-hover:grayscale-0 group-hover:scale-[1.06] group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/10 to-transparent transition-opacity duration-700 group-hover:opacity-40" />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute top-5 right-5"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 bg-background/70 backdrop-blur-md rounded-full border border-border/30">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/80 font-medium">Open to Work</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const [count, setCount] = useState(0);
  const roles = ["AI Developer", "Full-Stack Engineer", "Data Analyst", "Problem Solver"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <FloatingParticles />

      {/* Cinematic gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-card/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-transparent to-secondary/[0.03]" />

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <div className="absolute left-[16.66%] top-0 bottom-0 w-px bg-foreground" />
        <div className="absolute left-[33.33%] top-0 bottom-0 w-px bg-foreground" />
        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-foreground" />
        <div className="absolute left-[66.66%] top-0 bottom-0 w-px bg-foreground" />
        <div className="absolute left-[83.33%] top-0 bottom-0 w-px bg-foreground" />
      </div>

      <div className="section-container relative z-10 py-10 md:py-0">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-4 mb-4 md:mb-8"
            >
              <div className="h-px w-12 bg-primary" />
              <span className="text-xs uppercase tracking-[0.35em] text-muted-foreground font-medium">
                Portfolio 2025
              </span>
            </motion.div>

            {/* Name with gradient shimmer */}
            <div className="mb-3 md:mb-6">
              <h1 className="font-serif leading-[0.9] tracking-tight">
                <TextReveal delay={0.3} className="text-4xl md:text-7xl lg:text-8xl xl:text-[6.5rem]">
                  Roshni
                </TextReveal>
                <br />
                <span className="inline-block overflow-hidden">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block text-4xl md:text-7xl lg:text-8xl xl:text-[6.5rem] hero-gradient-text"
                  >
                    Hembrom
                  </motion.span>
                </span>
                <TextReveal delay={0.6} className="text-4xl md:text-7xl lg:text-8xl xl:text-[6.5rem] text-primary">
                  .
                </TextReveal>
              </h1>
            </div>

            {/* Rotating role */}
            <div className="h-9 mb-4 md:mb-8 overflow-hidden relative">
              <motion.div
                key={count}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center gap-3"
              >
                <span className="w-5 h-px bg-primary" />
                <span className="text-sm md:text-base uppercase tracking-[0.25em] text-primary font-medium">
                  {roles[count]}
                </span>
              </motion.div>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-muted-foreground text-sm md:text-lg lg:text-xl max-w-lg mb-6 md:mb-12 leading-relaxed"
            >
              Crafting intelligent systems at the intersection of data science,
              artificial intelligence, and thoughtful engineering.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="flex flex-wrap items-center gap-5"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 bg-primary text-primary-foreground font-medium rounded-lg overflow-hidden transition-all duration-300"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent -skew-x-12"
                  initial={{ x: "-200%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">View Work</span>
                <ArrowRight className="relative z-10 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              <a
                href="/resume.pdf"
                download
                className="group inline-flex items-center gap-3 px-7 py-3.5 border border-border/50 text-foreground hover:border-primary hover:text-primary transition-all duration-300 rounded-lg backdrop-blur-sm"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
                <span>Resume</span>
              </a>

              {/* Animated stat counters */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="hidden md:flex items-center gap-6 ml-4 pl-6 border-l border-border/30"
              >
                <AnimatedCounter target={3} suffix="+" label="Projects" />
                <AnimatedCounter target={2} suffix="" label="Awards" />
              </motion.div>
            </motion.div>
          </div>

          {/* Photo */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <MagneticPhoto />
          </div>
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="absolute bottom-24 left-0 right-0 overflow-hidden opacity-[0.08] pointer-events-none">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-12 text-6xl md:text-8xl font-serif text-foreground"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex gap-12">
              <span>AI</span><span>·</span><span>React</span><span>·</span><span>Data</span><span>·</span><span>Design</span><span>·</span><span>Python</span><span>·</span><span>Cloud</span><span>·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="w-4 h-4 text-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
