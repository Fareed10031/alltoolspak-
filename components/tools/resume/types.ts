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
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    github: '',
    portfolio: '',
    website: '',
    photoUrl: '',
    includePhoto: false,
    includeQrCode: false,
  },
  summary: '',
  experiences: [],
  educations: [],
  skillCategories: [],
  projects: [],
  certifications: [],
  awards: [],
  volunteer: [],
  languages: [],
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

