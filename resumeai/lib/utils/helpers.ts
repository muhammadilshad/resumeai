import { Resume } from '@/lib/types';

export const generateResumeId = (): string => {
  return `resume_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const calculateCompleteness = (resume: Resume): number => {
  let completed = 0;
  let total = 0;

  const checks = [
    resume.personalInfo.fullName,
    resume.personalInfo.email,
    resume.personalInfo.phone,
    resume.professionalSummary,
    resume.workExperience.length > 0,
    resume.education.length > 0,
    resume.skills.length > 0,
  ];

  total = checks.length;
  completed = checks.filter(Boolean).length;

  return Math.round((completed / total) * 100);
};

export const formatDate = (date: string): string => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const re = /^[\d\s\-\+\(\)]+$/;
  return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const downloadFile = (content: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
