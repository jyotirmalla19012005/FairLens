from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FairLens Math Engine")

# Configure CORS for Next.js 15 (Port 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "operational", "engine": "AIF360"}

@app.post("/api/analyze")
async def analyze_placeholder():
    # Placeholder for Step 13
    return {
        "metrics": {
            "disparateImpact": 0.0,
            "statisticalParityDifference": 0.0,
            "equalOpportunityDifference": 0.0
        }
    }
