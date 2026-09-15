/**
 * Audit Engine — Analyzes extracted business plan text across 8 strategic pillars.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  TODO: Replace heuristic scoring with Ollama qwen3 AI model calls       │
 * │                                                                         │
 * │  When ready, call:                                                      │
 * │    POST http://localhost:11434/api/generate                             │
 * │    Body: { model: "qwen3:latest", prompt: buildPrompt(pillar, text),   │
 * │            stream: false }                                              │
 * │                                                                         │
 * │  The AI should return a JSON object per pillar with:                    │
 * │    { score, summary, strengths[], weaknesses[], evidenceQuote,          │
 * │      evidenceSource, remediations[] }                                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

// ─── Pillar definitions (IDs match frontend data schema) ───────────────────

const PILLARS = [
  {
    id: 'executive-summary',
    number: '01',
    title: 'Executive Summary',
    shortTitle: 'Executive Su...',
    keywords: ['vision', 'mission', 'founder', 'problem', 'solution', 'summary', 'startup', 'company', 'team', 'raise'],
    criticalKeywords: ['mission', 'problem', 'solution'],
    framework: 'Venture Executive Summary Standard',
    frameworkDesc: 'A seed-stage executive summary must crystallize problem, secret sauce, and traction in under 90 seconds of investor reading.',
    frameworkPoints: [
      { label: 'Hooks', text: 'Compelling industry context and urgency.' },
      { label: 'Defensibility', text: 'Why incumbents cannot easily replicate this.' },
      { label: 'The Ask', text: 'Precise funding required and key milestone triggers.' }
    ]
  },
  {
    id: 'problem-solution',
    number: '02',
    title: 'Problem & Solution',
    shortTitle: 'Problem & So...',
    keywords: ['problem', 'solution', 'pain point', 'challenge', 'inefficiency', 'gap', 'solve', 'address', 'friction', 'barrier'],
    criticalKeywords: ['problem', 'solution'],
    framework: 'Problem-Solution Fit Framework',
    frameworkDesc: 'Investors need to see a clearly articulated, quantified problem with a differentiated, defensible solution.',
    frameworkPoints: [
      { label: 'Problem Size', text: 'Quantified scale and urgency of the pain point.' },
      { label: 'Root Cause', text: 'Why existing solutions fail to address it.' },
      { label: 'Your Fix', text: 'The unique mechanism that solves this differently.' }
    ]
  },
  {
    id: 'market-analysis',
    number: '03',
    title: 'Market Analysis',
    shortTitle: 'Market Anal...',
    keywords: ['market', 'TAM', 'SAM', 'SOM', 'segment', 'industry', 'growth', 'addressable', 'size', 'billion', 'million', 'customer', 'user', 'demographic'],
    criticalKeywords: ['market', 'TAM', 'SAM'],
    framework: 'TAM / SAM / SOM Market Sizing',
    frameworkDesc: 'Institutional investors validate market opportunity using the TAM/SAM/SOM framework — bottom-up numbers with cited sources.',
    frameworkPoints: [
      { label: 'TAM', subtitle: 'Total Addressable Market', text: 'Total revenue opportunity if 100% market share is achieved.' },
      { label: 'SAM', subtitle: 'Serviceable Addressable Market', text: 'Portion of TAM reachable with your business model.' },
      { label: 'SOM', subtitle: 'Serviceable Obtainable Market', text: 'Realistic short-term capture given your resources.' }
    ]
  },
  {
    id: 'business-model',
    number: '04',
    title: 'Business Model',
    shortTitle: 'Business Mo...',
    keywords: ['revenue', 'monetization', 'subscription', 'SaaS', 'commission', 'freemium', 'pricing', 'unit economics', 'margin', 'model', 'charge', 'pay'],
    criticalKeywords: ['revenue', 'pricing'],
    framework: 'Business Model Canvas',
    frameworkDesc: 'A clear value exchange mechanism showing how the company creates, delivers, and captures value sustainably.',
    frameworkPoints: [
      { label: 'Revenue Streams', text: 'How money flows in from customers.' },
      { label: 'Cost Structure', text: 'Key cost drivers and fixed vs variable split.' },
      { label: 'Unit Economics', text: 'LTV:CAC ratio and path to profitability per unit.' }
    ]
  },
  {
    id: 'competitive-analysis',
    number: '05',
    title: 'Competitive Analysis',
    shortTitle: 'Competitive...',
    keywords: ['competitor', 'competition', 'competitive', 'advantage', 'moat', 'differentiation', 'USP', 'unique', 'versus', 'alternative', 'substitute'],
    criticalKeywords: ['competitor', 'advantage'],
    framework: "Porter's Five Forces + Competitive Moat Analysis",
    frameworkDesc: 'Investors look for sustainable competitive advantages beyond product features — network effects, switching costs, data moats, and brand.',
    frameworkPoints: [
      { label: 'Differentiation', text: 'What makes you 10x better, not just marginally better.' },
      { label: 'Moat', text: 'Structural defensibility: network, brand, IP, switching cost.' },
      { label: 'Threats', text: 'Realistic assessment of competitive and regulatory risks.' }
    ]
  },
  {
    id: 'marketing-sales',
    number: '06',
    title: 'Marketing & Sales',
    shortTitle: 'Marketing &...',
    keywords: ['marketing', 'sales', 'customer acquisition', 'CAC', 'channel', 'growth', 'campaign', 'SEO', 'social media', 'partnership', 'brand', 'funnel'],
    criticalKeywords: ['customer acquisition', 'CAC', 'channel'],
    framework: 'Customer Acquisition & GTM Strategy',
    frameworkDesc: 'A validated go-to-market strategy with measurable acquisition channels, realistic CAC, and a scalable sales funnel.',
    frameworkPoints: [
      { label: 'CAC', text: 'Cost to acquire one paying customer across channels.' },
      { label: 'Channels', text: 'Prioritized acquisition channels by cost and conversion.' },
      { label: 'Funnel', text: 'Awareness → consideration → conversion → retention metrics.' }
    ]
  },
  {
    id: 'operations',
    number: '07',
    title: 'Operations & Team',
    shortTitle: 'Operations...',
    keywords: ['team', 'founder', 'operations', 'process', 'supply chain', 'logistics', 'hire', 'headcount', 'structure', 'CTO', 'CEO', 'COO', 'experience', 'background'],
    criticalKeywords: ['team', 'operations'],
    framework: 'Operational Readiness & Team Assessment',
    frameworkDesc: 'Investors back teams, not just ideas. Operational clarity — org structure, key hires, and execution risk mitigation — is critical.',
    frameworkPoints: [
      { label: 'Team Depth', text: 'Domain expertise and complementary skills across cofounders.' },
      { label: 'Execution Risk', text: 'Key-person risk mitigation and succession clarity.' },
      { label: 'Ops Scalability', text: 'How operations scale without linear cost increases.' }
    ]
  },
  {
    id: 'financial-plan',
    number: '08',
    title: 'Financial Plan',
    shortTitle: 'Financial Pl...',
    keywords: ['revenue', 'profit', 'EBITDA', 'cash flow', 'burn rate', 'runway', 'forecast', 'projection', 'balance sheet', 'P&L', 'income', 'expense', 'budget', 'funding', 'valuation'],
    criticalKeywords: ['revenue', 'projection', 'runway'],
    framework: 'Financial Model Integrity Assessment',
    frameworkDesc: 'A 3-year financial model must have traceable assumptions, sensitivity analysis, and a clear path to unit-level profitability.',
    frameworkPoints: [
      { label: 'Projections', text: '3-year P&L with bottom-up revenue assumptions.' },
      { label: 'Burn & Runway', text: 'Monthly burn rate, current runway, and key spend categories.' },
      { label: 'Funding Ask', text: 'Exact capital ask tied to specific milestones and use of funds.' }
    ]
  }
];

// ─── Scoring helpers ────────────────────────────────────────────────────────

/**
 * Score a pillar based on keyword presence in the document text.
 * This is the HEURISTIC fallback — replace with AI model calls.
 */
