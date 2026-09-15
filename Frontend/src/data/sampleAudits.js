export const sampleBusinessPlans = {
  campusbite: {
    id: "campusbite",
    name: "CampusBite",
    fileName: "BusinessPlan.pdf",
    fileSize: "2.4 MB",
    pages: 18,
    status: "Active",
    sessionName: "CampusBite • Business Plan Review",
    auditVersion: "v2.4 Audit",
    appraisalType: "Seed Round Strategic Appraisal",
    aggregateScore: 67,
    benchmarkScore: 75,
    benchmarkStatus: "Below seed benchmark (75)",
    evaluationVerdict: "Needs Improvement",
    executiveSummary: "Your business plan has a clear problem and solution, but the market analysis and financial plan require stronger evidence and detail.",
    auditedPillarsCount: 8,
    revisionTime: "~45 min",
    
    // Top 3 Blockers for Dashboard
    priorityImprovements: [
      {
        id: "blocker-1",
        pillarId: "financial-plan",
        pillarName: "Financial Plan",
        priority: "High Priority",
        priorityLevel: "high",
        issue: "Revenue projection is not supported by sufficient assumptions.",
        metricTag: "₹1 Cr gap",
        icon: "TrendingDown"
      },
      {
        id: "blocker-2",
        pillarId: "market-analysis",
        pillarName: "Market Analysis",
        priority: "High Priority",
        priorityLevel: "high",
        issue: "Market size is stated without supporting evidence.",
        metricTag: "TAM/SAM missing",
        icon: "Target"
      },
      {
        id: "blocker-3",
        pillarId: "marketing-sales",
        pillarName: "Marketing & Sales",
        priority: "Medium Priority",
        priorityLevel: "medium",
        issue: "Customer acquisition strategy is not clearly defined.",
        metricTag: "CAC unverified",
        icon: "Megaphone"
      }
    ],

    // All 8 Strategic Pillars
    pillars: [
      {
        id: "executive-summary",
        number: "01",
        title: "Executive Summary",
        shortTitle: "Executive Su...",
        score: 82,
        status: "Strong",
        statusType: "strong",
        badgeColor: "emerald",
        summary: "Clear problem context and vision described.",
        auditStatus: "Passed Audit",
        flagsText: "Passed Audit",
        executiveSectionSummary: "The executive summary articulates the core vision, founder credentials, and high-level proposition effectively.",
        strengths: [
          "Founder background in campus logistics clearly stated.",
          "Clear mission statement focused on student meal delivery efficiency."
        ],
        weaknesses: [
          "Needs a one-line summary of expected Year 3 EBITDA margin."
        ],
        evidenceQuote: "CampusBite revolutionizes university meal access by aggregating campus dining halls and partner cloud kitchens into 15-minute micro-batch delivery runs.",
        evidenceSource: "Executive Summary — Page 1",
        evidenceBadge: "Verified Claim",
        knowledgeBase: {
          framework: "Venture Executive Summary Standard",
          description: "A seed-stage executive summary must crystallize problem, secret sauce, and traction in under 90 seconds of investor reading.",
          points: [
            { label: "Hooks", text: "Compelling industry context and urgency." },
            { label: "Defensibility", text: "Why incumbents cannot easily replicate this." },
            { label: "The Ask", text: "Precise funding required and key milestone triggers." }
          ]
        },
        remediations: [
          { id: "es-1", text: "Add single sentence highlighting 15-minute SLA benchmark.", done: true },
          { id: "es-2", text: "State target seed round valuation cap clearly in summary.", done: false }
        ]
      },
      {
        id: "problem-solution",
        number: "02",
        title: "Problem & Solution",
        shortTitle: "Problem & So...",
        score: 86,
        status: "Strong",
        statusType: "strong",
        badgeColor: "emerald",
        summary: "Compelling student pain point validated.",
        auditStatus: "Passed Audit",
        flagsText: "Passed Audit",
        executiveSectionSummary: "Pain points surrounding peak dining hall congestion and off-campus delivery surcharges are exceptionally documented.",
        strengths: [
          "Student survey of 850 campus respondents provides empirical proof.",
          "Clear breakdown of delivery latency during 12-2 PM class breaks."
        ],
        weaknesses: [
          "Edge-case handling for late evening campus library access could be noted."
        ],
        evidenceQuote: "Over 78% of on-campus residents report skipping midday nutritious meals due to 40+ minute dining queue bottlenecks and high standard food app delivery fees.",
        evidenceSource: "Problem Validation — Page 3",
        evidenceBadge: "Empirically Verified",
        knowledgeBase: {
          framework: "Jobs-To-Be-Done (JTBD) Framework",
          description: "Ensure the solution directly maps to the functional, emotional, and social dimensions of the student user.",
          points: [
            { label: "Functional", text: "Gets hot food delivered in under 15 minutes." },
            { label: "Economic", text: "Eliminates ₹60 individual delivery fee via batching." },
            { label: "Social", text: "Enables group study room meal coordination." }
          ]
        },
        remediations: [
          { id: "ps-1", text: "Document off-peak night delivery pilot results.", done: true }
        ]
      },
      {
        id: "market-analysis",
        number: "03",
        title: "Market Analysis",
        shortTitle: "Market Analy...",
        score: 51,
        status: "Needs Imp.",
        statusType: "needsImp",
        badgeColor: "amber",
        summary: "TAM/SAM/SOM and supporting market evidenc...",
        auditStatus: "1 Critical Flag",
        flagsText: "1 Critical Flag",
        executiveSectionSummary: "Your target customer is identified, but the market opportunity is not sufficiently supported by quantitative evidence.",
        strengths: [
          "Target customer is clearly described.",
          "Geographic market is mentioned."
        ],
        weaknesses: [
          "Market size has no supporting source. Lacks citation from institutional reports or credible industry publications.",
          "TAM/SAM/SOM calculations are missing. No top-down or bottom-up dimensional framing provided.",
          "Competitor analysis lacks quantitative comparison. Qualitative assertions only; lacks market share and unit economics baselines."
        ],
        criteriaChecklist: [
          { name: "Target Customer", status: "passed" },
          { name: "Geographic Market", status: "passed" },
          { name: "TAM (Total Addressable Market)", status: "failed" },
          { name: "SAM (Serviceable Available Market)", status: "failed" },
          { name: "SOM (Serviceable Obtainable Market)", status: "failed" },
          { name: "Market Growth Rate (CAGR)", status: "warning" },
          { name: "Supporting Citations & Sources", status: "failed" }
        ],
        evidenceQuote: "India has a huge market for affordable student food delivery across urban university campuses, we estimate the addressable market opportunity at ₹5,000 crore annually with zero direct competitors offering dynamic scheduled campus deliveries.",
        evidenceSource: "Market Analysis — Page 4",
        evidenceBadge: "Unverified Claim",
        knowledgeBase: {
          framework: "TAM / SAM / SOM Framework",
          description: "Strategic investors require a structured market sizing breakdown to evaluate economic feasibility and execution risk.",
          points: [
            { label: "TAM", subtitle: "Total Addressable Market", text: "The total annual potential market if you achieved 100% market share across all higher education institutions." },
            { label: "SAM", subtitle: "Serviceable Available Market", text: "The segment of TAM targeted by your business model (e.g. Tier-1 & Tier-2 university campuses with 10k+ enrolled students)." },
            { label: "SOM", subtitle: "Serviceable Obtainable Market", text: "The realistic portion of SAM your business can capture within a 3-year horizon given current capital constraints." }
          ]
        },
        remediations: [
          { id: "ma-1", text: "Add TAM calculation with top-down source (AISHE report citation).", done: false },
          { id: "ma-2", text: "Define SAM based on 45 target university clusters across South India.", done: false },
          { id: "ma-3", text: "Estimate realistic SOM for Year 1-3 with ramp rate model.", done: false },
          { id: "ma-4", text: "Add citations for 14.2% projected food-tech CAGR.", done: false }
        ]
      },
      {
        id: "business-model",
        number: "04",
        title: "Business Model",
        shortTitle: "Business Mod...",
        score: 74,
        status: "Good",
        statusType: "good",
        badgeColor: "blue",
        summary: "Commission and delivery fee mechanics sound.",
        auditStatus: "2 Minor Notes",
        flagsText: "2 Minor Notes",
        executiveSectionSummary: "Revenue streams and vendor take-rate mechanics are realistic and match benchmark food delivery unit economics.",
        strengths: [
          "Take rate of 18% from cloud kitchens is aligned with market averages.",
          "Batch delivery aggregation fee model reduces cost per delivery by 64%."
        ],
        weaknesses: [
          "Subscription tier (CampusPass) churn rates are not estimated.",
          "Merchant onboarding cost payback period needs clarifying."
        ],
        evidenceQuote: "CampusBite monetizes via a hybrid model: an 18% merchant take-rate on orders plus a flat ₹15 student convenience pass per batched delivery window.",
        evidenceSource: "Business Model — Page 7",
        evidenceBadge: "Verified Mechanics",
        knowledgeBase: {
          framework: "Two-Sided Marketplace Unit Economics",
          description: "Evaluate contribution margins per delivery slot after driver incentives and merchant revenue share.",
          points: [
            { label: "Take-Rate", text: "15-22% net merchant take rate." },
            { label: "Batch Efficiency", text: "Average drops per runner per delivery window." },
            { label: "Subscription LTV", text: "CampusPass recurring recurring revenue contribution." }
          ]
        },
        remediations: [
          { id: "bm-1", text: "Add monthly cohort retention curve for CampusPass members.", done: false },
          { id: "bm-2", text: "Detail kitchen onboarding hardware/setup cost payback.", done: false }
        ]
      },
      {
        id: "competition",
        number: "05",
        title: "Competition",
        shortTitle: "Competition",
        score: 61,
        status: "Needs Imp.",
        statusType: "needsImp",
        badgeColor: "amber",
        summary: "Incumbent differentiation lacks defensive moat.",
        auditStatus: "Passed Audit",
        flagsText: "1 Critical Flag",
        executiveSectionSummary: "Comparison against Swiggy/Zomato acknowledges brand dominance but lacks defensibility analysis against instant grocery dark stores.",
        strengths: [
          "Feature matrix compares delivery speed and minimum order thresholds.",
          "Identifies key campus gate access barriers that restrict external drivers."
        ],
        weaknesses: [
          "No defensive moat against deep-pocketed hyper-local delivery apps launching student micro-hubs.",
          "Lacks market share estimation of existing campus canteen monopolies."
        ],
        evidenceQuote: "National food delivery incumbents cannot deliver inside dormitories due to strict university security gates, giving our student runner fleet an exclusive distribution monopoly.",
        evidenceSource: "Competitive Analysis — Page 9",
        evidenceBadge: "Partial Defense",
        knowledgeBase: {
          framework: "Porter's Five Forces & Moat Defensibility",
          description: "Structure moats through high switching costs, localized network effects, and proprietary university administrative partnerships.",
          points: [
            { label: "Network Effects", text: "High student density creates hyper-efficient routing." },
            { label: "Exclusive Moat", text: "Official campus administrative partnership agreements." },
            { label: "Switching Costs", text: "Integrated student meal card balance wallets." }
          ]
        },
        remediations: [
          { id: "cp-1", text: "Include formal MoU framework with university campus authorities.", done: false },
          { id: "cp-2", text: "Add competitive pricing quadrant vs. on-campus canteens.", done: false }
        ]
      },
      {
        id: "marketing-sales",
        number: "06",
        title: "Marketing & Sales",
        shortTitle: "Marketing & S...",
        score: 48,
        status: "Weak",
        statusType: "weak",
        badgeColor: "rose",
        summary: "Customer acquisition strategy is not clearly defined.",
        auditStatus: "2 Critical Flags",
        flagsText: "2 Critical Flags",
        executiveSectionSummary: "CAC assumptions rely purely on organic word-of-mouth without structured campus ambassador budgets or conversion funnels.",
        strengths: [
          "Student club sponsorship and campus ambassador concepts outlined."
        ],
        weaknesses: [
          "CAC is assumed at ₹0 with no blended marketing cost calculations.",
          "No viral referral K-factor or incentive economics detailed.",
          "Lacks semester-start reactivation campaigns for returning students."
        ],
        evidenceQuote: "We will achieve rapid campus virality through word of mouth and Instagram student influencer stories with almost zero customer acquisition expense.",
        evidenceSource: "Go-To-Market — Page 11",
        evidenceBadge: "High Risk Assumption",
        knowledgeBase: {
          framework: "Blended CAC & Funnel Conversion Framework",
          description: "Institutional investors reject ₹0 CAC claims. Provide realistic blended CAC factoring in ambassador stipends, discounts, and merchandise.",
          points: [
            { label: "Paid vs Organic", text: "Blended CAC = (Total Acquisition Spend) / (New Active Users)." },
            { label: "Viral Coefficient", text: "K-factor target (e.g. 1.2x invitations per student)." },
            { label: "Payback Velocity", text: "Months required to recoup CAC on net order margins." }
          ]
        },
        remediations: [
          { id: "ms-1", text: "Model realistic ₹45 blended CAC per verified student.", done: false },
          { id: "ms-2", text: "Provide campus ambassador commission structure and milestones.", done: false },
          { id: "ms-3", text: "Detail Semester Kickoff promotional voucher economics.", done: false }
        ]
      },
      {
        id: "operations",
        number: "07",
        title: "Operations",
        shortTitle: "Operations",
        score: 69,
        status: "Good",
        statusType: "good",
        badgeColor: "blue",
        summary: "Cloud kitchen delivery logistics well outlined.",
        auditStatus: "1 Minor Note",
        flagsText: "1 Minor Note",
        executiveSectionSummary: "Micro-fulfillment and student courier scheduling show realistic operational thinking.",
        strengths: [
          "Batch dispatch time windows (12:15, 12:45, 13:15) reduce courier idle time.",
          "Hygiene and temperature-controlled insulated container specifications provided."
        ],
        weaknesses: [
          "Contingency plan for extreme weather / monsoon disruptions not documented.",
          "Food wastage and refund liability allocation between kitchens and platform is unclear."
        ],
        evidenceQuote: "Student runners are scheduled during non-class hours to collect 8-12 orders per insulated tote bag from centralized kitchen cluster points.",
        evidenceSource: "Operations — Page 14",
        evidenceBadge: "Operationally Feasible",
        knowledgeBase: {
          framework: "SLA & Micro-Hub Logistics Framework",
          description: "Demonstrate operational resilience during surge hours and ensure worker safety/compliance standards.",
          points: [
            { label: "Order Batching", text: "Algorithm-driven grouped route optimization." },
            { label: "Runner Utilization", text: "Deliveries per courier hour during lunch surge." },
            { label: "Refund SLA", text: "Clear dispute resolution policy for missing/spilled meals." }
          ]
        },
        remediations: [
          { id: "op-1", text: "Add monsoon & surge contingency staffing model.", done: true },
          { id: "op-2", text: "Define merchant vs. platform liability SLA agreement terms.", done: false }
        ]
      },
      {
        id: "financial-plan",
        number: "08",
        title: "Financial Plan",
        shortTitle: "Financial Plan",
        score: 42,
        status: "Weak",
        statusType: "weak",
        badgeColor: "rose",
        summary: "Revenue projection is not supported by sufficient assumptions.",
        auditStatus: "3 Critical Flags",
        flagsText: "3 Critical Flags",
        executiveSectionSummary: "Financial forecasts project hockey-stick revenue growth without modeling working capital, runner insurance, or server costs.",
        strengths: [
          "3-year top-line revenue forecasts provided in table format."
        ],
        weaknesses: [
          "₹1 Cr gap in working capital runway and cash flow projection.",
          "Gross margin excludes card payment gateway fees and server infrastructure.",
          "Headcount expansion costs are severely underestimated for software engineering."
        ],
        evidenceQuote: "We project Year 1 gross revenue of ₹1.8 Crore growing to ₹12.5 Crore in Year 3 with 65% net EBITDA margins by maintaining lean student contractor overhead.",
        evidenceSource: "Financial Projections — Page 17",
        evidenceBadge: "Unrealistic Benchmark",
        knowledgeBase: {
          framework: "Venture Financial Model & Runway Standards",
          description: "Build a bottom-up financial model accounting for COGS, PG fees (2%), rider insurance, refunds (1.5%), and realistic tech burn.",
          points: [
            { label: "Unit Margin", text: "Contribution Margin 1 & 2 per order." },
            { label: "Burn Multiple", text: "Net Burn / Net New ARR to assess capital efficiency." },
            { label: "Runway Buffer", text: "18-month minimum runway requirement post-seed round." }
          ]
        },
        remediations: [
          { id: "fp-1", text: "Recompute Year 1-3 EBITDA margins to realistic 18-24% range.", done: false },
          { id: "fp-2", text: "Add line items for payment gateway fees, hosting, and insurance.", done: false },
          { id: "fp-3", text: "Build 18-month month-by-month cash flow and burn chart.", done: false }
        ]
      }
    ]
  }
};
