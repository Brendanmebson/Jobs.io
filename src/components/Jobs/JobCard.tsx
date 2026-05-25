import React, { useState } from 'react';
import { MapPin, Calendar, Edit, Trash2, Building } from 'lucide-react';
import { 
  Box, 
  Paper, 
  Typography, 
  Stack, 
  IconButton, 
  Chip, 
  Select, 
  MenuItem, 
  FormControl,
  Tooltip,
  Avatar
} from '@mui/material';
import { Job } from '../../types';

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
  onStatusChange: (status: Job['status']) => void;
}

const JobCard = ({ job, onEdit, onDelete, onStatusChange }: JobCardProps) => {
  const [logoError, setLogoError] = useState(false);

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'saved': return { color: 'default', bg: '#f1f5f9', fg: '#475569' };
      case 'applied': return { color: 'primary', bg: '#eff6ff', fg: '#2563eb' };
      case 'interview': return { color: 'success', bg: '#f0fdf4', fg: '#16a34a' };
      case 'offer': return { color: 'secondary', bg: '#faf5ff', fg: '#9333ea' };
      case 'rejected': return { color: 'error', bg: '#fef2f2', fg: '#dc2626' };
      default: return { color: 'default', bg: '#f1f5f9', fg: '#475569' };
    }
  };

  const getPriorityColor = (priority: Job['priority']) => {
    switch (priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#ca8a04';
      case 'low': return '#16a34a';
      default: return '#94a3b8';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const statusCfg = getStatusColor(job.status);

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 3,
        borderColor: 'divider',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          '& .action-buttons': { opacity: 1 }
        },
      }}
    >
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        {job.logo && !logoError ? (
          <Box
            component="img"
            src={job.logo}
            alt={`${job.company} logo`}
            onError={() => setLogoError(true)}
            sx={{
              width: 48,
              height: 48,
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
              width: 48,
              height: 48,
              background: 'linear-gradient(45deg, #0f172a, #334155)',
              borderRadius: 2,
            }}
          >
            <Building size={24} />
          </Avatar>
        )}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
            <Typography 
              variant="h6" 
              noWrap 
              sx={{ 
                fontWeight: 'bold',
                color: 'text.primary',
                transition: 'color 0.2s',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {job.title}
            </Typography>
            <Tooltip title={`Priority: ${job.priority}`}>
              <Box 
                sx={{ 
                  width: 10, 
                  height: 10, 
                  borderRadius: '50%', 
                  bgcolor: getPriorityColor(job.priority) 
                }} 
              />
            </Tooltip>
          </Stack>
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
            {job.company}
          </Typography>
        </Box>

        <Stack 
          className="action-buttons" 
          direction="row" 
          spacing={0.5} 
          sx={{ 
            opacity: { xs: 1, md: 0 }, 
            transition: 'opacity 0.2s',
            alignItems: 'flex-start' 
          }}
        >
          <IconButton size="small" onClick={() => onEdit(job)} sx={{ p: { xs: 0.5, sm: 1 } }}>
            <Edit size={16} color="#94a3b8" />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(job.id)} sx={{ p: { xs: 0.5, sm: 1 } }}>
            <Trash2 size={16} color="#94a3b8" />
          </IconButton>
        </Stack>
      </Stack>

      <Stack spacing={1.5} sx={{ mb: 3 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <MapPin size={16} color="#94a3b8" />
          <Typography variant="body2" color="text.secondary">
            {job.location}
          </Typography>
          {job.remote && (
            <Chip 
              label="Remote" 
              size="small" 
              sx={{ 
                height: 20, 
                fontSize: '0.65rem', 
                bgcolor: '#f0fdf4', 
                color: '#16a34a',
                fontWeight: 700 
              }} 
            />
          )}
        </Stack>
        
        {job.appliedDate && (
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Calendar size={16} color="#94a3b8" />
            <Typography variant="body2" color="text.secondary">
              Applied: {formatDate(job.appliedDate)}
            </Typography>
          </Stack>
        )}
        
        {job.interviewDate && (
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Calendar size={16} color="#94a3b8" />
            <Typography variant="body2" color="text.secondary">
              Interview: {formatDate(job.interviewDate)}
            </Typography>
          </Stack>
        )}
      </Stack>

      {job.salary && (
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 3 }}>
          {job.salary}
        </Typography>
      )}

      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <FormControl size="small">
          <Select
            value={job.status}
            onChange={(e) => onStatusChange(e.target.value as Job['status'])}
            sx={{
              borderRadius: 5,
              height: 32,
              fontSize: '0.8rem',
              fontWeight: 600,
              bgcolor: statusCfg.bg,
              color: statusCfg.fg,
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '& .MuiSelect-select': { py: 0.5, px: 2 }
            }}
          >
            <MenuItem value="saved">Saved</MenuItem>
            <MenuItem value="applied">Applied</MenuItem>
            <MenuItem value="interview">Interview</MenuItem>
            <MenuItem value="offer">Offer</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
        
        <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
          {job.type.replace('-', ' ')}
        </Typography>
      </Stack>

      {job.notes && (
        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {job.notes}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default JobCard;