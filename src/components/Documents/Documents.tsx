import React, { useState, useMemo } from 'react';
import { UploadCloud, FolderPlus } from 'lucide-react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import DocumentStatsCards from './DocumentStatsCards';
import DocumentFilters from './DocumentFilters';
import FolderNavigation from './FolderNavigation';
import DocumentsView from './DocumentsView';
import UploadZone from './UploadZone';
import { mockDocuments, mockFolders, mockStats } from './DocumentData';
import { DocumentType } from '../../types/document';

export default function Documents() {
  const [showUpload, setShowUpload] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<DocumentType | 'all'>('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);


  // Filter documents based on state
  const filteredDocuments = useMemo(() => {
    return mockDocuments.filter((doc) => {
      const matchSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchType = selectedType === 'all' || doc.type === selectedType;
      const matchFavorite = !favoritesOnly || doc.favorite === true;
      const matchFolder = selectedFolderId === null || doc.folderId === selectedFolderId;
      
      return matchSearch && matchType && matchFavorite && matchFolder;
    });
  }, [searchQuery, selectedType, favoritesOnly, selectedFolderId]);

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4, lg: 5 }, maxWidth: 1600, mx: 'auto' }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' }, 
        mb: 2, 
        gap: 2 
      }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
          Documents
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, width: { xs: '100%', sm: 'auto' } }}>
          <Button 
            variant="outlined" 
            startIcon={<FolderPlus size={18} />}
            sx={{ 
              borderRadius: 2, 
              textTransform: 'none', 
              bgcolor: 'white',
              flex: { xs: 1, sm: 'none' },
              fontSize: { xs: '0.8rem', sm: '0.875rem' }
            }}
          >
            Create Folder
          </Button>
          <Button 
            variant="contained" 
            startIcon={<UploadCloud size={18} />}
            onClick={() => setShowUpload(!showUpload)}
            sx={{ 
              borderRadius: 2, 
              textTransform: 'none',
              flex: { xs: 1, sm: 'none' },
              fontSize: { xs: '0.8rem', sm: '0.875rem' }
            }}
          >
            Upload Document
          </Button>
        </Box>
      </Box>
      <Typography color="text.secondary" sx={{ mb: 1, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
        Manage your resumes, cover letters, portfolios, and career documents in one secure place.
      </Typography>

      <Box sx={{ my: 4 }}>
        <DocumentStatsCards stats={mockStats} />
      </Box>

      {showUpload && (
         <UploadZone 
           onClose={() => setShowUpload(false)} 
           onUploadSuccess={(files) => console.log('Uploaded:', files)} 
         />
      )}

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <FolderNavigation 
            folders={mockFolders} 
            selectedFolderId={selectedFolderId}
            onFolderSelect={setSelectedFolderId}
          />
          
          <DocumentFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            favoritesOnly={favoritesOnly}
            onFavoritesToggle={() => setFavoritesOnly(!favoritesOnly)}
          />

          <DocumentsView 
            documents={filteredDocuments} 
          />
        </Box>
      </Box>
    </Box>
  );
}
