import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { Job } from '../../types';

interface PipelineOverviewProps {
  jobs: Job[];
}

const STAGES = [
  { id: 'saved', label: 'Saved', color: '#64748b' },
  { id: 'applied', label: 'Applied', color: '#eab308' },
  { id: 'interview', label: 'Interview', color: '#3b82f6' },
  { id: 'offer', label: 'Offer', color: '#10b981' },
];

const PipelineOverview = ({ jobs }: PipelineOverviewProps) => {
  const total = jobs.length;
  const stagesCount = STAGES.map(stage => {
    const count = jobs.filter(job => job.status === stage.id).length;
    return { ...stage, count, percent: total > 0 ? Math.round((count / total) * 100) : 0 };
  });

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
        Pipeline Overview
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flexGrow: 1, justifyContent: 'center' }}>
        {stagesCount.map((stage) => (
          <Box key={stage.id}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{stage.label}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                {stage.count} <Box component="span" sx={{ fontWeight: 'normal' }}>({stage.percent}%)</Box>
              </Typography>
            </Box>
            <Box sx={{ w: '100%', height: 8, bgcolor: 'grey.100', borderRadius: 4, overflow: 'hidden' }}>
              <Box 
                sx={{ 
                  height: '100%', 
                  width: `${stage.percent}%`, 
                  bgcolor: stage.color, 
                  borderRadius: 4,
                  transition: 'width 0.5s ease-in-out'
                }} 
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default PipelineOverview;
