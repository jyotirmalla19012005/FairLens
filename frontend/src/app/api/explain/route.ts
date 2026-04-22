// frontend/src/app/api/explain/route.ts
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

// Corrected API Provider pointing to GLM_API_KEY
const zhipuai = createOpenAI({
  baseURL: 'https://open.bigmodel.cn/api/paas/v4/',
  apiKey: process.env.GLM_API_KEY,
});

// Airtight Validation Schema
const RequestSchema = z.object({
  metrics: z.object({
    disparateImpact: z.number(),
    statisticalParityDifference: z.number(),
    equalOpportunityDifference: z.number().optional().default(0),
  }),
});

export async function POST(req: Request) {
  try {
    // 1. Identity Perimeter
    const { userId } = await auth();
    if (!userId) return new Response(JSON.stringify({ error: "UNAUTHORIZED" }), { status: 401 });

    // 2. Data Integrity Check (Zod)
    const json = await req.json();
    const result = RequestSchema.safeParse(json);
    
    if (!result.success) {
      return new Response(JSON.stringify({ error: "INVALID_METRICS_PAYLOAD" }), { status: 400 });
    }

    const { metrics } = result.data;

    // 3. Executive Forensic Auditor Execution
    const aiResponse = await streamText({
      model: zhipuai('glm-4'),
      system: `You are the FairLens Lead Compliance Auditor.
      Perform a forensic bias audit.
      
      TONE: Clinical, technical, objective. No fluff.
      FORMAT: Clean Markdown. Use ## for Sections.
      
      CRITICAL EVALUATION:
      - 'Disparate Impact' < 0.8 is a high-risk failure (Four-Fifths Rule).
      - 'Statistical Parity' outside [-0.1, 0.1] is a warning.
      
      STRUCTURE:
      ## Executive Summary
      ## Metric Drilldown
      ## Risk Assessment
      ## Mitigation Roadmap (3 technical steps)`,
      prompt: `TELEMETRY DATA:
      - Impact Ratio: ${metrics.disparateImpact}
      - Parity Gap: ${metrics.statisticalParityDifference}
      - Opp. Difference: ${metrics.equalOpportunityDifference}
      
      Generate audit.`,
    });

    return aiResponse.toDataStreamResponse();

  } catch (error: any) {
    console.error("CRITICAL_AI_FAILURE:", error);
    return new Response(JSON.stringify({ error: "AI_OFFLINE", detail: error.message }), { status: 500 });
  }
}
