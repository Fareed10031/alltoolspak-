'use client';

import React from 'react';
import jsPDF from 'jspdf';
import { ProToolBase } from '@/components/ProToolBase';
import { TOOLS } from '@/lib/config';

export function ResumeBuilderSimpleTool() {
  const tool = TOOLS.find((t) => t.slug === 'resume-builder') || {
    slug: 'resume-builder',
    name: 'Resume Builder',
    desc: 'Build professional resume and download as real PDF with your name.',
    tag: 'Builder',
    colorIndex: 6,
  };

  const generateResumePdf = (form: Record<string, any>) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const fullName = form.fullName || 'Professional Resume';
    const email = form.email || '';
    const phone = form.phone || '';
    const location = form.location || '';
    const jobTitle = form.jobTitle || 'Target Position';
    const summary = form.summary || '';
    const skills = form.skills || '';
    const experience = form.experience || '';
    const education = form.education || '';

    let y = 50;

    // Header: Name & Target Title
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text(fullName.toUpperCase(), 40, y);
    y += 20;

    doc.setFontSize(12);
    doc.setTextColor(37, 99, 235);
    doc.text(jobTitle, 40, y);
    y += 16;

    // Contact info line
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    const contactParts = [email, phone, location].filter(Boolean);
    doc.text(contactParts.join('  •  '), 40, y);
    y += 15;

    // Divider
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(1);
    doc.line(40, y, 555, y);
    y += 24;

    // Helper for section headings
    const renderSectionHeader = (title: string) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(30, 41, 59);
      doc.text(title.toUpperCase(), 40, y);
      y += 6;
      doc.setDrawColor(37, 99, 235);
      doc.setLineWidth(1.5);
      doc.line(40, y, 555, y);
      y += 16;
    };

    // Professional Summary
    if (summary) {
      renderSectionHeader('Professional Summary');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      const splitSummary = doc.splitTextToSize(summary, 515);
      doc.text(splitSummary, 40, y);
      y += splitSummary.length * 13 + 15;
    }

    // Key Skills
    if (skills) {
      renderSectionHeader('Core Competencies & Technical Skills');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      const splitSkills = doc.splitTextToSize(skills, 515);
      doc.text(splitSkills, 40, y);
      y += splitSkills.length * 13 + 15;
    }

    // Work Experience
    if (experience) {
      renderSectionHeader('Professional Experience');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      const splitExp = doc.splitTextToSize(experience, 515);
      doc.text(splitExp, 40, y);
      y += splitExp.length * 13 + 15;
    }

    // Education & Credentials
    if (education) {
      renderSectionHeader('Education & Certifications');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      const splitEdu = doc.splitTextToSize(education, 515);
      doc.text(splitEdu, 40, y);
      y += splitEdu.length * 13 + 15;
    }

    const safeName = fullName.trim().replace(/\s+/g, '_') || 'My';
    doc.save(`${safeName}_Resume.pdf`);
  };

  return (
    <ProToolBase
      tool={tool}
      required={['fullName', 'email', 'jobTitle']}
      initialState={{
        fullName: '',
        email: '',
        phone: '',
        location: '',
        jobTitle: '',
        summary: '',
        skills: '',
        experience: '',
        education: '',
      }}
      render={(form, setForm) => (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Alex Morgan"
                value={form.fullName || ''}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Target Job Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Software Engineer"
                value={form.jobTitle || ''}
                onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="e.g. alex.morgan@example.com"
                value={form.email || ''}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Phone &amp; Location
              </label>
              <input
                type="text"
                placeholder="e.g. +1 (555) 019-2834 • New York, NY"
                value={form.phone || ''}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Professional Summary
            </label>
            <textarea
              rows={3}
              placeholder="Results-driven professional with 5+ years of experience in scalable systems, leadership, and cross-functional project execution."
              value={form.summary || ''}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Core Skills &amp; Keywords
            </label>
            <input
              type="text"
              placeholder="e.g. TypeScript, React, Python, Cloud Architecture, Agile, Project Leadership"
              value={form.skills || ''}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Professional Experience
            </label>
            <textarea
              rows={4}
              placeholder="Lead Engineer at TechCorp (2022 - Present)&#10;• Spearheaded migration of core microservices, improving throughput by 42%.&#10;• Mentored team of 8 engineers and introduced automated CI/CD pipeline."
              value={form.experience || ''}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Education &amp; Certifications
            </label>
            <input
              type="text"
              placeholder="e.g. B.S. in Computer Science, University of Technology (2021) • AWS Solutions Architect"
              value={form.education || ''}
              onChange={(e) => setForm({ ...form, education: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
        </div>
      )}
      generateFile={generateResumePdf}
    />
  );
}

export default ResumeBuilderSimpleTool;
