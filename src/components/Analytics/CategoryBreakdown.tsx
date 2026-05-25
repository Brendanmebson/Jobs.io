import React from 'react';
import { Paper, Box, Typography, useTheme } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Job } from '../../types';

interface CategoryBreakdownProps {
  jobs: Job[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Engineering: '#3b82f6',
  Design: '#8b5cf6',
  Product: '#ec4899',
  Marketing: '#f59e0b',
  Management: '#10b981',
  'Data Science': '#06b6d4',
  Other: '#64748b',
};

const CategoryBreakdown = ({ jobs }: CategoryBreakdownProps) => {
  const theme = useTheme();
  const categoryMap = new Map<string, number>();

  jobs.forEach((job) => {
    const cat = job.category || 'Other';
    categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
  });

  const data = Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count, fill: CATEGORY_COLORS[name] || '#64748b' }))
    .sort((a, b) => b.count - a.count);

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
        Applications by Category
      </Typography>
      <Box sx={{ flexGrow: 1, minHeight: 250, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={theme.palette.divider} />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              width={90}
            />
            <Tooltip
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{
                borderRadius: '8px',
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Bar dataKey="count" name="Applications" radius={[0, 4, 4, 0]} barSize={16}>
              {data.map((entry, index) => (
                <rect key={index} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default CategoryBreakdown;
