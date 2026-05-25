import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import { FileText, Mail, Briefcase, HardDrive } from 'lucide-react';
import { DocumentStatsData } from '../../types/document';

interface Props {
  stats: DocumentStatsData;
}

export default function DocumentStatsCards({ stats }: Props) {
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const statItems = [
    {
      title: 'Total Documents',
      value: stats.totalFiles.toString(),
      icon: <FileText size={24} />,
      color: '#3b82f6', // blue
      bgColor: '#eff6ff'
    },
    {
      title: 'Storage Used',
      value: `${formatBytes(stats.totalStorageUsed)} / ${formatBytes(stats.maxStorage)}`,
      icon: <HardDrive size={24} />,
      color: '#8b5cf6', // purple
      bgColor: '#f5f3ff'
    },
    {
      title: 'Resumes',
      value: stats.resumes.toString(),
      icon: <FileText size={24} />, // generic file
      color: '#10b981', // green
      bgColor: '#f0fdf4'
    },
    {
      title: 'Cover Letters',
      value: stats.coverLetters.toString(),
      icon: <Mail size={24} />,
      color: '#f59e0b', // amber
      bgColor: '#fffbeb'
    },
    {
      title: 'Portfolios',
      value: stats.portfolios.toString(),
      icon: <Briefcase size={24} />,
      color: '#ef4444', // red
      bgColor: '#fef2f2'
    }
  ];

  return (
    <Box 
      sx={{ 
        display: 'grid', 
        gridTemplateColumns: { 
          xs: '1fr', 
          sm: 'repeat(2, 1fr)', 
          md: 'repeat(3, 1fr)', 
          lg: 'repeat(5, 1fr)' 
        }, 
        gap: { xs: 2, sm: 3 } 
      }}
    >
      {statItems.map((item, index) => (
        <Box key={index}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 2,
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: item.bgColor,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2
                }}
              >
                {item.icon}
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap', fontWeight: 'medium' }}>
                {item.title}
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {item.value}
            </Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  );
}
