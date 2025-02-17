"use client";
import { motion } from "motion/react";
import React from "react";

const MotionHideShowSection = React.forwardRef<HTMLSelectElement, React.ComponentProps<"section">>(
  ({ children, className }, ref) => {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        transition={{ delay: 0.2 }}
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
