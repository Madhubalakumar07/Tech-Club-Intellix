/**
 * Schema Builder — Validates and finalizes the audit result object
 * to ensure it exactly matches the frontend data schema used in sampleAudits.js.
 *
 * Acts as the contract enforcement layer between backend and frontend.
 */

/**
 * Ensures every pillar has all required fields.
 * Fills in safe defaults for any missing optional fields.
 */
function normalizePillar(pillar) {
  return {
    id: pillar.id || 'unknown',
    number: pillar.number || '00',
    title: pillar.title || 'Unknown Section',
    shortTitle: pillar.shortTitle || pillar.title?.substring(0, 12) + '...' || 'Unknown...',
    score: clamp(Math.round(pillar.score || 0), 0, 100),
    status: pillar.status || getStatus(pillar.score),
    statusType: pillar.statusType || 'weak',
    badgeColor: pillar.badgeColor || 'rose',
    summary: pillar.summary || 'No summary available.',
    auditStatus: pillar.auditStatus || 'Needs Review',
    flagsText: pillar.flagsText || 'Not Reviewed',
    executiveSectionSummary: pillar.executiveSectionSummary || 'Section analysis pending.',
    strengths: Array.isArray(pillar.strengths) ? pillar.strengths : [],
    weaknesses: Array.isArray(pillar.weaknesses) ? pillar.weaknesses : [],
    evidenceQuote: pillar.evidenceQuote || 'No direct evidence found in this section.',
    evidenceSource: pillar.evidenceSource || 'Document',
    evidenceBadge: pillar.evidenceBadge || 'Unverified Claim',
    knowledgeBase: pillar.knowledgeBase
      ? {
          framework: pillar.knowledgeBase.framework || 'Standard Framework',
          description: pillar.knowledgeBase.description || '',
          points: Array.isArray(pillar.knowledgeBase.points)
            ? pillar.knowledgeBase.points.map(pt => ({
                label: pt.label || '',
                subtitle: pt.subtitle || undefined,
                text: pt.text || ''
              }))
            : []
        }
      : null,
    remediations: Array.isArray(pillar.remediations)
      ? pillar.remediations.map(r => ({
          id: r.id || `rem-${Math.random().toString(36).substr(2, 6)}`,
          text: r.text || 'Review this section.',
          done: Boolean(r.done)
        }))
      : [],
    criteriaChecklist: Array.isArray(pillar.criteriaChecklist)
      ? pillar.criteriaChecklist.map(c => ({
          name: c.name || 'Criterion',
          status: ['passed', 'warning', 'missing'].includes(c.status) ? c.status : 'missing'
        }))
      : []
  };
}

/**
 * Normalizes the top-level audit result object.
 */
function buildAuditResponse(rawResult) {
  if (!rawResult || typeof rawResult !== 'object') {
    throw new Error('Invalid audit result — cannot build response schema');
  }

  const pillars = Array.isArray(rawResult.pillars)
    ? rawResult.pillars.map(normalizePillar)
    : [];

  const aggregateScore = rawResult.aggregateScore != null
    ? clamp(Math.round(rawResult.aggregateScore), 0, 100)
    : computeAggregateScore(pillars);

  const priorityImprovements = Array.isArray(rawResult.priorityImprovements)
    ? rawResult.priorityImprovements.slice(0, 3).map((item, i) => ({
        id: item.id || `blocker-${i + 1}`,
        pillarId: item.pillarId || '',
        pillarName: item.pillarName || 'Unknown',
        priority: item.priority || 'Medium Priority',
        priorityLevel: item.priorityLevel || 'medium',
        issue: item.issue || 'Improvement needed.',
        metricTag: item.metricTag || 'Review',
        icon: item.icon || 'AlertCircle'
      }))
    : [];

  return {
    // Identifiers
    id: rawResult.id || generateId(),
    name: rawResult.name || 'Business Plan',
    fileName: rawResult.fileName || 'uploaded_plan',
    fileSize: rawResult.fileSize || 'N/A',
    pages: rawResult.pages || 1,
    status: 'Active',

    // Session metadata
    sessionName: rawResult.sessionName || `${rawResult.name || 'Business Plan'} • Audit`,
    auditVersion: rawResult.auditVersion || 'v1.0 Audit',
    appraisalType: rawResult.appraisalType || 'AI-Powered Strategic Appraisal',

    // Scores
    aggregateScore,
    benchmarkScore: rawResult.benchmarkScore || 75,
    benchmarkStatus: rawResult.benchmarkStatus || (
      aggregateScore >= 75
        ? 'Meets seed benchmark (75)'
        : `Below seed benchmark (75)`
    ),
    evaluationVerdict: rawResult.evaluationVerdict || getVerdict(aggregateScore),

    // Content
    executiveSummary: rawResult.executiveSummary || 'Analysis complete.',
    auditedPillarsCount: pillars.length,
    revisionTime: rawResult.revisionTime || estimateRevisionTime(aggregateScore),

    // Main data
    priorityImprovements,
    pillars
  };
}

// ─── Utilities ──────────────────────────────────────────────────────────────

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getStatus(score) {
  if (score >= 80) return 'Strong';
  if (score >= 65) return 'Good';
  if (score >= 50) return 'Needs Imp.';
  return 'Weak';
}

function getVerdict(score) {
  if (score >= 75) return 'Series A Ready';
  if (score >= 60) return 'Seed Ready';
  return 'Needs Improvement';
}

function estimateRevisionTime(score) {
  if (score >= 75) return '~20 min';
  if (score >= 55) return '~45 min';
  return '~90 min';
}

function computeAggregateScore(pillars) {
  if (!pillars.length) return 0;
  return Math.round(pillars.reduce((sum, p) => sum + p.score, 0) / pillars.length);
}

function generateId() {
  return `audit-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
}

module.exports = { buildAuditResponse };
