import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { 
  Box, 
  Typography, 
  Button, 
  Stack, 
  TextField, 
  InputAdornment, 
  Collapse
} from '@mui/material';
import { useJobs } from '../../hooks/useJobs';
import { Job, JobFilters } from '../../types';
import JobCard from './JobCard';
import JobForm from './JobForm';
import JobFiltersComponent from './JobFilters';
import JobCardSkeleton from './JobCardSkeleton';

const JobList = () => {
  const { filterJobs, addJob, updateJob, deleteJob, loading } = useJobs();
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<JobFilters>({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = filterJobs({ ...filters, search: searchTerm });

  const handleAddJob = (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
    addJob(jobData);
    setShowForm(false);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleUpdateJob = (jobData: Partial<Job>) => {
    if (editingJob) {
      updateJob(editingJob.id, jobData);
      setEditingJob(null);
      setShowForm(false);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingJob(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Job Applications
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => setShowForm(true)}
          sx={{
            py: 1.25,
            px: 3,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '0.95rem',
            fontWeight: 600,
            background: '#000',
            '&:hover': {
              background: '#222',
            },
          }}
        >
          Add Job
        </Button>
      </Stack>

      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        sx={{ mb: 4 }}
      >
        <TextField
          fullWidth
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} color="#94a3b8" />
                </InputAdornment>
              ),
            },
          }}
          sx={{ bgcolor: 'white', flex: 1 }}
        />
        <Button
          variant="outlined"
          startIcon={<Filter size={20} />}
          onClick={() => setShowFilters(!showFilters)}
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 2,
            borderColor: 'divider',
            color: 'text.primary',
            textTransform: 'none',
            fontWeight: 600,
            bgcolor: showFilters ? 'grey.50' : 'white',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'grey.50'
            }
          }}
        >
          Filters
        </Button>
      </Stack>

      <Collapse in={showFilters}>
        <Box sx={{ mb: 4 }}>
          <JobFiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
          />
        </Box>
      </Collapse>

      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 3 
        }}
      >
        {loading ? (
          Array.from(new Array(6)).map((_, index) => (
            <Box key={`skeleton-${index}`} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 24px)', md: '1 1 calc(33.333% - 16px)' } }}>
              <JobCardSkeleton />
            </Box>
          ))
        ) : (
          filteredJobs.map((job) => (
            <Box key={job.id} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 24px)', md: '1 1 calc(33.333% - 16px)' } }}>
              <JobCard
                job={job}
                onEdit={handleEditJob}
                onDelete={deleteJob}
                onStatusChange={(status) => updateJob(job.id, { status })}
              />
            </Box>
          ))
        )}
      </Box>

      {filteredJobs.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              bgcolor: 'grey.100',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2
            }}
          >
            <Search size={32} color="#94a3b8" />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            No jobs found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters or add a new job application.
          </Typography>
        </Box>
      )}

      {showForm && (
        <JobForm
          job={editingJob}
          onSubmit={editingJob ? handleUpdateJob : handleAddJob}
          onClose={handleCloseForm}
        />
      )}
    </Box>
  );
};

export default JobList;