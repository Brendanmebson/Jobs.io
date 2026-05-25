import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Paper, Box, Typography } from '@mui/material';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  trend?: {
    value: number;
    label: string;
  };
}

const StatsCard = ({ title, value, icon: Icon, color, trend }: StatsCardProps) => {
  const colorMap = {
    blue: { bg: '#f1f5f9', text: '#0f172a', border: '#e2e8f0' },
    green: { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' },
    yellow: { bg: '#fefce8', text: '#ca8a04', border: '#fef08a' },
    red: { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' },
    purple: { bg: '#faf5ff', text: '#9333ea', border: '#e9d5ff' },
  };

  const selectedColor = colorMap[color];

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        height: '100%',
        borderRadius: 3,
        borderColor: 'divider',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          borderColor: 'primary.light',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
            {value}
          </Typography>
          {trend && (
            <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
              <Box component="span" sx={{ color: trend.value > 0 ? 'success.main' : 'error.main', fontWeight: 600 }}>
                {trend.value > 0 ? '+' : ''}{trend.value}%
              </Box>{' '}
              <Box component="span" sx={{ color: 'text.secondary' }}>
                {trend.label}
              </Box>
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: selectedColor.bg,
            color: selectedColor.text,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={24} />
        </Box>
      </Box>
    </Paper>
  );
};

export default StatsCard;