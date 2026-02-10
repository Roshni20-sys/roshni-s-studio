import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Achievement {
  award: string;
  event: string;
  title?: string;
  year: string;
}

const achievements: Achievement[] = [
  {
    award: "Two-time Finalist",
    event: "West Bengal Science and Technology Congress",
    year: "2025",
  },
  {
    award: "Finalist",
    event: "SBH 2025",
    year: "2025",
  },
  {
    award: "Best Paper Award",
    event: "ICSAA 2025",
    title: "Sustainable AI and Its Applications",
    year: "2025",
  },
  {
    award: "Outstanding Paper Award",
    event: "Ideathon 2025",
    title: "Inter-Department Research Contest",
    year: "2025",
  },
];

const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:py-40 bg-card relative grain-overlay">
      <div className="section-container">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-primary text-sm uppercase tracking-[0.3em] mb-12"
        >
          Recognition
        </motion.p>

        <div ref={ref} className="max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-16"
          >
            Awards & Achievements
          </motion.h2>

          <div className="space-y-12">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.award}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.15,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="group relative pl-8 border-l-2 border-border hover:border-primary transition-colors duration-300"
              >
                <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] bg-background border-2 border-border group-hover:border-primary group-hover:bg-primary transition-all duration-300" />
                
                <p className="text-muted-foreground text-sm mb-2">
                  {achievement.year}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {achievement.award}
                </h3>
                <p className="text-secondary text-lg mb-1">
                  {achievement.event}
                </p>
                {achievement.title && (
                  <p className="text-muted-foreground italic">
                    "{achievement.title}"
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
