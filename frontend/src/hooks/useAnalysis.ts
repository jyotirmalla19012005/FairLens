import { useBiasReport } from "@/store/useBiasReport";
import { analyzeDataset } from "@/app/actions/analyze";
import { saveReport } from "@/app/actions/reports";

export function useAnalysis() {
  const {
    reset,
    setIsAnalyzing,
    setMetrics,
    appendAiExplanation,
  } = useBiasReport();

  const runAnalysis = async (formData: FormData, fileName: string) => {
    reset();
    setIsAnalyzing(true);

    try {
      // Step A: Analysis
      const analysisResult = await analyzeDataset(formData);
      if (analysisResult.error || !analysisResult.data) {
        console.error("Analysis Error:", analysisResult.error);
        setIsAnalyzing(false);
        return;
      }

      // Step B: Update Zustand
      const metrics = analysisResult.data;
      setMetrics(metrics);

      // Step C: Persistence
      const saveResult = await saveReport(fileName, metrics);
      if (saveResult.error) {
        console.warn("Failed to save report to database:", saveResult.error);
        // DO NOT stop the process
      }

      // Step D: AI Stream
      const aiResponse = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metrics }),
      });

      if (!aiResponse.ok) {
        console.warn("Failed to start AI explanation stream");
      } else if (aiResponse.body) {
        const reader = aiResponse.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          appendAiExplanation(chunk);
        }
      }
    } catch (err) {
      console.error("Unexpected error during analysis waterfall:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return { runAnalysis };
}
