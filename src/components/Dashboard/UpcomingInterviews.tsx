import React from 'react';
import { Calendar, Building, MapPin } from 'lucide-react';
import { Box, Paper, Typography, Stack, Avatar, Divider } from '@mui/material';
import { Job } from '../../types';

interface UpcomingInterviewsProps {
  jobs: Job[];
}

const InterviewItem = ({ job }: { job: Job }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Date TBD';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    });
  };

  return (
    <Box sx={{ p: 2, borderRadius: 2, '&:hover': { bgcolor: 'grey.50' }, transition: 'background-color 0.2s' }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Avatar
          src={job.logo}
          variant="rounded"
          sx={{ width: 40, height: 40, bgcolor: 'primary.light' }}
        >
          <Building size={20} />
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {job.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {job.company}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', justifyContent: 'flex-end', color: 'primary.main' }}>
            <Calendar size={14} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {formatDate(job.interviewDate)}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', justifyContent: 'flex-end', mt: 0.5 }}>
            <MapPin size={12} color="#94a3b8" />
            <Typography variant="caption" color="text.secondary">
              {job.location}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

const UpcomingInterviews = ({ jobs }: UpcomingInterviewsProps) => {
  const upcoming = jobs
    .filter(job => job.status === 'interview' && job.interviewDate)
    .sort((a, b) => new Date(a.interviewDate!).getTime() - new Date(b.interviewDate!).getTime())
    .slice(0, 3);

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
        Upcoming Interviews
      </Typography>
      
      {upcoming.length > 0 ? (
        <Stack spacing={1}>
          {upcoming.map((job, index) => (
            <React.Fragment key={job.id}>
              {index > 0 && <Divider sx={{ my: 1 }} />}
              <InterviewItem job={job} />
            </React.Fragment>
          ))}
        </Stack>
      ) : (
        <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
          <Calendar size={40} style={{ opacity: 0.2, marginBottom: 12 }} />
          <Typography variant="body2">No upcoming interviews scheduled</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default UpcomingInterviews;
