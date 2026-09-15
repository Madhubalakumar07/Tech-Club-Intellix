"""
Intellix Local AI Service
Running Meta Llama-3.1-8B-Instruct via Hugging Face Transformers & PyTorch.

Usage:
  1. Login with Hugging Face CLI:
     huggingface-cli login
     (or set HF_TOKEN environment variable)

  2. Install dependencies:
     pip install -r requirements.txt

  3. Run server:
     python app.py
"""

import os
import json
import torch
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

app = FastAPI(title="Intellix Llama-3.1 AI Service", version="1.0.0")

MODEL_ID = os.getenv("HF_MODEL", "meta-llama/Llama-3.1-8B-Instruct")
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

print(f"Loading tokenizer and model: {MODEL_ID} on device: {DEVICE}...")

try:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_ID,
        device_map="auto" if torch.cuda.is_available() else None,
        torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
        low_cpu_mem_usage=True
    )
    if DEVICE == "cpu" and not torch.cuda.is_available():
        model = model.to(DEVICE)
    print(f"Model {MODEL_ID} loaded successfully!")
except Exception as e:
    print(f"Warning: Could not load local model directly (Make sure you are authenticated with 'huggingface-cli login'). Error: {e}")
    model = None
    tokenizer = None


class MessageItem(BaseModel):
    role: str
    content: str


class AuditPillarRequest(BaseModel):
    messages: List[MessageItem]
    max_new_tokens: Optional[int] = 1024
    temperature: Optional[float] = 0.2


@app.get("/health")
def health():
    return {
        "status": "online",
        "model": MODEL_ID,
        "device": DEVICE,
        "cuda_available": torch.cuda.is_available(),
        "model_loaded": model is not None
    }


@app.post("/audit-pillar")
def audit_pillar(req: AuditPillarRequest):
    if model is None or tokenizer is None:
        raise HTTPException(
            status_code=503,
            detail="Model is not loaded. Please run 'huggingface-cli login' and restart service."
        )

    try:
        messages = [{"role": m.role, "content": m.content} for m in req.messages]

        inputs = tokenizer.apply_chat_template(
            messages,
            add_generation_prompt=True,
            tokenize=True,
            return_dict=True,
            return_tensors="pt"
        ).to(model.device)

        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_new_tokens=req.max_new_tokens or 1024,
                temperature=req.temperature or 0.2,
                do_sample=True if (req.temperature or 0.2) > 0 else False,
                pad_token_id=tokenizer.eos_token_id
            )

        output_tokens = outputs[0][inputs["input_ids"].shape[-1]:]
        response_text = tokenizer.decode(output_tokens, skip_special_tokens=True).strip()

        # Try parsing response into JSON
        try:
            # Handle potential markdown codeblocks
            clean_text = response_text
            if "```json" in clean_text:
                clean_text = clean_text.split("```json")[1].split("```")[0].strip()
            elif "```" in clean_text:
                clean_text = clean_text.split("```")[1].split("```")[0].strip()

            return json.loads(clean_text)
        except Exception:
            return {"raw_text": response_text}

    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    print(f"Starting Llama 3.1 Python Service on http://localhost:{port}")
    uvicorn.run(app, host="0.0.0.0", port=port)
