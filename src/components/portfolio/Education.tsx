import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-32 md:py-40 relative grain-overlay">
      <div className="section-container">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-primary text-sm uppercase tracking-[0.3em] mb-12"
        >
          Education
        </motion.p>

        <div ref={ref} className="max-w-4xl">
          {/* Primary education */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="mb-16"
          >
            <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-3">
              2022 — 2026
            </p>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Bachelor of Engineering
            </h3>
            <p className="text-xl md:text-2xl text-foreground/80 mb-2">
              Computer Science & Engineering
            </p>
            <p className="text-secondary text-lg mb-4">
              University Institute of Technology, The University of Burdwan
            </p>
            <div className="inline-flex items-center gap-3 bg-card border border-border/50 px-6 py-3">
              <span className="text-muted-foreground text-sm uppercase tracking-[0.15em]">
                CGPA
              </span>
              <span className="text-foreground text-2xl font-serif">
                7.34<span className="text-muted-foreground text-lg"> / 10</span>
              </span>
              <span className="text-muted-foreground text-xs">
                (till 5th semester)
              </span>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-px bg-border mb-12 origin-left"
          />

          {/* Secondary education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="text-muted-foreground">
              <p className="text-xs uppercase tracking-[0.2em] mb-2">
                Higher Secondary (WBCHSE)
              </p>
              <p className="text-foreground/70 mb-1">
                Kandi Raja M. C. Girls High School
              </p>
              <p className="text-sm">70% • 2020–2022</p>
            </div>
            <div className="text-muted-foreground">
              <p className="text-xs uppercase tracking-[0.2em] mb-2">
                Secondary (WBBSE)
              </p>
              <p className="text-foreground/70 mb-1">
                Kandi Raja M. C. Girls High School
              </p>
              <p className="text-sm">83% • 2015–2020</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
