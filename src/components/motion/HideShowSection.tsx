"use client";
import { motion } from "motion/react";
import React from "react";

const MotionHideShowSection = React.forwardRef<HTMLSelectElement, React.ComponentProps<"section">>(
  ({ children, className }, ref) => {
    return (
      <motion.section
        initial={{ opacity: 0, scale: 0.98, filter: "blur(2px)" }}
        animate={{ opacity: 100, scale: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.3 }}
        ref={ref}
        className={className}
      >
        {children}
      </motion.section>
    );
  }
);

MotionHideShowSection.displayName = "MotionHideShowSection";

export { MotionHideShowSection };
