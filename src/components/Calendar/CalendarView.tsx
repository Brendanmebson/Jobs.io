import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  IconButton, 
  Button, 
  Stack, 
  Badge
} from '@mui/material';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Briefcase,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  eachDayOfInterval,
  isToday
} from 'date-fns';
import { useCalendar } from '../../hooks/useCalendar';
import EventDialog from './EventDialog';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { getEventsForDate } = useCalendar();

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setDrawerOpen(true);
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const getEventColor = (event: any) => {
    const colors = [
      '#ec4899', // Pink
      '#8b5cf6', // Purple
      '#3b82f6', // Blue
      '#10b981', // Emerald
      '#f59e0b', // Amber
      '#ef4444', // Red
      '#06b6d4', // Cyan
      '#f97316', // Orange
      '#14b8a6', // Teal
      '#84cc16'  // Lime
    ];
    let hash = 0;
    for (let i = 0; i < event.title.length; i++) {
        hash = event.title.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'interview': return <Briefcase size={10} />;
      case 'deadline': return <Clock size={10} />;
      case 'follow-up': return <AlertCircle size={10} />;
      case 'appointment': return <CheckCircle size={10} />;
      default: return null;
    }
  };

  return (
    <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 1000, mx: 'auto', width: '100%' }}>
      {/* Header */}
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>
            Calendar
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your interviews and scheduled tasks
          </Typography>
        </Box>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={goToToday}
            sx={{ borderRadius: 2, textTransform: 'none', px: 2 }}
          >
            Today
          </Button>
          <Stack direction="row" sx={{ alignItems: 'center', bgcolor: 'white', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <IconButton onClick={prevMonth} size="small"><ChevronLeft size={20} /></IconButton>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, minWidth: 140, textAlign: 'center' }}>
              {format(currentDate, 'MMMM yyyy')}
            </Typography>
            <IconButton onClick={nextMonth} size="small"><ChevronRight size={20} /></IconButton>
          </Stack>
          <Button 
            variant="contained" 
            startIcon={<Plus size={18} />}
            sx={{ 
              borderRadius: 2, 
              textTransform: 'none', 
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
            onClick={() => {
              setSelectedDate(new Date());
              setDrawerOpen(true);
            }}
          >
            New Event
          </Button>
        </Stack>
      </Stack>

      {/* Calendar Grid */}
      <Paper 
        variant="outlined" 
        sx={{ 
          flex: 1, 
          borderRadius: 4, 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'white'
        }}
      >
        {/* Day Header */}
        <Box sx={{ display: 'flex', borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'grey.50' }}>
          {dayNames.map(day => (
            <Box key={day} sx={{ width: '14.285%', p: 1.5, textAlign: 'center' }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>
                {day}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Days Grid */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', flex: 1 }}>
          {calendarDays.map((day, idx) => {
            const dayEvents = getEventsForDate(day);
            const currentMonth = isSameMonth(day, monthStart);
            const today = isToday(day);

            return (
              <Box 
                key={day.toString()} 
                sx={{ 
                  width: '14.285%',
                  height: 'calc((100vh - 280px) / 6)', // Adjust based on layout
                  borderRight: (idx + 1) % 7 === 0 ? 'none' : '1px solid',
                  borderBottom: idx >= calendarDays.length - 7 ? 'none' : '1px solid',
                  borderColor: 'divider',
                  p: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  bgcolor: !currentMonth ? '#fdfdfd' : (today ? 'primary.light' : 'transparent'),
                  '&:hover': {
                    bgcolor: today ? 'primary.light' : 'grey.50',
                  }
                }}
                onClick={() => handleDateClick(day)}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontWeight: today ? 800 : 500,
                      color: today ? 'primary.main' : (!currentMonth ? 'text.disabled' : 'text.primary'),
                      width: 24,
                      height: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      bgcolor: today ? '#e0e7ff' : 'transparent',
                    }}
                  >
                    {format(day, 'd')}
                  </Typography>
                  {dayEvents.length > 0 && (
                     <Badge 
                      badgeContent={dayEvents.length} 
                      color="primary" 
                      sx={{ 
                        '& .MuiBadge-badge': { 
                          fontSize: 10, 
                          height: 16, 
                          minWidth: 16,
                          bottom: 4,
                          right: 4
                        } 
                      }}
                    />
                  )}
                </Box>

                <Box sx={{ overflow: 'hidden', flex: 1 }}>
                  <Stack spacing={0.5}>
                    {dayEvents.slice(0, 2).map(event => (
                      <Box 
                        key={event.id}
                        sx={{ 
                          fontSize: '10px',
                          fontWeight: 600,
                          p: '2px 6px',
                          borderRadius: '4px',
                          bgcolor: `${getEventColor(event)}15`,
                          color: getEventColor(event),
                          border: `1px solid ${getEventColor(event)}30`,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}
                      >
                        {getCategoryIcon(event.category)}
                        {event.title}
                      </Box>
                    ))}
                    {dayEvents.length > 2 && (
                      <Typography variant="caption" sx={{ fontSize: '9px', fontStyle: 'italic', color: 'text.secondary', pl: 1 }}>
                        + {dayEvents.length - 2} more
                      </Typography>
                    )}
                  </Stack>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Paper>

      <EventDialog 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        date={selectedDate}
      />
    </Box>
  );
};

export default CalendarView;
