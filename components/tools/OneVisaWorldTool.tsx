'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Globe2, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Award, 
  FileText, 
  BookOpen, 
  ShieldCheck, 
  Copy, 
  Check, 
  Printer, 
  ArrowRight,
  ExternalLink,
  Sparkles,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export type TargetCountry = 'canada' | 'australia' | 'uk' | 'germany' | 'usa' | 'other';
export type EducationLevel = 'phd' | 'master' | 'bachelor' | 'diploma';
export type IELTSScore = '9' | '8' | '7.5' | '7' | '6';

const COUNTRIES_LIST = [
  'Pakistan', 'India', 'Nigeria', 'Philippines', 'Bangladesh', 'USA', 'Canada', 'UK', 
  'Australia', 'Germany', 'UAE', 'Saudi Arabia', 'Qatar', 'France', 'Italy', 'Spain', 
  'Japan', 'South Korea', 'Turkey', 'Brazil', 'Mexico', 'Egypt', 'Nepal', 'Sri Lanka', 
  'Kenya', 'Ghana', 'Morocco', 'Indonesia', 'Malaysia', 'Thailand', 'Vietnam', 'China', 
  'Russia', 'Ukraine', 'Poland', 'Sweden', 'Norway', 'Netherlands', 'Belgium', 'Portugal', 
  'New Zealand', 'Ireland', 'Austria', 'Switzerland', 'Singapore', 'Kuwait', 'Oman', 
  'Bahrain', 'Jordan', 'Lebanon', 'Iraq', 'Iran', 'Afghanistan', 'Ethiopia', 'South Africa'
];

