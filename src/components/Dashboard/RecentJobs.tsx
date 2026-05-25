import React, { useState } from 'react';
import { Clock, MapPin, Building } from 'lucide-react';
import { Box, Paper, Typography, Stack, Avatar, Chip, Divider } from '@mui/material';
import { Job } from '../../types';

interface RecentJobsProps {
  jobs: Job[];
}

const RecentJobItem = ({ job }: { job: Job }) => {
  const [logoError, setLogoError] = useState(false);

  const getStatusConfig = (status: Job['status']): { color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default'; label: string } => {
    switch (status) {
      case 'saved': return { color: 'default', label: 'Saved' };
      case 'applied': return { color: 'primary', label: 'Applied' };
      case 'interview': return { color: 'success', label: 'Interview' };
      case 'offer': return { color: 'secondary', label: 'Offer' };
      case 'rejected': return { color: 'error', label: 'Rejected' };
      default: return { color: 'info', label: status };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const statusCfg = getStatusConfig(job.status);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        p: 1.5, 
        borderRadius: 2,
        transition: 'background-color 0.2s',
        '&:hover': { bgcolor: 'grey.50' }
      }}
    >
      {job.logo && !logoError ? (
        <Box
          component="img"
          src={job.logo}
          alt={`${job.company} logo`}
          onError={() => setLogoError(true)}
          sx={{
            width: 40,
            height: 40,
            mr: 2,
            borderRadius: 2,
            objectFit: 'contain',
            bgcolor: 'white',
            border: '1px solid',
            borderColor: 'divider',
            p: 0.5
          }}
        />
      ) : (
        <Avatar
          variant="rounded"
          sx={{
            width: 40,
            height: 40,
            mr: 2,
            background: 'linear-gradient(45deg, #0f172a, #334155)',
            borderRadius: 2,
          }}
        >
          <Building size={20} />
        </Avatar>
      )}
      
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="subtitle2" noWrap sx={{ fontWeight: 'bold' }}>
          {job.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {job.company}
        </Typography>
        
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center', mt: 1 }}>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
            <MapPin size={12} color="#94a3b8" />
            <Typography variant="caption" color="text.secondary">
              {job.location}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
            <Clock size={12} color="#94a3b8" />
            <Typography variant="caption" color="text.secondary">
              {formatDate(job.updatedAt)}
            </Typography>
          </Stack>
        </Stack>
        
        <Box sx={{ mt: 1.5 }}>
          <Chip 
            label={statusCfg.label} 
            color={statusCfg.color} 
            size="small" 
            sx={{ 
              fontWeight: 600, 
              fontSize: '0.65rem',
              height: 24,
              bgcolor: (theme) => statusCfg.color === 'default' 
                ? theme.palette.grey[100] 
                : theme.palette[statusCfg.color].light,
              color: (theme) => statusCfg.color === 'default'
                ? theme.palette.text.secondary
                : theme.palette[statusCfg.color].main
            }} 
          />
        </Box>
      </Box>
    </Box>
  );
};

const RecentJobs = ({ jobs }: RecentJobsProps) => {
  return (
    <Paper 
      variant="outlined" 
      sx={{ 
        p: 3, 
        borderRadius: 3, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
        Recent Activity
      </Typography>
      
      <Box 
        sx={{ 
          flex: 1, 
          overflowY: 'auto',
          pr: 1, // Space for scrollbar
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#e2e8f0',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#cbd5e1',
          },
        }}
      >
        <Stack spacing={2}>
          {jobs.map((job, index) => (
            <React.Fragment key={job.id}>
              {index > 0 && <Divider variant="inset" component="div" sx={{ ml: 7, my: 0.5 }} />}
              <RecentJobItem job={job} />
            </React.Fragment>
          ))}
          
          {jobs.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
              <Building size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
              <Typography variant="body2">No recent jobs</Typography>
            </Box>
          )}
        </Stack>
      </Box>
    </Paper>
  );
};

export default RecentJobs;