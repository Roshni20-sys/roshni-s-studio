import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase } from "lucide-react";

interface ExperienceEntry {
  date: string;
  role: string;
  company: string;
  type: string;
  responsibilities: string[];
  tags: string[];
}

const experiences: ExperienceEntry[] = [
  {
    date: "Sep 2024 — Oct 2024",
    role: "Generative AI Intern",
    company: "SmartBridge",
    type: "Google Cloud Program (Virtual)",
    responsibilities: [
      "Applied core generative AI concepts to real-world problem statements",
      "Used Google Cloud tools for model training and deployment",
      "Focused on scalable, efficient AI solutions",
    ],
    tags: ["Google Cloud", "Vertex AI", "Generative AI", "Model Deployment"],
  },
  {
    date: "Dec 2025",
    role: "Python Development Intern",
    company: "ShadowFox",
    type: "Virtual Internship",
    responsibilities: [
      "Completed a virtual internship focused on Python programming and problem-solving",
      "Developed efficient Python scripts emphasizing clean and modular code",
    ],
    tags: ["Python", "Problem Solving", "Clean Code", "Modular Design"],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 md:py-40 bg-card relative grain-overlay">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-primary text-sm uppercase tracking-[0.3em] mb-12"
        >
          Experience
        </motion.p>

        <div ref={ref} className="relative">
          {/* Continuous timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent origin-top hidden lg:block"
          />

          <div className="space-y-16">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + idx * 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="relative grid lg:grid-cols-12 gap-8 lg:gap-16"
              >
                {/* Timeline node */}
                <div className="hidden lg:flex lg:col-span-1 justify-center relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + idx * 0.3, type: "spring", stiffness: 300 }}
                    className="absolute top-1 z-10"
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-card border-2 border-primary/40 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      {/* Pulse ring */}
                      <motion.div
                        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                        className="absolute inset-0 rounded-full border border-primary/30"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Left info */}
                <div className="lg:col-span-3">
                  <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-2">{exp.date}</p>
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-2">{exp.role}</h3>
                  <p className="text-secondary text-lg">{exp.company}</p>
                  <p className="text-muted-foreground text-sm mt-1">{exp.type}</p>
                </div>

                {/* Right content */}
                <div className="lg:col-span-8">
                  <h4 className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-6">Key Responsibilities</h4>
                  <ul className="space-y-5">
                    {exp.responsibilities.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + idx * 0.3 + i * 0.12 }}
                        className="flex gap-4"
                      >
                        <span className="text-primary mt-1.5 shrink-0">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                        <span className="text-foreground text-lg leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Staggered tags */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    {exp.tags.map((tag, ti) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.9 + idx * 0.3 + ti * 0.08 }}
                        className="px-4 py-2 bg-muted text-muted-foreground text-sm rounded-full"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
