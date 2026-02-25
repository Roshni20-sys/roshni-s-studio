import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MapPin, Brain, Languages, Sparkles } from "lucide-react";

const factCards = [
  { icon: MapPin, label: "Location", value: "Murshidabad, West Bengal, India" },
  { icon: Brain, label: "Focus Areas", value: "AI Development • Full-Stack • Data Analytics" },
  { icon: Languages, label: "Languages", value: "English • Hindi • Bengali" },
  { icon: Sparkles, label: "Interests", value: "AI for Social Impact • Competitive Programming" },
];

const About = () => {
  const ref = useRef(null);
  const quoteRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: quoteRef, offset: ["start end", "end start"] });
  const quoteY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const lines = [
    "Final-year Computer Science and Engineering",
    "undergraduate with strong fundamentals in",
    "software development, data structures, and databases.",
    "",
    "Experienced in building full-stack and AI-driven",
    "applications through academic projects,",
    "internships, and hackathons."
  ];

  return (
    <section id="about" className="py-32 md:py-40 relative grain-overlay">
      <div className="section-container">
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

        <div ref={ref} className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left: Quote (7 cols) */}
          <div className="lg:col-span-7 relative" ref={quoteRef}>
            {/* Large quote mark with parallax */}
            <motion.span
              style={{ y: quoteY }}
              className="absolute -left-4 md:-left-12 -top-6 text-8xl md:text-9xl font-serif text-primary/10 select-none"
            >
              "
            </motion.span>

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
                  className={`font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight ${
                    line === "" ? "h-4" : ""
                  }`}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Decorative divider */}
          <div className="hidden lg:flex lg:col-span-1 justify-center items-stretch">
            <div className="relative w-px h-full">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="w-full h-full bg-gradient-to-b from-transparent via-border to-transparent origin-top"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary"
              />
            </div>
          </div>

          {/* Right: Fact cards (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {factCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                className="group p-5 bg-card/50 border border-border/30 rounded-lg hover:border-primary/30 hover:bg-card transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                    <card.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-muted-foreground text-xs uppercase tracking-[0.2em] mb-1.5">
                      {card.label}
                    </h3>
                    <p className="text-foreground text-sm leading-relaxed">
                      {card.value}
                    </p>
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

export default About;
