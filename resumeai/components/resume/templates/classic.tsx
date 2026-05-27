'use client';

import { Resume } from '@/lib/types';

export function ClassicTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 font-serif">
      <div className="text-center mb-8 border-b-2 border-gray-800 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">{resume.personalInfo.fullName}</h1>
        <p className="text-gray-700 mt-1">{resume.personalInfo.jobTitle}</p>
        <div className="flex justify-center gap-4 mt-3 text-xs text-gray-600">
          {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo.phone && <span>•</span>}
          {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo.city && <span>•</span>}
          {resume.personalInfo.city && <span>{resume.personalInfo.city}, {resume.personalInfo.country}</span>}
        </div>
      </div>

      {resume.professionalSummary && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Summary</h2>
          <p className="text-xs text-gray-700 leading-relaxed">{resume.professionalSummary}</p>
        </div>
      )}

      {resume.workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Experience</h2>
          <div className="space-y-3">
            {resume.workExperience.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between">
                  <span className="font-bold">{exp.jobTitle}</span>
                  <span>{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-gray-600">{exp.company}, {exp.location}</div>
                <ul className="list-disc list-inside mt-1 space-y-0.5">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Education</h2>
          <div className="space-y-2">
            {resume.education.map((edu) => (
              <div key={edu.id} className="text-xs">
                <div className="flex justify-between">
                  <span className="font-bold">{edu.degree}</span>
                  <span>{edu.startYear} - {edu.endYear}</span>
                </div>
                <div className="text-gray-600">{edu.institute}, {edu.location}</div>
                {edu.grade && <div className="text-gray-600">GPA: {edu.grade}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {resume.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Skills</h2>
          <p className="text-xs text-gray-700">{resume.skills.join(' • ')}</p>
        </div>
      )}

      {resume.certifications.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Certifications</h2>
          <div className="space-y-1">
            {resume.certifications.map((cert) => (
              <div key={cert.id} className="text-xs text-gray-700">
                {cert.name} • {cert.issuer} ({cert.year})
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
