import React from 'react';
import {
  User,
  Settings,
  Bell,
  Briefcase,
  Shield,
  Eye,
  Palette,
} from 'lucide-react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from '@mui/material';

export type SettingsSection =
  | 'profile'
  | 'account'
  | 'notifications'
  | 'job-preferences'
  | 'security'
  | 'privacy'
  | 'appearance';

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}

const sectionItems: { id: SettingsSection; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'account', label: 'Account', icon: Settings },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'job-preferences', label: 'Job Preferences', icon: Briefcase },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'privacy', label: 'Privacy', icon: Eye },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

const SettingsSidebar = ({ activeSection, onSectionChange }: SettingsSidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return (
      <Box
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'white',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <Tabs
          value={activeSection}
          onChange={(_, val) => onSectionChange(val)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 48,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.85rem',
              minHeight: 48,
              px: 2,
            },
            '& .Mui-selected': {
              fontWeight: 700,
              color: 'primary.main',
            },
          }}
        >
          {sectionItems.map((item) => {
            const Icon = item.icon;
            return (
              <Tab
                key={item.id}
                value={item.id}
                icon={<Icon size={16} />}
                iconPosition="start"
                label={item.label}
              />
            );
          })}
        </Tabs>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: 240,
        minWidth: 240,
        bgcolor: 'white',
        borderRight: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        py: 2,
        px: 1.5,
        height: 'fit-content',
        position: 'sticky',
        top: 24,
      }}
    >
      <List sx={{ p: 0 }}>
        {sectionItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => onSectionChange(item.id)}
                sx={{
                  borderRadius: 2,
                  px: 2,
                  py: 1.25,
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
                    minWidth: 36,
                    color: isActive ? 'primary.main' : 'inherit',
                  }}
                >
                  <Icon size={20} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: '0.9rem',
                        fontWeight: isActive ? 700 : 500,
                        whiteSpace: 'nowrap',
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default SettingsSidebar;
