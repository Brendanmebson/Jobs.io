import React, { useState } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  Box, 
  Typography, 
  IconButton, 
  Stack, 
  TextField, 
  MenuItem, 
  Button, 
  Paper,
  Chip
} from '@mui/material';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Calendar, 
  Briefcase, 
  ExternalLink
} from 'lucide-react';
import { format } from 'date-fns';
import { useCalendar } from '../../hooks/useCalendar';
import { CalendarEvent, CalendarEventCategory } from '../../types';

interface EventDialogProps {
  open: boolean;
  onClose: () => void;
  date: Date | null;
}

const categories: { value: CalendarEventCategory; label: string; color: string }[] = [
  { value: 'interview', label: 'Interview', color: '#3b82f6' },
  { value: 'deadline', label: 'Deadline', color: '#ef4444' },
  { value: 'follow-up', label: 'Follow-up', color: '#f59e0b' },
  { value: 'appointment', label: 'Appointment', color: '#10b981' },
  { value: 'personal', label: 'Personal', color: '#8b5cf6' },
  { value: 'other', label: 'Other', color: '#64748b' },
];

const EventDialog = ({ open, onClose, date }: EventDialogProps) => {
  const { getEventsForDate, addEvent, updateEvent, deleteEvent } = useCalendar();
  const [isAdding, setIsAdding] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other' as CalendarEventCategory,
    notes: ''
  });

  if (!date) return null;

  const dayEvents = getEventsForDate(date);
  const dateLabel = format(date, 'EEEE, MMMM do');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      notes: formData.notes,
      startDate: date.toISOString(),
      endDate: date.toISOString()
    });
    setIsAdding(false);
    setFormData({ title: '', description: '', category: 'other', notes: '' });
  };

  const startEditing = (event: CalendarEvent) => {
    if (event.id.startsWith('job-')) return;
    setEditingEventId(event.id);
    setFormData({
      title: event.title,
      description: event.description || '',
      category: event.category,
      notes: event.notes || ''
    });
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEventId) {
      updateEvent(editingEventId, formData);
      setEditingEventId(null);
      setFormData({ title: '', description: '', category: 'other', notes: '' });
    }
  };

  const handleClose = () => {
    onClose();
    setIsAdding(false);
    setEditingEventId(null);
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': { borderRadius: 3, bgcolor: '#f8fafc' }
      }}
    >
      <DialogTitle sx={{ p: 3, pb: 2, bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {dateLabel}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {dayEvents.length} {dayEvents.length === 1 ? 'event' : 'events'} scheduled
            </Typography>
          </Box>
          <IconButton onClick={handleClose} size="small">
            <X size={20} />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {isAdding || editingEventId ? (
          <Box component="form" onSubmit={editingEventId ? handleUpdateSubmit : handleAddSubmit} sx={{ pt: 1 }}>
            <Stack spacing={3}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {editingEventId ? 'Edit Event' : 'Create New Event'}
              </Typography>
              <TextField
                fullWidth
                label="Event Title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                variant="outlined"
              />
              <TextField
                fullWidth
                select
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as CalendarEventCategory })}
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: option.color }} />
                      {option.label}
                    </Stack>
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
              <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  onClick={() => {
                    setIsAdding(false);
                    setEditingEventId(null);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  fullWidth 
                  variant="contained" 
                  type="submit"
                  sx={{ bgcolor: 'primary.main' }}
                >
                  {editingEventId ? 'Update' : 'Save Event'}
                </Button>
              </Stack>
            </Stack>
          </Box>
        ) : (
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Button 
              variant="outlined" 
              fullWidth 
              startIcon={<Plus size={18} />}
              onClick={() => setIsAdding(true)}
              sx={{ 
                py: 2, 
                borderStyle: 'dashed', 
                borderWidth: 2,
                borderColor: 'divider',
                color: 'text.secondary',
                '&:hover': { 
                  borderColor: 'primary.main', 
                  color: 'primary.main', 
                  bgcolor: 'transparent',
                  borderStyle: 'dashed',
                  borderWidth: 2
                }
              }}
            >
              Add New Event
            </Button>

            {dayEvents.map(event => {
              const isJobEvent = event.id.startsWith('job-');
              const cat = categories.find(c => c.value === event.category) || categories[5];

              return (
                <Paper 
                  key={event.id}
                  variant="outlined"
                  sx={{ 
                    p: 2, 
                    borderRadius: 3, 
                    borderLeft: `6px solid ${cat.color}`,
                    position: 'relative',
                    bgcolor: 'white',
                    '&:hover .event-actions': { opacity: 1 }
                  }}
                >
                  <Stack spacing={1}>
                    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {event.title}
                        </Typography>
                        {isJobEvent && (
                          <Chip 
                            size="small" 
                            label="Job Automated" 
                            icon={<Briefcase size={10} />}
                            sx={{ mt: 0.5, height: 20, fontSize: '10px', bgcolor: 'grey.100' }} 
                          />
                        )}
                      </Box>
                      {!isJobEvent && (
                        <Stack direction="row" className="event-actions" sx={{ opacity: 0, transition: 'opacity 0.2s' }}>
                          <IconButton size="small" onClick={() => startEditing(event)}>
                            <Edit3 size={16} />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => deleteEvent(event.id)}>
                            <Trash2 size={16} />
                          </IconButton>
                        </Stack>
                      )}
                    </Stack>
                    
                    {event.description && (
                      <Typography variant="body2" color="text.secondary">
                        {event.description}
                      </Typography>
                    )}

                    {isJobEvent && (
                      <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                         <Button 
                          size="small" 
                          startIcon={<ExternalLink size={14} />}
                          sx={{ textTransform: 'none', p: 0 }}
                        >
                          View Job Details
                        </Button>
                      </Box>
                    )}
                  </Stack>
                </Paper>
              );
            })}

            {dayEvents.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 6, color: 'text.disabled' }}>
                <Calendar size={48} style={{ opacity: 0.1, marginBottom: 16 }} />
                <Typography variant="body2">No events for this day</Typography>
              </Box>
            )}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