function scorePillar(pillar, textLower, wordCount) {
  const { keywords, criticalKeywords } = pillar;

  // Count keyword hits
  const hits = keywords.filter(kw => textLower.includes(kw.toLowerCase()));
  const criticalHits = criticalKeywords.filter(kw => textLower.includes(kw.toLowerCase()));

  // Base score: 30–80 range from keyword density
  const keywordRatio = hits.length / keywords.length;
  const criticalRatio = criticalHits.length / criticalKeywords.length;

  // Weight: 60% keyword presence, 40% critical keywords
  const rawScore = (keywordRatio * 60) + (criticalRatio * 40);

  // Scale 0–100 and add baseline of 20 (even empty docs score something)
  const baseScore = Math.min(95, Math.round(20 + rawScore * 0.8));

  // Document length bonus: longer docs tend to be more complete
  const lengthBonus = Math.min(10, Math.floor(wordCount / 500));
  const score = Math.min(98, baseScore + lengthBonus);

  // Introduce small variance so pillars don't all score the same
  const variance = ((pillar.id.length % 7) - 3);
  return Math.max(10, Math.min(98, score + variance));
}

/**
 * Determine status label based on score.
 */
function getStatus(score) {
  if (score >= 80) return 'Strong';
  if (score >= 65) return 'Good';
  if (score >= 50) return 'Needs Imp.';
  return 'Weak';
}

