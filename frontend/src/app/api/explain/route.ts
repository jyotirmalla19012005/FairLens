// frontend/src/app/api/explain/route.ts
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const glmProvider = createOpenAI({
  baseURL: "https://open.bigmodel.cn/api/paas/v4/",
  apiKey: process.env.GLM_API_KEY,
});

export async function POST(req: Request) {
  const { metrics } = await req.json();

  const result = await streamText({
    model: glmProvider("glm-4"), // Using glm-4 as the default model string for GLM
    system: "You are an enterprise data bias analyzer. Your task is to evaluate the provided AIF360 fairness metrics (e.g., Disparate Impact, Statistical Parity Difference, Equal Opportunity Difference) and explain the potential biases in a clear, concise, and professional manner.",
    prompt: `Analyze the following AIF360 metrics:\n\n${JSON.stringify(metrics, null, 2)}`,
  });

  return result.toDataStreamResponse();
}
