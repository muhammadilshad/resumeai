'use client';

import { Resume } from '@/lib/types';

export function MinimalTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{resume.personalInfo.fullName}</h1>
        <p className="text-gray-600 mt-1">{resume.personalInfo.jobTitle}</p>
        <div className="flex flex-wrap gap-3 mt-4 text-xs text-gray-600">
          {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo.city && <span>{resume.personalInfo.city}, {resume.personalInfo.country}</span>}
        </div>
      </div>

      {resume.professionalSummary && (
        <div className="mb-6">
          <p className="text-sm text-gray-700 leading-relaxed">{resume.professionalSummary}</p>
        </div>
      )}

      {resume.workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 mb-3">EXPERIENCE</h2>
          <div className="space-y-4">
            {resume.workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-900">{exp.jobTitle}</h3>
                  <span className="text-xs text-gray-600">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-xs text-gray-600">{exp.company} • {exp.location}</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-xs text-gray-700">{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 mb-3">EDUCATION</h2>
          <div className="space-y-2">
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <span className="text-xs text-gray-600">{edu.startYear} - {edu.endYear}</span>
                </div>
                <p className="text-xs text-gray-600">{edu.institute} • {edu.location}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {resume.skills.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-2">SKILLS</h2>
          <p className="text-xs text-gray-700">{resume.skills.join(', ')}</p>
        </div>
      )}
    </div>
  );
}
