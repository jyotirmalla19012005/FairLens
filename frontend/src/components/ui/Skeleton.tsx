// frontend/src/components/ui/Skeleton.tsx
"use client";

import { motion } from "framer-motion";
import { pulseSkeleton } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <motion.div
      variants={pulseSkeleton}
      initial="initial"
      animate="animate"
      className={cn("rounded-lg bg-white/10", className)}
    />
  );
};
