// frontend/src/app/page.tsx
"use client";

import { motion } from "framer-motion";
import { UploadDropzone } from "@/components/ui/UploadDropzone";
import { GlassCard } from "@/components/ui/GlassCard";
import { MetricBadge } from "@/components/ui/MetricBadge";
import { useBiasReport } from "@/store/useBiasReport";
import { staggerChildren } from "@/lib/animations";

export default function DashboardPage() {
  const { metrics, aiExplanation, isAnalyzing } = useBiasReport();

  return (
    <main className="min-h-screen p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-medium text-primary mb-2">FairLens Dashboard</h1>
          <p className="text-secondary">Enterprise Data Bias Analysis via AIF360 & GLM 5.1</p>
        </header>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Data Ingestion Column */}
          <GlassCard className="flex flex-col gap-4">
            <h2 className="text-lg font-medium text-primary">Data Ingestion</h2>
            <UploadDropzone />
          </GlassCard>

          {/* Results Column */}
          <GlassCard className="lg:col-span-2 flex flex-col gap-6">
            <h2 className="text-lg font-medium text-primary">Analysis Results</h2>
            {isAnalyzing ? (
              <div className="flex items-center justify-center h-48">
                <span className="text-secondary animate-pulse">Processing dataset...</span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <MetricBadge
                    label="Disparate Impact"
                    value={metrics.disparateImpact !== null ? metrics.disparateImpact.toFixed(3) : "—"}
                  />
                  <MetricBadge
                    label="Statistical Parity"
                    value={metrics.statisticalParityDifference !== null ? metrics.statisticalParityDifference.toFixed(3) : "—"}
                  />
                  <MetricBadge
                    label="Equal Opportunity"
                    value={metrics.equalOpportunityDifference !== null ? metrics.equalOpportunityDifference.toFixed(3) : "—"}
                  />
                </div>

                {aiExplanation && (
                  <div className="mt-4 p-4 rounded-lg bg-black/20 border border-white/5">
                    <h3 className="text-sm font-medium text-secondary uppercase tracking-wider mb-2">
                      AI Explanation (GLM 5.1)
                    </h3>
                    <p className="text-primary text-sm whitespace-pre-wrap leading-relaxed">
                      {aiExplanation}
                    </p>
                  </div>
                )}
              </>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </main>
  );
}