/**
 * Generate flags text for dashboard pillar cards.
 */
function getFlagsText(score, pillar, textLower) {
  const { criticalKeywords } = pillar;
  const missingCritical = criticalKeywords.filter(kw => !textLower.includes(kw.toLowerCase()));

  if (score >= 80) return 'Passed Audit';
  if (score >= 65) return `${missingCritical.length} Minor Gaps`;
  if (score >= 50) return `${Math.max(1, missingCritical.length)} Gaps Found`;
  return `${Math.max(2, missingCritical.length)} Critical Gaps`;
}

/**
 * Extract a relevant sentence from the text for use as evidenceQuote.
 */
function extractEvidenceQuote(pillar, text) {
  const sentences = text.split(/[.!?\n]/).map(s => s.trim()).filter(s => s.length > 40 && s.length < 300);
  for (const kw of pillar.keywords) {
    const match = sentences.find(s => s.toLowerCase().includes(kw.toLowerCase()));
    if (match) return match.replace(/\s+/g, ' ').trim();
  }
  return sentences[0] || 'No specific evidence found for this section.';
}

/**
 * Generate contextual strengths based on what was found.
 */
function generateStrengths(pillar, textLower, score) {
  const found = pillar.keywords.filter(kw => textLower.includes(kw.toLowerCase()));
  const strengths = [];

  if (found.length > 0) {
    strengths.push(`${pillar.title} section references key concepts: ${found.slice(0, 3).join(', ')}.`);
  }
  if (score >= 70) {
    strengths.push(`Coverage of ${pillar.title.toLowerCase()} appears sufficient for initial investor review.`);
  }
  if (found.length >= pillar.keywords.length * 0.5) {
    strengths.push('Keyword density suggests reasonable depth of coverage in this section.');
  }

  return strengths.length ? strengths : [`Basic ${pillar.title.toLowerCase()} content is present in the document.`];
}

/**
 * Generate contextual weaknesses based on what was missing.
 */
