import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  approach: string;
  outcome: string;
  tech: string[];
  features: string[];
}

const projects: Project[] = [
  {
    id: "savitr-ai",
    title: "Savitr-AI",
    subtitle: "Dynamic Delivery Solution",
    problem: "Traditional delivery systems fail to adapt to real-time conditions, leading to missed deliveries and inefficient logistics.",
    approach: "Built an AI-based scheduling system that considers traffic, weather, and user preferences for optimal delivery time allocation.",
    outcome: "Reduced missed deliveries and improved logistics KPIs through intelligent route optimization and SMS-based rescheduling.",
    tech: ["AI/ML", "Route Optimization", "SMS Integration"],
    features: ["Personalized delivery slots", "Weather-aware scheduling", "Real-time route optimization", "SMS rescheduling"],
  },
  {
    id: "weather-app",
    title: "Weather App",
    subtitle: "Real-time Weather Intelligence",
    problem: "Users need quick, reliable weather information with intuitive visual feedback.",
    approach: "Created a responsive web app with dynamic UI that adapts to current weather conditions.",
    outcome: "Delivered real-time forecasts with a 5-day outlook and condition-responsive interface.",
    tech: ["React.js", "TailwindCSS", "OpenWeather API"],
    features: ["Real-time data", "5-day forecast", "Dynamic weather UI", "Responsive design"],
  },
  {
    id: "calculator",
    title: "Calculator",
    subtitle: "Precision UI/UX",
    problem: "Most calculator apps prioritize features over usability and precision.",
    approach: "Focused on clean, correct implementation with attention to edge cases and user experience.",
    outcome: "A reliable calculator with proper state handling and responsive, accessible design.",
    tech: ["HTML", "CSS", "JavaScript"],
    features: ["Arithmetic operations", "State management", "Clean UI", "Accessibility"],
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.4, 0, 0.2, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative bg-card border border-border/50 p-8 md:p-12 transition-all duration-500 hover:border-primary/30 hover:bg-muted/30">
        {/* Project number */}
        <span className="absolute top-6 right-6 text-7xl md:text-8xl font-serif text-muted/30 select-none">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Header */}
        <div className="relative z-10 mb-8">
          <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-secondary text-lg">{project.subtitle}</p>
        </div>

        {/* Problem → Approach → Outcome */}
        <div className="relative z-10 space-y-6 mb-8">
          <div>
            <h4 className="text-muted-foreground text-xs uppercase tracking-[0.2em] mb-2">
              Problem
            </h4>
            <p className="text-foreground/80 leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <h4 className="text-muted-foreground text-xs uppercase tracking-[0.2em] mb-2">
              Approach
            </h4>
            <p className="text-foreground/80 leading-relaxed">{project.approach}</p>
          </div>
          <div>
            <h4 className="text-muted-foreground text-xs uppercase tracking-[0.2em] mb-2">
              Outcome
            </h4>
            <p className="text-foreground/80 leading-relaxed">{project.outcome}</p>
          </div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {project.features.map((feature) => (
              <span
                key={feature}
                className="text-muted-foreground text-sm border border-border/50 px-3 py-1"
              >
                {feature}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Tech stack */}
        <div className="relative z-10 flex flex-wrap gap-3">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-primary text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left"
        />
      </div>
    </motion.article>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-32 md:py-40 relative grain-overlay">
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
            Projects
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground max-w-2xl">
            Selected works that solve real problems
          </h2>
        </motion.div>

        {/* Projects grid */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
