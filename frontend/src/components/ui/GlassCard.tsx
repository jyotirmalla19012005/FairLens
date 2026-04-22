// frontend/src/components/ui/GlassCard.tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className = "" }: GlassCardProps) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      animate="animate"
      className={`glass-panel p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};
