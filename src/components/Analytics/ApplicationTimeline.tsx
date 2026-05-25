import React from 'react';
import { Paper, Box, Typography, Stack, Avatar, Chip } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { Job } from '../../types';

interface ApplicationTimelineProps {
  jobs: Job[];
}

const statusConfig: Record<string, { label: string; color: string; bgcolor: string }> = {
  saved: { label: 'Saved', color: '#64748b', bgcolor: '#f1f5f9' },
  applied: { label: 'Applied', color: '#ca8a04', bgcolor: '#fefce8' },
  interview: { label: 'Interview', color: '#2563eb', bgcolor: '#eff6ff' },
  offer: { label: 'Offer', color: '#16a34a', bgcolor: '#f0fdf4' },
  rejected: { label: 'Rejected', color: '#dc2626', bgcolor: '#fef2f2' },
};

const ApplicationTimeline = ({ jobs }: ApplicationTimelineProps) => {
  const recentJobs = [...jobs]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 8);

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
        Recent Activity
      </Typography>
      <Stack spacing={0}>
        {recentJobs.map((job, index) => {
          const config = statusConfig[job.status] || statusConfig.saved;
          const isLast = index === recentJobs.length - 1;
          return (
            <Box key={job.id} sx={{ display: 'flex', gap: 2 }}>
              {/* Timeline line */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: config.color, flexShrink: 0, mt: 0.75 }} />
                {!isLast && (
                  <Box sx={{ width: 2, flexGrow: 1, bgcolor: 'grey.200', my: 0.5 }} />
                )}
              </Box>
              {/* Content */}
              <Box sx={{ pb: isLast ? 0 : 2, minWidth: 0, flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {job.title}
                  </Typography>
                  <Chip
                    label={config.label}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      color: config.color,
                      bgcolor: config.bgcolor,
                      border: 'none',
                    }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {job.company} · {format(parseISO(job.updatedAt), 'MMM d, yyyy')}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Paper>
  );
};

export default ApplicationTimeline;
