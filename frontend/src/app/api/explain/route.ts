// frontend/src/app/api/explain/route.ts
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { auth } from "@clerk/nextjs/server";

/**
 * GLM 5.1 Provider Configuration
 * Pointing to BigModel (Zhipu AI) OpenAI-compatible interface.
 */
const zhipuai = createOpenAI({
  baseURL: 'https://open.bigmodel.cn/api/paas/v4/',
  apiKey: process.env.GL_API_KEY, // Controlled via Step 12.5 .env.local
});

export async function POST(req: Request) {
  try {
    // 1. Perimeter Security: Ensure only authenticated Clerk users can invoke AI
    const { userId } = await auth();
    if (!userId) {
      return new Response(JSON.stringify({ error: "UNAUTHORIZED_ACCESS" }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Request Validation
    const body = await req.json();
    const { metrics } = body;

    if (!metrics) {
      return new Response(JSON.stringify({ error: "MISSING_TELEMETRY_DATA" }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 3. GLM 5.1 Executive Auditor Prompting
    const result = await streamText({
      model: zhipuai('glm-4'), // Explicit endpoint for GLM series
      system: `You are the FairLens Executive AI Auditor. 
      Your mission is to provide an obsidian-cold, forensic analysis of AIF360 metrics.
      
      CONSTRAINTS:
      - TONE: Enterprise, high-stakes, professional. No conversational "vibe."
      - FORMAT: Markdown. Use '##' for main sections and '###' for sub-points.
      - CONTENT: 
        1. Explicitly state if the dataset passes the '80% Rule' for Disparate Impact (Threshold: 0.8).
        2. Analyze 'Statistical Parity Difference' (Ideal: 0.0).
        3. Identify potential legal/reputational risks.
        4. Recommend exactly three technical mitigation strategies (e.g., Reweighing, Adversarial Debiasing).`,
      prompt: `DATA AUDIT LOG:
      - Disparate Impact: ${metrics.disparateImpact}
      - Statistical Parity Difference: ${metrics.statisticalParityDifference}
      - Equal Opportunity Difference: ${metrics.equalOpportunityDifference || 'N/A'}
      
      Generate the forensic bias report now.`,
    });

    // 4. Return standard Vercel AI SDK Data Stream
    return result.toDataStreamResponse();

  } catch (error: any) {
    console.error("AI_EXPLAIN_CRITICAL_FAILURE:", error);
    return new Response(JSON.stringify({ error: "AI_ENGINE_OFFLINE", detail: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
