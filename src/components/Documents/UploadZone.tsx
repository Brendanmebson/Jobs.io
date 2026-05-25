import React, { useState, useCallback } from 'react';
import { Box, Typography, Button, Paper, LinearProgress } from '@mui/material';
import { UploadCloud, AlertCircle } from 'lucide-react';

interface Props {
  onClose: () => void;
  onUploadSuccess: (files: File[]) => void;
}

export default function UploadZone({ onClose, onUploadSuccess }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    setUploading(true);
    setError(null);
    setProgress(0);
    
    // Simulate upload process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
            onUploadSuccess(files);
            onClose();
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
        Upload Documents
      </Typography>
      <Paper
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        sx={{
          p: 6,
          textAlign: 'center',
          borderRadius: 4,
          bgcolor: isDragging ? 'primary.50' : 'grey.50',
          border: '2px dashed',
          borderColor: isDragging ? 'primary.main' : 'divider',
          transition: 'all 0.2s',
          cursor: 'pointer',
          '&:hover': {
             bgcolor: 'primary.50',
             borderColor: 'primary.main'
          }
        }}
        onClick={() => document.getElementById('file-upload-input')?.click()}
      >
        <input 
          type="file" 
          id="file-upload-input" 
          multiple 
          hidden 
          onChange={handleFileInput}
        />
        
        {uploading ? (
          <Box sx={{ maxWidth: 400, mx: 'auto' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Uploading files...</Typography>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5, mb: 1 }} />
            <Typography variant="body2" color="text.secondary">{progress}% completed</Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ p: 2, borderRadius: '50%', bgcolor: 'primary.100', width: 'fit-content', mx: 'auto', mb: 2, color: 'primary.main' }}>
              <UploadCloud size={32} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
              Drag & drop files here
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              or click to browse your computer
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
              Supports PDF, DOCX, PPTX, PNG, JPG (Max 10MB per file)
            </Typography>
          </>
        )}
      </Paper>
      
      {error && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'error.main', mt: 2 }}>
          <AlertCircle size={16} />
          <Typography variant="body2">{error}</Typography>
        </Box>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="outlined" onClick={onClose} sx={{ borderRadius: 2, textTransform: 'none' }}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
