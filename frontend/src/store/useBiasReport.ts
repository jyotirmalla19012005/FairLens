// frontend/src/store/useBiasReport.ts
import { create } from "zustand";

interface BiasMetrics {
  disparateImpact: number | null;
  statisticalParityDifference: number | null;
  equalOpportunityDifference: number | null;
}

interface BiasReportState {
  file: File | null;
  isAnalyzing: boolean;
  metrics: BiasMetrics;
  aiExplanation: string;

  setFile: (file: File | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setMetrics: (metrics: BiasMetrics) => void;
  setAiExplanation: (text: string) => void;
  appendAiExplanation: (chunk: string) => void;
  reset: () => void;
}

const initialState = {
  file: null,
  isAnalyzing: false,
  metrics: {
    disparateImpact: null,
    statisticalParityDifference: null,
    equalOpportunityDifference: null,
  },
  aiExplanation: "",
};

export const useBiasReport = create<BiasReportState>((set) => ({
  ...initialState,

  setFile: (file) => set({ file }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setMetrics: (metrics) => set({ metrics }),
  setAiExplanation: (text) => set({ aiExplanation: text }),
  appendAiExplanation: (chunk) =>
    set((state) => ({ aiExplanation: state.aiExplanation + chunk })),
  reset: () => set(initialState),
}));
