"use server";

import { UploadSchema } from "@/lib/schemas";

export async function analyzeDataset(formData: FormData) {
  try {
    // 1. Edge Validation
    const file = formData.get("file");
    const validated = UploadSchema.safeParse({ file });

    if (!validated.success) {
      return { data: null, error: "Invalid file format. Please upload a CSV." };
    }

    // 2. FastAPI Handshake
    // Note: Use 'http://127.0.0.1:8000' for local dev
    const response = await fetch("http://127.0.0.1:8000/api/analyze", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { data: null, error: errorData.detail || "FastAPI Engine Error" };
    }

    const metrics = await response.json();

    return { 
      data: metrics.metrics, 
      error: null 
    };

  } catch (err) {
    console.error("Analysis Pipeline Crash:", err);
    return { 
      data: null, 
      error: "Network failure: Ensure FastAPI server is running on port 8000." 
    };
  }
}
