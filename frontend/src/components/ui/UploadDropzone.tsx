// frontend/src/components/ui/UploadDropzone.tsx
"use client";

import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";
import { glassHover } from "@/lib/animations";

interface UploadDropzoneProps {
  onClick?: () => void;
}

export const UploadDropzone = ({ onClick }: UploadDropzoneProps) => {
  return (
    <motion.div
      variants={glassHover}
      initial="initial"
      whileHover="hover"
      onClick={onClick}
      className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-neutral-700 rounded-xl cursor-pointer"
    >
      <UploadCloud className="w-10 h-10 text-neutral-400 mb-4" />
      <span className="text-primary text-lg font-medium mb-1">
        Drag and drop dataset
      </span>
      <span className="text-secondary text-sm">
        CSV or JSON only
      </span>
    </motion.div>
  );
};
