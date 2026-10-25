/**
 * Intelligent Policy Triage & Automated Grievance Routing Engine
 * Institutional Decision Support Subsystem
 *
 * Implements automated categorization, severity scoring, SLA assignment,
 * statutory cross-referencing, and decision-support resolution recommendations.
 */

export const CATEGORIES = {
  ACADEMIC: 'Academic & Evaluation',
  EXAMINATION: 'Examinations & Hall Tickets',
  FINANCIAL: 'Fee, Accounts & Scholarships',
  HOSTEL: 'Hostel, Mess & Infrastructure',
  HARASSMENT: 'Harassment & Anti-Ragging (ICC)',
  ADMINISTRATIVE: 'Registrar & Certificate Services',
  PLACEMENT: 'Placements & Internship Cell'
};

export const COMMITTEES = {
  [CATEGORIES.ACADEMIC]: {
    name: 'Board of Academic Review & Dean Academics',
    officer: 'Prof. Alok Mukherjee, Dean (Academic Affairs)',
    email: 'dean.academic@apexuniv.edu.in',
    office: 'Senate Hall, Block-A, 2nd Floor'
  },
  [CATEGORIES.EXAMINATION]: {
    name: 'Office of the Controller of Examinations',
    officer: 'Dr. Savita Nambiar, Controller of Examinations',
    email: 'coe.desk@apexuniv.edu.in',
    office: 'Administrative Annex, Ground Floor'
  },
  [CATEGORIES.FINANCIAL]: {
    name: 'Finance & Accounts Standing Redressal Desk',
    officer: 'Mr. R. K. Bhattacharya, Chief Finance Officer',
    email: 'cfo.redressal@apexuniv.edu.in',
    office: 'Finance Directorate, Block-B, 1st Floor'
  },
  [CATEGORIES.HOSTEL]: {
    name: 'Hostel & Residential Welfare Committee',
    officer: 'Dr. Hemant Joshi, Chief Warden & Dean of Student Welfare',
    email: 'hostel.welfare@apexuniv.edu.in',
    office: 'Student Activity Centre, DSW Office'
  },
  [CATEGORIES.HARASSMENT]: {
    name: 'Statutory Internal Complaints Committee & Anti-Ragging Cell',
    officer: 'Prof. Meenakshi Sundaram, Presiding Officer (ICC)',
    email: 'icc.ombudsperson@apexuniv.edu.in',
    office: 'Confidential Redressal Chamber, Main Tower'
  },
  [CATEGORIES.ADMINISTRATIVE]: {
    name: 'Registrarial Services & Student Records Committee',
    officer: 'Dr. Vinay K. Sharma, Joint Registrar (Student Affairs)',
    email: 'registrar.grievance@apexuniv.edu.in',
    office: 'Registrarial Wing, Room 104'
  },
  [CATEGORIES.PLACEMENT]: {
    name: 'Corporate Relations & Placement Oversight Board',
    officer: 'Col. (Retd.) Sanjeev Varma, Director (Placement & Training)',
    email: 'placement.grievance@apexuniv.edu.in',
    office: 'Industry Engagement Hub, Block-D'
  }
};

export const BYLAWS_DATABASE = [
  {
    code: 'UGC-REG-2023-SEC-5',
    title: 'UGC Redressal of Grievances of Students Regulations, 2023',
    clause: 'Mandatory resolution timeframe not exceeding 15 working days; provision for independent institutional ombudsperson review.',
    category: 'ALL'
  },
  {
    code: 'ORD-14B-EVAL',
    title: 'University Ordinance 14-B: Evaluation, Rechecking & Answer Script Inspection',
    clause: 'Right to view digitized evaluated answer script within 7 days of application; blind dual-evaluator reassessment if deviation >= 10%.',
    category: CATEGORIES.ACADEMIC
  },
  {
    code: 'EXAM-CODE-SEC-8',
    title: 'Examination Manual Section 8.3: Provisional Admit Card Issuance',
    clause: 'No student shall be debarred from entering examination hall on pending administrative clearances if attendance threshold >= 75%.',
    category: CATEGORIES.EXAMINATION
  },
  {
    code: 'FIN-CIR-2024-09',
    title: 'Finance Division Circular 2024/09: Fee Reconciliation & Caution Deposit',
    clause: 'Double debits and erroneous semester fee transactions must be reconciled and credited back within 72 hours of validated statement.',
    category: CATEGORIES.FINANCIAL
  },
  {
    code: 'HOSTEL-MANUAL-11',
    title: 'Central Hostel Rules & Living Standards Manual, Bylaw 11.4',
    clause: 'Potable water supply, uninterrupted electricity, sanitation hygiene, and mess quality inspection protocols. Response SLA: 24 to 48 hours.',
    category: CATEGORIES.HOSTEL
  },
  {
    code: 'STATUTORY-RAGGING-ACT',
    title: 'Supreme Court Directive & UGC Regulations on Curbing Ragging (Sec 6.3)',
    clause: 'Immediate 24-hour statutory enquiry, physical safety protocol, anonymous witness protection, zero-tolerance penal action.',
    category: CATEGORIES.HARASSMENT
  },
  {
    code: 'REG-REC-SEC-4',
    title: 'Registrarial Service Charter: Migration & Degree Certificate Dispatch',
    clause: 'Standard verification and issuance within 5 business days of digital verification clearance.',
    category: CATEGORIES.ADMINISTRATIVE
  }
];

