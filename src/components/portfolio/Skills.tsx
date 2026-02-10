import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    skills: ["Python", "Java", "C", "JavaScript", "SQL"],
  },
  {
    title: "Web Technologies",
    skills: ["React.js", "HTML", "CSS", "REST APIs"],
  },
  {
    title: "Analytics & AI",
    skills: ["Power BI", "Google Vertex AI"],
  },
  {
    title: "Core CS",
    skills: ["Data Structures & Algorithms", "DBMS", "Operating Systems", "OOP"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "Figma", "Canva", "ChatGPT", "Claude"],
  },
];

const SkillCard = ({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="group"
    >
      <div className="bg-card border border-border/50 p-8 h-full transition-all duration-300 hover:border-primary/30 hover-glow">
        <h3 className="text-muted-foreground text-xs uppercase tracking-[0.2em] mb-6">
          {category.title}
        </h3>
        <ul className="space-y-3">
          {category.skills.map((skill, skillIndex) => (
            <motion.li
              key={skill}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: index * 0.1 + skillIndex * 0.08,
              }}
              className="text-foreground text-lg group-hover:text-foreground transition-colors duration-300"
            >
              {skill}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-32 md:py-40 bg-card relative grain-overlay">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4">
            Skills
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground max-w-2xl">
            Technical proficiencies
          </h2>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
          
          {/* Soft skills card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="group md:col-span-2 lg:col-span-1"
          >
            <div className="bg-primary/5 border border-primary/20 p-8 h-full transition-all duration-300 hover:bg-primary/10">
              <h3 className="text-primary text-xs uppercase tracking-[0.2em] mb-6">
                Soft Skills
              </h3>
              <ul className="space-y-3">
                {["Analytical Thinking", "Communication", "Team Collaboration", "Problem Solving"].map((skill) => (
                  <li key={skill} className="text-foreground text-lg">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
