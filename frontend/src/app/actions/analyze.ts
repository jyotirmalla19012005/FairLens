// frontend/src/app/actions/analyze.ts
"use server";

import { UploadSchema, AIF360ResponseSchema } from "@/lib/schemas";

export async function analyzeDataset(formData: FormData) {
  const file = formData.get("file");

  const parsed = UploadSchema.safeParse({ file });

  if (!parsed.success) {
    return {
      success: false as const,
      error: parsed.error.errors[0]?.message || "Invalid file.",
    };
  }

  const backendFormData = new FormData();
  backendFormData.append("file", parsed.data.file);

  try {
    const response = await fetch("http://127.0.0.1:8000/api/analyze", {
      method: "POST",
      body: backendFormData,
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const json = await response.json();
    const metrics = AIF360ResponseSchema.parse(json);

    return {
      success: true as const,
      data: metrics,
    };
  } catch (error) {
    console.error("Analysis error:", error);
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Network or server failure.",
    };
  }
}
