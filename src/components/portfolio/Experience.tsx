import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const responsibilities = [
    "Applied core generative AI concepts to real-world problem statements",
    "Used Google Cloud tools for model training and deployment",
    "Focused on scalable, efficient AI solutions",
  ];

  return (
    <section id="experience" className="py-32 md:py-40 bg-card relative grain-overlay">
      <div className="section-container">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-primary text-sm uppercase tracking-[0.3em] mb-12"
        >
          Experience
        </motion.p>

        <div ref={ref} className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Timeline left side */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-2">
                Sep 2024 — Oct 2024
              </p>
              <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
                Generative AI Intern
              </h3>
              <p className="text-secondary text-lg">
                SmartBridge
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Virtual Internship Program powered by Google Cloud
              </p>
            </motion.div>
          </div>

          {/* Timeline line */}
          <div className="hidden lg:flex lg:col-span-1 justify-center">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="w-px h-full bg-gradient-to-b from-primary via-primary/50 to-transparent origin-top"
            />
          </div>

          {/* Content right side */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <h4 className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-6">
                Key Responsibilities
              </h4>
              
              <ul className="space-y-6">
                {responsibilities.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + index * 0.15,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="flex gap-4"
                  >
                    <span className="text-primary mt-1.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="text-foreground text-lg leading-relaxed">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mt-10 flex flex-wrap gap-3"
              >
                {["Google Cloud", "Vertex AI", "Generative AI", "Model Deployment"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-muted text-muted-foreground text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
