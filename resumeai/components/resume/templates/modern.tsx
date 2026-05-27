'use client';

import { Resume } from '@/lib/types';

export function ModernTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 font-sans">
      {/* Header */}
      <div className="border-b-2 border-blue-600 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-gray-900">{resume.personalInfo.fullName}</h1>
        <p className="text-xl text-blue-600 font-semibold mt-1">{resume.personalInfo.jobTitle}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
          {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo.city && resume.personalInfo.country && (
            <span>{resume.personalInfo.city}, {resume.personalInfo.country}</span>
          )}
          {resume.personalInfo.linkedin && <span>{resume.personalInfo.linkedin}</span>}
          {resume.personalInfo.portfolio && <span>{resume.personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {resume.professionalSummary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 border-l-4 border-blue-600 pl-3">
            Professional Summary
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">{resume.professionalSummary}</p>
        </div>
      )}

      {/* Work Experience */}
      {resume.workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">
            Work Experience
          </h2>
          <div className="space-y-4">
            {resume.workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.jobTitle}</h3>
                    <p className="text-blue-600 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{exp.location}</p>
                <ul className="list-disc list-inside space-y-1">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-sm text-gray-700">
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">
            Education
          </h2>
          <div className="space-y-3">
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-blue-600 font-semibold">{edu.institute}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{edu.location}</p>
                {edu.grade && <p className="text-sm text-gray-600">Grade: {edu.grade}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">
            Projects
          </h2>
          <div className="space-y-3">
            {resume.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-700">{project.description}</p>
                <p className="text-sm text-gray-600">
                  Technologies: {project.technologies.join(', ')}
                </p>
                {project.link && (
                  <p className="text-sm text-blue-600">{project.link}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resume.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">
            Certifications
          </h2>
          <div className="space-y-2">
            {resume.certifications.map((cert) => (
              <div key={cert.id}>
                <p className="font-semibold text-gray-900">{cert.name}</p>
                <p className="text-sm text-gray-600">
                  {cert.issuer} • {cert.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {resume.languages.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">
            Languages
          </h2>
          <div className="space-y-2">
            {resume.languages.map((lang) => (
              <div key={lang.id} className="flex justify-between">
                <span className="text-gray-900 font-medium">{lang.name}</span>
                <span className="text-gray-600 text-sm">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
