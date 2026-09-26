import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { ResumeData } from './types';

export async function exportResumeToPDF(data: ResumeData): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = 595.28;
  const pageHeight = 841.89;

  const marginMap = {
    narrow: 32,
    normal: 42,
    wide: 52,
  };
  const margin = marginMap[data.margins || 'normal'];
  const contentWidth = pageWidth - margin * 2;

  // Font mappings
  const isSerif = data.fontFamily === 'garamond';
  const baseFont = isSerif ? 'times' : 'helvetica';

  // Color mapping [R, G, B]
  const colorMap: Record<string, [number, number, number]> = {
    emerald: [5, 150, 105],
    navy: [30, 58, 138],
    blue: [37, 99, 235],
    burgundy: [136, 19, 55],
    slate: [51, 65, 85],
  };
  const primaryRgb: [number, number, number] =
    data.template === 'minimal' ? [15, 23, 42] : colorMap[data.colorTheme || 'emerald'] || [5, 150, 105];

  let y = margin + 10;

  const checkPageBreak = (neededSpace: number = 30) => {
    if (y + neededSpace > pageHeight - margin) {
      doc.addPage();
      y = margin + 10;
    }
  };

  // 1. Header (Photo + Name/Title/Contacts + QR Code)
  let textStartX = margin;
  if (data.contact.includePhoto && data.contact.photoUrl) {
    try {
      doc.addImage(data.contact.photoUrl, 'JPEG', margin, y, 50, 50, undefined, 'FAST');
      textStartX += 60;
    } catch {
      // ignore image parse error
    }
  }

  // QR Code generation
  const targetUrl = data.contact.portfolio || data.contact.website || data.contact.linkedIn;
  if (data.contact.includeQrCode && targetUrl) {
    try {
      const qrDataUrl = await QRCode.toDataURL(targetUrl, {
        width: 100,
        margin: 1,
      });
      doc.addImage(qrDataUrl, 'PNG', pageWidth - margin - 45, y, 45, 45);
      doc.setFont(baseFont, 'normal');
      doc.setFontSize(7);
      doc.setTextColor(148, 163, 184);
      doc.text('PORTFOLIO', pageWidth - margin - 35, y + 53);
    } catch {
      // ignore
    }
  }

  // Name
  doc.setFont(baseFont, 'bold');
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.text(data.contact.fullName.toUpperCase(), textStartX, y + 14);
  y += 28;

  // Title
  doc.setFont(baseFont, 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
  doc.text(data.contact.jobTitle, textStartX, y);
  y += 13;

  // Contact line
  doc.setFont(baseFont, 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  const contactParts = [
    data.contact.email,
    data.contact.phone,
    data.contact.location,
    data.contact.linkedIn ? data.contact.linkedIn.replace(/^https?:\/\//, '') : '',
    data.contact.github ? data.contact.github.replace(/^https?:\/\//, '') : '',
  ].filter(Boolean);
  const contactLine = contactParts.join('  |  ');
  doc.text(contactLine, textStartX, y);
  y += 12;

  if (data.contact.portfolio) {
    doc.setFont(baseFont, 'normal');
    doc.setFontSize(8);
    doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
    doc.text(`Portfolio: ${data.contact.portfolio}`, textStartX, y);
    y += 10;
  }

  // Divider Rule
  y += 4;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  y += 14;

  // Helper for Section Heading
  const drawSectionHeader = (title: string) => {
    checkPageBreak(35);
    doc.setFont(baseFont, 'bold');
    doc.setFontSize(10.5);
    if (data.template === 'minimal') {
      doc.setTextColor(0, 0, 0);
      doc.text(title.toUpperCase(), margin, y);
      y += 3;
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.8);
      doc.line(margin, y, pageWidth - margin, y);
      y += 11;
    } else if (data.template === 'executive') {
      doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
      doc.text(title.toUpperCase(), margin, y);
      y += 3;
      doc.setDrawColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
      doc.setLineWidth(1.5);
      doc.line(margin, y, pageWidth - margin, y);
      y += 12;
    } else {
      doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
      doc.text(title.toUpperCase(), margin, y);
      y += 3;
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.75);
      doc.line(margin, y, pageWidth - margin, y);
      y += 11;
    }
  };

  // Section Renderers
  for (const sectionKey of data.sectionOrder) {
    switch (sectionKey) {
      case 'summary':
        if (!data.summary.trim()) break;
        drawSectionHeader('Professional Summary');
        doc.setFont(baseFont, 'normal');
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
        const splitSummary = doc.splitTextToSize(data.summary, contentWidth);
        checkPageBreak(splitSummary.length * 11);
        doc.text(splitSummary, margin, y);
        y += splitSummary.length * 11 + 9;
        break;

      case 'experience':
        if (data.experiences.length === 0) break;
        drawSectionHeader('Work Experience');
        for (const exp of data.experiences) {
          checkPageBreak(40);
          // Role & Dates
          doc.setFont(baseFont, 'bold');
          doc.setFontSize(9.5);
          doc.setTextColor(15, 23, 42);
          doc.text(exp.role, margin, y);

          const dateStr = `${exp.startDate} – ${exp.isCurrent ? 'Present' : exp.endDate || 'Present'}`;
          doc.setFont(baseFont, 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(100, 116, 139);
          doc.text(dateStr, pageWidth - margin - doc.getTextWidth(dateStr), y);
          y += 11;

          // Company & Location
          doc.setFont(baseFont, 'italic');
          doc.setFontSize(9);
          doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
          const compLine = exp.location ? `${exp.company}  (${exp.location})` : exp.company;
          doc.text(compLine, margin, y);
          y += 10;

          // Bullets
          doc.setFont(baseFont, 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(51, 65, 85);
          for (const b of exp.bullets) {
            const clean = b.replace(/^[•*-]\s*/, '').trim();
            if (!clean) continue;
            const splitBullet = doc.splitTextToSize(clean, contentWidth - 14);
            checkPageBreak(splitBullet.length * 10 + 4);
            doc.text('•', margin + 2, y);
            doc.text(splitBullet, margin + 12, y);
            y += splitBullet.length * 10.5 + 2;
          }
          y += 5;
        }
        break;

      case 'education':
        if (data.educations.length === 0) break;
        drawSectionHeader('Education & Credentials');
        for (const edu of data.educations) {
          checkPageBreak(25);
          doc.setFont(baseFont, 'bold');
          doc.setFontSize(9);
          doc.setTextColor(15, 23, 42);
          const eduTitle = edu.gpa ? `${edu.degree} (GPA: ${edu.gpa})` : edu.degree;
          doc.text(eduTitle, margin, y);

          doc.setFont(baseFont, 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(100, 116, 139);
          doc.text(edu.year, pageWidth - margin - doc.getTextWidth(edu.year), y);
          y += 10;

          doc.setFont(baseFont, 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
          doc.text(edu.institution, margin, y);
          y += 12;
        }
        break;

      case 'skills':
        if (data.skillCategories.length === 0) break;
        drawSectionHeader('Skills & Competencies');
        doc.setFont(baseFont, 'normal');
        doc.setFontSize(8.5);
        for (const cat of data.skillCategories) {
          checkPageBreak(18);
          const skillNames = cat.skills.map((s) => s.name).join(', ');
          const line = `${cat.category}: ${skillNames}`;
          const splitLine = doc.splitTextToSize(line, contentWidth);
          doc.setTextColor(51, 65, 85);
          doc.text(splitLine, margin, y);
          y += splitLine.length * 10.5 + 2;
        }
        y += 5;
        break;

      case 'projects':
        if (data.projects.length === 0) break;
        drawSectionHeader('Key Projects');
        for (const proj of data.projects) {
          checkPageBreak(30);
          doc.setFont(baseFont, 'bold');
          doc.setFontSize(9);
          doc.setTextColor(15, 23, 42);
          const projHeader = proj.techStack ? `${proj.name} [${proj.techStack}]` : proj.name;
          doc.text(projHeader, margin, y);

          if (proj.link) {
            doc.setFont(baseFont, 'normal');
            doc.setFontSize(8);
            doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
            const linkText = proj.link.replace(/^https?:\/\//, '');
            doc.text(linkText, pageWidth - margin - doc.getTextWidth(linkText), y);
          }
          y += 10;

          doc.setFont(baseFont, 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(51, 65, 85);
          if (proj.bullet1) {
            const b1 = doc.splitTextToSize(proj.bullet1, contentWidth - 14);
            doc.text('•', margin + 2, y);
            doc.text(b1, margin + 12, y);
            y += b1.length * 10 + 2;
          }
          if (proj.bullet2) {
            const b2 = doc.splitTextToSize(proj.bullet2, contentWidth - 14);
            doc.text('•', margin + 2, y);
            doc.text(b2, margin + 12, y);
            y += b2.length * 10 + 2;
          }
          y += 4;
        }
        break;

      case 'certifications':
        if (data.certifications.length === 0) break;
        drawSectionHeader('Certifications');
        for (const cert of data.certifications) {
          checkPageBreak(15);
          doc.setFont(baseFont, 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(15, 23, 42);
          doc.text(cert.name, margin, y);

          doc.setFont(baseFont, 'normal');
          doc.setTextColor(100, 116, 139);
          doc.text(cert.date, pageWidth - margin - doc.getTextWidth(cert.date), y);
          y += 9.5;

          doc.setFont(baseFont, 'italic');
          doc.setTextColor(71, 85, 105);
          doc.text(cert.issuer, margin, y);
          y += 11;
        }
        break;

      case 'awards':
        if (data.awards.length === 0) break;
        drawSectionHeader('Honors & Awards');
        for (const a of data.awards) {
          checkPageBreak(15);
          doc.setFont(baseFont, 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(15, 23, 42);
          doc.text(`${a.title} – ${a.issuer}`, margin, y);

          doc.setFont(baseFont, 'normal');
          doc.setTextColor(100, 116, 139);
          doc.text(a.date, pageWidth - margin - doc.getTextWidth(a.date), y);
          y += 9.5;

          if (a.description) {
            doc.setFont(baseFont, 'normal');
            doc.setTextColor(71, 85, 105);
            doc.text(a.description, margin, y);
            y += 10;
          }
        }
        break;

      case 'volunteer':
        if (data.volunteer.length === 0) break;
        drawSectionHeader('Volunteering & Community');
        for (const v of data.volunteer) {
          checkPageBreak(15);
          doc.setFont(baseFont, 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(15, 23, 42);
          doc.text(`${v.role} – ${v.organization}`, margin, y);

          doc.setFont(baseFont, 'normal');
          doc.setTextColor(100, 116, 139);
          doc.text(v.dates, pageWidth - margin - doc.getTextWidth(v.dates), y);
          y += 11;
        }
        break;

      case 'languages':
        if (data.languages.length === 0) break;
        drawSectionHeader('Languages');
        checkPageBreak(15);
        doc.setFont(baseFont, 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(51, 65, 85);
        const langLine = data.languages.map((l) => `${l.language} (${l.proficiency})`).join('  |  ');
        doc.text(langLine, margin, y);
        y += 14;
        break;

      case 'custom':
        if (data.customSections.length === 0) break;
        for (const cs of data.customSections) {
          drawSectionHeader(cs.sectionTitle);
          for (const item of cs.items) {
            checkPageBreak(20);
            doc.setFont(baseFont, 'bold');
            doc.setFontSize(8.5);
            doc.setTextColor(15, 23, 42);
            doc.text(item.title, margin, y);

            if (item.date) {
              doc.setFont(baseFont, 'normal');
              doc.setTextColor(100, 116, 139);
              doc.text(item.date, pageWidth - margin - doc.getTextWidth(item.date), y);
            }
            y += 9.5;

            if (item.subtitle) {
              doc.setFont(baseFont, 'italic');
              doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
              doc.text(item.subtitle, margin, y);
              y += 9.5;
            }

            if (item.description) {
              doc.setFont(baseFont, 'normal');
              doc.setTextColor(51, 65, 85);
              const descLines = doc.splitTextToSize(item.description, contentWidth);
              doc.text(descLines, margin, y);
              y += descLines.length * 9.5 + 2;
            }
            y += 4;
          }
        }
        break;
    }
  }

  const safeName = (data.contact.fullName || 'My').trim().replace(/\s+/g, '_');
  const filename = `${safeName}_Resume.pdf`;
  doc.save(filename);
}
