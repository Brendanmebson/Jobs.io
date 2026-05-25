import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Typography, Paper, Button } from '@mui/material';
import { useAuth } from './hooks/useAuth';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import JobList from './components/Jobs/JobList';
import CalendarView from './components/Calendar/CalendarView';
import Documents from './components/Documents/Documents';
import Analytics from './components/Analytics/Analytics';
import Settings from './components/Settings/Settings';

const theme = createTheme({
  palette: {
    background: {
      default: '#f8fafc',
    },
    primary: {
      main: '#0f172a',
      light: '#f1f5f9',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
  },
});

function App() {
  const { isAuthenticated } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
    setMobileOpen(false); // Close drawer on mobile when view changes
  };

  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLoginMode ? (
          <LoginForm onToggleMode={() => setIsLoginMode(false)} />
        ) : (
          <RegisterForm onToggleMode={() => setIsLoginMode(true)} />
        )}
      </ThemeProvider>
    );
  }


  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'jobs':
        return <JobList />;
      case 'calendar':
        return <CalendarView />;
      case 'documents':
        return <Documents />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', maxWidth: '100vw' }}>
        <Header onMenuClick={handleDrawerToggle} />
        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', maxWidth: '100vw' }}>
          <Sidebar 
            activeView={activeView} 
            onViewChange={handleViewChange} 
            mobileOpen={mobileOpen}
            onMobileClose={handleDrawerToggle}
          />
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              minWidth: 0,
              bgcolor: 'background.default',
              overflowY: 'auto',
              height: '100%'
            }}
          >
            {renderContent()}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;