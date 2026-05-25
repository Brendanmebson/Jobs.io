import React, { useState } from 'react';
import { Box, Typography, Stack, MenuItem, Select, FormControl, Button } from '@mui/material';
import { BarChart2 } from 'lucide-react';
import { useJobs } from '../../hooks/useJobs';

import OverviewStats from './OverviewStats';
import ActivityChart from '../Dashboard/ActivityChart';
import PipelineOverview from './PipelineOverview';
import InterviewPerformance from './InterviewPerformance';
import StatusDistribution from './StatusDistribution';
import RecentInsights from './RecentInsights';

const Analytics = () => {
  const { jobs } = useJobs();
  const [dateRange, setDateRange] = useState('30');
  
  if (jobs.length === 0) {
    return (
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', mt: 8 }}>
        <Box sx={{ mb: 3, color: 'text.secondary', opacity: 0.5 }}>
          <BarChart2 size={120} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
          No analytics available yet
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, textAlign: 'center', mb: 4 }}>
          Start tracking jobs and applications to see your progress and performance insights.
        </Typography>
        <Button variant="contained" color="primary" size="large" onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'jobs' }))}>
          Go to Jobs
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, flexGrow: 1, maxWidth: 1400, mx: 'auto', width: '100%' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 4, gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
            Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your application progress, interview performance, and job search success.
          </Typography>
        </Box>
        <FormControl sx={{ minWidth: 150 }} size="small">
          <Select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            displayEmpty
            sx={{
              bgcolor: 'white',
              borderRadius: 2,
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' }
            }}
          >
            <MenuItem value="7">Last 7 Days</MenuItem>
            <MenuItem value="30">Last 30 Days</MenuItem>
            <MenuItem value="90">Last 90 Days</MenuItem>
            <MenuItem value="all">All Time</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      
      <OverviewStats jobs={jobs} />
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3, mb: 3 }}>
        <ActivityChart />
        <PipelineOverview jobs={jobs} />
      </Box>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr 1fr' }, gap: 3, mb: 3 }}>
        <InterviewPerformance jobs={jobs} />
        <StatusDistribution jobs={jobs} />
        <RecentInsights jobs={jobs} />
      </Box>
    </Box>
  );
};

export default Analytics;
