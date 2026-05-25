export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  logo?: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  remote: boolean;
  salary?: string;
  description: string;
  requirements: string[];
  status: 'saved' | 'applied' | 'interview' | 'offer' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  appliedDate?: string;
  interviewDate?: string;
  followUpDate?: string;
  category: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type CalendarEventCategory = 'interview' | 'follow-up' | 'deadline' | 'appointment' | 'personal' | 'other';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  category: CalendarEventCategory;
  color?: string;
  notes?: string;
  jobId?: string; // Optional reference to a job
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface JobFilters {
  status?: string;
  type?: string;
  priority?: string;
  category?: string;
  search?: string;
  remote?: boolean;
}