/**
 * Intelligent Text Triage & Natural Language Analysis
 * Evaluates grievance subject, statement, keywords and extracts institutional metrics
 */
export function analyzeGrievanceText(subject = '', statement = '', userCategory = '') {
  const combined = `${subject} ${statement}`.toLowerCase();

  // Keyword lexicons for category classification
  const categoryScores = {
    [CATEGORIES.HARASSMENT]: 0,
    [CATEGORIES.EXAMINATION]: 0,
    [CATEGORIES.FINANCIAL]: 0,
    [CATEGORIES.HOSTEL]: 0,
    [CATEGORIES.ACADEMIC]: 0,
    [CATEGORIES.ADMINISTRATIVE]: 0,
    [CATEGORIES.PLACEMENT]: 0,
  };

  const lexicons = {
    [CATEGORIES.HARASSMENT]: ['ragging', 'harass', 'bully', 'threat', 'intimidation', 'assault', 'abuse', 'discriminat', 'mental agony', 'caste', 'gender', 'senior', 'blackmail'],
    [CATEGORIES.EXAMINATION]: ['hall ticket', 'admit card', 'exam', 'examination', 'backlog', 'revaluation', 're-evaluation', 'answer sheet', 'answer script', 'invigilator', 'grade sheet', 'sgpa', 'cgpa', 'marksheet'],
    [CATEGORIES.FINANCIAL]: ['fee', 'tuition', 'refund', 'payment', 'receipt', 'scholarship', 'challan', 'transaction', 'debit', 'overcharge', 'fine', 'penalty', 'caution deposit', 'bursar'],
    [CATEGORIES.HOSTEL]: ['hostel', 'mess', 'food', 'room', 'warden', 'water', 'electricity', 'washroom', 'hygiene', 'geyser', 'wifi', 'lan', 'dormitory', 'bed bug', 'cleanliness'],
    [CATEGORIES.ACADEMIC]: ['professor', 'faculty', 'lecture', 'syllabus', 'attendance', 'internal marks', 'assignment', 'curriculum', 'lab practical', 'project guide', 'thesis', 'hod'],
    [CATEGORIES.ADMINISTRATIVE]: ['certificate', 'bonafide', 'migration', 'transfer', 'transcript', 'id card', 'clearance', 'registrar', 'portal login', 'erp error'],
    [CATEGORIES.PLACEMENT]: ['placement', 'campus drive', 'recruiter', 'internship', 'noc', 'package', 'offer letter', 'training cell', 'blacklist', 'shortlist']
  };

  // Score categories
  Object.keys(lexicons).forEach(cat => {
    lexicons[cat].forEach(kw => {
      if (combined.includes(kw)) {
        categoryScores[cat] += kw.length > 6 ? 2 : 1;
      }
    });
  });

  // Urgency & Criticality markers
  const urgencyMarkers = [
    { word: 'ragging', weight: 4 },
    { word: 'threat', weight: 3 },
    { word: 'harass', weight: 3 },
    { word: 'tomorrow', weight: 3 },
    { word: 'exam tomorrow', weight: 4 },
    { word: 'today', weight: 2 },
    { word: 'urgent', weight: 2 },
    { word: 'immediate', weight: 2 },
    { word: 'debarred', weight: 3 },
    { word: 'admit card missing', weight: 3 },
    { word: 'hospital', weight: 3 },
    { word: 'food poisoning', weight: 4 },
    { word: 'illness', weight: 2 },
    { word: 'deadline', weight: 2 },
    { word: 'suicidal', weight: 5 },
    { word: 'depression', weight: 2 }
  ];

  let urgencyScore = 1; // base normal
  urgencyMarkers.forEach(m => {
    if (combined.includes(m.word)) {
      urgencyScore += m.weight;
    }
  });

  // Best category match
  let detectedCategory = userCategory || CATEGORIES.ACADEMIC;
  let maxScore = -1;
  Object.keys(categoryScores).forEach(cat => {
    if (categoryScores[cat] > maxScore && categoryScores[cat] > 0) {
      maxScore = categoryScores[cat];
      detectedCategory = cat;
    }
  });

  // If user explicitly chose a valid category, we respect it but confirm if there's high harassment flag
  if (categoryScores[CATEGORIES.HARASSMENT] >= 2) {
    detectedCategory = CATEGORIES.HARASSMENT;
  } else if (userCategory && categoryScores[userCategory] > 0) {
    detectedCategory = userCategory;
  }

  // Determine Priority Level & SLA
  let priority = 'P3 - Medium';
  let slaHours = 120; // 5 days

  if (detectedCategory === CATEGORIES.HARASSMENT || urgencyScore >= 6) {
    priority = 'P1 - Critical';
    slaHours = 24;
  } else if (urgencyScore >= 4 || combined.includes('exam') || combined.includes('hall ticket')) {
    priority = 'P2 - High';
    slaHours = 48;
  } else if (urgencyScore <= 2) {
    priority = 'P4 - Routine';
    slaHours = 240; // 10 days
  }

  // Matched Bylaws
  const matchedBylaws = BYLAWS_DATABASE.filter(b => b.category === 'ALL' || b.category === detectedCategory);

  // Suggested Institutional Draft Resolution
  const draftRecommendation = generateResolutionRecommendation(detectedCategory, priority, subject, statement);

  return {
    detectedCategory,
    categoryConfidence: Math.min(98, 65 + (maxScore * 6)),
    urgencyScore,
    priority,
    slaHours,
    committee: COMMITTEES[detectedCategory] || COMMITTEES[CATEGORIES.ACADEMIC],
    matchedBylaws,
    draftRecommendation,
    triagedAt: new Date().toISOString()
  };
}

