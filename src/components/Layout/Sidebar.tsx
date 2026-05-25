import React from 'react';
import { LayoutDashboard, Briefcase, Calendar, FileText, BarChart3, Settings } from 'lucide-react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer, Typography } from '@mui/material';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const Sidebar = ({ activeView, onViewChange, mobileOpen, onMobileClose }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const drawerContent = (
    <List sx={{ p: 0 }}>
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;

        return (
          <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => onViewChange(item.id)}
              sx={{
                borderRadius: 2,
                px: 2,
                py: 1.25,
                display: 'flex',
                justifyContent: 'flex-start',
                bgcolor: isActive ? 'primary.light' : 'transparent',
                color: isActive ? 'primary.main' : 'text.secondary',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: isActive ? 'primary.light' : 'grey.50',
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: isActive ? 'primary.main' : 'inherit',
                  justifyContent: 'center',
                }}
              >
                <Icon size={24} />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: '1rem',
                      fontWeight: isActive ? 900 : 500,
                      whiteSpace: 'nowrap',
                    }
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250, p: 2 },
        }}
      >
        <Box sx={{ mb: 4, mt: 2, px: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Jobs.io
          </Typography>
        </Box>
        {drawerContent}
      </Drawer>

      {/* Desktop Sidebar */}
      <Box
        component="aside"
        sx={{
          width: 230,
          minWidth: 230,
          flexShrink: 0,
          bgcolor: 'white',
          borderRight: '1px solid',
          borderColor: 'divider',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          py: 4,
          px: 2,
          overflowY: 'auto',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {drawerContent}
      </Box>
    </>
  );
};

export default Sidebar;