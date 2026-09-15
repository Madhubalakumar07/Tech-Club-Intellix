/**
 * Hugging Face Llama-3.1-8B-Instruct AI Client
 * 
 * Supports:
 * 1. Hugging Face Inference API (Cloud / Serverless) via HF_TOKEN
 * 2. Local Python Transformers Microservice via LOCAL_PYTHON_AI_URL (http://localhost:8000)
 */

const HF_TOKEN = process.env.HF_TOKEN || process.env.HUGGINGFACE_API_KEY || '';
const HF_MODEL = process.env.HF_MODEL || 'meta-llama/Llama-3.1-8B-Instruct';
const LOCAL_PYTHON_AI_URL = process.env.LOCAL_PYTHON_AI_URL || 'http://localhost:8000';
const USE_LOCAL_PYTHON = process.env.USE_LOCAL_PYTHON_MODEL === 'true';

/**
 * Builds the chat prompt for Llama 3.1 Instruct
 */
function buildLlamaPrompt(pillar, documentText) {
  const systemPrompt = `You are a Tier-1 Venture Capital Due Diligence and Business Strategy Auditor.
Your task is to analyze the provided business plan text specifically for the strategic pillar: "${pillar.title}".

You MUST return ONLY a valid JSON object (no markdown fences, no explanatory text, no extra characters) with this exact schema:
{
  "score": <integer from 0 to 100>,
  "status": "<Strong|Good|Needs Imp.|Weak>",
  "summary": "<1-2 sentence executive appraisal of this section>",
  "executiveSectionSummary": "<2-3 sentence diagnostic evaluation for institutional investors>",
  "strengths": ["<strength 1 with specific facts from document>", "<strength 2>"],
  "weaknesses": ["<critical gap or risk 1>", "<critical gap or risk 2>"],
  "evidenceQuote": "<direct quote excerpt from the document>",
  "evidenceBadge": "<Verified Reference|Partial Coverage|Unverified Claim>",
  "remediations": [
    {"id": "${pillar.id}-rem-1", "text": "<concrete actionable recommendation 1>", "done": false},
    {"id": "${pillar.id}-rem-2", "text": "<concrete actionable recommendation 2>", "done": false}
  ]
}`;

  const userPrompt = `Strategic Pillar: ${pillar.title} (Framework: ${pillar.framework})
Business Plan Excerpt:
"""
${documentText.slice(0, 8000)}
"""

Evaluate this section now and return ONLY the JSON object.`;

  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ];
}

/**
 * Query Hugging Face Inference API for Llama 3.1 8B Instruct
 */
async function queryHfInferenceApi(messages) {
  if (!HF_TOKEN) {
    throw new Error('HF_TOKEN is not configured in backend/.env. Please add your Hugging Face Access Token.');
  }

  // Use Hugging Face Serverless Chat Completion endpoint
  const url = `https://api-inference.huggingface.co/models/${HF_MODEL}/v1/chat/completions`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HF_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: HF_MODEL,
      messages: messages,
      max_tokens: 1200,
      temperature: 0.2,
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    // Fallback: standard router endpoint if v1/chat/completions is unavailable
    if (response.status === 404 || response.status === 400) {
      return await queryHfRouterFallback(messages);
    }
    throw new Error(`Hugging Face API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';
  return parseJsonOutput(content);
}

/**
 * Fallback endpoint for raw Hugging Face model inference
 */
async function queryHfRouterFallback(messages) {
  const promptText = messages.map(m => `<|start_header_id|>${m.role}<|end_header_id|>\n\n${m.content}<|eot_id|>`).join('\n') + '\n<|start_header_id|>assistant<|end_header_id|>\n\n';

  const url = `https://api-inference.huggingface.co/models/${HF_MODEL}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HF_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: promptText,
      parameters: {
        max_new_tokens: 1000,
        temperature: 0.2,
        return_full_text: false
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Hugging Face Router Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const rawText = Array.isArray(data) ? data[0]?.generated_text : data.generated_text;
  return parseJsonOutput(rawText || '');
}

/**
 * Query Local Python Transformers FastAPI service
 */
async function queryLocalPythonService(messages) {
  const response = await fetch(`${LOCAL_PYTHON_AI_URL}/audit-pillar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages })
  });

  if (!response.ok) {
    throw new Error(`Local Python Service Error (${response.status}): ${await response.text()}`);
  }

  const data = await response.json();
  return typeof data === 'object' ? data : parseJsonOutput(data);
}

/**
 * Clean and parse JSON from LLM output
 */
function parseJsonOutput(raw) {
  if (!raw || typeof raw !== 'string') return null;
  try {
    // 1. Direct parse
    return JSON.parse(raw.trim());
  } catch (e) {
    // 2. Extract from markdown ```json ``` blocks
    const match = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1].trim());
      } catch (inner) {}
    }
    // 3. Find first { and last }
    const firstBrace = raw.indexOf('{');
    const lastBrace = raw.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      try {
        return JSON.parse(raw.substring(firstBrace, lastBrace + 1));
      } catch (inner) {}
    }
    console.warn('[HF Client] Could not parse JSON from model response:', raw);
    return null;
  }
}

/**
 * Main evaluation function for a strategic pillar using Llama 3.1 8B Instruct
 */
async function evaluatePillarWithLlama(pillar, documentText) {
  const messages = buildLlamaPrompt(pillar, documentText);

  if (USE_LOCAL_PYTHON) {
    return await queryLocalPythonService(messages);
  } else {
    return await queryHfInferenceApi(messages);
  }
}

module.exports = {
  evaluatePillarWithLlama,
  HF_MODEL,
  HF_TOKEN,
  USE_LOCAL_PYTHON
};