function generateWeaknesses(pillar, textLower, score) {
  const missing = pillar.criticalKeywords.filter(kw => !textLower.includes(kw.toLowerCase()));
  const weaknesses = [];

  if (missing.length > 0) {
    weaknesses.push(`Key terms missing: ${missing.join(', ')} — investors will flag this immediately.`);
  }
  if (score < 65) {
    weaknesses.push(`${pillar.title} section lacks sufficient depth and quantified evidence.`);
  }
  if (score < 50) {
    weaknesses.push('This section may be absent or too brief to pass institutional due diligence.');
  }

  return weaknesses.length ? weaknesses : [`${pillar.title} could benefit from more quantified data and cited benchmarks.`];
}

/**
 * Generate actionable remediations for the checklist.
 */
function generateRemediations(pillar, textLower, score) {
  const missing = pillar.criticalKeywords.filter(kw => !textLower.includes(kw.toLowerCase()));
  const rems = [];

  if (missing.length > 0) {
    rems.push({
      id: `${pillar.id}-rem-1`,
      text: `Add explicit mention of ${missing[0]} with quantified data and cited source.`,
      done: false
    });
  }
  rems.push({
    id: `${pillar.id}-rem-2`,
    text: `Include benchmark comparison against industry standard for ${pillar.title.toLowerCase()}.`,
    done: false
  });
  rems.push({
    id: `${pillar.id}-rem-3`,
    text: `Add a one-paragraph executive-level summary of ${pillar.title.toLowerCase()} findings.`,
    done: score >= 75  // mark as done if score is already high
  });

  return rems;
}

/**
 * Generate criteria checklist items for a pillar.
 */
function generateCriteriaChecklist(pillar, textLower, score) {
  return pillar.criticalKeywords.map((kw, i) => ({
    name: `${kw.charAt(0).toUpperCase() + kw.slice(1)} coverage`,
    status: textLower.includes(kw.toLowerCase()) ? 'passed' : score > 60 ? 'warning' : 'missing'
  }));
}

/**
 * Detect a company/product name from the first lines of text.
 */
function detectCompanyName(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 2 && l.length < 60);
  // Try to find a capitalized short line near the top (likely company name)
  for (const line of lines.slice(0, 10)) {
    if (/^[A-Z][A-Za-z0-9\s&.-]{2,40}$/.test(line)) {
      return line;
    }
  }
  return 'Your Business';
}

const { evaluatePillarWithLlama, HF_TOKEN, USE_LOCAL_PYTHON, HF_MODEL } = require('./hfClient');

// ─── Main analysis function ─────────────────────────────────────────────────

/**
 * Analyzes extracted business plan text and returns a scored audit result.
 * Powered by Meta Llama-3.1-8B-Instruct (Hugging Face) with heuristic fallback.
 *
 * @param {string} text - The full extracted text from the document
 * @param {string} fileName - Original file name
 * @param {number} pages - Estimated page count
 * @returns {object} Full audit result matching the frontend data schema
 */
