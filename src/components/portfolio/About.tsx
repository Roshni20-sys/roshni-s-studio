import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const lines = [
    "Creative Computer Science undergraduate",
    "with hands-on experience in AI,",
    "full-stack development, and rapid prototyping",
    "through hackathons.",
    "",
    "Focused on building scalable, meaningful,",
    "and data-driven systems."
  ];

  return (
    <section id="about" className="py-32 md:py-40 relative grain-overlay">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Section label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-primary text-sm uppercase tracking-[0.3em] mb-12"
          >
            About
          </motion.p>

          {/* Quote-style intro */}
          <div ref={ref} className="relative">
            {/* Large quote mark */}
            <span className="absolute -left-8 md:-left-16 -top-8 text-8xl md:text-9xl font-serif text-primary/10 select-none">
              "
            </span>

            <div className="space-y-1">
              {lines.map((line, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: line ? 1 : 0, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className={`font-serif text-2xl md:text-4xl lg:text-5xl text-foreground leading-tight ${
                    line === "" ? "h-4" : ""
                  }`}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Additional context */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid md:grid-cols-2 gap-8"
          >
            <div>
              <h3 className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-3">
                Location
              </h3>
              <p className="text-foreground text-lg">
                Murshidabad, India
              </p>
            </div>
            <div>
              <h3 className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-3">
                Focus Areas
              </h3>
              <p className="text-foreground text-lg">
                AI Development • Full-Stack • Data Analysis
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
