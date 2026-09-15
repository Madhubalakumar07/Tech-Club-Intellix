# Intellix Backend API

Diagnostic & Strategic Audit Engine for Business Plans powered by **Meta Llama-3.1-8B-Instruct** (`meta-llama/Llama-3.1-8B-Instruct`) via **Hugging Face**.

---

## Architecture Overview

```
Frontend (React + Vite)
    │
    ▼ (POST /api/audit - multipart/form-data)
Express Server (:5000)
    │
    ├── 1. File Parser (pdf-parse / mammoth)
    │
    ├── 2. 8-Pillar Strategy Engine
    │      │
    │      ├── Option A: Hugging Face Inference API (Serverless Cloud)
    │      │             (using HF_TOKEN)
    │      │
    │      ├── Option B: Local Python PyTorch + Transformers Service (:8000)
    │      │             (`ai_service/app.py` with meta-llama/Llama-3.1-8B-Instruct)
    │      │
    │      └── Fallback: Intelligent heuristic validator
    │
    └── 3. Schema Normalizer (PlanLens UI Schema)
```

---

## 8 Strategic Pillars Audited

1. **Executive Summary**
2. **Problem & Solution**
3. **Market Analysis (TAM / SAM / SOM)**
4. **Business Model & Unit Economics**
5. **Competitive Analysis & Moats**
6. **Marketing & Sales (GTM & CAC)**
7. **Operations & Team Readiness**
8. **Financial Plan & Projections**

---

## Quick Start

### 1. Install Node Dependencies

```bash
cd backend
npm install
```

### 2. Configure Hugging Face (`.env`)

Edit `backend/.env`:

```env
PORT=5000

# Hugging Face Access Token (from https://huggingface.co/settings/tokens)
HF_TOKEN=hf_your_token_here
HF_MODEL=meta-llama/Llama-3.1-8B-Instruct

# Local Python Microservice (Optional)
USE_LOCAL_PYTHON_MODEL=false
LOCAL_PYTHON_AI_URL=http://localhost:8000
```

### 3. Run Server

```bash
# Start backend server
npm start
```

Server runs on: **`http://localhost:5000`**

---

## Option A: Hugging Face Inference API (Recommended)

1. Get your Hugging Face Access Token with read access to `meta-llama/Llama-3.1-8B-Instruct`:
   - Visit [Hugging Face Llama-3.1-8B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct) and accept license terms.
   - Generate an access token at [Hugging Face Settings Tokens](https://huggingface.co/settings/tokens).
2. Set `HF_TOKEN=hf_your_token_here` in `backend/.env`.
3. Start the backend: `npm start`.

---

## Option B: Run Llama 3.1 8B Locally with Python & PyTorch

If you want to run the model directly on your local GPU/machine:

1. **Login with Hugging Face CLI**:
   ```bash
   huggingface-cli login
   ```
2. **Install Python dependencies**:
   ```bash
   cd ai_service
   pip install -r requirements.txt
   ```
3. **Start the Python AI Service**:
   ```bash
   python app.py
   ```
   *Runs on `http://localhost:8000` with FastAPI & PyTorch.*

4. **Enable Local Python in `backend/.env`**:
   ```env
   USE_LOCAL_PYTHON_MODEL=true
   LOCAL_PYTHON_AI_URL=http://localhost:8000
   ```

---

## API Endpoints

### `GET /api/health`
Checks API and model status.

```json
{
  "status": "online",
  "timestamp": "2026-09-15T11:20:00.000Z",
  "service": "Intellix Business Plan Audit API",
  "version": "1.0.0",
  "aiEngine": {
    "provider": "Hugging Face Inference API",
    "model": "meta-llama/Llama-3.1-8B-Instruct",
    "tokenConfigured": true
  }
}
```

### `POST /api/audit`
Uploads and audits any business plan document (`.pdf`, `.docx`, `.doc`, `.txt`, `.ppt`, `.pptx`).

**Response Schema:**
Matches all PlanLens UI components (Donut gauge, Top 3 priority blockers, 8 pillar cards, quote excerpts, benchmarks, checklist remediations).
