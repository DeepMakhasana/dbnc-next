"use client";
import { MoreVertical } from "lucide-react";
import { motion } from "motion/react";

const Header = () => {
  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-between items-center py-6"
      >
        <div>STATUS</div>
        <div>
          <MoreVertical />
        </div>
      </motion.div>
    </>
  );
};

export default Header;
