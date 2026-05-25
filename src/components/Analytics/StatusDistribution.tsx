import React from 'react';
import { Paper, Box, Typography, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Job } from '../../types';

interface StatusDistributionProps {
  jobs: Job[];
}

const StatusDistribution = ({ jobs }: StatusDistributionProps) => {
  const theme = useTheme();

  const statuses = [
    { id: 'saved', label: 'Saved', color: '#94a3b8' },
    { id: 'applied', label: 'Applied', color: '#eab308' },
    { id: 'interview', label: 'Interview', color: '#3b82f6' },
    { id: 'offer', label: 'Offer', color: '#10b981' },
    { id: 'rejected', label: 'Rejected', color: '#ef4444' },
  ];

  const data = statuses.map((status) => ({
    name: status.label,
    value: jobs.filter((job) => job.status === status.id).length,
    color: status.color,
  })).filter((item) => item.value > 0);

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
        Status Distribution
      </Typography>
      
      <Box sx={{ flexGrow: 1, minHeight: 250, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default StatusDistribution;
