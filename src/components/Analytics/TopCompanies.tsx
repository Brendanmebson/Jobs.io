import React from 'react';
import { Paper, Box, Typography, Stack, Avatar } from '@mui/material';
import { Job } from '../../types';

interface TopCompaniesProps {
  jobs: Job[];
}

const TopCompanies = ({ jobs }: TopCompaniesProps) => {
  const companyMap = new Map<string, { count: number; logo?: string; statuses: string[] }>();

  jobs.forEach((job) => {
    const existing = companyMap.get(job.company);
    if (existing) {
      existing.count += 1;
      existing.statuses.push(job.status);
    } else {
      companyMap.set(job.company, { count: 1, logo: job.logo, statuses: [job.status] });
    }
  });

  const sorted = Array.from(companyMap.entries())
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const getStatusColor = (statuses: string[]) => {
    if (statuses.includes('offer')) return '#10b981';
    if (statuses.includes('interview')) return '#3b82f6';
    if (statuses.includes('applied')) return '#eab308';
    if (statuses.includes('rejected')) return '#ef4444';
    return '#94a3b8';
  };

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
        Top Companies
      </Typography>
      <Stack spacing={2}>
        {sorted.map((company, index) => (
          <Box
            key={company.name}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 1.5,
              borderRadius: 2,
              bgcolor: 'grey.50',
              transition: 'all 0.2s',
              '&:hover': { bgcolor: 'grey.100' },
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary', minWidth: 20 }}>
              {index + 1}
            </Typography>
            <Avatar
              src={company.logo}
              sx={{ width: 32, height: 32, bgcolor: 'grey.200', fontSize: 14, fontWeight: 700 }}
            >
              {company.name.charAt(0)}
            </Avatar>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {company.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {company.count} application{company.count !== 1 ? 's' : ''}
              </Typography>
            </Box>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: getStatusColor(company.statuses),
                flexShrink: 0,
              }}
            />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default TopCompanies;
