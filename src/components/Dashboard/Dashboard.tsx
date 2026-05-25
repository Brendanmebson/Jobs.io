import React from 'react';
import { Briefcase, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Box, Typography, Stack } from '@mui/material';
import { useJobs } from '../../hooks/useJobs';
import StatsCard from './StatsCard';
import RecentJobs from './RecentJobs';
import ActivityChart from './ActivityChart';
import UpcomingInterviews from './UpcomingInterviews';
import JobGoals from './JobGoals';

const Dashboard = () => {
  const { jobs, getJobStats } = useJobs();
  const stats = getJobStats();

  const recentJobs = jobs
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(5, 10);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, flexGrow: 1 }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! Here's your job search overview.
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          mb: 4
        }}
      >
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 24px)', lg: '1 1 calc(25% - 24px)' } }}>
          <StatsCard
            title="Total Applications"
            value={stats.total}
            icon={Briefcase}
            color="blue"
            trend={{ value: 12, label: 'this month' }}
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 24px)', lg: '1 1 calc(25% - 24px)' } }}>
          <StatsCard
            title="Applied"
            value={stats.applied}
            icon={Clock}
            color="yellow"
            trend={{ value: 8, label: 'this week' }}
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 24px)', lg: '1 1 calc(25% - 24px)' } }}>
          <StatsCard
            title="Interviews"
            value={stats.interviews}
            icon={CheckCircle}
            color="green"
            trend={{ value: 25, label: 'success rate' }}
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 24px)', lg: '1 1 calc(25% - 24px)' } }}>
          <StatsCard
            title="Rejected"
            value={stats.rejected}
            icon={XCircle}
            color="red"
            trend={{ value: -5, label: 'vs last month' }}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3, mb: 3 }}>
        <ActivityChart />
        <JobGoals jobs={jobs} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <UpcomingInterviews jobs={jobs} />
        </Box>
        <Box sx={{ flex: 1, position: 'relative' }}>
          <Box
            sx={{
              position: { lg: 'absolute' },
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              height: { xs: 400, lg: '100%' }
            }}
          >
            <RecentJobs jobs={recentJobs} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;