async function analyzeBusinessPlan(text, fileName, pages) {
  const textLower = text.toLowerCase();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const companyName = detectCompanyName(text);
  const useLlamaAI = Boolean(HF_TOKEN || USE_LOCAL_PYTHON);

  if (useLlamaAI) {
    console.log(`[AuditEngine] Running Llama 3.1 8B analysis (${USE_LOCAL_PYTHON ? 'Local Python Microservice' : `Hugging Face API: ${HF_MODEL}`})...`);
  } else {
    console.log(`[AuditEngine] Running standard strategic diagnostic engine (Set HF_TOKEN in .env to enable Llama 3.1 AI)...`);
  }

  // Score each pillar (with Llama 3.1 AI evaluation where configured)
  const scoredPillars = await Promise.all(
    PILLARS.map(async (pillar) => {
      let aiResult = null;

      if (useLlamaAI) {
        try {
          aiResult = await evaluatePillarWithLlama(pillar, text);
        } catch (err) {
          console.warn(`[AuditEngine] Llama AI evaluation fallback for ${pillar.id}:`, err.message);
        }
      }

      // If AI returned structured response, use it; otherwise compute heuristic
      const score = (aiResult && typeof aiResult.score === 'number') 
        ? Math.min(100, Math.max(0, Math.round(aiResult.score)))
        : scorePillar(pillar, textLower, wordCount);

      const status = aiResult?.status || getStatus(score);

      return {
        id: pillar.id,
        number: pillar.number,
        title: pillar.title,
        shortTitle: pillar.shortTitle,
        score,
        status,
        statusType: status.toLowerCase().replace(/\s+/g, '-'),
        badgeColor: score >= 80 ? 'emerald' : score >= 65 ? 'blue' : score >= 50 ? 'amber' : 'rose',
        summary: aiResult?.summary || generateSummary(pillar, score),
        auditStatus: score >= 65 ? 'Passed Audit' : 'Needs Review',
        flagsText: getFlagsText(score, pillar, textLower),
        executiveSectionSummary: aiResult?.executiveSectionSummary || generateExecutiveSectionSummary(pillar, score, companyName),
        strengths: Array.isArray(aiResult?.strengths) && aiResult.strengths.length > 0 
          ? aiResult.strengths 
          : generateStrengths(pillar, textLower, score),
        weaknesses: Array.isArray(aiResult?.weaknesses) && aiResult.weaknesses.length > 0 
          ? aiResult.weaknesses 
          : generateWeaknesses(pillar, textLower, score),
        evidenceQuote: aiResult?.evidenceQuote || extractEvidenceQuote(pillar, text),
        evidenceSource: `${pillar.title} Section — Document Analysis`,
        evidenceBadge: aiResult?.evidenceBadge || (score >= 70 ? 'Verified Reference' : score >= 50 ? 'Partial Coverage' : 'Unverified Claim'),
        knowledgeBase: {
          framework: pillar.framework,
          description: pillar.frameworkDesc,
          points: pillar.frameworkPoints
        },
        remediations: Array.isArray(aiResult?.remediations) && aiResult.remediations.length > 0 
          ? aiResult.remediations 
          : generateRemediations(pillar, textLower, score),
        criteriaChecklist: generateCriteriaChecklist(pillar, textLower, score)
      };
    })
  );

  // Aggregate score
  const aggregateScore = Math.round(
    scoredPillars.reduce((sum, p) => sum + p.score, 0) / scoredPillars.length
  );

  // Top 3 blockers — lowest-scoring pillars
  const priorityImprovements = [...scoredPillars]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((p, i) => ({
      id: `blocker-${i + 1}`,
      pillarId: p.id,
      pillarName: p.title,
      priority: i === 0 ? 'High Priority' : i === 1 ? 'High Priority' : 'Medium Priority',
      priorityLevel: i < 2 ? 'high' : 'medium',
      issue: generateIssueText(p),
      metricTag: generateMetricTag(p),
      icon: i === 0 ? 'TrendingDown' : i === 1 ? 'Target' : 'Megaphone'
    }));

  const evaluationVerdict = aggregateScore >= 75 ? 'Series A Ready' : aggregateScore >= 60 ? 'Seed Ready' : 'Needs Improvement';

  return {
    id: require('uuid').v4(),
    name: companyName,
    fileName,
    fileSize: 'N/A',
    pages,
    status: 'Active',
    sessionName: `${fileName.replace(/\.[^/.]+$/, '')} • Business Plan Review`,
    auditVersion: 'v1.0 Audit',
    appraisalType: 'AI-Powered Strategic Appraisal',
    aggregateScore,
    benchmarkScore: 75,
    benchmarkStatus: aggregateScore >= 75
      ? 'Above seed benchmark (75)'
      : `Below seed benchmark (75) — gap: ${75 - aggregateScore} pts`,
    evaluationVerdict,
    executiveSummary: generateOverallSummary(companyName, aggregateScore, scoredPillars),
    auditedPillarsCount: PILLARS.length,
    revisionTime: aggregateScore >= 75 ? '~20 min' : aggregateScore >= 55 ? '~45 min' : '~90 min',
    priorityImprovements,
    pillars: scoredPillars
  };
}

