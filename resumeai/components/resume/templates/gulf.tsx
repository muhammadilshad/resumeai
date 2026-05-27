'use client';

import { Resume } from '@/lib/types';

export function GulfTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 font-sans">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 mb-8 rounded">
        <h1 className="text-4xl font-bold">{resume.personalInfo.fullName}</h1>
        <p className="text-xl mt-2 text-blue-100">{resume.personalInfo.jobTitle}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo.phone && <span>|</span>}
          {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo.city && <span>|</span>}
          {resume.personalInfo.city && <span>{resume.personalInfo.city}, {resume.personalInfo.country}</span>}
        </div>
      </div>

      {resume.professionalSummary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-2 pb-1 border-b-2 border-blue-600">
            Professional Profile
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">{resume.professionalSummary}</p>
        </div>
      )}

      {resume.workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 pb-1 border-b-2 border-blue-600">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {resume.workExperience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-bold text-gray-900">{exp.jobTitle}</h3>
                <p className="text-blue-600 font-semibold">{exp.company}</p>
                <p className="text-sm text-gray-600">
                  {exp.location} | {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-sm text-gray-700">{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 pb-1 border-b-2 border-blue-600">
            Education
          </h2>
          <div className="space-y-3">
            {resume.education.map((edu) => (
              <div key={edu.id} className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                <p className="text-blue-600 font-semibold">{edu.institute}</p>
                <p className="text-sm text-gray-600">
                  {edu.location} | {edu.startYear} - {edu.endYear}
                </p>
                {edu.grade && <p className="text-sm text-gray-600">Grade: {edu.grade}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {resume.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 pb-1 border-b-2 border-blue-600">
            Core Competencies
          </h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {resume.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 pb-1 border-b-2 border-blue-600">
            Certifications & Awards
          </h2>
          <div className="space-y-2">
            {resume.certifications.map((cert) => (
              <div key={cert.id} className="text-sm text-gray-700">
                <span className="font-semibold">{cert.name}</span> - {cert.issuer} ({cert.year})
              </div>
            ))}
          </div>
        </div>
      )}

      {resume.languages.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-blue-600 mb-3 pb-1 border-b-2 border-blue-600">
            Languages
          </h2>
          <div className="space-y-1">
            {resume.languages.map((lang) => (
              <div key={lang.id} className="flex justify-between text-sm">
                <span className="text-gray-900 font-medium">{lang.name}</span>
                <span className="text-gray-600">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
