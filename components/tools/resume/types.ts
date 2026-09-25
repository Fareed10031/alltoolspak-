export type TemplateType = 'modern' | 'minimal' | 'executive';
export type ColorTheme = 'emerald' | 'navy' | 'blue' | 'burgundy' | 'slate';
export type FontFamily = 'inter' | 'roboto' | 'garamond';
export type SpacingType = 'compact' | 'standard' | 'relaxed';
export type MarginType = 'narrow' | 'normal' | 'wide';

export interface ContactInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  github: string;
  portfolio: string;
  website: string;
  photoUrl: string;
  includePhoto: boolean;
  includeQrCode: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
  gpa: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: { name: string; level: number }[];
}

export interface ProjectItem {
  id: string;
  name: string;
  link: string;
  techStack: string;
  bullet1: string;
  bullet2: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface VolunteerItem {
  id: string;
  role: string;
  organization: string;
  dates: string;
  description: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface CustomSection {
  id: string;
  sectionTitle: string;
  items: CustomSectionItem[];
}

export interface ResumeData {
  contact: ContactInfo;
  summary: string;
  experiences: ExperienceItem[];
  educations: EducationItem[];
  skillCategories: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  awards: AwardItem[];
  volunteer: VolunteerItem[];
  languages: LanguageItem[];
  customSections: CustomSection[];
  sectionOrder: string[];
  template: TemplateType;
  colorTheme: ColorTheme;
  fontFamily: FontFamily;
  lineSpacing: SpacingType;
  margins: MarginType;
}

export const INITIAL_RESUME_DATA: ResumeData = {
  contact: {
    fullName: 'Fareed Ullah',
    jobTitle: 'Senior Software Engineer & Full-Stack Architect',
    email: 'contact@alltoolspak.pk',
    phone: '+92 340 4526741',
    location: 'Peshawar, Pakistan',
    linkedIn: 'linkedin.com/in/fareed-ullah-dev',
    github: 'github.com/fareed-ullah-dev',
    portfolio: 'https://alltoolspak.pk',
    website: 'https://alltoolspak.pk',
    photoUrl: '',
    includePhoto: false,
    includeQrCode: true,
  },
  summary:
    'Results-driven Software Engineer with 4+ years of expertise architecting high-performance client-side web utilities, distributed backend services, and scalable cloud systems. Proven track record optimizing web delivery velocity by 40%, cutting infrastructure overhead, and delivering reliable tools to 100,000+ monthly active users.',
  experiences: [
    {
      id: 'exp-1',
      role: 'Lead Application Architect',
      company: 'AllToolsPak Systems',
      location: 'Peshawar, Pakistan',
      startDate: '2023',
      endDate: 'Present',
      isCurrent: true,
      bullets: [
        'Architected 8-in-1 browser-based utility suite utilizing WebAssembly and HTML5 Canvas, serving 100,000+ monthly active users with zero server bandwidth costs.',
        'Engineered ATS Resume Builder with client-side vector PDF compilation and real-time linguistic score algorithms, boosting user interview conversion rates by 34%.',
        'Spearheaded performance optimization of client-side image compression and PDF manipulation, reducing mobile memory consumption by 42%.',
      ],
    },
    {
      id: 'exp-2',
      role: 'Full-Stack Developer',
      company: 'Apex Cloud Solutions',
      location: 'Remote',
      startDate: '2021',
      endDate: '2023',
      isCurrent: false,
      bullets: [
        'Developed RESTful microservices on Node.js and TypeScript, handling 500K+ monthly API calls with 99.95% uptime SLA.',
        'Automated cross-border VAT reconciliation engines for European e-commerce clients, processing over €750K in quarterly sales volume.',
        'Streamlined CI/CD deployment pipelines on Docker and GitHub Actions, cutting release deployment cycle time from 45 minutes to 7 minutes.',
      ],
    },
  ],
  educations: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science',
      institution: 'University of Engineering & Technology, Peshawar',
      year: '2019 - 2023',
      gpa: '3.8 / 4.0',
    },
  ],
  skillCategories: [
    {
      id: 'cat-tech',
      category: 'Technical Skills & Frameworks',
      skills: [
        { name: 'TypeScript', level: 5 },
        { name: 'React 19 & Next.js', level: 5 },
        { name: 'Node.js & Express', level: 5 },
        { name: 'Tailwind CSS', level: 5 },
        { name: 'WebAssembly (Wasm)', level: 4 },
        { name: 'PostgreSQL & SQL', level: 4 },
        { name: 'Docker & Git', level: 5 },
        { name: 'REST & GraphQL APIs', level: 5 },
      ],
    },
    {
      id: 'cat-soft',
      category: 'Professional & Methodological',
      skills: [
        { name: 'System Architecture', level: 5 },
        { name: 'Agile & Scrum', level: 5 },
        { name: 'Code Review & Mentorship', level: 4 },
        { name: 'Technical Documentation', level: 5 },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'AllToolsPak Client-Side Suite',
      link: 'https://alltoolspak.pk',
      techStack: 'TypeScript, React 19, Tailwind CSS, jsPDF, WebAssembly',
      bullet1:
        'Engineered high-performance utility platform processing documents in client RAM without server storage under GDPR Article 17.',
      bullet2:
        'Achieved 100/100 Google Lighthouse Core Web Vitals score through code splitting and tree shaking.',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Full-Stack Web Architecture Certification',
      issuer: 'Meta & Coursera',
      date: '2023',
      link: 'https://coursera.org/verify',
    },
  ],
  awards: [
    {
      id: 'aw-1',
      title: 'Top Innovation Award – National Software Olympiad',
      issuer: 'Tech Pakistan Forum',
      date: '2023',
      description: 'Recognized for building accessible privacy-first browser computing tools.',
    },
  ],
  volunteer: [
    {
      id: 'vol-1',
      role: 'Coding Mentor',
      organization: 'Code For Pakistan Community',
      dates: '2022 - Present',
      description: 'Mentored 35+ aspiring developers in foundational TypeScript and modern React workflows.',
    },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Professional Working / Fluent' },
    { id: 'lang-2', language: 'Urdu', proficiency: 'Native / Bilingual' },
    { id: 'lang-3', language: 'Pashto', proficiency: 'Native' },
  ],
  customSections: [],
  sectionOrder: [
    'summary',
    'experience',
    'education',
    'skills',
    'projects',
    'certifications',
    'awards',
    'volunteer',
    'languages',
    'custom',
  ],
  template: 'modern',
  colorTheme: 'emerald',
  fontFamily: 'inter',
  lineSpacing: 'standard',
  margins: 'normal',
};
