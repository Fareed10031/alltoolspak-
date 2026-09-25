import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ScanSearch,
  ChevronDown,
  ChevronUp,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeData } from './types';
import { calculateATSScore, scanJobDescription } from './atsScore';

interface ATSScoreCardProps {
  data: ResumeData;
  onAddSkill: (skillName: string) => void;
}

export function ATSScoreCard({ data, onAddSkill }: ATSScoreCardProps) {
  const [showChecklist, setShowChecklist] = useState<boolean>(false);
  const [showJobScanner, setShowJobScanner] = useState<boolean>(false);
  const [jobDescription, setJobDescription] = useState<string>('');

  const atsResult = calculateATSScore(data);
  const scanResult = scanJobDescription(jobDescription, data);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300';
    if (score >= 75) return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-300';
    if (score >= 60) return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-300';
    return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-300';
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Score Ring / Indicator */}
        <div className="flex items-center gap-3.5">
          <div
            className={`w-14 h-14 rounded-2xl border-2 flex flex-col items-center justify-center font-extrabold shadow-xs ${getScoreColor(
              atsResult.score
            )}`}
          >
            <span className="text-xl leading-none">{atsResult.score}</span>
            <span className="text-[9px] uppercase tracking-wider font-semibold opacity-80 mt-0.5">/ 100</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Live ATS Compliance Score
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {atsResult.grade} Grade
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {atsResult.actionVerbsFound.length} action verbs &bull; {atsResult.metricsCount} quantified metrics &bull;{' '}
              {data.contact.includePhoto ? 'Gulf/EU Format (Photo ON)' : '100% US/UK ATS Compliant'}
            </p>
          </div>
        </div>

        {/* Buttons: Checklist Toggle & Job Scanner Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChecklist(!showChecklist)}
            className="text-xs cursor-pointer gap-1.5 h-8"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Score Checklist</span>
            {showChecklist ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </Button>

          <Button
            variant={showJobScanner ? 'emerald' : 'outline'}
            size="sm"
            onClick={() => setShowJobScanner(!showJobScanner)}
            className="text-xs cursor-pointer gap-1.5 h-8"
          >
            <ScanSearch className="w-3.5 h-3.5" />
            <span>JD Keyword Scanner</span>
          </Button>
        </div>
      </div>

      {/* Accordion 1: Real ATS Score Checklist */}
      {showChecklist && (
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {atsResult.checklist.map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 space-y-1"
              >
                <div className="flex items-center justify-between font-semibold">
                  <div className="flex items-center gap-1.5">
                    {item.status === 'passed' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : item.status === 'warning' ? (
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    )}
                    <span className="text-slate-900 dark:text-slate-100 text-[11px]">{item.label}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    {item.points}/{item.maxPoints} pts
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 pl-5 leading-normal">
                  {item.tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accordion 2: Job Description Keyword Scanner */}
      {showJobScanner && (
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <ScanSearch className="w-3.5 h-3.5 text-emerald-600" />
              Target Job Description Scanner
            </h4>
            {jobDescription && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Match Rate: {scanResult.matchPercentage}%
              </span>
            )}
          </div>

          <Textarea
            rows={3}
            placeholder="Paste target Job Description (from LinkedIn, Indeed, etc.) to discover missing keywords..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="text-xs font-sans"
          />

          {jobDescription.trim().length > 30 && (
            <div className="space-y-2 text-xs">
              {/* Matched Keywords */}
              <div>
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                  Matched Keywords ({scanResult.matchedKeywords.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {scanResult.matchedKeywords.length > 0 ? (
                    scanResult.matchedKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1"
                      >
                        ✓ {kw}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-slate-400">No matching keywords found yet.</span>
                  )}
                </div>
              </div>

              {/* Missing Keywords */}
              {scanResult.missingKeywords.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 block mb-1">
                    Missing Keywords to Add ({scanResult.missingKeywords.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {scanResult.missingKeywords.map((kw) => (
                      <button
                        key={kw}
                        onClick={() => onAddSkill(kw)}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 hover:bg-amber-100 flex items-center gap-1 cursor-pointer transition-colors"
                        title="Click to add to your skills list"
                      >
                        <span>+ {kw}</span>
                        <Plus className="w-2.5 h-2.5 opacity-60" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
