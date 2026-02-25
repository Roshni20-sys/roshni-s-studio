import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  label?: string;
}

const SectionDivider = ({ label }: SectionDividerProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0.1, 0.5], [20, 0]);
  const labelOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const diamondRotate = useTransform(scrollYProgress, [0.1, 0.5], [45, 0]);

  return (
    <div ref={ref} className="relative py-8 overflow-hidden">
      <div className="section-container flex items-center gap-6">
        <motion.div
          style={{ scaleX: lineScale }}
          className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent origin-left"
        />
        {label ? (
          <motion.div
            style={{ y: labelY, opacity: labelOpacity }}
            className="flex items-center gap-3"
          >
            <motion.div
              style={{ rotate: diamondRotate }}
              className="w-2 h-2 bg-primary/40 rounded-sm"
            />
            <span className="text-xs text-muted-foreground/50 uppercase tracking-[0.4em] whitespace-nowrap font-medium">
              {label}
            </span>
            <motion.div
              style={{ rotate: diamondRotate }}
              className="w-2 h-2 bg-primary/40 rounded-sm"
            />
          </motion.div>
        ) : null}
        <motion.div
          style={{ scaleX: lineScale }}
          className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent origin-right"
        />
      </div>
    </div>
  );
};

export default SectionDivider;
