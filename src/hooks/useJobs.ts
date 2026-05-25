import { useState, useEffect } from 'react';
import { Job, JobFilters } from '../types';

const STORAGE_KEY = 'jobsio_jobs_v5';

const generateSampleJobs = (): Job[] => [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'Google',
    logo: 'https://www.google.com/s2/favicons?domain=google.com&sz=128',
    location: 'Mountain View, CA',
    type: 'full-time',
    remote: true,
    salary: '$180,000 - $240,000',
    description: 'Working on the next generation of Search interfaces...',
    requirements: ['React', 'TypeScript', 'System Design'],
    status: 'interview',
    category: 'Engineering',
    priority: 'high',
    appliedDate: '2026-05-10',
    interviewDate: '2026-05-25',
    notes: 'Focus on performance and accessibility.',
    createdAt: '2026-05-01',
    updatedAt: '2026-05-15',
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Meta',
    logo: 'https://www.google.com/s2/favicons?domain=meta.com&sz=128',
    location: 'Menlo Park, CA',
    type: 'full-time',
    remote: false,
    salary: '$160,000 - $210,000',
    description: 'Designing immersive experiences for the Metaverse...',
    requirements: ['Figma', 'UI/UX', 'Prototyping'],
    status: 'applied',
    category: 'Design',
    priority: 'high',
    appliedDate: '2026-05-12',
    notes: 'Exciting work on VR/AR.',
    createdAt: '2026-05-05',
    updatedAt: '2026-05-12',
  },
  {
    id: '3',
    title: 'Software Development Manager',
    company: 'Amazon',
    logo: 'https://www.google.com/s2/favicons?domain=amazon.com&sz=128',
    location: 'Seattle, WA',
    type: 'full-time',
    remote: false,
    salary: '$200,000 - $280,000',
    description: 'Leading a team within AWS Lambda...',
    requirements: ['Leadership', 'Cloud Infrastructure', 'Distributed Systems'],
    status: 'saved',
    category: 'Management',
    priority: 'medium',
    notes: 'Amazon leadership principles are key.',
    createdAt: '2026-05-15',
    updatedAt: '2026-05-15',
  },
  {
    id: '4',
    title: 'iOS Developer',
    company: 'Apple',
    logo: 'https://www.google.com/s2/favicons?domain=apple.com&sz=128',
    location: 'Cupertino, CA',
    type: 'full-time',
    remote: false,
    salary: '$170,000 - $230,000',
    description: 'Building the future of iOS system apps...',
    requirements: ['Swift', 'SwiftUI', 'Core Graphics'],
    status: 'applied',
    category: 'Engineering',
    priority: 'high',
    appliedDate: '2026-05-18',
    notes: 'Strong focus on detail and design.',
    createdAt: '2026-05-10',
    updatedAt: '2026-05-18',
  },
  {
    id: '5',
    title: 'Azure Cloud Architect',
    company: 'Microsoft',
    logo: 'https://www.google.com/s2/favicons?domain=microsoft.com&sz=128',
    location: 'Redmond, WA',
    type: 'full-time',
    remote: true,
    salary: '$190,000 - $250,000',
    description: 'Designing global-scale cloud solutions...',
    requirements: ['Azure', 'Enterprise Architecture', 'Security'],
    status: 'offer',
    category: 'Engineering',
    priority: 'high',
    appliedDate: '2026-04-25',
    interviewDate: '2026-05-10',
    notes: 'Offer received! Reviewing benefits.',
    createdAt: '2026-04-20',
    updatedAt: '2026-05-20',
  },
  {
    id: '6',
    title: 'Full Stack Engineer',
    company: 'Netflix',
    logo: 'https://www.google.com/s2/favicons?domain=netflix.com&sz=128',
    location: 'Los Gatos, CA',
    type: 'full-time',
    remote: true,
    salary: '$400,000+ (Total Comp)',
    description: 'Building tools for content production globally...',
    requirements: ['Node.js', 'React', 'GraphQL'],
    status: 'saved',
    category: 'Engineering',
    priority: 'high',
    notes: 'High performance culture.',
    createdAt: '2026-05-20',
    updatedAt: '2026-05-20',
  },
  {
    id: '7',
    title: 'Backend Engineer (Fintech)',
    company: 'Stripe',
    logo: 'https://www.google.com/s2/favicons?domain=stripe.com&sz=128',
    location: 'San Francisco, CA',
    type: 'full-time',
    remote: true,
    salary: '$185,000 - $245,000',
    description: 'Scaling payment infrastructure for global commerce...',
    requirements: ['Ruby', 'Go', 'API Design'],
    status: 'interview',
    category: 'Engineering',
    priority: 'high',
    appliedDate: '2026-05-14',
    interviewDate: '2026-05-28',
    notes: 'Known for great engineering practices.',
    createdAt: '2026-05-10',
    updatedAt: '2026-05-14',
  },
  {
    id: '8',
    title: 'Growth Marketing Manager',
    company: 'Airbnb',
    logo: 'https://www.google.com/s2/favicons?domain=airbnb.com&sz=128',
    location: 'Remote',
    type: 'full-time',
    remote: true,
    salary: '$150,000 - $190,000',
    description: 'Driving user acquisition through data-driven campaigns...',
    requirements: ['Growth Hacking', 'SQL', 'A/B Testing'],
    status: 'applied',
    category: 'Marketing',
    priority: 'medium',
    appliedDate: '2026-05-16',
    notes: 'Fully remote position.',
    createdAt: '2026-05-12',
    updatedAt: '2026-05-16',
  },
  {
    id: '9',
    title: 'Systems Engineer',
    company: 'SpaceX',
    logo: 'https://www.google.com/s2/favicons?domain=spacex.com&sz=128',
    location: 'Hawthorne, CA',
    type: 'full-time',
    remote: false,
    salary: '$140,000 - $200,000',
    description: 'Ensuring mission success for Starship launches...',
    requirements: ['C++', 'Linux', 'Real-time Systems'],
    status: 'rejected',
    category: 'Engineering',
    priority: 'medium',
    appliedDate: '2026-04-15',
    notes: 'Very intense interview process.',
    createdAt: '2026-04-01',
    updatedAt: '2026-05-01',
  },
  {
    id: '10',
    title: 'Senior Software Engineer',
    company: 'Tesla',
    logo: 'https://www.google.com/s2/favicons?domain=tesla.com&sz=128',
    location: 'Palo Alto, CA',
    type: 'full-time',
    remote: false,
    salary: '$165,000 - $225,000',
    description: 'Developing Autopilot perception algorithms...',
    requirements: ['Python', 'PyTorch', 'Computer Vision'],
    status: 'applied',
    category: 'Engineering',
    priority: 'high',
    appliedDate: '2026-05-21',
    notes: 'Fast-paced environment.',
    createdAt: '2026-05-15',
    updatedAt: '2026-05-21',
  },
  {
    id: '11',
    title: 'Frontend Developer',
    company: 'Shopify',
    logo: 'https://www.google.com/s2/favicons?domain=shopify.com&sz=128',
    location: 'Remote',
    type: 'full-time',
    remote: true,
    salary: '$130,000 - $170,000',
    description: 'Building world-class e-commerce interfaces...',
    requirements: ['React', 'Liquid', 'CSS'],
    status: 'saved',
    category: 'Engineering',
    priority: 'medium',
    notes: 'Digital-by-default company.',
    createdAt: '2026-05-22',
    updatedAt: '2026-05-22',
  },
  {
    id: '12',
    title: 'Senior Product Manager',
    company: 'Slack',
    logo: 'https://www.google.com/s2/favicons?domain=slack.com&sz=128',
    location: 'San Francisco, CA',
    type: 'full-time',
    remote: true,
    salary: '$175,000 - $235,000',
    description: 'Managing features for enterprise collaboration...',
    requirements: ['Product Strategy', 'Analytics', 'Agile'],
    status: 'interview',
    category: 'Product',
    priority: 'high',
    appliedDate: '2026-05-08',
    interviewDate: '2026-05-26',
    notes: 'Slack is now part of Salesforce.',
    createdAt: '2026-05-01',
    updatedAt: '2026-05-26',
  },
  {
    id: '13',
    title: 'Developer Advocate',
    company: 'Notion',
    logo: 'https://www.google.com/s2/favicons?domain=notion.so&sz=128',
    location: 'New York, NY',
    type: 'full-time',
    remote: true,
    salary: '$155,000 - $205,000',
    description: 'Empowering developers to build on the Notion API...',
    requirements: ['Public Speaking', 'Technical Writing', 'API Integration'],
    status: 'applied',
    category: 'Engineering',
    priority: 'medium',
    appliedDate: '2026-05-19',
    notes: 'Great brand and community.',
    createdAt: '2026-05-15',
    updatedAt: '2026-05-19',
  },
  {
    id: '14',
    title: 'UI Engineer',
    company: 'Figma',
    logo: 'https://www.google.com/s2/favicons?domain=figma.com&sz=128',
    location: 'San Francisco, CA',
    type: 'full-time',
    remote: true,
    salary: '$170,000 - $220,000',
    description: 'Crafting the next generation of design tools...',
    requirements: ['React', 'Wasm', 'Canvas API'],
    status: 'saved',
    category: 'Engineering',
    priority: 'high',
    notes: 'Heavy focus on complex UI interactions.',
    createdAt: '2026-05-23',
    updatedAt: '2026-05-23',
  },
  {
    id: '15',
    title: 'Data Engineer',
    company: 'Uber',
    logo: 'https://www.google.com/s2/favicons?domain=uber.com&sz=128',
    location: 'San Francisco, CA',
    type: 'full-time',
    remote: false,
    salary: '$160,000 - $210,000',
    description: 'Building scalable data pipelines for city-scale logistics...',
    requirements: ['Spark', 'Scala', 'Hadoop'],
    status: 'applied',
    category: 'Data Science',
    priority: 'medium',
    appliedDate: '2026-05-20',
    notes: 'Focus on real-time data processing.',
    createdAt: '2026-05-18',
    updatedAt: '2026-05-20',
  },
];

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = () => {
      const storedJobs = localStorage.getItem(STORAGE_KEY);
      if (storedJobs) {
        setJobs(JSON.parse(storedJobs));
      } else {
        const sampleJobs = generateSampleJobs();
        setJobs(sampleJobs);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleJobs));
      }
      setLoading(false);
    };

    loadJobs();
  }, []);

  const saveJobs = (updatedJobs: Job[]) => {
    setJobs(updatedJobs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJobs));
  };

  const addJob = (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedJobs = [newJob, ...jobs];
    saveJobs(updatedJobs);
    return newJob;
  };

  const updateJob = (id: string, updates: Partial<Job>) => {
    const updatedJobs = jobs.map(job =>
      job.id === id
        ? { ...job, ...updates, updatedAt: new Date().toISOString() }
        : job
    );
    saveJobs(updatedJobs);
  };

  const deleteJob = (id: string) => {
    const updatedJobs = jobs.filter(job => job.id !== id);
    saveJobs(updatedJobs);
  };

  const filterJobs = (filters: JobFilters) => {
    return jobs.filter(job => {
      if (filters.status && job.status !== filters.status) return false;
      if (filters.category && job.category !== filters.category) return false;
      if (filters.type && job.type !== filters.type) return false;
      if (filters.priority && job.priority !== filters.priority) return false;
      if (filters.remote !== undefined && job.remote !== filters.remote) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.location.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  };

  const getJobStats = () => {
    const total = jobs.length;
    const applied = jobs.filter(job => job.status === 'applied').length;
    const interviews = jobs.filter(job => job.status === 'interview').length;
    const offers = jobs.filter(job => job.status === 'offer').length;
    const rejected = jobs.filter(job => job.status === 'rejected').length;

    return { total, applied, interviews, offers, rejected };
  };

  return {
    jobs,
    loading,
    addJob,
    updateJob,
    deleteJob,
    filterJobs,
    getJobStats,
  };
};