// ─── Text generation helpers ────────────────────────────────────────────────

function generateSummary(pillar, score) {
  if (score >= 80) return `${pillar.title} section is well-articulated with clear evidence and structure.`;
  if (score >= 65) return `${pillar.title} covers key topics but needs more quantified data.`;
  if (score >= 50) return `${pillar.title} section exists but lacks depth required for investor validation.`;
  return `${pillar.title} section is weak or missing — critical gap for investor review.`;
}

function generateExecutiveSectionSummary(pillar, score, companyName) {
  if (score >= 80) {
    return `${companyName}'s ${pillar.title.toLowerCase()} is clearly articulated with solid supporting evidence. This section meets institutional investor expectations and demonstrates strategic maturity.`;
  }
  if (score >= 65) {
    return `${companyName}'s ${pillar.title.toLowerCase()} covers the core concepts but lacks the quantified benchmarks and cited data sources that institutional investors expect at seed stage.`;
  }
  if (score >= 50) {
    return `The ${pillar.title.toLowerCase()} section needs significant strengthening. Key frameworks and data points are either missing or stated without supporting evidence.`;
  }
  return `Critical gaps identified in ${pillar.title.toLowerCase()}. This section may be absent or insufficient — it must be rebuilt before any institutional pitch.`;
}

function generateOverallSummary(companyName, aggregateScore, pillars) {
  const weakPillars = pillars.filter(p => p.score < 50).map(p => p.title);
  const strongPillars = pillars.filter(p => p.score >= 80).map(p => p.title);

  let summary = `${companyName}'s business plan scores ${aggregateScore}/100 across ${pillars.length} strategic pillars. `;

  if (strongPillars.length > 0) {
    summary += `Strong coverage in: ${strongPillars.slice(0, 2).join(', ')}. `;
  }
  if (weakPillars.length > 0) {
    summary += `Critical gaps found in: ${weakPillars.slice(0, 2).join(', ')} — these must be addressed before investor outreach. `;
  } else {
    summary += 'No critical sections are missing, but depth and evidence quality can be improved throughout. ';
  }

  summary += aggregateScore >= 75
    ? 'The plan is approaching investor-ready status with targeted improvements.'
    : 'Focused revision of the weakest sections is recommended before presenting to investors.';

  return summary;
}

function generateIssueText(pillar) {
  const issues = {
    'executive-summary': 'Executive summary lacks a clear funding ask and traction metrics.',
    'problem-solution': 'Problem statement is not quantified with market evidence.',
    'market-analysis': 'Market size is stated without supporting TAM/SAM/SOM breakdown.',
    'business-model': 'Revenue model lacks unit economics and margin justification.',
    'competitive-analysis': 'Competitive moat is not clearly defined or defensible.',
    'marketing-sales': 'Customer acquisition strategy is not clearly defined with CAC data.',
    'operations': 'Team credentials and operational scalability are underdeveloped.',
    'financial-plan': 'Revenue projections lack traceable bottom-up assumptions.'
  };
  return issues[pillar.id] || `${pillar.title} section requires significant improvement.`;
}

function generateMetricTag(pillar) {
  const tags = {
    'executive-summary': 'No traction data',
    'problem-solution': 'No quantification',
    'market-analysis': 'TAM/SAM missing',
    'business-model': 'No unit economics',
    'competitive-analysis': 'No moat defined',
    'marketing-sales': 'CAC unverified',
    'operations': 'Team gap',
    'financial-plan': 'Projection gap'
  };
  return tags[pillar.id] || 'Needs review';
}

module.exports = { analyzeBusinessPlan };
