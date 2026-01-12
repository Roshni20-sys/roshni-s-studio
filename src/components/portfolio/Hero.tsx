import { motion } from "framer-motion";
import { Download } from "lucide-react";
import roshniPhoto from "@/assets/roshni-photo.jpeg";

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card opacity-50" />
      
      <div className="section-container relative z-10 py-20 md:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-sm uppercase tracking-[0.3em] mb-6"
            >
              Computer Science & Engineering
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.9] mb-8"
            >
              Roshni
              <br />
              <span className="text-primary">Hembrom</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-foreground/90 font-serif italic leading-relaxed mb-4 max-w-lg"
            >
              Designing intelligent systems where data, AI, and engineering converge.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-base md:text-lg max-w-md"
            >
              I turn complex problems into scalable, data-driven solutions.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-wrap gap-6"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300"
              >
                <span className="underline-animation">View Work</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 underline-animation"
              >
                Get in Touch
              </a>
              <a
                href="/resume.pdf"
                download
                className="group inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Portrait Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:ml-auto group cursor-pointer">
              {/* Decorative frame with hover animation */}
              <div className="absolute -inset-4 border border-border/30 -z-10 transition-all duration-500 group-hover:border-primary/40 group-hover:-inset-5" />
              <div className="absolute -inset-8 border border-border/20 -z-20 transition-all duration-700 group-hover:border-primary/20 group-hover:-inset-10" />
              
              {/* Actual photo with grayscale-to-color effect */}
              <div className="w-full h-full relative overflow-hidden">
                <img
                  src={roshniPhoto}
                  alt="Roshni Hembrom"
                  className="w-full h-full object-cover object-center grayscale contrast-[1.05] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                />
                
                {/* Subtle overlay for depth - fades on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-60" />
                
                {/* Primary color wash overlay - reveals on hover */}
                <div className="absolute inset-0 bg-primary/0 mix-blend-overlay transition-all duration-500 group-hover:bg-primary/10" />
                
                {/* Corner accent with animation */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 transition-all duration-500 group-hover:w-20 group-hover:h-20 group-hover:bg-primary/30" />
                
                {/* Bottom left corner accent - appears on hover */}
                <div className="absolute bottom-0 left-0 w-0 h-0 bg-primary/20 transition-all duration-500 group-hover:w-12 group-hover:h-12" />
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
