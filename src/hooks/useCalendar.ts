import { useState, useEffect, useMemo } from 'react';
import { CalendarEvent } from '../types';
import { useJobs } from './useJobs';

const STORAGE_KEY = 'jobsio_calendar_events_v1';

export const useCalendar = () => {
  const { jobs } = useJobs();
  const [manualEvents, setManualEvents] = useState<CalendarEvent[]>([]);

  // Load manual events from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setManualEvents(JSON.parse(stored));
    }
  }, []);

  // Save manual events to localStorage
  const saveEvents = (events: CalendarEvent[]) => {
    setManualEvents(events);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  };

  // Generate virtual events from jobs
  const jobEvents = useMemo(() => {
    const events: CalendarEvent[] = [];
    jobs.forEach(job => {
      // 1. Interview Event
      if (job.interviewDate) {
        events.push({
          id: `job-interview-${job.id}`,
          title: `Interview: ${job.company}`,
          description: `${job.title} interview at ${job.company}`,
          startDate: job.interviewDate,
          endDate: job.interviewDate, // Simplified to same day for now
          category: 'interview',
          jobId: job.id,
          createdAt: job.createdAt,
          updatedAt: job.updatedAt,
        });
      }
      
      // 2. Applied Event
      if (job.appliedDate) {
        events.push({
          id: `job-applied-${job.id}`,
          title: `Applied: ${job.company}`,
          description: `Submitted application for ${job.title}`,
          startDate: job.appliedDate,
          endDate: job.appliedDate,
          category: 'deadline', // Using deadline color for applied
          jobId: job.id,
          createdAt: job.createdAt,
          updatedAt: job.updatedAt,
        });
      }

      // 3. Follow-up Event
      if (job.followUpDate) {
        events.push({
          id: `job-followup-${job.id}`,
          title: `Follow-up: ${job.company}`,
          description: `Follow up on ${job.title} application`,
          startDate: job.followUpDate,
          endDate: job.followUpDate,
          category: 'follow-up',
          jobId: job.id,
          createdAt: job.createdAt,
          updatedAt: job.updatedAt,
        });
      }
    });
    return events;
  }, [jobs]);

  // Combine all events
  const allEvents = useMemo(() => [...manualEvents, ...jobEvents], [manualEvents, jobEvents]);

  const addEvent = (eventData: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: `manual-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveEvents([...manualEvents, newEvent]);
    return newEvent;
  };

  const updateEvent = (id: string, updates: Partial<CalendarEvent>) => {
    if (id.startsWith('job-')) return; // Cannot edit job-derived events directly
    const updated = manualEvents.map(event => 
      event.id === id 
        ? { ...event, ...updates, updatedAt: new Date().toISOString() } 
        : event
    );
    saveEvents(updated);
  };

  const deleteEvent = (id: string) => {
    if (id.startsWith('job-')) return;
    const updated = manualEvents.filter(event => event.id !== id);
    saveEvents(updated);
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return allEvents.filter(event => event.startDate.startsWith(dateStr));
  };

  return {
    events: allEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
  };
};
