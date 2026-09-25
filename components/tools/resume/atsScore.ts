import { ResumeData } from './types';

export interface ATSCheckItem {
  id: string;
  label: string;
  points: number;
  maxPoints: number;
  status: 'passed' | 'warning' | 'failed';
  tip: string;
}

export interface ATSScoreResult {
  score: number;
  grade: 'Elite' | 'Strong' | 'Average' | 'Needs Work';
  checklist: ATSCheckItem[];
  actionVerbsFound: string[];
  metricsCount: number;
  missingCrucialElements: string[];
}

export const ACTION_VERBS = [
  'spearheaded',
  'orchestrated',
  'architected',
  'streamlined',
  'engineered',
  'accelerated',
  'optimized',
  'automated',
  'delivered',
  'pioneered',
  'collaborated',
  'formulated',
  'designed',
  'implemented',
  'revamped',
  'scaled',
  'managed',
  'executed',
  'maximized',
  'standardized',
];

export function calculateATSScore(data: ResumeData): ATSScoreResult {
  const checklist: ATSCheckItem[] = [];
  let totalScore = 0;

  // 1. Contact & Identity Completeness (Max 15 pts)
  const contact = data.contact;
  let contactPts = 0;
  if (contact.fullName.trim().length > 3) contactPts += 3;
  if (contact.email.includes('@') && contact.email.includes('.')) contactPts += 3;
  if (contact.phone.trim().length >= 8) contactPts += 3;
  if (contact.location.trim().length > 2) contactPts += 3;
  if (contact.linkedIn || contact.github || contact.portfolio) contactPts += 3;

  checklist.push({
    id: 'contact',
    label: 'Contact Information & Web Presence',
    points: contactPts,
    maxPoints: 15,
    status: contactPts >= 12 ? 'passed' : contactPts >= 6 ? 'warning' : 'failed',
    tip: contactPts < 15 ? 'Add your LinkedIn, GitHub, or portfolio link to boost visibility.' : 'Full contact details provided.',
  });
  totalScore += contactPts;

  // 2. Professional Summary (Max 15 pts)
  const summaryWords = data.summary.trim().split(/\s+/).filter(Boolean).length;
  let summaryPts = 0;
  if (summaryWords >= 30 && summaryWords <= 90) {
    summaryPts = 15;
  } else if (summaryWords > 15 && summaryWords < 30) {
    summaryPts = 10;
  } else if (summaryWords > 90) {
    summaryPts = 11;
  }

  checklist.push({
    id: 'summary',
    label: 'Professional Summary Calibration',
    points: summaryPts,
    maxPoints: 15,
    status: summaryPts >= 13 ? 'passed' : summaryPts >= 8 ? 'warning' : 'failed',
    tip:
      summaryWords < 30
        ? 'Summary is slightly brief. 40-75 words is optimal for ATS scanners.'
        : summaryWords > 90
        ? 'Summary is long; trim to under 80 words for higher readability.'
        : 'Summary length is within the sweet spot (40-80 words).',
  });
  totalScore += summaryPts;

  // 3. Work Experience & Quantifiable Metrics (Max 30 pts)
  let expPts = 0;
  let actionVerbsFound: string[] = [];
  let metricsCount = 0;

  const allBulletsText = data.experiences
    .flatMap((e) => e.bullets)
    .join(' ')
    .toLowerCase();

  ACTION_VERBS.forEach((verb) => {
    if (new RegExp(`\\b${verb}\\b`, 'i').test(allBulletsText)) {
      actionVerbsFound.push(verb);
    }
  });

  const metricMatches = allBulletsText.match(/\d+(?:[.,]\d+)?%?|\$|€|£/g);
  metricsCount = metricMatches ? metricMatches.length : 0;

  if (data.experiences.length >= 2) expPts += 8;
  else if (data.experiences.length === 1) expPts += 5;

  if (actionVerbsFound.length >= 4) expPts += 12;
  else if (actionVerbsFound.length >= 2) expPts += 7;
  else if (actionVerbsFound.length === 1) expPts += 3;

  if (metricsCount >= 3) expPts += 10;
  else if (metricsCount >= 1) expPts += 6;

  checklist.push({
    id: 'experience',
    label: 'Work Experience & Action Verbs',
    points: expPts,
    maxPoints: 30,
    status: expPts >= 24 ? 'passed' : expPts >= 15 ? 'warning' : 'failed',
    tip:
      metricsCount < 3
        ? 'Include quantified metrics (e.g. "boosted throughput by 28%", "saved 15 hours") to satisfy Google XYZ formula.'
        : `Identified ${actionVerbsFound.length} strong action verbs and ${metricsCount} quantified metrics.`,
  });
  totalScore += expPts;

  // 4. Skills Categorization (Max 15 pts)
  const totalSkills = data.skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  let skillsPts = 0;
  if (totalSkills >= 8 && data.skillCategories.length >= 2) skillsPts = 15;
  else if (totalSkills >= 5) skillsPts = 10;
  else if (totalSkills > 0) skillsPts = 5;

  checklist.push({
    id: 'skills',
    label: 'Skills Density & Categorization',
    points: skillsPts,
    maxPoints: 15,
    status: skillsPts >= 12 ? 'passed' : skillsPts >= 6 ? 'warning' : 'failed',
    tip:
      totalSkills < 8
        ? 'List at least 8 relevant technical and professional skills grouped by category.'
        : `${totalSkills} categorized skills defined.`,
  });
  totalScore += skillsPts;

  // 5. Education Credentials (Max 10 pts)
  let eduPts = 0;
  if (data.educations.length > 0 && data.educations[0].degree && data.educations[0].institution) {
    eduPts = 10;
  } else if (data.educations.length > 0) {
    eduPts = 6;
  }

  checklist.push({
    id: 'education',
    label: 'Education & Institutional Credentials',
    points: eduPts,
    maxPoints: 10,
    status: eduPts === 10 ? 'passed' : 'warning',
    tip: eduPts < 10 ? 'Ensure degree and university are fully entered.' : 'Degree and university recognized.',
  });
  totalScore += eduPts;

  // 6. Value-Add Sections (Projects, Certs, Languages) (Max 10 pts)
  let addPts = 0;
  if (data.projects.length > 0) addPts += 4;
  if (data.certifications.length > 0) addPts += 3;
  if (data.languages.length > 0) addPts += 3;

  checklist.push({
    id: 'additions',
    label: 'Projects, Certifications & Languages',
    points: addPts,
    maxPoints: 10,
    status: addPts >= 7 ? 'passed' : 'warning',
    tip: addPts < 7 ? 'Adding projects and industry certifications increases ATS keyword score.' : 'Well-rounded project and credential sections.',
  });
  totalScore += addPts;

  // 7. Photo Compliance Adjustment (Max 5 bonus/penalty)
  let photoCheck: ATSCheckItem;
  if (!data.contact.includePhoto) {
    totalScore += 5;
    photoCheck = {
      id: 'photo',
      label: 'US/UK ATS Bias-Free Formatting',
      points: 5,
      maxPoints: 5,
      status: 'passed',
      tip: 'No photo embedded (100% compliant with standard US/UK anti-bias ATS parsing requirements).',
    };
  } else {
    // Photo is enabled: useful for Gulf/EU, but for US ATS it is warned
    photoCheck = {
      id: 'photo',
      label: 'Photo Setting (Gulf/EU vs US ATS)',
      points: 2,
      maxPoints: 5,
      status: 'warning',
      tip: 'Photo is enabled. Recommended for Gulf/Middle East/EU CVs, but turn OFF for US/Canada/UK corporate ATS compliance.',
    };
    totalScore += 2;
  }
  checklist.push(photoCheck);

  // Normalize final score between 0 and 100
  const finalScore = Math.min(100, Math.max(0, Math.round(totalScore)));

  let grade: 'Elite' | 'Strong' | 'Average' | 'Needs Work' = 'Needs Work';
  if (finalScore >= 90) grade = 'Elite';
  else if (finalScore >= 78) grade = 'Strong';
  else if (finalScore >= 60) grade = 'Average';

  const missingCrucialElements: string[] = [];
  if (!contact.linkedIn && !contact.github && !contact.portfolio) missingCrucialElements.push('Online Portfolio / LinkedIn URL');
  if (metricsCount === 0) missingCrucialElements.push('Quantified Metric (% or Numbers)');
  if (data.projects.length === 0) missingCrucialElements.push('Technical Projects Section');

  return {
    score: finalScore,
    grade,
    checklist,
    actionVerbsFound,
    metricsCount,
    missingCrucialElements,
  };
}

