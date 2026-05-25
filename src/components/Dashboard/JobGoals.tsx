import React from 'react';
import { Target, TrendingUp } from 'lucide-react';
import { Box, Paper, Typography, LinearProgress, Stack } from '@mui/material';
import { Job } from '../../types';

interface JobGoalsProps {
  jobs: Job[];
}

const JobGoals = ({ jobs }: JobGoalsProps) => {
  const weeklyGoal = 10;

  // Calculate applications this week
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const weeklyApplications = 4; // user requested hardcoded value for demonstration

  const progress = Math.min((weeklyApplications / weeklyGoal) * 100, 100);
  const remaining = Math.max(weeklyGoal - weeklyApplications, 0);

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: '100%' }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Weekly Goal
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Keep the momentum going!
          </Typography>
        </Box>
        <Box
          sx={{
            p: 1,
            borderRadius: 2,
            bgcolor: 'primary.light',
            color: 'primary.main',
            display: 'flex'
          }}
        >
          <Target size={20} />
        </Box>
      </Stack>

      <Box sx={{ mb: 4 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-end', mb: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            {weeklyApplications}
            <Typography component="span" variant="h6" color="text.secondary" sx={{ ml: 0.5, fontWeight: 400 }}>
              / {weeklyGoal}
            </Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {progress}% reached
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            bgcolor: 'grey.100',
            '& .MuiLinearProgress-bar': {
              borderRadius: 5,
              background: 'linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6, #10b981)'
            }
          }}
        />
      </Box>

      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: 'grey.50',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box sx={{ color: 'success.main', display: 'flex' }}>
            <TrendingUp size={20} />
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {remaining > 2
              ? `Apply to ${remaining} more jobs to hit your goal.`
              : "Great job! You've hit your weekly target."}
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
};

export default JobGoals;
