import { LogOut, Settings, Bell, Menu } from 'lucide-react';
import { AppBar, Toolbar, Box, Typography, IconButton, Badge, Avatar, Stack } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

import logo from '../../assets/radar.png';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { user, logout } = useAuth();

  return (
    <AppBar 
      position="static" 
      color="inherit" 
      elevation={0} 
      sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'white' }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 3 } }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 1, display: { md: 'none' } }}
          >
            <Menu size={24} />
          </IconButton>
          
          <Box
            component="img"
            src={logo}
            alt="Jobs.io Logo"
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1.5,
              display: { xs: 'none', sm: 'block' }
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            Jobs.io
          </Typography>
        </Stack>
        
        <Stack direction="row" spacing={{ xs: 0.5, sm: 2 }} sx={{ alignItems: 'center' }}>
          <IconButton size="small" color="inherit">
            <Badge color="error" variant="dot" overlap="circular">
              <Bell size={20} />
            </Badge>
          </IconButton>
          
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Avatar
              src={user?.avatar}
              alt={user?.name}
              sx={{ width: 32, height: 32 }}
            />
            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
              <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>
                {user?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
          </Stack>
          
          <Stack direction="row" spacing={0.5}>
            <IconButton size="small" color="inherit" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
              <Settings size={20} />
            </IconButton>
            <IconButton size="small" color="inherit" onClick={logout} sx={{ '&:hover': { color: 'error.main' } }}>
              <LogOut size={20} />
            </IconButton>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;