import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Award, Star, Medal } from "lucide-react";

interface Achievement {
  award: string;
  event: string;
  title?: string;
  year: string;
  icon: typeof Trophy;
}

const achievements: Achievement[] = [
  { award: "Two-time Finalist", event: "West Bengal Science and Technology Congress", year: "2025", icon: Star },
  { award: "Finalist", event: "SBH 2025", year: "2025", icon: Medal },
  { award: "Best Paper Award", event: "ICSAA 2025", title: "Sustainable AI and Its Applications", year: "2025", icon: Trophy },
  { award: "Outstanding Paper Award", event: "Ideathon 2025", title: "Inter-Department Research Contest", year: "2025", icon: Award },
];

const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:py-40 bg-card relative grain-overlay">
      <div className="section-container">
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
          <div className="flex items-center gap-4 mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground"
            >
              Awards & Achievements
            </motion.h2>
            {/* Year badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, type: "spring" }}
              className="hidden md:inline-flex px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20"
            >
              2025
            </motion.span>
          </div>

          <div className="space-y-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.award}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: [0.4, 0, 0.2, 1] }}
                  className="group relative"
                >
                  <div className="flex gap-5 p-6 rounded-lg bg-card/50 border border-border/30 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--primary)/0.08)] transition-all duration-500">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>

                    <div className="flex-1">
                      <p className="text-muted-foreground text-xs mb-1.5">{achievement.year}</p>
                      <h3 className="font-serif text-xl md:text-2xl text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300">
                        {achievement.award}
                      </h3>
                      <p className="text-secondary text-base mb-1">{achievement.event}</p>
                      {achievement.title && (
                        <p className="text-muted-foreground text-sm italic">"{achievement.title}"</p>
                      )}
                    </div>

                    {/* Left accent border glow */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg bg-primary/0 group-hover:bg-primary transition-colors duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
