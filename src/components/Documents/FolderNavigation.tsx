import { Box, Button, Typography, IconButton } from '@mui/material';
import { Folder as FolderIcon, Plus, MoreVertical } from 'lucide-react';
import { Folder } from '../../types/document';

interface Props {
  folders: Folder[];
  selectedFolderId: string | null;
  onFolderSelect: (id: string | null) => void;
}

export default function FolderNavigation({ folders, selectedFolderId, onFolderSelect }: Props) {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Folders
        </Typography>
        <Button
          startIcon={<Plus size={16} />}
          size="small"
          sx={{ textTransform: 'none', fontWeight: 'medium' }}
        >
          New Folder
        </Button>
      </Box>
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        overflowX: 'auto', 
        pb: 1,
        '&::-webkit-scrollbar': { height: 6 },
        '&::-webkit-scrollbar-thumb': { bgcolor: 'grey.300', borderRadius: 3 }
      }}>
        <Button
          onClick={() => onFolderSelect(null)}
          variant={selectedFolderId === null ? "contained" : "outlined"}
          sx={{
            py: 1.5,
            px: 2.5,
            borderRadius: 3,
            textTransform: 'none',
            flexShrink: 0,
            borderColor: selectedFolderId === null ? 'primary.main' : 'divider',
            bgcolor: selectedFolderId === null ? 'primary.main' : 'white',
            color: selectedFolderId === null ? 'white' : 'text.primary',
            '&:hover': {
               bgcolor: selectedFolderId === null ? 'primary.dark' : 'grey.50',
            }
          }}
        >
          All Documents
        </Button>
        {folders.map((folder) => (
          <Box
            key={folder.id}
            onClick={() => onFolderSelect(folder.id)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: '10px 16px',
              borderRadius: 3,
              border: '1px solid',
              borderColor: selectedFolderId === folder.id ? 'primary.main' : 'divider',
              bgcolor: selectedFolderId === folder.id ? 'primary.50' : 'white',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: selectedFolderId === folder.id ? 'primary.50' : 'grey.50',
                borderColor: selectedFolderId === folder.id ? 'primary.main' : 'grey.400'
              }
            }}
          >
            <FolderIcon 
              size={20} 
              fill={selectedFolderId === folder.id ? "#0f172a" : "none"} 
              color={selectedFolderId === folder.id ? "#0f172a" : "#64748b"} 
            />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }} color={selectedFolderId === folder.id ? "primary.main" : "text.primary"}>
                {folder.name}
              </Typography>
            </Box>
            <Box 
              sx={{ 
                bgcolor: selectedFolderId === folder.id ? 'white' : 'grey.100', 
                color: 'text.secondary',
                px: 1, 
                py: 0.25, 
                borderRadius: 4, 
                fontSize: '0.75rem',
                fontWeight: 'bold',
                ml: 1
              }}
            >
              {folder.count}
            </Box>
            <IconButton size="small" sx={{ ml: -0.5, mr: -1, opacity: 0.5, '&:hover': { opacity: 1 } }}>
              <MoreVertical size={16} />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
