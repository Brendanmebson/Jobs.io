import { 
  Box, 
  Paper, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button
} from '@mui/material';
import { JobFilters as JobFiltersType } from '../../types';

interface JobFiltersProps {
  filters: JobFiltersType;
  onFiltersChange: (filters: JobFiltersType) => void;
}

const JobFilters = ({ filters, onFiltersChange }: JobFiltersProps) => {
  const handleFilterChange = (key: keyof JobFiltersType, value: string | boolean | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value === '' ? undefined : value,
    });
  };

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: 'grey.50' }}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', lg: 'row' }, 
          gap: 2,
          alignItems: 'flex-end'
        }}
      >
        <Box sx={{ flex: 1, width: '100%' }}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status || ''}
              label="Status"
              onChange={(e) => handleFilterChange('status', e.target.value)}
              sx={{ bgcolor: 'white' }}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="saved">Saved</MenuItem>
              <MenuItem value="applied">Applied</MenuItem>
              <MenuItem value="interview">Interview</MenuItem>
              <MenuItem value="offer">Offer</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flex: 1, width: '100%' }}>
          <FormControl fullWidth size="small">
            <InputLabel>Job Type</InputLabel>
            <Select
              value={filters.type || ''}
              label="Job Type"
              onChange={(e) => handleFilterChange('type', e.target.value)}
              sx={{ bgcolor: 'white' }}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="full-time">Full-time</MenuItem>
              <MenuItem value="part-time">Part-time</MenuItem>
              <MenuItem value="contract">Contract</MenuItem>
              <MenuItem value="internship">Internship</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flex: 1, width: '100%' }}>
          <FormControl fullWidth size="small">
            <InputLabel>Priority</InputLabel>
            <Select
              value={filters.priority || ''}
              label="Priority"
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              sx={{ bgcolor: 'white' }}
            >
              <MenuItem value="">All Priorities</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flex: 1, width: '100%' }}>
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category || ''}
              label="Category"
              onChange={(e) => handleFilterChange('category', e.target.value)}
              sx={{ bgcolor: 'white' }}
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="Development">Development</MenuItem>
              <MenuItem value="Design">Design</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
              <MenuItem value="Data Science">Data Science</MenuItem>
              <MenuItem value="Infrastructure">Infrastructure</MenuItem>
              <MenuItem value="Management">Management</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flex: 1, width: '100%' }}>
          <FormControl fullWidth size="small">
            <InputLabel>Remote Work</InputLabel>
            <Select
              value={filters.remote === undefined ? '' : filters.remote.toString()}
              label="Remote Work"
              onChange={(e) => handleFilterChange('remote', e.target.value === 'true' ? true : e.target.value === 'false' ? false : undefined)}
              sx={{ bgcolor: 'white' }}
            >
              <MenuItem value="">All Locations</MenuItem>
              <MenuItem value="true">Remote Only</MenuItem>
              <MenuItem value="false">On-site Only</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="text"
          size="small"
          onClick={() => onFiltersChange({})}
          sx={{ 
            textTransform: 'none', 
            whiteSpace: 'nowrap',
            color: 'text.secondary',
            fontWeight: 600,
            '&:hover': { color: 'primary.main' }
          }}
        >
          Clear Filters
        </Button>
      </Box>
    </Paper>
  );
};

export default JobFilters;