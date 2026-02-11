import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import roshniPhoto from "@/assets/roshni-photo.jpeg";
import FloatingParticles from "./FloatingParticles";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <FloatingParticles />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card opacity-50" />

      <div className="section-container relative z-10 py-20 md:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            <motion.h2
              variants={itemVariants}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-2"
            >
              Hello<span className="text-primary">.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-1"
            >
              I'm Roshni
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-bold leading-tight mb-8"
            >
              AI & Full-Stack Developer
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-base md:text-lg max-w-md mb-10"
            >
              Designing intelligent systems where data, AI, and engineering converge.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded transition-all duration-300 hover:opacity-90"
              >
                <span>View Work</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="/resume.pdf"
                download
                className="group inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground hover:border-primary hover:text-primary transition-all duration-300 rounded"
              >
                <Download className="w-4 h-4" />
                <span>My Resume</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Circular Portrait with decorative arcs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* SVG rotating arc rings */}
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)]"
                viewBox="0 0 200 200"
                fill="none"
              >
                <circle cx="100" cy="100" r="96" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="80 40 20 40" strokeLinecap="round" opacity="0.6" />
                <circle cx="100" cy="100" r="96" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="12 188" strokeLinecap="round" opacity="1" />
              </motion.svg>

              <motion.svg
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-40px] w-[calc(100%+80px)] h-[calc(100%+80px)]"
                viewBox="0 0 200 200"
                fill="none"
              >
                <circle cx="100" cy="100" r="96" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="50 30 10 30 5 75" strokeLinecap="round" opacity="0.3" />
                <circle cx="100" cy="100" r="96" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeDasharray="8 192" strokeLinecap="round" opacity="0.7" />
              </motion.svg>

              {/* Small accent dots on the arcs */}
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)]"
                viewBox="0 0 200 200"
                fill="none"
              >
                <circle cx="100" cy="4" r="3" fill="hsl(var(--primary))" opacity="0.9" />
                <circle cx="196" cy="100" r="2" fill="hsl(var(--primary))" opacity="0.5" />
              </motion.svg>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl scale-110" />

              {/* Photo */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-border/50 group cursor-pointer">
                <img
                  src={roshniPhoto}
                  alt="Roshni Hembrom"
                  className="w-full h-full object-cover object-center grayscale contrast-[1.05] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-50" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border border-muted-foreground/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
