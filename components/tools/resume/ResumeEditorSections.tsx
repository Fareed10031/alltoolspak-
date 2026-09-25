import React, { useRef, useState } from 'react';
import {
  User,
  Sparkles,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  BookOpen,
  HeartHandshake,
  Languages,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Upload,
  Globe,
  Linkedin,
  Github,
  Link as LinkIcon,
  HelpCircle,
  QrCode,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  ResumeData,
  ExperienceItem,
  EducationItem,
  SkillCategory,
  ProjectItem,
  CertificationItem,
  AwardItem,
  VolunteerItem,
  LanguageItem,
  CustomSection,
} from './types';
import { generateAI } from '@/lib/ai';

interface ResumeEditorSectionsProps {
  data: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
}

export function ResumeEditorSections({ data, onChange }: ResumeEditorSectionsProps) {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [isEnhancingSummary, setIsEnhancingSummary] = useState<boolean>(false);
  const [enhancingExpId, setEnhancingExpId] = useState<string | null>(null);

  // Move section in sectionOrder
  const moveSection = (key: string, direction: 'up' | 'down') => {
    const order = [...data.sectionOrder];
    const index = order.indexOf(key);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= order.length) return;
    const temp = order[index];
    order[index] = order[targetIndex];
    order[targetIndex] = temp;
    onChange({ sectionOrder: order });
  };

  // Photo Upload Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onChange({
        contact: {
          ...data.contact,
          photoUrl: result,
          includePhoto: true,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  // AI Enhance Professional Summary
  const handleEnhanceSummary = async () => {
    setIsEnhancingSummary(true);
    try {
      const response = await generateAI({
        prompt: data.summary,
        tool: 'resume-builder',
        context: 'summary',
      });
      if (response && response.text) {
        onChange({ summary: response.text });
      }
    } catch {
      // fallback
    } finally {
      setIsEnhancingSummary(false);
    }
  };

  // AI Optimize Experience Bullets
  const handleOptimizeExperience = async (expId: string) => {
    const target = data.experiences.find((e) => e.id === expId);
    if (!target) return;
    setEnhancingExpId(expId);

    try {
      const combined = target.bullets.join('\n');
      const response = await generateAI({
        prompt: combined,
        tool: 'resume-builder',
      });
      if (response && response.text) {
        const newBullets = response.text
          .split('\n')
          .map((b) => b.replace(/^[•*-]\s*/, '').trim())
          .filter(Boolean);
        const updated = data.experiences.map((e) =>
          e.id === expId ? { ...e, bullets: newBullets } : e
        );
        onChange({ experiences: updated });
      }
    } catch {
      // fallback
    } finally {
      setEnhancingExpId(null);
    }
  };

  // Render Section Header with Up/Down buttons
  const renderSectionHeader = (
    title: string,
    sectionKey: string,
    icon: React.ReactNode,
    actionButton?: React.ReactNode
  ) => {
    const index = data.sectionOrder.indexOf(sectionKey);
    const canUp = index > 0;
    const canDown = index < data.sectionOrder.length - 1;

    return (
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 mb-3">
        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
          {icon}
          <span>{title}</span>
        </h3>
        <div className="flex items-center gap-1">
          {actionButton}
          <div className="flex items-center gap-0.5 ml-2 border-l border-slate-200 dark:border-slate-800 pl-2">
            <button
              disabled={!canUp}
              onClick={() => moveSection(sectionKey, 'up')}
              className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer ${
                !canUp ? 'opacity-30 cursor-not-allowed' : ''
              }`}
              title="Move section up"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              disabled={!canDown}
              onClick={() => moveSection(sectionKey, 'down')}
              className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer ${
                !canDown ? 'opacity-30 cursor-not-allowed' : ''
              }`}
              title="Move section down"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. CONTACT & IDENTITY */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-4 h-4 text-emerald-600" />
            <span>1. Contact &amp; Online Identity</span>
          </h3>

          {/* ATS Compliant Photo Toggle */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={data.contact.includePhoto}
                onChange={(e) =>
                  onChange({
                    contact: { ...data.contact, includePhoto: e.target.checked },
                  })
                }
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <span>Include Photo? (Gulf/EU only &bull; OFF for US ATS)</span>
            </label>
          </div>
        </div>

        {/* Photo Upload & Preview Container */}
        {data.contact.includePhoto && (
          <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              {data.contact.photoUrl ? (
                <img
                  src={data.contact.photoUrl}
                  alt="Preview"
                  className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500 shadow-xs"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-dashed border-slate-400 flex items-center justify-center text-slate-400">
                  <User className="w-6 h-6" />
                </div>
              )}
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 dark:text-white block">
                  Profile Photo (ATS Safe for EU/Middle East)
                </span>
                <span className="text-[11px] text-slate-600 dark:text-slate-400 block">
                  Recommended size: Square 400x400 JPG/PNG. If applying to US/UK, keep unchecked for 100% anti-bias compliance.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={photoInputRef}
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => photoInputRef.current?.click()}
                className="text-xs h-8 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 mr-1" />
                Upload Photo
              </Button>
              {data.contact.photoUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onChange({ contact: { ...data.contact, photoUrl: '', includePhoto: false } })}
                  className="text-xs h-8 text-rose-500 hover:text-rose-600 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Remove
                </Button>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
            <Input
              value={data.contact.fullName}
              onChange={(e) => onChange({ contact: { ...data.contact, fullName: e.target.value } })}
              placeholder="e.g. Fareed Ullah"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Target Role / Title</label>
            <Input
              value={data.contact.jobTitle}
              onChange={(e) => onChange({ contact: { ...data.contact, jobTitle: e.target.value } })}
              placeholder="e.g. Senior Software Engineer"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
            <Input
              type="email"
              value={data.contact.email}
              onChange={(e) => onChange({ contact: { ...data.contact, email: e.target.value } })}
              placeholder="contact@alltoolspak.pk"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
            <Input
              value={data.contact.phone}
              onChange={(e) => onChange({ contact: { ...data.contact, phone: e.target.value } })}
              placeholder="+92 340 4526741"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Location (City, Country)</label>
            <Input
              value={data.contact.location}
              onChange={(e) => onChange({ contact: { ...data.contact, location: e.target.value } })}
              placeholder="Peshawar, Pakistan"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Linkedin className="w-3 h-3 text-blue-600" />
              <span>LinkedIn URL</span>
            </label>
            <Input
              value={data.contact.linkedIn}
              onChange={(e) => onChange({ contact: { ...data.contact, linkedIn: e.target.value } })}
              placeholder="linkedin.com/in/username"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Github className="w-3 h-3 text-slate-800 dark:text-slate-200" />
              <span>GitHub URL</span>
            </label>
            <Input
              value={data.contact.github}
              onChange={(e) => onChange({ contact: { ...data.contact, github: e.target.value } })}
              placeholder="github.com/username"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Globe className="w-3 h-3 text-emerald-600" />
              <span>Portfolio / Personal Website</span>
            </label>
            <Input
              value={data.contact.portfolio}
              onChange={(e) => onChange({ contact: { ...data.contact, portfolio: e.target.value } })}
              placeholder="https://alltoolspak.pk"
            />
          </div>
          <div className="space-y-1 flex flex-col justify-end">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer pb-2">
              <input
                type="checkbox"
                checked={data.contact.includeQrCode}
                onChange={(e) =>
                  onChange({
                    contact: { ...data.contact, includeQrCode: e.target.checked },
                  })
                }
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <span className="flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5 text-emerald-600" />
                <span>Include Portfolio QR in PDF</span>
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* 2. PROFESSIONAL SUMMARY */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
        {renderSectionHeader(
          '2. Professional Summary',
          'summary',
          <Sparkles className="w-4 h-4 text-emerald-600" />,
          <Button
            variant="outline"
            size="sm"
            disabled={isEnhancingSummary || !data.summary.trim()}
            onClick={handleEnhanceSummary}
            className="text-[11px] h-7 gap-1 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-emerald-500" />
            <span>{isEnhancingSummary ? 'Enhancing...' : 'AI Enhance Summary'}</span>
          </Button>
        )}
        <Textarea
          rows={3}
          value={data.summary}
          onChange={(e) => onChange({ summary: e.target.value })}
          placeholder="Concise 40-75 word executive summary showcasing years of experience, core technical achievements, and measurable results..."
          className="text-xs leading-relaxed font-sans"
        />
        <div className="flex justify-between items-center text-[10px] text-slate-400">
          <span>Target length: 40-80 words for optimal ATS scoring</span>
          <span>{data.summary.trim().split(/\s+/).filter(Boolean).length} words</span>
        </div>
      </div>

      {/* 3. WORK EXPERIENCE */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
        {renderSectionHeader(
          '3. Work Experience',
          'experience',
          <Briefcase className="w-4 h-4 text-emerald-600" />,
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onChange({
                experiences: [
                  ...data.experiences,
                  {
                    id: `exp-${Date.now()}`,
                    role: '',
                    company: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    isCurrent: true,
                    bullets: ['Accomplished [X] as measured by [Y], by doing [Z].'],
                  },
                ],
              })
            }
            className="text-xs h-7 gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Position</span>
          </Button>
        )}

        <div className="space-y-4">
          {data.experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Role #{idx + 1}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={enhancingExpId === exp.id || exp.bullets.length === 0}
                    onClick={() => handleOptimizeExperience(exp.id)}
                    className="text-[11px] h-6 px-2 text-emerald-600 border-emerald-500/40 hover:bg-emerald-50 gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-emerald-500" />
                    <span>{enhancingExpId === exp.id ? 'Optimizing...' : 'AI XYZ Rewrite'}</span>
                  </Button>
                  {data.experiences.length > 1 && (
                    <button
                      onClick={() =>
                        onChange({
                          experiences: data.experiences.filter((e) => e.id !== exp.id),
                        })
                      }
                      className="text-slate-400 hover:text-rose-500 cursor-pointer p-1"
                      title="Remove role"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Job Title</label>
                  <Input
                    value={exp.role}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChange({
                        experiences: data.experiences.map((item) =>
                          item.id === exp.id ? { ...item, role: val } : item
                        ),
                      });
                    }}
                    placeholder="e.g. Lead Software Engineer"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Company Name</label>
                  <Input
                    value={exp.company}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChange({
                        experiences: data.experiences.map((item) =>
                          item.id === exp.id ? { ...item, company: val } : item
                        ),
                      });
                    }}
                    placeholder="e.g. Google / Microsoft"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Location</label>
                  <Input
                    value={exp.location}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChange({
                        experiences: data.experiences.map((item) =>
                          item.id === exp.id ? { ...item, location: val } : item
                        ),
                      });
                    }}
                    placeholder="e.g. New York, NY / Remote"
                  />
                </div>
              </div>

              {/* Dates & Present toggle */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="w-36">
                  <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Start Date</label>
                  <Input
                    value={exp.startDate}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChange({
                        experiences: data.experiences.map((item) =>
                          item.id === exp.id ? { ...item, startDate: val } : item
                        ),
                      });
                    }}
                    placeholder="e.g. 2022"
                  />
                </div>
                <div className="w-36">
                  <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">End Date</label>
                  <Input
                    disabled={exp.isCurrent}
                    value={exp.isCurrent ? 'Present' : exp.endDate}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChange({
                        experiences: data.experiences.map((item) =>
                          item.id === exp.id ? { ...item, endDate: val } : item
                        ),
                      });
                    }}
                    placeholder="e.g. 2024"
                  />
                </div>
                <div className="pt-4 flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    id={`cur-${exp.id}`}
                    checked={exp.isCurrent}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      onChange({
                        experiences: data.experiences.map((item) =>
                          item.id === exp.id
                            ? { ...item, isCurrent: checked, endDate: checked ? 'Present' : '' }
                            : item
                        ),
                      });
                    }}
                    className="rounded border-slate-300 text-emerald-600 cursor-pointer"
                  />
                  <label htmlFor={`cur-${exp.id}`} className="text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    I currently work here
                  </label>
                </div>
              </div>

              {/* 5 Bullet Points */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Achievement Bullets ({exp.bullets.length}/5)
                  </label>
                  {exp.bullets.length < 5 && (
                    <button
                      onClick={() => {
                        const updated = data.experiences.map((item) =>
                          item.id === exp.id ? { ...item, bullets: [...item.bullets, ''] } : item
                        );
                        onChange({ experiences: updated });
                      }}
                      className="text-[10px] font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      Add Bullet
                    </button>
                  )}
                </div>

                {exp.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-1.5">
                    <span className="text-xs text-slate-400 mt-2 font-mono">•</span>
                    <Input
                      value={bullet}
                      onChange={(e) => {
                        const val = e.target.value;
                        const newBullets = [...exp.bullets];
                        newBullets[bIdx] = val;
                        onChange({
                          experiences: data.experiences.map((item) =>
                            item.id === exp.id ? { ...item, bullets: newBullets } : item
                          ),
                        });
                      }}
                      placeholder="Spearheaded [initiative], driving [metric % or $] improvement..."
                      className="text-xs"
                    />
                    {exp.bullets.length > 1 && (
                      <button
                        onClick={() => {
                          const newBullets = exp.bullets.filter((_, i) => i !== bIdx);
                          onChange({
                            experiences: data.experiences.map((item) =>
                              item.id === exp.id ? { ...item, bullets: newBullets } : item
                            ),
                          });
                        }}
                        className="text-slate-300 hover:text-rose-500 cursor-pointer p-1.5 mt-0.5"
                        title="Delete bullet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. EDUCATION */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
        {renderSectionHeader(
          '4. Education',
          'education',
          <GraduationCap className="w-4 h-4 text-emerald-600" />,
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onChange({
                educations: [
                  ...data.educations,
                  {
                    id: `edu-${Date.now()}`,
                    degree: '',
                    institution: '',
                    year: '',
                    gpa: '',
                  },
                ],
              })
            }
            className="text-xs h-7 gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Degree</span>
          </Button>
        )}

        <div className="space-y-3">
          {data.educations.map((edu) => (
            <div key={edu.id} className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 items-end">
              <div>
                <label className="text-[10px] font-semibold text-slate-600">Degree / Major</label>
                <Input
                  value={edu.degree}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange({
                      educations: data.educations.map((item) =>
                        item.id === edu.id ? { ...item, degree: val } : item
                      ),
                    });
                  }}
                  placeholder="B.S. in Computer Science"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-slate-600">University / College</label>
                <Input
                  value={edu.institution}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange({
                      educations: data.educations.map((item) =>
                        item.id === edu.id ? { ...item, institution: val } : item
                      ),
                    });
                  }}
                  placeholder="UET Peshawar"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-slate-600">Graduation Year</label>
                <Input
                  value={edu.year}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange({
                      educations: data.educations.map((item) =>
                        item.id === edu.id ? { ...item, year: val } : item
                      ),
                    });
                  }}
                  placeholder="2019 - 2023"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex-1">
                  <label className="text-[10px] font-semibold text-slate-600">GPA (Optional)</label>
                  <Input
                    value={edu.gpa}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChange({
                        educations: data.educations.map((item) =>
                          item.id === edu.id ? { ...item, gpa: val } : item
                        ),
                      });
                    }}
                    placeholder="3.8 / 4.0"
                  />
                </div>
                {data.educations.length > 1 && (
                  <button
                    onClick={() =>
                      onChange({
                        educations: data.educations.filter((item) => item.id !== edu.id),
                      })
                    }
                    className="text-slate-400 hover:text-rose-500 cursor-pointer p-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. SKILLS & COMPETENCIES */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
        {renderSectionHeader(
          '5. Skills & Competencies',
          'skills',
          <Wrench className="w-4 h-4 text-emerald-600" />,
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onChange({
                skillCategories: [
                  ...data.skillCategories,
                  {
                    id: `cat-${Date.now()}`,
                    category: 'New Category',
                    skills: [{ name: 'Skill 1', level: 5 }],
                  },
                ],
              })
            }
            className="text-xs h-7 gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Category</span>
          </Button>
        )}

        <div className="space-y-4">
          {data.skillCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <Input
                  value={cat.category}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange({
                      skillCategories: data.skillCategories.map((item) =>
                        item.id === cat.id ? { ...item, category: val } : item
                      ),
                    });
                  }}
                  className="w-64 font-bold text-xs"
                />
                <button
                  onClick={() =>
                    onChange({
                      skillCategories: data.skillCategories.filter((item) => item.id !== cat.id),
                    })
                  }
                  className="text-slate-400 hover:text-rose-500 cursor-pointer p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Skills badges & proficiency dots */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs shadow-2xs"
                  >
                    <span>{skill.name}</span>
                    {/* Level selector 1-5 */}
                    <div className="flex items-center gap-0.5 ml-1">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => {
                            const newSkills = [...cat.skills];
                            newSkills[sIdx] = { ...skill, level: lvl };
                            onChange({
                              skillCategories: data.skillCategories.map((item) =>
                                item.id === cat.id ? { ...item, skills: newSkills } : item
                              ),
                            });
                          }}
                          className={`w-2 h-2 rounded-full cursor-pointer ${
                            lvl <= skill.level ? 'bg-emerald-600' : 'bg-slate-200 dark:bg-slate-600'
                          }`}
                          title={`Proficiency: ${lvl}/5`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        const newSkills = cat.skills.filter((_, i) => i !== sIdx);
                        onChange({
                          skillCategories: data.skillCategories.map((item) =>
                            item.id === cat.id ? { ...item, skills: newSkills } : item
                          ),
                        });
                      }}
                      className="text-slate-400 hover:text-rose-500 ml-1 cursor-pointer text-xs"
                    >
                      &times;
                    </button>
                  </div>
                ))}

                {/* Quick Add Skill Input */}
                <div className="flex items-center gap-1">
                  <Input
                    placeholder="+ New skill (press enter)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const val = e.currentTarget.value.trim();
                        if (!val) return;
                        e.currentTarget.value = '';
                        onChange({
                          skillCategories: data.skillCategories.map((item) =>
                            item.id === cat.id
                              ? { ...item, skills: [...item.skills, { name: val, level: 5 }] }
                              : item
                          ),
                        });
                      }
                    }}
                    className="text-xs h-7 w-44"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. PROJECTS */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
        {renderSectionHeader(
          '6. Key Projects',
          'projects',
          <FolderGit2 className="w-4 h-4 text-emerald-600" />,
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onChange({
                projects: [
                  ...data.projects,
                  {
                    id: `proj-${Date.now()}`,
                    name: '',
                    link: '',
                    techStack: '',
                    bullet1: '',
                    bullet2: '',
                  },
                ],
              })
            }
            className="text-xs h-7 gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </Button>
        )}

        <div className="space-y-3">
          {data.projects.map((proj) => (
            <div
              key={proj.id}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2.5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Input
                  value={proj.name}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange({
                      projects: data.projects.map((item) =>
                        item.id === proj.id ? { ...item, name: val } : item
                      ),
                    });
                  }}
                  placeholder="Project Name"
                  className="font-bold text-xs"
                />
                <Input
                  value={proj.techStack}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange({
                      projects: data.projects.map((item) =>
                        item.id === proj.id ? { ...item, techStack: val } : item
                      ),
                    });
                  }}
                  placeholder="Tech Stack (e.g. React, Node.js)"
                  className="text-xs"
                />
                <div className="flex items-center gap-1.5">
                  <Input
                    value={proj.link}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChange({
                        projects: data.projects.map((item) =>
                          item.id === proj.id ? { ...item, link: val } : item
                        ),
                      });
                    }}
                    placeholder="URL (e.g. github.com/...)"
                    className="text-xs"
                  />
                  <button
                    onClick={() =>
                      onChange({
                        projects: data.projects.filter((item) => item.id !== proj.id),
                      })
                    }
                    className="text-slate-400 hover:text-rose-500 cursor-pointer p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <Input
                value={proj.bullet1}
                onChange={(e) => {
                  const val = e.target.value;
                  onChange({
                    projects: data.projects.map((item) =>
                      item.id === proj.id ? { ...item, bullet1: val } : item
                    ),
                  });
                }}
                placeholder="Key achievement or metric achieved in this project..."
                className="text-xs"
              />
              <Input
                value={proj.bullet2}
                onChange={(e) => {
                  const val = e.target.value;
                  onChange({
                    projects: data.projects.map((item) =>
                      item.id === proj.id ? { ...item, bullet2: val } : item
                    ),
                  });
                }}
                placeholder="Architectural design or performance optimization highlights..."
                className="text-xs"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 7. CERTIFICATIONS & HONORS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Certifications */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
          {renderSectionHeader(
            '7. Certifications',
            'certifications',
            <BookOpen className="w-4 h-4 text-emerald-600" />,
            <button
              onClick={() =>
                onChange({
                  certifications: [
                    ...data.certifications,
                    { id: `cert-${Date.now()}`, name: '', issuer: '', date: '', link: '' },
                  ],
                })
              }
              className="text-xs text-emerald-600 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> Add
            </button>
          )}
          {data.certifications.map((c) => (
            <div key={c.id} className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <Input
                  value={c.name}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange({
                      certifications: data.certifications.map((i) =>
                        i.id === c.id ? { ...i, name: val } : i
                      ),
                    });
                  }}
                  placeholder="Certification Name"
                  className="text-xs font-semibold"
                />
                <button
                  onClick={() =>
                    onChange({
                      certifications: data.certifications.filter((i) => i.id !== c.id),
                    })
                  }
                  className="text-slate-300 hover:text-rose-500 ml-2"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={c.issuer}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange({
                      certifications: data.certifications.map((i) =>
                        i.id === c.id ? { ...i, issuer: val } : i
                      ),
                    });
                  }}
                  placeholder="Issuer (e.g. AWS / Meta)"
                  className="text-xs"
                />
                <Input
                  value={c.date}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange({
                      certifications: data.certifications.map((i) =>
                        i.id === c.id ? { ...i, date: val } : i
                      ),
                    });
                  }}
                  placeholder="Date (e.g. 2023)"
                  className="text-xs"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Awards */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
          {renderSectionHeader(
            '8. Honors & Awards',
            'awards',
            <Award className="w-4 h-4 text-emerald-600" />,
            <button
              onClick={() =>
                onChange({
                  awards: [
                    ...data.awards,
                    { id: `aw-${Date.now()}`, title: '', issuer: '', date: '', description: '' },
                  ],
                })
              }
              className="text-xs text-emerald-600 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> Add
            </button>
          )}
          {data.awards.map((a) => (
            <div key={a.id} className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <Input
                  value={a.title}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange({
                      awards: data.awards.map((i) => (i.id === a.id ? { ...i, title: val } : i)),
                    });
                  }}
                  placeholder="Award Title"
                  className="text-xs font-semibold"
                />
                <button
                  onClick={() => onChange({ awards: data.awards.filter((i) => i.id !== a.id) })}
                  className="text-slate-300 hover:text-rose-500 ml-2"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={a.issuer}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange({
                      awards: data.awards.map((i) => (i.id === a.id ? { ...i, issuer: val } : i)),
                    });
                  }}
                  placeholder="Issuer / Event"
                  className="text-xs"
                />
                <Input
                  value={a.date}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange({
                      awards: data.awards.map((i) => (i.id === a.id ? { ...i, date: val } : i)),
                    });
                  }}
                  placeholder="Date"
                  className="text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. VOLUNTEERING & LANGUAGES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Volunteer */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
          {renderSectionHeader(
            '9. Volunteering',
            'volunteer',
            <HeartHandshake className="w-4 h-4 text-emerald-600" />,
            <button
              onClick={() =>
                onChange({
                  volunteer: [
                    ...data.volunteer,
                    { id: `vol-${Date.now()}`, role: '', organization: '', dates: '', description: '' },
                  ],
                })
              }
              className="text-xs text-emerald-600 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> Add
            </button>
          )}
          {data.volunteer.map((v) => (
            <div key={v.id} className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <Input
                  value={v.role}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange({
                      volunteer: data.volunteer.map((i) => (i.id === v.id ? { ...i, role: val } : i)),
                    });
                  }}
                  placeholder="Volunteer Role"
                  className="text-xs font-semibold"
                />
                <button
                  onClick={() => onChange({ volunteer: data.volunteer.filter((i) => i.id !== v.id) })}
                  className="text-slate-300 hover:text-rose-500 ml-2"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={v.organization}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange({
                      volunteer: data.volunteer.map((i) =>
                        i.id === v.id ? { ...i, organization: val } : i
                      ),
                    });
                  }}
                  placeholder="Organization"
                  className="text-xs"
                />
                <Input
                  value={v.dates}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange({
                      volunteer: data.volunteer.map((i) => (i.id === v.id ? { ...i, dates: val } : i)),
                    });
                  }}
                  placeholder="Dates"
                  className="text-xs"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
          {renderSectionHeader(
            '10. Languages',
            'languages',
            <Languages className="w-4 h-4 text-emerald-600" />,
            <button
              onClick={() =>
                onChange({
                  languages: [
                    ...data.languages,
                    { id: `lang-${Date.now()}`, language: '', proficiency: 'Fluent' },
                  ],
                })
              }
              className="text-xs text-emerald-600 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> Add
            </button>
          )}
          {data.languages.map((l) => (
            <div key={l.id} className="flex items-center gap-2">
              <Input
                value={l.language}
                onChange={(e) => {
                  const val = e.target.value;
                  onChange({
                    languages: data.languages.map((i) =>
                      i.id === l.id ? { ...i, language: val } : i
                    ),
                  });
                }}
                placeholder="e.g. English, German"
                className="text-xs font-semibold"
              />
              <select
                value={l.proficiency}
                onChange={(e) => {
                  const val = e.target.value;
                  onChange({
                    languages: data.languages.map((i) =>
                      i.id === l.id ? { ...i, proficiency: val } : i
                    ),
                  });
                }}
                className="text-xs py-1.5 px-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                <option value="Native / Bilingual">Native / Bilingual</option>
                <option value="Fluent / Professional">Fluent / Professional</option>
                <option value="Working Proficiency">Working Proficiency</option>
                <option value="Conversational">Conversational</option>
              </select>
              <button
                onClick={() => onChange({ languages: data.languages.filter((i) => i.id !== l.id) })}
                className="text-slate-400 hover:text-rose-500 cursor-pointer p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 11. CUSTOM SECTIONS */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>11. Custom Sections</span>
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onChange({
                customSections: [
                  ...data.customSections,
                  {
                    id: `cs-${Date.now()}`,
                    sectionTitle: 'Publications & Articles',
                    items: [
                      {
                        id: `cs-item-${Date.now()}`,
                        title: 'Published Paper or Key Note',
                        subtitle: 'Publisher / Conference',
                        date: '2024',
                        description: 'Detailed description of the publication or research...',
                      },
                    ],
                  },
                ],
              })
            }
            className="text-xs h-7 gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Section</span>
          </Button>
        </div>

        {data.customSections.map((cs) => (
          <div
            key={cs.id}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3"
          >
            <div className="flex items-center justify-between">
              <Input
                value={cs.sectionTitle}
                onChange={(e) => {
                  const val = e.target.value;
                  onChange({
                    customSections: data.customSections.map((item) =>
                      item.id === cs.id ? { ...item, sectionTitle: val } : item
                    ),
                  });
                }}
                className="w-72 font-bold text-xs"
                placeholder="Section Title (e.g. Publications)"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const updated = data.customSections.map((item) =>
                      item.id === cs.id
                        ? {
                            ...item,
                            items: [
                              ...item.items,
                              {
                                id: `cs-item-${Date.now()}`,
                                title: '',
                                subtitle: '',
                                date: '',
                                description: '',
                              },
                            ],
                          }
                        : item
                    );
                    onChange({ customSections: updated });
                  }}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Add Item
                </button>
                <button
                  onClick={() =>
                    onChange({
                      customSections: data.customSections.filter((item) => item.id !== cs.id),
                    })
                  }
                  className="text-slate-400 hover:text-rose-500 cursor-pointer p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {cs.items.map((item) => (
              <div key={item.id} className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2 bg-white dark:bg-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <Input
                    value={item.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      const updatedItems = cs.items.map((i) =>
                        i.id === item.id ? { ...i, title: val } : i
                      );
                      onChange({
                        customSections: data.customSections.map((s) =>
                          s.id === cs.id ? { ...s, items: updatedItems } : s
                        ),
                      });
                    }}
                    placeholder="Item Title"
                    className="text-xs font-semibold"
                  />
                  <Input
                    value={item.subtitle}
                    onChange={(e) => {
                      const val = e.target.value;
                      const updatedItems = cs.items.map((i) =>
                        i.id === item.id ? { ...i, subtitle: val } : i
                      );
                      onChange({
                        customSections: data.customSections.map((s) =>
                          s.id === cs.id ? { ...s, items: updatedItems } : s
                        ),
                      });
                    }}
                    placeholder="Subtitle / Organization"
                    className="text-xs"
                  />
                  <div className="flex items-center gap-1.5">
                    <Input
                      value={item.date}
                      onChange={(e) => {
                        const val = e.target.value;
                        const updatedItems = cs.items.map((i) =>
                          i.id === item.id ? { ...i, date: val } : i
                        );
                        onChange({
                          customSections: data.customSections.map((s) =>
                            s.id === cs.id ? { ...s, items: updatedItems } : s
                          ),
                        });
                      }}
                      placeholder="Date"
                      className="text-xs"
                    />
                    <button
                      onClick={() => {
                        const updatedItems = cs.items.filter((i) => i.id !== item.id);
                        onChange({
                          customSections: data.customSections.map((s) =>
                            s.id === cs.id ? { ...s, items: updatedItems } : s
                          ),
                        });
                      }}
                      className="text-slate-300 hover:text-rose-500 cursor-pointer p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <Input
                  value={item.description}
                  onChange={(e) => {
                    const val = e.target.value;
                    const updatedItems = cs.items.map((i) =>
                      i.id === item.id ? { ...i, description: val } : i
                    );
                    onChange({
                      customSections: data.customSections.map((s) =>
                        s.id === cs.id ? { ...s, items: updatedItems } : s
                      ),
                    });
                  }}
                  placeholder="Description or notable impact..."
                  className="text-xs"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