/**
 * Generates an authoritative, formal institutional resolution draft
 * conforming to university statues and administrative jurisprudence.
 */
function generateResolutionRecommendation(category, priority, subject, statement) {
  const isUrgent = priority.includes('P1') || priority.includes('P2');

  switch (category) {
    case CATEGORIES.EXAMINATION:
      return {
        summary: 'Provisional Examination Clearance & Script Re-audit Order',
        statutoryCitation: 'Examination Ordinance Sec. 8.3 & Academic Regulations 2024',
        remedialAction: 'Direct the Office of the Controller of Examinations to immediately verify attendance eligibility records and issue a Provisional Examination Admit Card within 24 hours. The grievance regarding mark evaluation discrepancy is concurrently referred to the Senior Subject Scrutiny Board.',
        targetComplianceDays: isUrgent ? 1 : 3,
        suggestedStatus: 'Action Directed'
      };
    case CATEGORIES.FINANCIAL:
      return {
        summary: 'Accounts Reconciliation & Direct Remittance Order',
        statutoryCitation: 'Finance Division Circular 2024/09, Clause 4.2',
        remedialAction: 'Instruct the University Accounts Section to cross-verify the student transaction reference with the payment gateway ledger. If a duplicate debit is established, process an automated refund to the source account within 48 banking hours without penal deduction.',
        targetComplianceDays: 2,
        suggestedStatus: 'Action Directed'
      };
    case CATEGORIES.HOSTEL:
      return {
        summary: 'Chief Warden Welfare Inspection & Maintenance Directive',
        statutoryCitation: 'Central Residential Welfare Handbook, Bylaw 11.4',
        remedialAction: 'Depute the Assistant Warden (Maintenance) to conduct an on-site physical inspection of the designated block within 12 hours. Issue an expedited repair work-order to the University Estate Office and file a compliance inspection report.',
        targetComplianceDays: isUrgent ? 1 : 2,
        suggestedStatus: 'Action Directed'
      };
    case CATEGORIES.HARASSMENT:
      return {
        summary: 'Statutory ICC Immediate Inquiry & Protection Mandate',
        statutoryCitation: 'Supreme Court Anti-Ragging Mandate & UGC Regulations Sec 6.3',
        remedialAction: 'Invoke expedited confidential inquiry protocol under the Internal Complaints Committee. Issue formal summons to the designated committee members within 24 hours. Guarantee absolute student confidentiality and enforce physical & academic safety measures pending final inquiry report.',
        targetComplianceDays: 1,
        suggestedStatus: 'Hearing Scheduled'
      };
    case CATEGORIES.ACADEMIC:
      return {
        summary: 'Academic Scrutiny & Faculty Consultation Order',
        statutoryCitation: 'University Academic Ordinance 14-B',
        remedialAction: 'Summon the Departmental Academic Grievance Sub-Committee to review the continuous internal assessment logs and syllabus coverage records. Facilitate a structured hearing between the student and Head of Department to arrive at an amicable resolution.',
        targetComplianceDays: 4,
        suggestedStatus: 'Under Review'
      };
    case CATEGORIES.ADMINISTRATIVE:
      return {
        summary: 'Expedited Registrarial Document Verification & Issuance',
        statutoryCitation: 'Citizen Charter of University Administrative Services',
        remedialAction: 'Instruct the Student Records & Migration Wing to complete digital verification of the applicant credentials and dispatch the requested official certificate within 72 hours.',
        targetComplianceDays: 3,
        suggestedStatus: 'Action Directed'
      };
    default:
      return {
        summary: 'General Redressal Review & Committee Interlocutory Order',
        statutoryCitation: 'UGC Student Grievance Redressal Regulations 2023',
        remedialAction: 'Assign designated Case Officer to review evidentiary submissions, verify institutional records, and tender findings to the Directorate of Student Affairs within 5 working days.',
        targetComplianceDays: 5,
        suggestedStatus: 'Under Review'
      };
  }
}
