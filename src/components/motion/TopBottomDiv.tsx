"use client";
import { motion } from "motion/react";
import React from "react";

const MotionTopBottomDiv = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ children, className }, ref) => {
    return (
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, ease: "easeInOut" }}
        ref={ref}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
);

MotionTopBottomDiv.displayName = "MotionTopBottomDiv";

export { MotionTopBottomDiv };
