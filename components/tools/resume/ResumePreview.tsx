import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  ExternalLink,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Sparkles,
  Layers,
  HeartHandshake,
  Languages,
} from 'lucide-react';
import { ResumeData } from './types';

interface ResumePreviewProps {
  data: ResumeData;
  scale?: number;
}

export function ResumePreview({ data, scale = 1 }: ResumePreviewProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  useEffect(() => {
    const targetUrl = data.contact.portfolio || data.contact.website || data.contact.linkedIn;
    if (data.contact.includeQrCode && targetUrl) {
      QRCode.toDataURL(targetUrl, {
        width: 90,
        margin: 1,
        color: { dark: '#0f172a', light: '#ffffff' },
      })
        .then((url) => setQrCodeDataUrl(url))
        .catch(() => setQrCodeDataUrl(''));
    } else {
      setQrCodeDataUrl('');
    }
  }, [data.contact.includeQrCode, data.contact.portfolio, data.contact.website, data.contact.linkedIn]);

  // Color theme mapping
  const colorMap = {
    emerald: {
      primary: '#059669',
      primaryText: 'text-emerald-700 dark:text-emerald-500',
      bgLight: 'bg-emerald-50',
      border: 'border-emerald-600',
      badge: 'bg-emerald-100 text-emerald-800',
      dot: 'bg-emerald-600',
    },
    navy: {
      primary: '#1e3a8a',
      primaryText: 'text-blue-900',
      bgLight: 'bg-blue-50',
      border: 'border-blue-900',
      badge: 'bg-blue-100 text-blue-900',
      dot: 'bg-blue-900',
    },
    blue: {
      primary: '#2563eb',
      primaryText: 'text-blue-600',
      bgLight: 'bg-sky-50',
      border: 'border-blue-600',
      badge: 'bg-blue-100 text-blue-700',
      dot: 'bg-blue-600',
    },
    burgundy: {
      primary: '#881337',
      primaryText: 'text-rose-900',
      bgLight: 'bg-rose-50',
      border: 'border-rose-900',
      badge: 'bg-rose-100 text-rose-900',
      dot: 'bg-rose-900',
    },
    slate: {
      primary: '#334155',
      primaryText: 'text-slate-800',
      bgLight: 'bg-slate-100',
      border: 'border-slate-800',
      badge: 'bg-slate-200 text-slate-800',
      dot: 'bg-slate-700',
    },
  }[data.colorTheme || 'emerald'];

  // Font family mapping
  const fontClass = {
    inter: 'font-sans',
    roboto: 'font-sans tracking-wide',
    garamond: 'font-serif',
  }[data.fontFamily || 'inter'];

  // Line spacing
  const leadingClass = {
    compact: 'leading-snug',
    standard: 'leading-normal',
    relaxed: 'leading-relaxed',
  }[data.lineSpacing || 'standard'];

  // Margin padding
  const paddingClass = {
    narrow: 'p-6 sm:p-8',
    normal: 'p-8 sm:p-12',
    wide: 'p-10 sm:p-16',
  }[data.margins || 'normal'];

  // Render individual sections dynamically according to sectionOrder
  const renderSection = (sectionKey: string) => {
    switch (sectionKey) {
      case 'summary':
        if (!data.summary.trim()) return null;
        return (
          <section key="summary" className="space-y-1.5">
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${
                data.template === 'minimal'
                  ? 'border-b border-black text-black pb-0.5'
                  : data.template === 'executive'
                  ? `border-b-2 ${colorMap.border} ${colorMap.primaryText} pb-1`
                  : `${colorMap.primaryText} border-b border-slate-200 pb-1`
              }`}
            >
              Professional Summary
            </h3>
            <p className={`text-[11px] sm:text-xs text-slate-700 ${leadingClass}`}>
              {data.summary}
            </p>
          </section>
        );

      case 'experience':
        if (data.experiences.length === 0) return null;
        return (
          <section key="experience" className="space-y-3">
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${
                data.template === 'minimal'
                  ? 'border-b border-black text-black pb-0.5'
                  : data.template === 'executive'
                  ? `border-b-2 ${colorMap.border} ${colorMap.primaryText} pb-1`
                  : `${colorMap.primaryText} border-b border-slate-200 pb-1`
              }`}
            >
              Work Experience
            </h3>
            <div className="space-y-3">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-1 text-xs">
                    <span className="font-bold text-slate-900">{exp.role}</span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate || 'Present'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span
                      className={`font-semibold ${
                        data.template === 'minimal' ? 'text-slate-800' : colorMap.primaryText
                      }`}
                    >
                      {exp.company}
                    </span>
                    {exp.location && <span className="text-slate-500">{exp.location}</span>}
                  </div>
                  <ul className="list-disc pl-4 text-[11px] text-slate-700 space-y-1">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} className={leadingClass}>
                        {b.replace(/^[•*-]\s*/, '')}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        );

      case 'education':
        if (data.educations.length === 0) return null;
        return (
          <section key="education" className="space-y-2">
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${
                data.template === 'minimal'
                  ? 'border-b border-black text-black pb-0.5'
                  : data.template === 'executive'
                  ? `border-b-2 ${colorMap.border} ${colorMap.primaryText} pb-1`
                  : `${colorMap.primaryText} border-b border-slate-200 pb-1`
              }`}
            >
              Education &amp; Credentials
            </h3>
            <div className="space-y-2">
              {data.educations.map((edu) => (
                <div key={edu.id} className="flex flex-wrap items-baseline justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{edu.degree}</span>
                    <span className="text-slate-600"> &bull; {edu.institution}</span>
                    {edu.gpa && (
                      <span className="text-[10px] text-slate-500 ml-1.5 font-medium">
                        (GPA: {edu.gpa})
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 font-semibold">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'skills':
        if (data.skillCategories.length === 0) return null;
        return (
          <section key="skills" className="space-y-2">
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${
                data.template === 'minimal'
                  ? 'border-b border-black text-black pb-0.5'
                  : data.template === 'executive'
                  ? `border-b-2 ${colorMap.border} ${colorMap.primaryText} pb-1`
                  : `${colorMap.primaryText} border-b border-slate-200 pb-1`
              }`}
            >
              Skills &amp; Competencies
            </h3>
            <div className="space-y-2">
              {data.skillCategories.map((cat) => (
                <div key={cat.id} className="text-[11px] leading-relaxed">
                  <span className="font-bold text-slate-900">{cat.category}: </span>
                  <span className="text-slate-700">
                    {cat.skills.map((s, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 mr-2.5">
                        <span>{s.name}</span>
                        {/* Dot indicator */}
                        {data.template !== 'minimal' && s.level && (
                          <span className="inline-flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((dot) => (
                              <span
                                key={dot}
                                className={`w-1.5 h-1.5 rounded-full ${
                                  dot <= s.level ? colorMap.dot : 'bg-slate-200'
                                }`}
                              />
                            ))}
                          </span>
                        )}
                        {idx < cat.skills.length - 1 && data.template === 'minimal' ? ',' : ''}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'projects':
        if (data.projects.length === 0) return null;
        return (
          <section key="projects" className="space-y-2.5">
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${
                data.template === 'minimal'
                  ? 'border-b border-black text-black pb-0.5'
                  : data.template === 'executive'
                  ? `border-b-2 ${colorMap.border} ${colorMap.primaryText} pb-1`
                  : `${colorMap.primaryText} border-b border-slate-200 pb-1`
              }`}
            >
              Key Projects
            </h3>
            <div className="space-y-2">
              {data.projects.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex flex-wrap items-baseline justify-between text-xs">
                    <span className="font-bold text-slate-900">
                      {proj.name}
                      {proj.techStack && (
                        <span className="text-[10px] text-slate-500 font-normal ml-2">
                          [{proj.techStack}]
                        </span>
                      )}
                    </span>
                    {proj.link && (
                      <a
                        href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={`text-[10px] font-semibold underline ${
                          data.template === 'minimal' ? 'text-black' : colorMap.primaryText
                        }`}
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  <ul className="list-disc pl-4 text-[11px] text-slate-700 space-y-0.5">
                    {proj.bullet1 && <li className={leadingClass}>{proj.bullet1}</li>}
                    {proj.bullet2 && <li className={leadingClass}>{proj.bullet2}</li>}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        );

      case 'certifications':
        if (data.certifications.length === 0) return null;
        return (
          <section key="certifications" className="space-y-1.5">
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${
                data.template === 'minimal'
                  ? 'border-b border-black text-black pb-0.5'
                  : data.template === 'executive'
                  ? `border-b-2 ${colorMap.border} ${colorMap.primaryText} pb-1`
                  : `${colorMap.primaryText} border-b border-slate-200 pb-1`
              }`}
            >
              Certifications
            </h3>
            <div className="space-y-1 text-[11px]">
              {data.certifications.map((c) => (
                <div key={c.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900">{c.name}</span>
                    <span className="text-slate-600"> – {c.issuer}</span>
                  </div>
                  <span className="text-slate-500 text-[10px] font-semibold">{c.date}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'awards':
        if (data.awards.length === 0) return null;
        return (
          <section key="awards" className="space-y-1.5">
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${
                data.template === 'minimal'
                  ? 'border-b border-black text-black pb-0.5'
                  : data.template === 'executive'
                  ? `border-b-2 ${colorMap.border} ${colorMap.primaryText} pb-1`
                  : `${colorMap.primaryText} border-b border-slate-200 pb-1`
              }`}
            >
              Honors &amp; Awards
            </h3>
            <div className="space-y-1 text-[11px]">
              {data.awards.map((a) => (
                <div key={a.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900">{a.title}</span>
                    <span className="text-slate-600"> ({a.issuer})</span>
                    {a.description && <p className="text-[10px] text-slate-500">{a.description}</p>}
                  </div>
                  <span className="text-slate-500 text-[10px] font-semibold">{a.date}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'volunteer':
        if (data.volunteer.length === 0) return null;
        return (
          <section key="volunteer" className="space-y-1.5">
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${
                data.template === 'minimal'
                  ? 'border-b border-black text-black pb-0.5'
                  : data.template === 'executive'
                  ? `border-b-2 ${colorMap.border} ${colorMap.primaryText} pb-1`
                  : `${colorMap.primaryText} border-b border-slate-200 pb-1`
              }`}
            >
              Volunteering &amp; Community
            </h3>
            <div className="space-y-1 text-[11px]">
              {data.volunteer.map((v) => (
                <div key={v.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900">{v.role}</span>
                    <span className="text-slate-600"> – {v.organization}</span>
                    {v.description && <p className="text-[10px] text-slate-500">{v.description}</p>}
                  </div>
                  <span className="text-slate-500 text-[10px] font-semibold">{v.dates}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'languages':
        if (data.languages.length === 0) return null;
        return (
          <section key="languages" className="space-y-1">
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${
                data.template === 'minimal'
                  ? 'border-b border-black text-black pb-0.5'
                  : data.template === 'executive'
                  ? `border-b-2 ${colorMap.border} ${colorMap.primaryText} pb-1`
                  : `${colorMap.primaryText} border-b border-slate-200 pb-1`
              }`}
            >
              Languages
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
              {data.languages.map((l) => (
                <div key={l.id} className="text-slate-700">
                  <span className="font-bold text-slate-900">{l.language}:</span> {l.proficiency}
                </div>
              ))}
            </div>
          </section>
        );

      case 'custom':
        if (data.customSections.length === 0) return null;
        return (
          <div key="custom" className="space-y-3">
            {data.customSections.map((cs) => (
              <section key={cs.id} className="space-y-1.5">
                <h3
                  className={`text-xs font-bold uppercase tracking-wider ${
                    data.template === 'minimal'
                      ? 'border-b border-black text-black pb-0.5'
                      : data.template === 'executive'
                      ? `border-b-2 ${colorMap.border} ${colorMap.primaryText} pb-1`
                      : `${colorMap.primaryText} border-b border-slate-200 pb-1`
                  }`}
                >
                  {cs.sectionTitle}
                </h3>
                <div className="space-y-1.5 text-[11px]">
                  {cs.items.map((item) => (
                    <div key={item.id} className="space-y-0.5">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-900">{item.title}</span>
                        {item.date && (
                          <span className="text-slate-500 text-[10px] font-semibold">{item.date}</span>
                        )}
                      </div>
                      {item.subtitle && <p className="text-slate-600 italic">{item.subtitle}</p>}
                      {item.description && <p className="text-slate-700">{item.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
      className={`w-full max-w-[800px] min-h-[1050px] bg-white text-slate-900 shadow-2xl rounded-xl border border-slate-200 dark:border-slate-800 ${paddingClass} ${fontClass} leading-relaxed select-text transition-all duration-200`}
    >
      {/* HEADER SECTION */}
      <header className="border-b border-slate-300 pb-4 mb-5">
        <div className="flex items-start justify-between gap-4">
          {/* Optional Photo (Gulf/EU CVs) */}
          {data.contact.includePhoto && data.contact.photoUrl && (
            <div className="shrink-0">
              <img
                src={data.contact.photoUrl}
                alt={data.contact.fullName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-slate-300 shadow-xs"
              />
            </div>
          )}

          <div className="flex-1 space-y-1">
            <h1
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase ${
                data.template === 'executive' ? 'tracking-wider' : ''
              }`}
            >
              {data.contact.fullName}
            </h1>
            <p
              className={`text-xs sm:text-sm font-bold ${
                data.template === 'minimal' ? 'text-slate-800' : colorMap.primaryText
              }`}
            >
              {data.contact.jobTitle}
            </p>

            {/* Contact details line */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600 pt-1">
              {data.contact.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span>{data.contact.email}</span>
                </span>
              )}
              {data.contact.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{data.contact.phone}</span>
                </span>
              )}
              {data.contact.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{data.contact.location}</span>
                </span>
              )}
            </div>

            {/* Social / Portfolio Links */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-500 pt-0.5">
              {data.contact.linkedIn && (
                <a
                  href={`https://${data.contact.linkedIn.replace(/^https?:\/\//, '')}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1 hover:underline text-blue-700"
                >
                  <Linkedin className="w-3 h-3" />
                  <span>{data.contact.linkedIn.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
              {data.contact.github && (
                <a
                  href={`https://${data.contact.github.replace(/^https?:\/\//, '')}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1 hover:underline text-slate-800"
                >
                  <Github className="w-3 h-3" />
                  <span>{data.contact.github.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
              {data.contact.portfolio && (
                <a
                  href={`https://${data.contact.portfolio.replace(/^https?:\/\//, '')}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`flex items-center gap-1 hover:underline font-semibold ${colorMap.primaryText}`}
                >
                  <Globe className="w-3 h-3" />
                  <span>{data.contact.portfolio.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
            </div>
          </div>

          {/* Optional QR Code */}
          {data.contact.includeQrCode && qrCodeDataUrl && (
            <div className="shrink-0 text-center space-y-0.5 hidden sm:block">
              <img
                src={qrCodeDataUrl}
                alt="Portfolio QR"
                className="w-16 h-16 rounded-md border border-slate-200"
              />
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">
                Portfolio
              </span>
            </div>
          )}
        </div>
      </header>

      {/* BODY SECTIONS SORTED BY sectionOrder */}
      <div className="space-y-4">
        {data.sectionOrder.map((sectionKey) => renderSection(sectionKey))}
      </div>
    </div>
  );
}
