import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { File, MoreVertical, Star, FileText, FileImage, LayoutTemplate, Download, ExternalLink } from 'lucide-react';
import { Document } from '../../types/document';

interface Props {
  documents: Document[];
}

export default function DocumentsView({ documents }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, doc: Document) => {
    setAnchorEl(event.currentTarget);
    setSelectedDoc(doc);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDoc(null);
  };

  const handleDownload = (doc: Document) => {
    if (!doc.url) return;
    
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleMenuClose();
  };

  const handleOpen = (doc: Document) => {
    if (!doc.url) return;
    window.open(doc.url, '_blank');
    handleMenuClose();
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getSmallIcon = (format: string) => {
    switch (format) {
      case 'pdf': return <FileText size={20} className="text-red-500" />;
      case 'docx': return <File size={20} className="text-blue-500" />;
      case 'pptx': return <LayoutTemplate size={20} className="text-orange-500" />;
      case 'png': 
      case 'jpg': return <FileImage size={20} className="text-green-500" />;
      default: return <File size={20} className="text-gray-500" />;
    }
  };

  if (documents.length === 0) {
    return (
      <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 4, bgcolor: 'transparent', border: '2px dashed', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Box sx={{ p: 3, borderRadius: '50%', bgcolor: 'grey.100' }}>
            <File size={48} className="text-gray-400" />
          </Box>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>No documents found</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Upload a document or adjust your filters.
        </Typography>
        <Button variant="contained" sx={{ borderRadius: 2, textTransform: 'none' }}>
          Upload First Document
        </Button>
      </Paper>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {documents.length} Document{documents.length !== 1 ? 's' : ''}
        </Typography>
      </Box>

      {/* Grid View for Mobile */}
      <Box sx={{ display: { xs: 'grid', md: 'none' }, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
        {documents.map((doc) => (
          <DocumentCard key={doc.id} document={doc} />
        ))}
      </Box>

      {/* Table View for Desktop */}
      <TableContainer component={Paper} elevation={0} sx={{ display: { xs: 'none', md: 'block' }, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'grey.50' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Size</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Modified</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((doc) => (
              <TableRow
                key={doc.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'grey.50' } }}
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {getSmallIcon(doc.format)}
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 500, 
                            cursor: 'pointer',
                            '&:hover': { color: 'primary.main', textDecoration: 'underline' }
                          }}
                          onClick={() => handleDownload(doc)}
                        >
                          {doc.name}
                        </Typography>
                        {doc.favorite && <Star size={14} fill="#f59e0b" color="#f59e0b" />}
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                        {doc.isPrimary && <Chip label="Primary" size="small" color="primary" sx={{ height: 16, fontSize: '0.6rem' }} />}
                        {doc.version && <Chip label={doc.version} size="small" variant="outlined" sx={{ height: 16, fontSize: '0.6rem' }} />}
                      </Box>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                    {doc.type.replace('_', ' ')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {formatBytes(doc.size)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(doc.modifiedDate).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={(e) => handleMenuOpen(e, doc)}>
                    <MoreVertical size={18} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: { borderRadius: 2, minWidth: 150, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }
          }
        }}
      >
        <MenuItem onClick={() => selectedDoc && handleOpen(selectedDoc)}>
          <ListItemIcon sx={{ minWidth: '36px !important' }}>
            <ExternalLink size={18} />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '0.875rem' }}>Open</Typography>} />
        </MenuItem>
        <MenuItem onClick={() => selectedDoc && handleDownload(selectedDoc)}>
          <ListItemIcon sx={{ minWidth: '36px !important' }}>
            <Download size={18} />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2" sx={{ fontSize: '0.875rem' }}>Download</Typography>} />
        </MenuItem>
      </Menu>
    </Box>
  );
}
