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
    <Box sx={{ 
      p: { xs: 2, sm: 3 }, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: { xs: 2, sm: 3 }, 
      maxWidth: 1000, 
      mx: 'auto', 
      width: '100%' 
    }}>
      {/* Header */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        sx={{ 
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', sm: 'center' } 
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
            Calendar
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Manage your interviews and scheduled tasks
          </Typography>
        </Box>
        <Stack 
          direction={{ xs: 'column-reverse', sm: 'row' }} 
          spacing={2} 
          sx={{ 
            alignItems: { xs: 'stretch', sm: 'center' },
            width: { xs: '100%', sm: 'auto' }
          }}
        >
          <Stack direction="row" spacing={1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={goToToday}
              sx={{ borderRadius: 2, textTransform: 'none', px: 2, flex: { xs: 1, sm: 'none' } }}
            >
              Today
            </Button>
            <Stack 
              direction="row" 
              sx={{ 
                alignItems: 'center', 
                bgcolor: 'white', 
                borderRadius: 2, 
                border: '1px solid', 
                borderColor: 'divider',
                flex: { xs: 2, sm: 'none' }
              }}
            >
              <IconButton onClick={prevMonth} size="small"><ChevronLeft size={20} /></IconButton>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, minWidth: { xs: 80, sm: 140 }, textAlign: 'center', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                {format(currentDate, 'MMM yyyy')}
              </Typography>
              <IconButton onClick={nextMonth} size="small"><ChevronRight size={20} /></IconButton>
            </Stack>
          </Stack>
          <Button 
            variant="contained" 
            fullWidth={{ xs: true, sm: false } as any}
            startIcon={<Plus size={18} />}
            sx={{ 
              borderRadius: 2, 
              textTransform: 'none', 
              bgcolor: 'primary.main',
              py: { xs: 1, sm: 0.5 },
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
            <Box key={day} sx={{ width: '14.285%', p: { xs: 1, sm: 1.5 }, textAlign: 'center' }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: { xs: 0, sm: 1 }, fontSize: { xs: '0.6rem', sm: '0.75rem' } }}>
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>{day}</Box>
                <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>{day[0]}</Box>
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
                  height: { xs: 'calc((100vh - 250px) / 6)', sm: 'calc((100vh - 280px) / 6)' },
                  borderRight: (idx + 1) % 7 === 0 ? 'none' : '1px solid',
                  borderBottom: idx >= calendarDays.length - 7 ? 'none' : '1px solid',
                  borderColor: 'divider',
                  p: { xs: 0.5, sm: 1 },
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
