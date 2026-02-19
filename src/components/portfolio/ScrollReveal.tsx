import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}

const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const y = useTransform(
    scrollYProgress,
    [0, 0.6],
    direction === "up" ? [80, 0] : [0, 0]
  );
  const x = useTransform(
    scrollYProgress,
    [0, 0.6],
    direction === "left" ? [-60, 0] : direction === "right" ? [60, 0] : [0, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, x, scale }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
