import React, { useState } from 'react';
import { Box, Paper, Typography, IconButton, Menu, MenuItem, Chip, Divider, Tooltip, Button } from '@mui/material';
import { FileText, MoreVertical, Star, Download, Edit2, Share2, Trash2, File, FileImage, LayoutTemplate } from 'lucide-react';
import { Document } from '../../types/document';

interface Props {
  document: Document;
}

export default function DocumentCard({ document }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = () => {
    switch (document.format) {
      case 'pdf': return <FileText size={40} className="text-red-500" />;
      case 'docx': return <File size={40} className="text-blue-500" />;
      case 'pptx': return <LayoutTemplate size={40} className="text-orange-500" />;
      case 'png': 
      case 'jpg': return <FileImage size={40} className="text-green-500" />;
      default: return <File size={40} className="text-gray-500" />;
    }
  };

  const handleDownload = () => {
    if (document.url) {
      const link = window.document.createElement('a');
      link.href = document.url;
      link.download = document.name;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    }
    setAnchorEl(null);
  };

  const isDownloadable = !!document.url;

  return (
    <Paper
      elevation={0}
      onClick={() => isDownloadable && handleDownload()}
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        transition: 'all 0.2s',
        display: 'flex',
        flexDirection: 'column',
        cursor: isDownloadable ? 'pointer' : 'default',
        '&:hover': {
          boxShadow: 4,
          borderColor: 'primary.main',
          transform: 'translateY(-2px)'
        }
      }}
    >
      {/* Thumbnail area */}
      <Box 
        sx={{ 
          height: 140, 
          bgcolor: 'grey.50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
          position: 'relative'
        }}
      >
        {getFileIcon()}
        {document.favorite && (
          <Box sx={{ position: 'absolute', top: 12, right: 12, color: '#f59e0b' }}>
            <Star size={20} fill="currentColor" />
          </Box>
        )}
      </Box>

      {/* Info area */}
      <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Tooltip title={document.name}>
             <Typography variant="subtitle2" sx={{ 
              fontWeight: 'bold',
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              mb: 0.5,
              lineHeight: 1.2
            }}>
              {document.name}
            </Typography>
          </Tooltip>
          <IconButton 
            size="small" 
            sx={{ mt: -0.5, mr: -1 }}
            onClick={(e) => {
              e.stopPropagation();
              setAnchorEl(e.currentTarget);
            }}
          >
            <MoreVertical size={18} />
          </IconButton>
        </Box>

        {/* Description for resumes */}
        {document.description && (
          <Typography 
            variant="caption" 
            color="text.secondary" 
            sx={{ 
              mt: 0.5, 
              mb: 1,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.5,
              fontSize: '0.72rem',
            }}
          >
            {document.description}
          </Typography>
        )}
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {formatBytes(document.size)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(document.modifiedDate).toLocaleDateString()}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5, mt: 1.5, flexWrap: 'wrap' }}>
          {document.isPrimary && (
            <Chip label="Primary" size="small" color="primary" sx={{ height: 20, fontSize: '0.65rem' }} />
          )}
          {document.version && (
            <Chip label={document.version} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
          )}
          {document.tags.slice(0, 2).map(tag => (
            <Chip key={tag} label={tag} size="small" sx={{ height: 20, fontSize: '0.65rem', bgcolor: 'grey.100' }} />
          ))}
          {document.tags.length > 2 && (
             <Chip label={`+${document.tags.length - 2}`} size="small" sx={{ height: 20, fontSize: '0.65rem', bgcolor: 'grey.100' }} />
          )}
        </Box>

        {/* Download Button for downloadable docs */}
        {isDownloadable && (
          <Button
            variant="contained"
            size="small"
            startIcon={<Download size={14} />}
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
            sx={{
              mt: 'auto',
              pt: 1,
              alignSelf: 'stretch',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.78rem',
              background: '#000',
              color: '#fff',
              marginTop: 2,
              '&:hover': {
                background: '#222',
              },
            }}
          >
            Download CV
          </Button>
        )}
      </Box>

      {/* Menu Actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{ paper: { sx: { minWidth: 160, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' } } }}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>
          <FileText size={16} style={{ marginRight: 8 }} /> Open
        </MenuItem>
        <MenuItem onClick={handleDownload} disabled={!isDownloadable}>
          <Download size={16} style={{ marginRight: 8 }} /> Download
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <Share2 size={16} style={{ marginRight: 8 }} /> Share
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <Edit2 size={16} style={{ marginRight: 8 }} /> Rename
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setAnchorEl(null)} sx={{ color: 'error.main' }}>
          <Trash2 size={16} style={{ marginRight: 8 }} /> Delete
        </MenuItem>
      </Menu>
    </Paper>
  );
}
