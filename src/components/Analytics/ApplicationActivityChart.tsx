import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Paper, Box, Typography, useTheme } from '@mui/material';
import { format, subMonths, parseISO, startOfMonth, isAfter } from 'date-fns';
import { Job } from '../../types';

interface ApplicationActivityChartProps {
  jobs: Job[];
}

const ApplicationActivityChart = ({ jobs }: ApplicationActivityChartProps) => {
  const theme = useTheme();

  const data = useMemo(() => {
    // Get last 6 months
    const months = Array.from({ length: 6 }).map((_, i) => {
      const date = subMonths(new Date(), 5 - i);
      return {
        monthDate: startOfMonth(date),
        name: format(date, 'MMM'),
        applications: 0,
        interviews: 0
      };
    });

    const sixMonthsAgo = startOfMonth(subMonths(new Date(), 5));

    jobs.forEach(job => {
      // applications
      if (job.appliedDate || job.createdAt) {
        const date = parseISO(job.appliedDate || job.createdAt);
        if (isAfter(date, sixMonthsAgo) || date.getTime() === sixMonthsAgo.getTime()) {
          const monthStr = format(date, 'MMM');
          const monthData = months.find(m => m.name === monthStr);
          if (monthData) monthData.applications += 1;
        }
      }
      // interviews
      if (job.interviewDate) {
        const date = parseISO(job.interviewDate);
        if (isAfter(date, sixMonthsAgo) || date.getTime() === sixMonthsAgo.getTime()) {
          const monthStr = format(date, 'MMM');
          const monthData = months.find(m => m.name === monthStr);
          if (monthData) monthData.interviews += 1;
        }
      }
    });

    return months;
  }, [jobs]);

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
        Application Activity (Last 6 Months)
      </Typography>
      
      <Box sx={{ flexGrow: 1, minHeight: 320, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} 
            />
            <Tooltip 
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{ 
                borderRadius: '8px', 
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
            <Bar 
              dataKey="applications" 
              fill={theme.palette.primary.main} 
              name="Applications" 
              radius={[4, 4, 0, 0]} 
              barSize={20}
            />
            <Bar 
              dataKey="interviews" 
              fill={theme.palette.success.main} 
              name="Interviews" 
              radius={[4, 4, 0, 0]} 
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default ApplicationActivityChart;
