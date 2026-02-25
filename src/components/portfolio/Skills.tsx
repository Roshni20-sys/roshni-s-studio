import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Globe, Brain, BookOpen, Wrench, Users } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: typeof Code;
  skills: { name: string; level: number }[];
  span?: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    icon: Code,
    span: "md:col-span-2",
    skills: [
      { name: "Python", level: 85 },
      { name: "Java", level: 75 },
      { name: "C", level: 70 },
      { name: "JavaScript", level: 80 },
      { name: "SQL", level: 78 },
    ],
  },
  {
    title: "Web Technologies",
    icon: Globe,
    skills: [
      { name: "React.js", level: 82 },
      { name: "HTML/CSS", level: 90 },
      { name: "TailwindCSS", level: 85 },
      { name: "REST APIs", level: 75 },
    ],
  },
  {
    title: "Analytics & AI",
    icon: Brain,
    skills: [
      { name: "Power BI", level: 72 },
      { name: "Google Vertex AI", level: 68 },
    ],
  },
  {
    title: "Core CS",
    icon: BookOpen,
    span: "md:col-span-2",
    skills: [
      { name: "Data Structures & Algorithms", level: 80 },
      { name: "DBMS", level: 78 },
      { name: "Operating Systems", level: 72 },
      { name: "OOP", level: 82 },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: [
      { name: "Git / GitHub", level: 80 },
      { name: "Figma", level: 70 },
      { name: "Canva", level: 75 },
      { name: "AI Assistants", level: 85 },
    ],
  },
];

const softSkills = [
  { name: "Analytical Thinking", level: 90 },
  { name: "Communication", level: 82 },
  { name: "Team Collaboration", level: 85 },
  { name: "Problem Solving", level: 88 },
];

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-foreground text-sm">{name}</span>
        <span className="text-muted-foreground text-xs">{level}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: [0.4, 0, 0.2, 1] }}
          className="h-full bg-primary rounded-full"
        />
      </div>
    </div>
  );
};

const CircularProgress = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const circumference = 2 * Math.PI * 28;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-16">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
          <motion.circle
            cx="32" cy="32" r="28"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset } : {}}
            transition={{ duration: 1.2, delay, ease: [0.4, 0, 0.2, 1] }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-foreground">
          {level}%
        </span>
      </div>
      <span className="text-xs text-muted-foreground text-center leading-tight">{name}</span>
    </div>
  );
};

const SkillCard = ({ category, index }: { category: SkillCategory; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = category.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className={`group ${category.span || ""}`}
    >
      <div className="bg-card border border-border/50 p-6 md:p-8 h-full transition-all duration-300 hover:border-primary/30 hover-glow rounded-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-md bg-primary/10 text-primary">
            <Icon className="w-4 h-4" />
          </div>
          <h3 className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
            {category.title}
          </h3>
        </div>
        <div className="space-y-4">
          {category.skills.map((skill, si) => (
            <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 0.1 + si * 0.08} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-32 md:py-40 bg-card relative grain-overlay">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4">Skills</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground max-w-2xl">
            Technical proficiencies
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}

          {/* Soft skills with circular progress */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="md:col-span-1"
          >
            <div className="bg-primary/5 border border-primary/20 p-6 md:p-8 h-full rounded-lg transition-all duration-300 hover:bg-primary/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-md bg-primary/10 text-primary">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-primary text-xs uppercase tracking-[0.2em]">Soft Skills</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {softSkills.map((skill, i) => (
                  <CircularProgress key={skill.name} name={skill.name} level={skill.level} delay={0.5 + i * 0.15} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
