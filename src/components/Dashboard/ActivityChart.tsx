import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Paper, Box, Typography, useTheme } from '@mui/material';

const ActivityChart = () => {
  const theme = useTheme();
  
  const data = [
    { name: 'Jan', applications: 8, interviews: 2 },
    { name: 'Feb', applications: 12, interviews: 4 },
    { name: 'Mar', applications: 15, interviews: 6 },
    { name: 'Apr', applications: 10, interviews: 3 },
    { name: 'May', applications: 18, interviews: 7 },
    { name: 'Jun', applications: 14, interviews: 5 },
  ];

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
        Application Activity
      </Typography>
      
      <Box sx={{ height: 320, width: '100%' }}>
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

export default ActivityChart;