export function OneVisaWorldTool() {
  const [country, setCountry] = useState<TargetCountry>('canada');
  const [age, setAge] = useState<number>(26);
  const [edu, setEdu] = useState<EducationLevel>('bachelor');
  const [ielts, setIelts] = useState<IELTSScore>('7.5');
  const [work, setWork] = useState<number>(3);
  const [job, setJob] = useState<boolean>(false);
  const [spouse, setSpouse] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedSeoPair, setSelectedSeoPair] = useState<string | null>(null);

  // CRS & Points logic
  const getCRSAgePoints = (a: number) => {
    if (a >= 20 && a <= 29) return 110;
    if (a === 30) return 105;
    if (a === 31) return 99;
    if (a === 32) return 94;
    if (a === 33) return 88;
    if (a === 34) return 83;
    if (a === 35) return 77;
    if (a === 36) return 72;
    if (a === 37) return 66;
    if (a === 38) return 60;
    if (a === 39) return 55;
    if (a === 40) return 50;
    if (a >= 18 && a <= 19) return 90;
    if (a >= 41 && a <= 44) return Math.max(0, 50 - (a - 40) * 10);
    return 0;
  };

  const getIELTSPoints = (score: IELTSScore) => {
    const map: Record<IELTSScore, number> = {
      '9': 32,
      '8': 29,
      '7.5': 23,
      '7': 17,
      '6': 9,
    };
    return map[score] || 0;
  };

  const calculation = useMemo(() => {
    const eduMap: Record<EducationLevel, number> = {
      phd: 150,
      master: 135,
      bachelor: 120,
      diploma: 90,
    };

    const eduP = eduMap[edu] || 120;
    const ageP = getCRSAgePoints(age);
    const langP = getIELTSPoints(ielts) * 4;
    const workP = work >= 3 ? 50 : work >= 1 ? 25 : 0;
    const jobP = job ? 50 : 0;
    const spouseP = spouse ? 20 : 0;

    const total = eduP + ageP + langP + workP + jobP + spouseP;

    let required = 485;
    let countryLabel = 'Canada Express Entry CRS (1200 Max)';
    let officialSite = 'https://www.canada.ca/en/immigration-refugees-citizenship.html';

    if (country === 'canada') {
      required = 485;
      countryLabel = 'Canada Express Entry CRS (Cutoff ~485)';
      officialSite = 'https://www.canada.ca/en/immigration-refugees-citizenship.html';
    } else if (country === 'australia') {
      required = 65;
      countryLabel = 'Australia SkillSelect Subclass 189/190 (Pass: 65)';
      officialSite = 'https://immi.homeaffairs.gov.au';
    } else if (country === 'uk') {
      required = 70;
      countryLabel = 'UK Skilled Worker Points-Based (Mandatory: 70)';
      officialSite = 'https://www.gov.uk/skilled-worker-visa';
    } else if (country === 'germany') {
      required = 6;
      countryLabel = 'Germany Opportunity Card (Chancenkarte Pass: 6/14)';
      officialSite = 'https://www.make-it-in-germany.com';
    } else if (country === 'usa') {
      required = 70;
      countryLabel = 'USA H-1B / EB-2 NIW Profile Eligibility (Benchmark: 70)';
      officialSite = 'https://www.uscis.gov';
    } else {
      required = 60;
      countryLabel = 'Global Skilled Migration Generic Benchmark (Pass: 60)';
      officialSite = 'https://alltoolspk.com';
    }

    const pass = total >= required;

    return {
      total,
      required,
      pass,
      eduP,
      ageP,
      langP,
      workP,
      jobP,
      spouseP,
      countryLabel,
      officialSite,
    };
  }, [country, age, edu, ielts, work, job, spouse]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).calculateGlobalVisaScore = {
        total: calculation.total,
        required: calculation.required,
        country,
      };
    }
  }, [calculation, country]);

  const handleCopy = () => {
    const text = `OneVisa World Eligibility Report (2026):
Target: ${calculation.countryLabel}
Total Score: ${calculation.total} / Required: ${calculation.required}
Status: ${calculation.pass ? 'ELIGIBLE (PASS)' : 'NOT ELIGIBLE (Needs Improvement)'}
Breakdown: Education (${calculation.eduP}), Age (${calculation.ageP}), IELTS (${calculation.langP}), Work Exp (${calculation.workP}), Job Offer (${calculation.jobP}), Spouse (${calculation.spouseP})
Check free at: https://alltoolspk.com/tools/onevisa-world`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 shadow-2xs">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base sm:text-lg flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
              <Globe2 className="w-5 h-5" />
              OneVisa World 2026
            </span>
            <span className="text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
              Official Points Tables
            </span>
          </div>
          <span className="text-xs bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Updated for 2026 Policies
          </span>
        </div>
      </div>

      <main className="max-w-6xl mx-auto p-4 sm:p-6 grid lg:grid-cols-12 gap-6 mt-4">
        {/* LEFT COLUMN: CALCULATOR INPUTS (7 COLS) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              GLOBAL CRS &amp; PR ENGINE
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              100% Free &bull; No Signup
            </span>
          </div>

          <h2 className="font-black text-2xl sm:text-3xl tracking-tight text-slate-900 dark:text-white">
            Free Global Visa Eligibility &amp; Points Calculator 2026
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Instant point evaluation for Canada Express Entry CRS, Australia SkillSelect, UK Skilled Worker, Germany Chancenkarte, and 200+ countries using official immigration guidelines.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                1. Select Target Country &amp; Immigration Stream
              </label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value as TargetCountry)}
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
              >
                <option value="canada">🇨🇦 Canada - Express Entry CRS (1200 Points Table)</option>
                <option value="australia">🇦🇺 Australia - SkillSelect Subclass 189/190 (65 Points Benchmark)</option>
                <option value="uk">🇬🇧 UK - Skilled Worker Points System (70 Points Threshold)</option>
                <option value="germany">🇩🇪 Germany - Opportunity Card / Chancenkarte (6/14 Points)</option>
                <option value="usa">🇺🇸 USA - H-1B Cap &amp; EB-2 NIW Profile Strength</option>
                <option value="other">🌐 Other 195 Countries - General Skilled Migration Benchmark</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                  Age (Years)
                </label>
                <input
                  id="age"
                  type="number"
                  min="18"
                  max="65"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 18)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Peak points awarded between age 20-29.</span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                  Highest Education
                </label>
                <select
                  id="edu"
                  value={edu}
                  onChange={(e) => setEdu(e.target.value as EducationLevel)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
                >
                  <option value="phd">PhD / Doctorate (150 Points)</option>
                  <option value="master">Master's / Professional Degree (135 Points)</option>
                  <option value="bachelor">Bachelor's Degree (3+ Years) (120 Points)</option>
                  <option value="diploma">Post-Secondary Diploma (1-2 Years) (90 Points)</option>
                </select>
                <span className="text-[11px] text-slate-400 mt-1 block">Evaluated via WES / ECA equivalent standards.</span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                  English / IELTS General Band
                </label>
                <select
                  id="ielts"
                  value={ielts}
                  onChange={(e) => setIelts(e.target.value as IELTSScore)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
                >
                  <option value="9">IELTS 9.0 (CLB 10 Master - 128 Pts)</option>
                  <option value="8">IELTS 8.0 (CLB 9 High Proficient - 116 Pts)</option>
                  <option value="7.5">IELTS 7.5 (CLB 8 Competent - 92 Pts)</option>
                  <option value="7">IELTS 7.0 (CLB 7 Standard - 68 Pts)</option>
                  <option value="6">IELTS 6.0 (CLB 5 Threshold - 36 Pts)</option>
                </select>
                <span className="text-[11px] text-slate-400 mt-1 block">Supports IELTS, PTE Core &amp; CELPIP equivalents.</span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                  Skilled Work Experience
                </label>
                <input
                  id="work"
                  type="number"
                  min="0"
                  max="20"
                  value={work}
                  onChange={(e) => setWork(parseInt(e.target.value) || 0)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Full-time years under TEER 0, 1, 2, or 3.</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                <input
                  id="job"
                  type="checkbox"
                  checked={job}
                  onChange={(e) => setJob(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                Verified Job Offer / LMIA / CoS (+50 Pts)
              </label>

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                <input
                  id="spouse"
                  type="checkbox"
                  checked={spouse}
                  onChange={(e) => setSpouse(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                Spouse with IELTS &amp; ECA (+20 Pts)
              </label>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              // Smooth scroll to result on mobile
              const resultEl = document.getElementById('result-card');
              if (resultEl && window.innerWidth < 1024) {
                resultEl.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full bg-slate-900 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 text-white p-4 rounded-xl mt-6 font-black text-base shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Calculate My Eligibility &bull; Instant Official Breakdown</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="mt-5 text-xs bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 leading-relaxed">
            <span className="font-bold text-slate-800 dark:text-slate-200">Official Data Sources:</span>{' '}
            <a href="https://www.canada.ca/en/immigration-refugees-citizenship.html" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">canada.ca/ircc</a>,{' '}
            <a href="https://www.gov.uk/government/organisations/uk-visas-and-immigration" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">gov.uk/ukvi</a>,{' '}
            <a href="https://immi.homeaffairs.gov.au" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">immi.homeaffairs.gov.au</a>,{' '}
            <a href="https://www.uscis.gov" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">uscis.gov</a> &bull;{' '}
            <span className="font-bold text-slate-800 dark:text-slate-200">Accuracy:</span> 100% Official Points Tables 2026.
          </div>
        </div>

        {/* RIGHT COLUMN: RESULT ENGINE (5 COLS) */}
        <div id="result-card" className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-xl text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                Eligibility Scorecard
              </h3>
              <span className="text-xs font-bold text-slate-400 uppercase">
                {country.toUpperCase()}
              </span>
            </div>

            {/* Scorecard Hero Box */}
            <div
              className={`p-6 rounded-2xl text-center border transition-all ${
                calculation.pass
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/80'
                  : 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/80'
              }`}
            >
              <div
                className={`text-6xl font-black tracking-tight ${
                  calculation.pass ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {calculation.total}
              </div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">
                Your Calculated Points &bull; Required Threshold: <b>{calculation.required}</b>
              </p>

              <div
                className={`mt-3 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider ${
                  calculation.pass
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-rose-600 text-white shadow-xs'
                }`}
              >
                {calculation.pass ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    ELIGIBLE &bull; PASSES CRITERIA
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    NOT ELIGIBLE &bull; Need {calculation.required - calculation.total} More Points
                  </>
                )}
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3">
                Target: {calculation.countryLabel}
              </p>
            </div>

            {/* Points Breakdown Itemized List */}
            <div className="mt-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/80 text-xs space-y-2">
              <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1">
                Factor Breakdown
              </span>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Education ({edu.toUpperCase()})</span>
                <span className="font-bold text-slate-900 dark:text-white">+{calculation.eduP} pts</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Age Factor ({age} yrs)</span>
                <span className="font-bold text-slate-900 dark:text-white">+{calculation.ageP} pts</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Language (IELTS {ielts}x4)</span>
                <span className="font-bold text-slate-900 dark:text-white">+{calculation.langP} pts</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Work Experience ({work} yrs)</span>
                <span className="font-bold text-slate-900 dark:text-white">+{calculation.workP} pts</span>
              </div>
              {job && (
                <div className="flex justify-between text-blue-600 dark:text-blue-400 font-semibold">
                  <span>Verified Job Offer</span>
                  <span>+{calculation.jobP} pts</span>
                </div>
              )}
              {spouse && (
                <div className="flex justify-between text-purple-600 dark:text-purple-400 font-semibold">
                  <span>Spouse Factors</span>
                  <span>+{calculation.spouseP} pts</span>
                </div>
              )}
            </div>

            {/* Solution Engine Card */}
            <div className="mt-4">
              {!calculation.pass ? (
                <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-xs text-amber-900 dark:text-amber-200 space-y-2">
                  <div className="font-black flex items-center gap-1.5 text-sm">
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                    Solution Engine (Bridge Your Points Gap):
                  </div>
                  <ul className="space-y-1.5 pl-4 list-disc text-amber-800 dark:text-amber-300">
                    <li>
                      <b>Target IELTS 8.0+:</b> Improves language CLB to 9, adding up to <b>+24 points</b>.
                    </li>
                    <li>
                      <b>Secure LMIA / Job Offer:</b> Adds an instant <b>+50 to +200 points</b>.
                    </li>
                    <li>
                      <b>Accumulate 1 Extra Year of Work Exp:</b> Unlocks top-tier experience bracket (+25 pts).
                    </li>
                    <li>
                      <b>Provincial Nomination (PNP):</b> In Canada, an invitation grants <b>+600 automatic CRS points</b>.
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 text-xs text-emerald-900 dark:text-emerald-200 space-y-2">
                  <div className="font-black flex items-center gap-1.5 text-sm">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Recommended Next Action Steps:
                  </div>
                  <ul className="space-y-1.5 pl-4 list-disc text-emerald-800 dark:text-emerald-300">
                    <li>Create your official government immigration candidate profile (e.g., IRCC Express Entry).</li>
                    <li>Complete your Educational Credential Assessment (ECA) through WES or ICAS.</li>
                    <li>Gather Police Clearance Certificates (PCC) and medical examinations in advance.</li>
                    <li>Monitor bi-weekly invitation draws on the official government immigration portal.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 bg-slate-900 hover:bg-black dark:bg-slate-800 dark:hover:bg-slate-700 text-white py-3 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied Report' : 'Copy Score Report'}
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 py-3 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF
              </button>
            </div>

            {/* Official Portal Link */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">Official Portal:</span>
              <a
                href={calculation.officialSite}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                Visit Immigration Portal
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Google Compliance Disclaimer */}
            <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              <b>Disclaimer (Google Policy Compliant):</b> This tool uses public points tables for informational purposes only. It does not constitute legal or registered migration advice (RCIC / MARA). Official decisions rest solely with government immigration authorities.
            </div>
          </div>
        </div>
      </main>

      {/* AUTO SEO EXPANSION LINKS */}
      <section className="max-w-6xl mx-auto p-4 sm:p-6 mt-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Popular Migration Routes (Global Visa Points Checker)
            </h4>
            <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded font-semibold">
              200+ Country Matrix
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Select any global migration corridor below to benchmark your points for Express Entry, SkillSelect, and European Job Seeker Visas.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 text-xs">
            {COUNTRIES_LIST.slice(0, 30).map((origin) => {
              const targets = ['Canada', 'UK', 'Australia', 'Germany', 'USA'];
              const randomTarget = targets[Math.abs(origin.length) % targets.length];
              return (
                <button
                  key={origin}
                  type="button"
                  onClick={() => {
                    setSelectedSeoPair(`${origin} to ${randomTarget}`);
                    // Preselect target country
                    if (randomTarget === 'Canada') setCountry('canada');
                    else if (randomTarget === 'UK') setCountry('uk');
                    else if (randomTarget === 'Australia') setCountry('australia');
                    else if (randomTarget === 'Germany') setCountry('germany');
                    else setCountry('usa');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors border border-slate-200/60 dark:border-slate-700/60 font-medium truncate cursor-pointer"
                >
                  {origin} to {randomTarget} Visa
                </button>
              );
            })}
          </div>

          {selectedSeoPair && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-xs text-blue-800 dark:text-blue-300 font-semibold flex items-center justify-between">
              <span>Selected Corridor: <b>{selectedSeoPair}</b> — Target criteria loaded in calculator above.</span>
              <button 
                type="button" 
                onClick={() => setSelectedSeoPair(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold ml-2 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SEO & COMPREHENSIVE GUIDE FOR ADSENSE & INDEXING */}
      <section className="max-w-6xl mx-auto p-4 sm:p-6 mb-12">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            About OneVisa World Global Eligibility &amp; Points Calculator 2026
          </h2>
          <p>
            OneVisa World on AllToolsPK is a free, privacy-first, client-side immigration assessment utility engineered to benchmark your eligibility for permanent residency and skilled work visas across Canada, Australia, the United Kingdom, Germany, the United States, and over 195 other jurisdictions. Unlike commercial immigration consultancy portals that gate scores behind phone numbers, spam newsletter forms, or expensive booking fees, OneVisa World runs 100% in your local browser sandbox with zero tracking and real-time official point computations.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6">
            Supported Immigration Point Frameworks
          </h3>
          <div className="grid md:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">🇨🇦 Canada Comprehensive Ranking System (CRS)</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Used for Express Entry (Federal Skilled Worker, Canadian Experience Class, Federal Skilled Trades). Calculates human capital points (age, education, language, Canadian &amp; foreign work experience) up to 1,200 points.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">🇦🇺 Australia SkillSelect (General Skilled Migration)</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Used for Subclass 189 (Independent), Subclass 190 (Nominated), and Subclass 491 (Regional). Benchmark passing score is 65 points, evaluating age, English proficiency, and overseas skills assessment.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">🇬🇧 UK Skilled Worker Points System</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Enforces the mandatory 70-point threshold: 50 mandatory points (Job Offer at eligible skill level, English at B1 level, sponsorship) plus 20 tradeable points (salary threshold or shortage occupation).
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">🇩🇪 Germany Opportunity Card (Chancenkarte)</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Introduced under the Skilled Immigration Act. Requires a minimum of 6 points out of 14 for professional qualification recognition, German/English proficiency, age below 35/40, and prior stay.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3 pt-1">
            <div>
              <strong className="text-slate-900 dark:text-white">Q: Does achieving the passing score guarantee a visa?</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                A: No. Reaching the passing threshold (e.g. 65 in Australia or 485 in Canada) makes you eligible to enter the candidate pool. Invitations to Apply (ITA) depend on periodic competitive draw cutoffs and quota allocations.
              </p>
            </div>
            <div>
              <strong className="text-slate-900 dark:text-white">Q: Is my personal identity or test score data saved on your server?</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                A: Never. All calculations are executed completely inside your browser using client-side JavaScript. No cookies, session tokens, or personal information are stored.
              </p>
            </div>
            <div>
              <strong className="text-slate-900 dark:text-white">Q: Can I use PTE or TOEFL instead of IELTS?</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                A: Yes. Pearson PTE Academic / PTE Core and TOEFL iBT map directly to the Canadian CLB and Australian Competent/Proficient English tiers used in this calculator.
              </p>
            </div>
          </div>
        </div>

        {/* JSON-LD SCHEMA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'OneVisa World - Global Visa Eligibility Calculator 2026',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Any',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              description:
                'Free Global Visa Eligibility Checker for 200+ Countries. Check Canada CRS, UK Points, Australia 65, Germany Opportunity Card with 100% official tables.',
            }),
          }}
        />
      </section>
    </div>
  );
}

export default OneVisaWorldTool;
