import React from 'react';
import { Box, Typography, Stack, useMediaQuery, useTheme } from '@mui/material';
import logoWhite from '../../assets/radar-white.png';
import logoColor from '../../assets/radar.png';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  leftTitle?: React.ReactNode;
  leftSubtitle?: string;
}

const AuthLayout = ({ 
  children, 
  title, 
  subtitle, 
  leftTitle = <>YOUR NEXT<br />ADVENTURE<br />AWAITS!</>,
  leftSubtitle = "Log in to track your applications, manage interviews, and land your dream role. Whether it's tech, design, or finance."
}: AuthLayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // A high-quality job-related background image
  const bgImage = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop";

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        bgcolor: 'white',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          bgcolor: 'white',
          position: 'relative'
        }}
      >
        {/* Left Panel - Atmospheric Branding */}
        {!isMobile && (
          <Box
            sx={{
              flex: 1,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              p: 6,
              color: 'white'
            }}
          >
            {/* Background Image with Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.4) 100%)',
                }
              }}
            />

            {/* Content */}
            <Stack spacing={4} sx={{ position: 'relative', height: '100%', zIndex: 1 }}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <Box
                  component="img"
                  src={logoWhite}
                  alt="Jobs.io Logo"
                  sx={{ width: 40, height: 40, borderRadius: 0 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
                  Jobs.io
                </Typography>
              </Stack>

              <Box sx={{ mt: 'auto', mb: 8 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    lineHeight: 1.1,
                    mb: 3,
                    fontSize: '3.5rem',
                    letterSpacing: -1
                  }}
                >
                  {leftTitle}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    maxWidth: 400,
                    fontSize: '1.1rem',
                    lineHeight: 1.6
                  }}
                >
                  {leftSubtitle}
                </Typography>
              </Box>

              <Box sx={{ mt: 'auto' }}>
                <Typography variant="body2" sx={{ opacity: 0.6, fontWeight: 500 }}>
                  Your journey starts here.
                </Typography>
              </Box>
            </Stack>
          </Box>
        )}

        {/* Right Panel - Form Area */}
        <Box
          sx={{
            flex: { xs: 1, md: 0.5 },
            p: { xs: 4, sm: 8, md: 10 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            bgcolor: 'white',
            height: '100%',
            overflowY: 'auto'
          }}
        >
          <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto' }}>
            <Box 
              sx={{ 
                display: { xs: 'flex', md: 'none' }, 
                justifyContent: 'center', 
                mb: 4 
              }}
            >
              <Box
                component="img"
                src={logoColor}
                alt="Jobs.io Logo"
                sx={{ width: 64, height: 64 }}
              />
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: 'text.primary',
                  mb: 1.5,
                  letterSpacing: -0.5
                }}
              >
                {title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {subtitle}
              </Typography>
            </Box>

            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
