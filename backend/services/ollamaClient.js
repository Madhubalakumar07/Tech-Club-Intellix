/**
 * Ollama Client Integration Module
 *
 * This service handles calling the local Ollama instance running the Qwen 3.2 model.
 * It is structured and ready for direct activation.
 */

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen3.2';

/**
 * Checks if local Ollama daemon is reachable.
 */
async function checkOllamaAvailability() {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`, { method: 'GET' });
    if (response.ok) {
      const data = await response.json();
      const models = data.models || [];
      const hasModel = models.some(m => m.name.includes(OLLAMA_MODEL) || m.name.includes('qwen'));
      return { available: true, models, hasTargetModel: hasModel };
    }
    return { available: false, error: `HTTP ${response.status}` };
  } catch (err) {
    return { available: false, error: err.message };
  }
}

/**
 * Builds standard system prompt for business plan evaluation on a strategic pillar.
 */
function buildPillarPrompt(pillar, documentText) {
  return `You are a Tier-1 Venture Capital Due Diligence and Business Strategy Auditor.
Analyze the following business plan excerpt specifically for the "${pillar.title}" section.

Return ONLY a JSON object (no markdown formatting, no code blocks) with the following structure:
{
  "score": <number between 0 and 100>,
  "status": "<Strong|Good|Needs Imp.|Weak>",
  "summary": "<1-2 sentence executive appraisal>",
  "executiveSectionSummary": "<2-3 sentence comprehensive diagnostic assessment>",
  "strengths": ["<verified strength 1>", "<verified strength 2>"],
  "weaknesses": ["<critical vulnerability 1>", "<critical vulnerability 2>"],
  "evidenceQuote": "<direct excerpt quote from the document illustrating this section>",
  "evidenceBadge": "<Verified Reference|Partial Coverage|Unverified Claim>",
  "remediations": [
    {"id": "${pillar.id}-rem-1", "text": "<actionable fix 1>", "done": false},
    {"id": "${pillar.id}-rem-2", "text": "<actionable fix 2>", "done": false}
  ]
}

Document Excerpt:
"""
${documentText.slice(0, 12000)}
"""`;
}

/**
 * Calls local Ollama to evaluate a specific pillar using Qwen 3.2.
 */
async function queryOllamaPillar(pillar, documentText) {
  const prompt = buildPillarPrompt(pillar, documentText);

  const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt: prompt,
      stream: false,
      format: 'json',
      options: {
        temperature: 0.2,
        top_p: 0.9
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama API error (${response.status}): ${await response.text()}`);
  }

  const result = await response.json();
  try {
    return JSON.parse(result.response);
  } catch (e) {
    console.warn(`[OllamaClient] Failed to parse JSON response for ${pillar.id}, using raw text:`, result.response);
    return null;
  }
}

module.exports = {
  checkOllamaAvailability,
  queryOllamaPillar,
  OLLAMA_BASE_URL,
  OLLAMA_MODEL
};
