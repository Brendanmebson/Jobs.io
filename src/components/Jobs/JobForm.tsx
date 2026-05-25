import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2 } from 'lucide-react';
import { 
  Box, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  IconButton, 
  MenuItem, 
  FormControlLabel, 
  Checkbox, 
  Stack, 
  Typography,
  Divider
} from '@mui/material';
import { Job } from '../../types';

interface JobFormProps {
  job?: Job | null;
  onSubmit: (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
}

const JobForm = ({ job, onSubmit, onClose }: JobFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'full-time' as Job['type'],
    remote: false,
    salary: '',
    description: '',
    requirements: [''],
    status: 'saved' as Job['status'],
    priority: 'medium' as Job['priority'],
    category: 'Development',
    appliedDate: '',
    interviewDate: '',
    followUpDate: '',
    notes: '',
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        remote: job.remote,
        salary: job.salary || '',
        description: job.description,
        requirements: job.requirements.length > 0 ? job.requirements : [''],
        status: job.status,
        priority: job.priority,
        category: job.category || 'Development',
        appliedDate: job.appliedDate || '',
        interviewDate: job.interviewDate || '',
        followUpDate: job.followUpDate || '',
        notes: job.notes,
      });
    }
  }, [job]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const jobData = {
      ...formData,
      requirements: formData.requirements.filter(req => req.trim() !== ''),
    };
    onSubmit(jobData);
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData({ ...formData, requirements: newRequirements });
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, ''],
    });
  };

  const removeRequirement = (index: number) => {
    const newRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData({ ...formData, requirements: newRequirements });
  };

  return (
    <Dialog 
      open={true} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      slotProps={{
        paper: {
          sx: { borderRadius: 3, p: 1 }
        }
      }}
    >
      <DialogTitle sx={{ p: 3, pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {job ? 'Edit Job' : 'Add New Job'}
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Stack spacing={3}>
            {/* Main Info */}
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                gap: 2 
              }}
            >
              <TextField
                fullWidth
                label="Job Title *"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="e.g. Senior Frontend Developer"
              />
              <TextField
                fullWidth
                label="Company *"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
                placeholder="e.g. TechCorp"
              />
            </Box>

            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                gap: 2 
              }}
            >
              <TextField
                fullWidth
                label="Location *"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                placeholder="e.g. San Francisco, CA"
              />
              <TextField
                fullWidth
                select
                label="Job Type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Job['type'] })}
              >
                <MenuItem value="full-time">Full-time</MenuItem>
                <MenuItem value="part-time">Part-time</MenuItem>
                <MenuItem value="contract">Contract</MenuItem>
                <MenuItem value="internship">Internship</MenuItem>
              </TextField>
            </Box>

            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                gap: 2 
              }}
            >
              <TextField
                fullWidth
                select
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <MenuItem value="Development">Development</MenuItem>
                <MenuItem value="Design">Design</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="Data Science">Data Science</MenuItem>
                <MenuItem value="Infrastructure">Infrastructure</MenuItem>
                <MenuItem value="Management">Management</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="Salary Range"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                placeholder="e.g. $80,000 - $120,000"
              />
            </Box>

            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                gap: 2 
              }}
            >
              <TextField
                fullWidth
                select
                label="Status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Job['status'] })}
              >
                <MenuItem value="saved">Saved</MenuItem>
                <MenuItem value="applied">Applied</MenuItem>
                <MenuItem value="interview">Interview</MenuItem>
                <MenuItem value="offer">Offer</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </TextField>
              <TextField
                fullWidth
                select
                label="Priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Job['priority'] })}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>
            </Box>

            <Box sx={{ flex: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.remote}
                    onChange={(e) => setFormData({ ...formData, remote: e.target.checked })}
                    color="primary"
                  />
                }
                label="Remote position"
              />
            </Box>

            <Divider />

            {/* Dates */}
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Dates</Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                gap: 2 
              }}
            >
              <TextField
                fullWidth
                type="date"
                label="Applied Date"
                value={formData.appliedDate}
                onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                fullWidth
                type="date"
                label="Interview Date"
                value={formData.interviewDate}
                onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                fullWidth
                type="date"
                label="Follow-up Date"
                value={formData.followUpDate}
                onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Box>

            <Divider />

            {/* Content areas */}
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Job Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the job role and responsibilities..."
            />

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1.5 }}>
                Requirements
              </Typography>
              <Stack spacing={1.5}>
                {formData.requirements.map((requirement, index) => (
                  <Stack key={index} direction="row" spacing={1}>
                    <TextField
                      fullWidth
                      size="small"
                      value={requirement}
                      onChange={(e) => handleRequirementChange(index, e.target.value)}
                      placeholder="e.g. 5+ years of React experience"
                    />
                    {formData.requirements.length > 1 && (
                      <IconButton 
                        onClick={() => removeRequirement(index)} 
                        size="small" 
                        color="error"
                        sx={{ bgcolor: 'error.lighter', '&:hover': { bgcolor: 'error.light' } }}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    )}
                  </Stack>
                ))}
                <Button 
                  startIcon={<Plus size={16} />} 
                  onClick={addRequirement}
                  sx={{ width: 'fit-content', textTransform: 'none' }}
                >
                  Add Requirement
                </Button>
              </Stack>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any additional notes..."
            />
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button 
          onClick={onClose} 
          sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 600 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={<Save size={18} />}
          sx={{
            py: 1,
            px: 4,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            background: 'linear-gradient(45deg, #2563eb, #9333ea)',
          }}
        >
          {job ? 'Update' : 'Save'} Job
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobForm;