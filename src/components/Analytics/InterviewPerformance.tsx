import React from 'react'; // needed for JSX
import { Paper, Box, Typography, Stack } from '@mui/material';
import { CheckCircle, Award, Calendar } from 'lucide-react';
import { Job } from '../../types';

interface InterviewPerformanceProps {
  jobs: Job[];
}

const InterviewPerformance = ({ jobs }: InterviewPerformanceProps) => {
  const total = jobs.length;
  const interviews = jobs.filter((job) => job.status === 'interview' || job.status === 'offer').length;
  const offers = jobs.filter((job) => job.status === 'offer').length;

  const appToInterview = total > 0 ? Math.round((interviews / total) * 100) : 0;
  const interviewToOffer = interviews > 0 ? Math.round((offers / interviews) * 100) : 0;

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
        Interview Performance
      </Typography>
      
      <Stack spacing={3} sx={{ flexGrow: 1, justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ p: 1.5, bgcolor: '#f0fdf4', color: '#16a34a', borderRadius: 2 }}>
            <CheckCircle size={24} />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Applications to Interviews
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {appToInterview}%
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ p: 1.5, bgcolor: '#faf5ff', color: '#9333ea', borderRadius: 2 }}>
            <Award size={24} />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Interviews to Offers
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {interviewToOffer}%
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ p: 1.5, bgcolor: '#f1f5f9', color: '#0f172a', borderRadius: 2 }}>
            <Calendar size={24} />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Interviews Completed
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {interviews}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};

export default InterviewPerformance;
