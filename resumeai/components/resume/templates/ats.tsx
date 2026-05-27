'use client';

import { Resume } from '@/lib/types';

export function ATSTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 font-sans text-xs">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{resume.personalInfo.fullName}</h1>
        <p className="text-gray-700">{resume.personalInfo.jobTitle}</p>
        <div className="mt-2 space-y-0.5 text-gray-700">
          {resume.personalInfo.email && <div>{resume.personalInfo.email}</div>}
          {resume.personalInfo.phone && <div>{resume.personalInfo.phone}</div>}
          {resume.personalInfo.city && <div>{resume.personalInfo.city}, {resume.personalInfo.country}</div>}
          {resume.personalInfo.linkedin && <div>{resume.personalInfo.linkedin}</div>}
        </div>
      </div>

      {resume.professionalSummary && (
        <div className="mb-4">
          <h2 className="font-bold text-gray-900 mb-1">PROFESSIONAL SUMMARY</h2>
          <p className="text-gray-700">{resume.professionalSummary}</p>
        </div>
      )}

      {resume.workExperience.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-gray-900 mb-2">WORK EXPERIENCE</h2>
          <div className="space-y-3">
            {resume.workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="font-bold text-gray-900">{exp.jobTitle}</div>
                <div className="text-gray-700">{exp.company}, {exp.location}</div>
                <div className="text-gray-600">{exp.startDate} to {exp.currentlyWorking ? 'Present' : exp.endDate}</div>
                <ul className="list-disc list-inside mt-1 space-y-0.5">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-gray-700">{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {resume.education.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-gray-900 mb-2">EDUCATION</h2>
          <div className="space-y-2">
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <div className="font-bold text-gray-900">{edu.degree}</div>
                <div className="text-gray-700">{edu.institute}, {edu.location}</div>
                <div className="text-gray-600">{edu.startYear} - {edu.endYear}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {resume.skills.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-gray-900 mb-1">SKILLS</h2>
          <p className="text-gray-700">{resume.skills.join(', ')}</p>
        </div>
      )}

      {resume.certifications.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-gray-900 mb-1">CERTIFICATIONS</h2>
          <div className="space-y-1">
            {resume.certifications.map((cert) => (
              <div key={cert.id} className="text-gray-700">
                {cert.name}, {cert.issuer}, {cert.year}
              </div>
            ))}
          </div>
        </div>
      )}

      {resume.languages.length > 0 && (
        <div>
          <h2 className="font-bold text-gray-900 mb-1">LANGUAGES</h2>
          <p className="text-gray-700">
            {resume.languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}
