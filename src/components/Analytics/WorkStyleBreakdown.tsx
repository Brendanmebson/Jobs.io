import React from 'react';
import { Paper, Box, Typography, Stack } from '@mui/material';
import { Wifi, Building2, Briefcase, Clock } from 'lucide-react';
import { Job } from '../../types';

interface WorkStyleBreakdownProps {
  jobs: Job[];
}

const WorkStyleBreakdown = ({ jobs }: WorkStyleBreakdownProps) => {
  const total = jobs.length;
  const remote = jobs.filter((j) => j.remote).length;
  const onsite = total - remote;

  const fullTime = jobs.filter((j) => j.type === 'full-time').length;
  const partTime = jobs.filter((j) => j.type === 'part-time').length;
  const contract = jobs.filter((j) => j.type === 'contract').length;
  const internship = jobs.filter((j) => j.type === 'internship').length;

  const remotePercent = total > 0 ? Math.round((remote / total) * 100) : 0;
  const onsitePercent = total > 0 ? Math.round((onsite / total) * 100) : 0;

  const metrics = [
    { label: 'Remote', value: remote, percent: remotePercent, icon: <Wifi size={20} />, color: '#3b82f6', bg: '#eff6ff' },
    { label: 'On-site', value: onsite, percent: onsitePercent, icon: <Building2 size={20} />, color: '#f59e0b', bg: '#fefce8' },
  ];

  const types = [
    { label: 'Full-time', value: fullTime, icon: <Briefcase size={16} />, color: '#10b981' },
    { label: 'Part-time', value: partTime, icon: <Clock size={16} />, color: '#8b5cf6' },
    { label: 'Contract', value: contract, icon: <Briefcase size={16} />, color: '#f59e0b' },
    { label: 'Internship', value: internship, icon: <Clock size={16} />, color: '#ec4899' },
  ].filter((t) => t.value > 0);

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
        Work Style & Type
      </Typography>

      {/* Remote vs On-site bars */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden', bgcolor: 'grey.100' }}>
          <Box sx={{ width: `${remotePercent}%`, bgcolor: '#3b82f6', transition: 'width 0.5s ease' }} />
          <Box sx={{ width: `${onsitePercent}%`, bgcolor: '#f59e0b', transition: 'width 0.5s ease' }} />
        </Box>
        <Stack direction="row" spacing={3} sx={{ mt: 1.5 }}>
          {metrics.map((m) => (
            <Box key={m.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: m.color }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {m.label}: {m.value} ({m.percent}%)
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Job type breakdown */}
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 2 }}>
        By Job Type
      </Typography>
      <Stack spacing={1.5}>
        {types.map((t) => (
          <Box key={t.label} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 0.75, color: t.color, bgcolor: `${t.color}15`, borderRadius: 1.5, display: 'flex' }}>
              {t.icon}
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 500, flexGrow: 1 }}>{t.label}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>{t.value}</Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default WorkStyleBreakdown;
