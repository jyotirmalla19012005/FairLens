// frontend/src/hooks/useAnalysis.ts
import { useBiasReport } from "@/store/useBiasReport";
import { analyzeDataset } from "@/app/actions/analyze";

export const useAnalysis = () => {
  const {
    reset,
    setFile,
    setIsAnalyzing,
    setMetrics,
    appendAiExplanation,
  } = useBiasReport();

  const processDataset = async (file: File) => {
    try {
      reset();
      setFile(file);
      setIsAnalyzing(true);

      const formData = new FormData();
      formData.append("file", file);

      const result = await analyzeDataset(formData);

      if (!result.success) {
        alert(result.error);
        setIsAnalyzing(false);
        return;
      }

      setMetrics(result.data);

      const response = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ metrics: result.data }),
      });

      if (!response.body) {
        throw new Error("No response body from explanation API.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        appendAiExplanation(chunk);
      }
    } catch (error) {
      console.error("Analysis process failed:", error);
      alert("An error occurred during dataset analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return { processDataset };
};
