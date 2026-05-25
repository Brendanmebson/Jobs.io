import React from 'react';
import { Paper, Box, Typography, Stack } from '@mui/material';
import { Lightbulb, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Job } from '../../types';

interface RecentInsightsProps {
  jobs: Job[];
}

const RecentInsights = ({ jobs }: RecentInsightsProps) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonthApps = jobs.filter((job) => {
    if (!job.appliedDate && !job.createdAt) return false;
    const date = new Date(job.appliedDate || job.createdAt);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  }).length;

  const interviews = jobs.filter((job) => job.status === 'interview').length;
  const offers = jobs.filter((job) => job.status === 'offer').length;

  const insights = [
    {
      id: 1,
      icon: <TrendingUp size={20} />,
      color: '#3b82f6',
      bgcolor: '#eff6ff',
      text: `You submitted ${thisMonthApps} application${thisMonthApps === 1 ? '' : 's'} this month.`
    },
    {
      id: 2,
      icon: <AlertCircle size={20} />,
      color: '#ca8a04',
      bgcolor: '#fefce8',
      text: `You currently have ${interviews} active application${interviews === 1 ? '' : 's'} in the interview stage.`
    }
  ];

  if (offers > 0) {
    insights.push({
      id: 3,
      icon: <CheckCircle2 size={20} />,
      color: '#16a34a',
      bgcolor: '#f0fdf4',
      text: `Congratulations! You've received ${offers} offer${offers === 1 ? '' : 's'}.`
    });
  } else {
    insights.push({
      id: 3,
      icon: <Lightbulb size={20} />,
      color: '#0f172a',
      bgcolor: '#f1f5f9',
      text: 'Keep applying to improve your chances of getting interviews.'
    });
  }

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
        Recent Insights
      </Typography>
      
      <Stack spacing={2}>
        {insights.map((insight) => (
          <Box key={insight.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ p: 1, color: insight.color, bgcolor: insight.bgcolor, borderRadius: 1.5, display: 'flex' }}>
              {insight.icon}
            </Box>
            <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 500, color: 'text.secondary' }}>
              {insight.text}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default RecentInsights;
