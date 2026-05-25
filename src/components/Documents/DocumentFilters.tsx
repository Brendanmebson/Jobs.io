import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  InputAdornment, 
  Button, 
  Menu, 
  MenuItem, 
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import { Search, Filter, Star, Tag, X } from 'lucide-react';
import { DocumentType } from '../../types/document';

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedType: DocumentType | 'all';
  onTypeChange: (type: DocumentType | 'all') => void;
  favoritesOnly: boolean;
  onFavoritesToggle: () => void;
}

export default function DocumentFilters({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  favoritesOnly,
  onFavoritesToggle
}: Props) {
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);

  const documentTypes: { value: DocumentType | 'all', label: string }[] = [
    { value: 'all', label: 'All Types' },
    { value: 'resume', label: 'Resumes' },
    { value: 'cover_letter', label: 'Cover Letters' },
    { value: 'portfolio', label: 'Portfolios' },
    { value: 'certificate', label: 'Certificates' },
    { value: 'work_sample', label: 'Work Samples' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
      <TextField
        placeholder="Search documents..."
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ 
          flexGrow: 1, 
          minWidth: { xs: '100%', sm: '250px' }, 
          bgcolor: 'white', 
          borderRadius: 2, 
          order: { xs: 1, sm: 0 },
          '& .MuiOutlinedInput-root': { borderRadius: 2 } 
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} className="text-gray-400" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
               <InputAdornment position="end">
                <IconButton size="small" onClick={() => onSearchChange('')}>
                  <X size={16} />
                </IconButton>
              </InputAdornment>
            )
          }
        }}
      />

      <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', sm: 'auto' }, order: { xs: 2, sm: 0 } }}>
        <Button
          variant="outlined"
          startIcon={<Filter size={18} />}
          onClick={(e) => setFilterAnchorEl(e.currentTarget)}
          sx={{ 
            borderRadius: 2, 
            textTransform: 'none', 
            borderColor: 'divider', 
            color: 'text.primary',
            bgcolor: 'white',
            flex: { xs: 1, sm: 'none' },
            '&:hover': { bgcolor: 'grey.50', borderColor: 'divider' }
          }}
        >
          {documentTypes.find(t => t.value === selectedType)?.label || 'Filter'}
        </Button>

        <Tooltip title={favoritesOnly ? "Show All" : "Show Favorites Only"}>
          <Button
            variant={favoritesOnly ? "contained" : "outlined"}
            color={favoritesOnly ? "warning" : "inherit"}
            onClick={onFavoritesToggle}
            sx={{ 
              borderRadius: 2, 
              minWidth: 0,
              p: '8px 12px',
              borderColor: favoritesOnly ? 'warning.main' : 'divider',
              bgcolor: favoritesOnly ? 'warning.50' : 'white',
              color: favoritesOnly ? 'warning.dark' : 'text.secondary',
              '&:hover': {
                bgcolor: favoritesOnly ? 'warning.100' : 'grey.50'
              }
            }}
          >
            <Star size={20} fill={favoritesOnly ? "currentColor" : "none"} />
          </Button>
        </Tooltip>
        
        <Button
          variant="outlined"
          startIcon={<Tag size={18} />}
          sx={{ 
            borderRadius: 2, 
            textTransform: 'none', 
            borderColor: 'divider', 
            color: 'text.secondary',
            bgcolor: 'white',
            display: { xs: 'none', lg: 'inline-flex' }
          }}
        >
          Tags
        </Button>
      </Box>
    </Box>
  );
}
