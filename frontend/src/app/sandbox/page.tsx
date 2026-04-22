// frontend/src/app/sandbox/page.tsx
"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { MetricBadge } from "@/components/ui/MetricBadge";
import { UploadDropzone } from "@/components/ui/UploadDropzone";
import { staggerChildren } from "@/lib/animations";

export default function SandboxPage() {
  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10"
    >
      <GlassCard className="md:col-span-1">
        <UploadDropzone />
      </GlassCard>

      <GlassCard className="md:col-span-2 flex flex-col gap-6">
        <h2 className="text-primary text-xl font-medium">AIF360 Results</h2>
        <div className="flex flex-row gap-4 flex-wrap">
          <MetricBadge label="Disparate Impact" value="0.85" />
          <MetricBadge label="Statistical Parity" value="-0.12" />
          <MetricBadge label="Equal Opportunity" value="0.04" />
        </div>
      </GlassCard>
    </motion.div>
  );
}
