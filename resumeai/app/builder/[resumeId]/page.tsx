'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useAuthStore, useResumeStore } from '@/lib/store';
import { Resume, PersonalInfo, WorkExperience, Education } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Loader, Sparkles } from 'lucide-react';
import { generateResumeId } from '@/lib/utils/helpers';

export default function ResumeBuilder({ params }: { params: { resumeId: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuthStore();
  const { currentResume, setCurrentResume, updateResume } = useResumeStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user && params.resumeId) {
      loadResume();
    }
  }, [user, authLoading, params.resumeId, router]);

  const loadResume = async () => {
    try {
      if (params.resumeId === 'new') {
        const newResume: Resume = {
          id: generateResumeId(),
          userId: user!.id,
          title: 'My Resume',
          template: 'modern',
          personalInfo: {
            fullName: '',
            jobTitle: '',
            email: '',
            phone: '',
            city: '',
            country: '',
          },
          professionalSummary: '',
          workExperience: [],
          education: [],
          skills: [],
          projects: [],
          certifications: [],
          languages: [],
          references: { available: false },
          createdAt: new Date(),
          updatedAt: new Date(),
          lastModified: new Date(),
        };
        setCurrentResume(newResume);
      } else {
        const docSnap = await getDoc(doc(db, 'resumes', params.resumeId));
        if (docSnap.exists()) {
          const data = docSnap.data() as Resume;
          setCurrentResume(data);
        }
      }
    } catch (error) {
      console.error('Error loading resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!currentResume) return;

    setSaving(true);
    try {
      const resumeData = {
        ...currentResume,
        updatedAt: new Date(),
        lastModified: new Date(),
      };

      if (currentResume.id.startsWith('resume_')) {
        await setDoc(doc(db, 'resumes', currentResume.id), resumeData);
      } else {
        await updateDoc(doc(db, 'resumes', currentResume.id), resumeData);
      }

      updateResume(resumeData);
    } catch (error) {
      console.error('Error saving resume:', error);
    } finally {
      setSaving(false);
    }
  };

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    if (!currentResume) return;
    setCurrentResume({
      ...currentResume,
      personalInfo: {
        ...currentResume.personalInfo,
        [field]: value,
      },
    });
  };

  const addWorkExperience = () => {
    if (!currentResume) return;
    const newExperience: WorkExperience = {
      id: generateResumeId(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      responsibilities: [],
    };
    setCurrentResume({
      ...currentResume,
      workExperience: [...currentResume.workExperience, newExperience],
    });
  };

  const updateWorkExperience = (id: string, field: string, value: any) => {
    if (!currentResume) return;
    setCurrentResume({
      ...currentResume,
      workExperience: currentResume.workExperience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeWorkExperience = (id: string) => {
    if (!currentResume) return;
    setCurrentResume({
      ...currentResume,
      workExperience: currentResume.workExperience.filter((exp) => exp.id !== id),
    });
  };

  const addEducation = () => {
    if (!currentResume) return;
    const newEducation: Education = {
      id: generateResumeId(),
      degree: '',
      institute: '',
      location: '',
      startYear: '',
      endYear: '',
    };
    setCurrentResume({
      ...currentResume,
      education: [...currentResume.education, newEducation],
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    if (!currentResume) return;
    setCurrentResume({
      ...currentResume,
      education: currentResume.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    if (!currentResume) return;
    setCurrentResume({
      ...currentResume,
      education: currentResume.education.filter((edu) => edu.id !== id),
    });
  };

  const addSkill = () => {
    if (!currentResume) return;
    setCurrentResume({
      ...currentResume,
      skills: [...currentResume.skills, ''],
    });
  };

  const updateSkill = (index: number, value: string) => {
    if (!currentResume) return;
    const newSkills = [...currentResume.skills];
    newSkills[index] = value;
    setCurrentResume({
      ...currentResume,
      skills: newSkills,
    });
  };

  const removeSkill = (index: number) => {
    if (!currentResume) return;
    setCurrentResume({
      ...currentResume,
      skills: currentResume.skills.filter((_, i) => i !== index),
    });
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!currentResume) {
    return <div>Resume not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
            <p className="mt-2 text-gray-600">Fill in your information step by step</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => router.push('/dashboard')}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your basic contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <Input
                      value={currentResume.personalInfo.fullName}
                      onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <Input
                      value={currentResume.personalInfo.jobTitle}
                      onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input
                      type="email"
                      value={currentResume.personalInfo.email}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <Input
                      value={currentResume.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      placeholder="+92 300 1234567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <Input
                      value={currentResume.personalInfo.city}
                      onChange={(e) => updatePersonalInfo('city', e.target.value)}
                      placeholder="Karachi"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <Input
                      value={currentResume.personalInfo.country}
                      onChange={(e) => updatePersonalInfo('country', e.target.value)}
                      placeholder="Pakistan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                    <Input
                      value={currentResume.personalInfo.linkedin || ''}
                      onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                      placeholder="linkedin.com/in/johndoe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
                    <Input
                      value={currentResume.personalInfo.portfolio || ''}
                      onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                      placeholder="johndoe.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Summary Tab */}
          <TabsContent value="summary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Professional Summary</CardTitle>
                <CardDescription>Brief overview of your professional background</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={currentResume.professionalSummary}
                  onChange={(e) =>
                    setCurrentResume({
                      ...currentResume,
                      professionalSummary: e.target.value,
                    })
                  }
                  placeholder="Write a brief summary of your professional experience and goals..."
                  rows={6}
                />
                <Button variant="outline" className="w-full">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Improve with AI
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Work Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>Your professional work history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentResume.workExperience.map((exp, idx) => (
                  <div key={exp.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">Position {idx + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeWorkExperience(exp.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        placeholder="Job Title"
                        value={exp.jobTitle}
                        onChange={(e) => updateWorkExperience(exp.id, 'jobTitle', e.target.value)}
                      />
                      <Input
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                      />
                      <Input
                        placeholder="Location"
                        value={exp.location}
                        onChange={(e) => updateWorkExperience(exp.id, 'location', e.target.value)}
                      />
                      <Input
                        type="date"
                        value={exp.startDate}
                        onChange={(e) => updateWorkExperience(exp.id, 'startDate', e.target.value)}
                      />
                      <Input
                        type="date"
                        value={exp.endDate}
                        onChange={(e) => updateWorkExperience(exp.id, 'endDate', e.target.value)}
                        disabled={exp.currentlyWorking}
                      />
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={exp.currentlyWorking}
                          onChange={(e) =>
                            updateWorkExperience(exp.id, 'currentlyWorking', e.target.checked)
                          }
                        />
                        <span className="text-sm text-gray-700">Currently working here</span>
                      </label>
                    </div>
                    <Textarea
                      placeholder="Responsibilities and achievements (one per line)"
                      value={exp.responsibilities.join('\n')}
                      onChange={(e) =>
                        updateWorkExperience(
                          exp.id,
                          'responsibilities',
                          e.target.value.split('\n').filter(Boolean)
                        )
                      }
                      rows={4}
                      className="mt-4"
                    />
                  </div>
                ))}
                <Button onClick={addWorkExperience} variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Experience
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>Your educational background</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentResume.education.map((edu, idx) => (
                  <div key={edu.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">Education {idx + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducation(edu.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      />
                      <Input
                        placeholder="Institute"
                        value={edu.institute}
                        onChange={(e) => updateEducation(edu.id, 'institute', e.target.value)}
                      />
                      <Input
                        placeholder="Location"
                        value={edu.location}
                        onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                      />
                      <Input
                        placeholder="Grade/CGPA"
                        value={edu.grade || ''}
                        onChange={(e) => updateEducation(edu.id, 'grade', e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="Start Year"
                        value={edu.startYear}
                        onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="End Year"
                        value={edu.endYear}
                        onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                <Button onClick={addEducation} variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Education
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Your professional skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentResume.skills.map((skill, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      value={skill}
                      onChange={(e) => updateSkill(idx, e.target.value)}
                      placeholder="e.g., React, TypeScript, Node.js"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(idx)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                ))}
                <Button onClick={addSkill} variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Skill
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex gap-4">
          <Button variant="outline" onClick={() => router.push('/dashboard')}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving} size="lg">
            {saving ? 'Saving...' : 'Save & Continue'}
          </Button>
          <Button
            onClick={() => router.push(`/preview/${currentResume.id}`)}
            variant="outline"
            size="lg"
          >
            Preview
          </Button>
        </div>
      </div>
    </div>
  );
}
