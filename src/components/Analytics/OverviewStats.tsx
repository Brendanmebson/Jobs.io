import React from 'react';
import { Box } from '@mui/material';
import { Briefcase, CheckCircle, XCircle, Award, Target, Activity } from 'lucide-react';
import StatsCard from '../Dashboard/StatsCard';
import { Job } from '../../types';

interface OverviewStatsProps {
  jobs: Job[];
}

const OverviewStats = ({ jobs }: OverviewStatsProps) => {
  const total = jobs.length;
  const interviews = jobs.filter(job => job.status === 'interview').length;
  const offers = jobs.filter(job => job.status === 'offer').length;
  const rejected = jobs.filter(job => job.status === 'rejected').length;
  const active = jobs.filter(job => ['applied', 'interview'].includes(job.status)).length;
  
  const successRate = total > 0 ? Math.round(((interviews + offers) / total) * 100) : 0;

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        mb: 4
      }}
    >
      <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 24px)', lg: '1 1 calc(33.33% - 24px)' } }}>
        <StatsCard
          title="Total Applications"
          value={total}
          icon={Briefcase}
          color="blue"
        />
      </Box>
      <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 24px)', lg: '1 1 calc(33.33% - 24px)' } }}>
        <StatsCard
          title="Active Applications"
          value={active}
          icon={Activity}
          color="yellow"
        />
      </Box>
      <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 24px)', lg: '1 1 calc(33.33% - 24px)' } }}>
        <StatsCard
          title="Interviews"
          value={interviews}
          icon={CheckCircle}
          color="green"
        />
      </Box>
      <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 24px)', lg: '1 1 calc(33.33% - 24px)' } }}>
        <StatsCard
          title="Offers"
          value={offers}
          icon={Award}
          color="purple"
        />
      </Box>
      <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 24px)', lg: '1 1 calc(33.33% - 24px)' } }}>
        <StatsCard
          title="Success Rate"
          value={`${successRate}%` as any}
          icon={Target}
          color="blue"
        />
      </Box>
      <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 24px)', lg: '1 1 calc(33.33% - 24px)' } }}>
        <StatsCard
          title="Rejections"
          value={rejected}
          icon={XCircle}
          color="red"
        />
      </Box>
    </Box>
  );
};

export default OverviewStats;
