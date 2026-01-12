import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorFollower = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for smooth following
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Trail elements with different delays
  const trailConfig = { damping: 30, stiffness: 150 };
  const trail1X = useSpring(cursorX, { ...trailConfig, stiffness: 120 });
  const trail1Y = useSpring(cursorY, { ...trailConfig, stiffness: 120 });
  const trail2X = useSpring(cursorX, { ...trailConfig, stiffness: 80 });
  const trail2Y = useSpring(cursorY, { ...trailConfig, stiffness: 80 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = Boolean(
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      );
      setIsHovering(isHoverable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousemove", handleElementHover);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", handleElementHover);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Trail 2 - furthest back */}
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-primary/10 -translate-x-1/2 -translate-y-1/2"
        style={{
          x: trail2X,
          y: trail2Y,
          opacity: isVisible ? 0.4 : 0,
        }}
      />

      {/* Trail 1 */}
      <motion.div
        className="fixed w-4 h-4 rounded-full bg-primary/20 -translate-x-1/2 -translate-y-1/2"
        style={{
          x: trail1X,
          y: trail1Y,
          opacity: isVisible ? 0.6 : 0,
        }}
      />

      {/* Main cursor */}
      <motion.div
        className="fixed rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          width: isHovering ? 48 : 12,
          height: isHovering ? 48 : 12,
          backgroundColor: isHovering
            ? "hsl(var(--primary))"
            : "hsl(var(--foreground))",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { duration: 0.2 },
          height: { duration: 0.2 },
          backgroundColor: { duration: 0.2 },
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed w-1 h-1 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible && !isHovering ? 1 : 0,
        }}
      />
    </div>
  );
};

export default CursorFollower;
