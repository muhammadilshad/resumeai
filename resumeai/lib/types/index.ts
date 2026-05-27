export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  plan: 'free' | 'premium';
  createdAt: Date;
  updatedAt: Date;
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  template: TemplateType;
  personalInfo: PersonalInfo;
  professionalSummary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  references: References;
  createdAt: Date;
  updatedAt: Date;
  lastModified: Date;
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  linkedin?: string;
  portfolio?: string;
  photoURL?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  institute: string;
  location: string;
  startYear: string;
  endYear: string;
  grade?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Basic' | 'Intermediate' | 'Advanced' | 'Fluent';
}

export interface References {
  available: boolean;
  contacts?: Array<{
    name: string;
    title: string;
    email: string;
    phone: string;
  }>;
}

export type TemplateType = 'modern' | 'classic' | 'minimal' | 'ats' | 'gulf';

export interface Template {
  id: TemplateType;
  name: string;
  description: string;
  preview: string;
  isPremium: boolean;
}
