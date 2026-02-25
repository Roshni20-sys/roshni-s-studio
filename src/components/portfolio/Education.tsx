import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap } from "lucide-react";

const CGPARing = ({ value, max = 10 }: { value: number; max?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div ref={ref} className="relative w-36 h-36 md:w-44 md:h-44">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
        <motion.circle
          cx="60" cy="60" r="52"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset } : {}}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-serif text-foreground">{value}</span>
        <span className="text-xs text-muted-foreground">/ {max}</span>
      </div>
    </div>
  );
};

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-32 md:py-40 relative grain-overlay">
      <div className="section-container">
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
          {/* Primary education card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="mb-16"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
              <div className="flex-1">
                <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-3">2022 — 2026</p>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                  Bachelor of Engineering
                </h3>
                <p className="text-xl md:text-2xl text-foreground/80 mb-2">Computer Science & Engineering</p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-1.5 rounded-md bg-primary/10">
                    <GraduationCap className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-secondary text-lg">University Institute of Technology, The University of Burdwan</p>
                </div>
                <p className="text-muted-foreground text-sm">(till 5th semester)</p>
              </div>

              {/* CGPA Ring */}
              <div className="flex flex-col items-center gap-2">
                <CGPARing value={7.34} />
                <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">CGPA</span>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-px bg-border mb-12 origin-left"
          />

          {/* Secondary education mini-cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-5"
          >
            {[
              { level: "Higher Secondary (WBCHSE)", school: "Kandi Raja M. C. Girls High School", score: "70%", years: "2020–2022" },
              { level: "Secondary (WBBSE)", school: "Kandi Raja M. C. Girls High School", score: "83%", years: "2015–2020" },
            ].map((edu, i) => (
              <motion.div
                key={edu.level}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.15 }}
                whileHover={{ y: -4 }}
                className="p-5 bg-card/50 border border-border/30 rounded-lg hover:border-primary/20 hover:shadow-md transition-all duration-300"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{edu.level}</p>
                <p className="text-foreground/80 text-sm mb-2">{edu.school}</p>
                <div className="flex items-center gap-3">
                  <span className="text-primary font-serif text-lg">{edu.score}</span>
                  <span className="text-muted-foreground text-xs">• {edu.years}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
