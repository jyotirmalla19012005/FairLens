// frontend/src/components/ui/UploadDropzone.tsx
"use client";

import { useCallback, useState, useRef } from "react";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";
import { glassHover } from "@/lib/animations";
import { useAnalysis } from "@/hooks/useAnalysis";
import { useBiasReport } from "@/store/useBiasReport";

export const UploadDropzone = () => {
  const { processDataset } = useAnalysis();
  const file = useBiasReport((state) => state.file);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (selectedFile: File) => {
      processDataset(selectedFile);
    },
    [processDataset]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files?.[0];
      if (droppedFile) {
        handleFile(droppedFile);
      }
    },
    [handleFile]
  );

  const onClick = () => {
    inputRef.current?.click();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const borderColor = file || isDragging ? "border-white/20" : "border-neutral-700";

  return (
    <>
      <input
        type="file"
        accept=".csv,.json"
        ref={inputRef}
        onChange={onChange}
        className="hidden"
      />
      <motion.div
        variants={glassHover}
        initial="initial"
        whileHover="hover"
        onClick={onClick}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200 ${borderColor}`}
      >
        <UploadCloud className="w-10 h-10 text-neutral-400 mb-4" />
        <span className="text-primary text-lg font-medium mb-1 text-center truncate max-w-full px-4">
          {file ? file.name : "Drag and drop dataset"}
        </span>
        <span className="text-secondary text-sm">
          {file ? "Processing..." : "CSV or JSON only"}
        </span>
      </motion.div>
    </>
  );
};
