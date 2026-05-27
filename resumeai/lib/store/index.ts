import { create } from 'zustand';
import { Resume, User } from '@/lib/types';

interface AuthStore {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));

interface ResumeStore {
  currentResume: Resume | null;
  resumes: Resume[];
  setCurrentResume: (resume: Resume | null) => void;
  setResumes: (resumes: Resume[]) => void;
  updateResume: (resume: Resume) => void;
  addResume: (resume: Resume) => void;
  deleteResume: (id: string) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  currentResume: null,
  resumes: [],
  setCurrentResume: (resume) => set({ currentResume: resume }),
  setResumes: (resumes) => set({ resumes }),
  updateResume: (resume) =>
    set((state) => ({
      resumes: state.resumes.map((r) => (r.id === resume.id ? resume : r)),
      currentResume: state.currentResume?.id === resume.id ? resume : state.currentResume,
    })),
  addResume: (resume) =>
    set((state) => ({
      resumes: [...state.resumes, resume],
    })),
  deleteResume: (id) =>
    set((state) => ({
      resumes: state.resumes.filter((r) => r.id !== id),
    })),
}));

interface UIStore {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