// Keyword Scanner: compares Job Description text with Resume text
export interface KeywordScanResult {
  matchPercentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  totalExtracted: number;
}

export function scanJobDescription(jobDesc: string, data: ResumeData): KeywordScanResult {
  if (!jobDesc || jobDesc.trim().length < 20) {
    return {
      matchPercentage: 0,
      matchedKeywords: [],
      missingKeywords: [],
      totalExtracted: 0,
    };
  }

  // Compile entire resume into lowercase search string
  const resumeCorpus = [
    data.contact.fullName,
    data.contact.jobTitle,
    data.summary,
    data.experiences.map((e) => `${e.role} ${e.company} ${e.bullets.join(' ')}`).join(' '),
    data.educations.map((e) => `${e.degree} ${e.institution}`).join(' '),
    data.skillCategories.flatMap((c) => c.skills.map((s) => s.name)).join(' '),
    data.projects.map((p) => `${p.name} ${p.techStack} ${p.bullet1} ${p.bullet2}`).join(' '),
    data.certifications.map((c) => `${c.name} ${c.issuer}`).join(' '),
  ]
    .join(' ')
    .toLowerCase();

  // Curated common tech, corporate, and soft skill tokens
  const commonStopWords = new Set([
    'and', 'the', 'for', 'with', 'that', 'this', 'from', 'have', 'will', 'your',
    'team', 'work', 'experience', 'skills', 'about', 'role', 'looking', 'years',
    'working', 'required', 'responsibilities', 'opportunity', 'company', 'join',
    'candidate', 'environment', 'strong', 'ability', 'must', 'good', 'position',
  ]);

  // Extract potential multi-word or single-word keywords
  const rawWords = jobDesc
    .toLowerCase()
    .replace(/[^a-z0-9#+.-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !commonStopWords.has(w));

  // Count word frequencies
  const freqMap: Record<string, number> = {};
  rawWords.forEach((word) => {
    freqMap[word] = (freqMap[word] || 0) + 1;
  });

  // Pick top 15-20 most frequent keywords
  const sortedKeywords = Object.keys(freqMap)
    .sort((a, b) => freqMap[b] - freqMap[a])
    .slice(0, 16);

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  sortedKeywords.forEach((kw) => {
    const escaped = kw.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    if (new RegExp(`\\b${escaped}\\b`, 'i').test(resumeCorpus)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const total = sortedKeywords.length;
  const matchPercentage = total > 0 ? Math.round((matchedKeywords.length / total) * 100) : 0;

  return {
    matchPercentage,
    matchedKeywords,
    missingKeywords,
    totalExtracted: total,
  };
}
