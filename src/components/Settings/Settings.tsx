import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Avatar,
  Chip,
  Divider,
  Snackbar,
  Alert,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  LinearProgress,
  InputAdornment,
} from '@mui/material';
import {
  Camera,
  Trash2,
  Upload,
  Save,
  X,
  Eye,
  EyeOff,
  Monitor,
  Sun,
  Moon,
  Download,
  FileDown,
  LogOut,
  Smartphone,
  Globe,
  CheckCircle,
  AlertCircle,
  Lock,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import SettingsSidebar, { type SettingsSection } from './SettingsSidebar';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface SettingsData {
  profile: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    bio: string;
    linkedin: string;
    github: string;
    portfolio: string;
    website: string;
  };
  account: {
    email: string;
    username: string;
  };
  notifications: {
    emailJobReminders: boolean;
    emailInterviewReminders: boolean;
    emailApplicationUpdates: boolean;
    emailWeeklySummary: boolean;
    emailProductUpdates: boolean;
    emailMarketing: boolean;
    inAppOpportunities: boolean;
    inAppStatusUpdates: boolean;
    inAppInterviews: boolean;
    inAppCalendar: boolean;
  };
  jobPreferences: {
    jobTypes: string[];
    workArrangement: string;
    locations: string;
    salaryMin: string;
    salaryMax: string;
    autoSaveJobs: boolean;
    applicationReminders: boolean;
    deadlineWarnings: boolean;
  };
  security: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    twoFactorEnabled: boolean;
  };
  privacy: {
    profileVisibility: string;
    allowDiscovery: boolean;
    allowRecruiters: boolean;
    personalizedRecs: boolean;
  };
  appearance: {
    theme: string;
    layout: string;
    defaultView: string;
    landingPage: string;
  };
}

const defaultSettings: SettingsData = {
  profile: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    bio: '',
    linkedin: '',
    github: '',
    portfolio: '',
    website: '',
  },
  account: { email: '', username: '' },
  notifications: {
    emailJobReminders: true,
    emailInterviewReminders: true,
    emailApplicationUpdates: true,
    emailWeeklySummary: true,
    emailProductUpdates: false,
    emailMarketing: false,
    inAppOpportunities: true,
    inAppStatusUpdates: true,
    inAppInterviews: true,
    inAppCalendar: true,
  },
  jobPreferences: {
    jobTypes: ['Full-Time'],
    workArrangement: 'remote',
    locations: '',
    salaryMin: '',
    salaryMax: '',
    autoSaveJobs: false,
    applicationReminders: true,
    deadlineWarnings: true,
  },
  security: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
  },
  privacy: {
    profileVisibility: 'private',
    allowDiscovery: true,
    allowRecruiters: true,
    personalizedRecs: true,
  },
  appearance: {
    theme: 'system',
    layout: 'comfortable',
    defaultView: 'dashboard',
    landingPage: 'dashboard',
  },
};

const STORAGE_KEY = 'jobsio_settings';

/* ------------------------------------------------------------------ */
/*  Reusable sub-components                                            */
/* ------------------------------------------------------------------ */
const SectionCard = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <Paper
    variant="outlined"
    sx={{
      p: { xs: 2, sm: 3 },
      borderRadius: 3,
      borderColor: 'divider',
      mb: 3,
      transition: 'box-shadow 0.2s',
      '&:hover': {
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
      },
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {subtitle}
      </Typography>
    )}
    {!subtitle && <Box sx={{ mb: 2 }} />}
    {children}
  </Paper>
);

const ToggleRow = ({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <Stack
    direction="row"
    sx={{
      justifyContent: 'space-between',
      alignItems: 'center',
      py: { xs: 1, sm: 1.5 },
      px: { xs: 0.5, sm: 1 },
      borderRadius: 2,
      transition: 'background 0.15s',
      '&:hover': { bgcolor: 'grey.50' },
    }}
  >
    <Box sx={{ mr: 2 }}>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
      {description && (
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      )}
    </Box>
    <Switch
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      size="small"
    />
  </Stack>
);

/* ------------------------------------------------------------------ */
/*  Main Settings Component                                            */
/* ------------------------------------------------------------------ */
const Settings = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);

  // Load persisted settings
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings((prev) => ({ ...prev, ...parsed }));
      } else if (user) {
        // Seed from user data
        setSettings((prev) => ({
          ...prev,
          profile: {
            ...prev.profile,
            fullName: user.name || '',
            email: user.email || '',
          },
          account: {
            ...prev.account,
            email: user.email || '',
          },
        }));
      }
    } catch {
      /* ignore */
    }
  }, [user]);

  const saveSettings = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setSnackbar({ open: true, message: 'Settings saved successfully!', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to save settings.', severity: 'error' });
    }
    setSaving(false);
  };

  const updateProfile = (field: keyof SettingsData['profile'], value: string) => {
    setSettings((s) => ({ ...s, profile: { ...s.profile, [field]: value } }));
  };
  const updateAccount = (field: keyof SettingsData['account'], value: string) => {
    setSettings((s) => ({ ...s, account: { ...s.account, [field]: value } }));
  };
  const updateNotification = (field: keyof SettingsData['notifications'], value: boolean) => {
    setSettings((s) => ({ ...s, notifications: { ...s.notifications, [field]: value } }));
  };
  const updateJobPref = (field: keyof SettingsData['jobPreferences'], value: unknown) => {
    setSettings((s) => ({
      ...s,
      jobPreferences: { ...s.jobPreferences, [field]: value },
    }));
  };
  const updateSecurity = (field: keyof SettingsData['security'], value: unknown) => {
    setSettings((s) => ({ ...s, security: { ...s.security, [field]: value } }));
  };
  const updatePrivacy = (field: keyof SettingsData['privacy'], value: unknown) => {
    setSettings((s) => ({ ...s, privacy: { ...s.privacy, [field]: value } }));
  };
  const updateAppearance = (field: keyof SettingsData['appearance'], value: string) => {
    setSettings((s) => ({ ...s, appearance: { ...s.appearance, [field]: value } }));
  };

  /* ------ Job type chip helpers ------ */
  const jobTypeOptions = ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Freelance', 'Remote'];
  const toggleJobType = (type: string) => {
    const current = settings.jobPreferences.jobTypes;
    const next = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    updateJobPref('jobTypes', next);
  };

  /* ---------------------------------------------------------------- */
  /*  Section renderers                                                */
  /* ---------------------------------------------------------------- */

  const renderProfile = () => (
    <>
      <SectionCard title="Profile Picture" subtitle="Upload a photo to personalize your account.">
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 3 }} sx={{ alignItems: 'center' }}>
          <Avatar
            src={user?.avatar}
            alt={settings.profile.fullName || user?.name}
            sx={{ width: 96, height: 96, fontSize: '2rem', bgcolor: 'primary.light', color: 'primary.main' }}
          />
          <Stack spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Upload size={16} />}
              sx={{ textTransform: 'none', borderRadius: 2 }}
            >
              Upload New Photo
            </Button>
            <Button
              size="small"
              color="error"
              startIcon={<Trash2 size={16} />}
              sx={{ textTransform: 'none', borderRadius: 2 }}
            >
              Remove Photo
            </Button>
          </Stack>
        </Stack>
      </SectionCard>

      <SectionCard title="Personal Information" subtitle="Update your personal details.">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2.5,
          }}
        >
          <TextField
            label="Full Name"
            value={settings.profile.fullName}
            onChange={(e) => updateProfile('fullName', e.target.value)}
            size="small"
            fullWidth
            required
          />
          <TextField
            label="Email Address"
            value={settings.profile.email}
            onChange={(e) => updateProfile('email', e.target.value)}
            size="small"
            fullWidth
            type="email"
            required
          />
          <TextField
            label="Phone Number"
            value={settings.profile.phone}
            onChange={(e) => updateProfile('phone', e.target.value)}
            size="small"
            fullWidth
          />
          <TextField
            label="Location"
            value={settings.profile.location}
            onChange={(e) => updateProfile('location', e.target.value)}
            size="small"
            fullWidth
            placeholder="e.g. San Francisco, CA"
          />
          <TextField
            label="Professional Title"
            value={settings.profile.title}
            onChange={(e) => updateProfile('title', e.target.value)}
            size="small"
            fullWidth
            placeholder="e.g. Senior Frontend Developer"
          />
        </Box>
        <TextField
          label="Bio / About Me"
          value={settings.profile.bio}
          onChange={(e) => updateProfile('bio', e.target.value)}
          size="small"
          fullWidth
          multiline
          rows={3}
          sx={{ mt: 2.5 }}
          placeholder="Tell us a bit about yourself..."
        />
      </SectionCard>

      <SectionCard title="Social Links" subtitle="Add your professional links.">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2.5,
          }}
        >
          <TextField
            label="LinkedIn"
            value={settings.profile.linkedin}
            onChange={(e) => updateProfile('linkedin', e.target.value)}
            size="small"
            fullWidth
            placeholder="https://linkedin.com/in/username"
          />
          <TextField
            label="GitHub"
            value={settings.profile.github}
            onChange={(e) => updateProfile('github', e.target.value)}
            size="small"
            fullWidth
            placeholder="https://github.com/username"
          />
          <TextField
            label="Portfolio Website"
            value={settings.profile.portfolio}
            onChange={(e) => updateProfile('portfolio', e.target.value)}
            size="small"
            fullWidth
            placeholder="https://portfolio.com"
          />
          <TextField
            label="Personal Website"
            value={settings.profile.website}
            onChange={(e) => updateProfile('website', e.target.value)}
            size="small"
            fullWidth
            placeholder="https://yoursite.com"
          />
        </Box>
      </SectionCard>
    </>
  );

  const renderAccount = () => (
    <>
      <SectionCard title="Email Address" subtitle="Manage your account email.">
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Current email:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {user?.email || settings.account.email}
            </Typography>
            <Chip label="Verified" size="small" color="success" variant="outlined" icon={<CheckCircle size={14} />} />
          </Stack>
          <TextField
            label="New Email Address"
            value={settings.account.email}
            onChange={(e) => updateAccount('email', e.target.value)}
            size="small"
            type="email"
            sx={{ maxWidth: 400 }}
          />
        </Stack>
      </SectionCard>

      <SectionCard title="Username" subtitle="Choose a unique username for your profile.">
        <TextField
          label="Username"
          value={settings.account.username}
          onChange={(e) => updateAccount('username', e.target.value)}
          size="small"
          sx={{ maxWidth: 400 }}
          placeholder="@username"
        />
      </SectionCard>

      <SectionCard title="Account Information" subtitle="Details about your account.">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
            gap: 2,
          }}
        >
          {[
            { label: 'Member Since', value: 'May 2026' },
            { label: 'Plan Type', value: 'Free' },
            { label: 'Account Status', value: 'Active' },
          ].map((item) => (
            <Paper
              key={item.label}
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
                borderColor: 'divider',
                textAlign: 'center',
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 700, mt: 0.5 }}>
                {item.value}
              </Typography>
            </Paper>
          ))}
        </Box>
      </SectionCard>
    </>
  );

  const renderNotifications = () => (
    <>
      <SectionCard
        title="Email Notifications"
        subtitle="Choose which emails you'd like to receive."
      >
        <Stack divider={<Divider />}>
          <ToggleRow
            label="New job reminders"
            description="Get notified about new matching jobs"
            checked={settings.notifications.emailJobReminders}
            onChange={(v) => updateNotification('emailJobReminders', v)}
          />
          <ToggleRow
            label="Interview reminders"
            description="Receive reminders before upcoming interviews"
            checked={settings.notifications.emailInterviewReminders}
            onChange={(v) => updateNotification('emailInterviewReminders', v)}
          />
          <ToggleRow
            label="Application updates"
            description="Get notified when application status changes"
            checked={settings.notifications.emailApplicationUpdates}
            onChange={(v) => updateNotification('emailApplicationUpdates', v)}
          />
          <ToggleRow
            label="Weekly activity summary"
            description="Receive a weekly digest of your activity"
            checked={settings.notifications.emailWeeklySummary}
            onChange={(v) => updateNotification('emailWeeklySummary', v)}
          />
          <ToggleRow
            label="Product updates"
            description="Learn about new features and improvements"
            checked={settings.notifications.emailProductUpdates}
            onChange={(v) => updateNotification('emailProductUpdates', v)}
          />
          <ToggleRow
            label="Marketing emails"
            description="Promotional content and offers"
            checked={settings.notifications.emailMarketing}
            onChange={(v) => updateNotification('emailMarketing', v)}
          />
        </Stack>
      </SectionCard>

      <SectionCard
        title="In-App Notifications"
        subtitle="Control in-app notification preferences."
      >
        <Stack divider={<Divider />}>
          <ToggleRow
            label="New opportunities"
            description="Alerts for new job opportunities"
            checked={settings.notifications.inAppOpportunities}
            onChange={(v) => updateNotification('inAppOpportunities', v)}
          />
          <ToggleRow
            label="Application status updates"
            description="Real-time status change notifications"
            checked={settings.notifications.inAppStatusUpdates}
            onChange={(v) => updateNotification('inAppStatusUpdates', v)}
          />
          <ToggleRow
            label="Upcoming interviews"
            description="Reminders for scheduled interviews"
            checked={settings.notifications.inAppInterviews}
            onChange={(v) => updateNotification('inAppInterviews', v)}
          />
          <ToggleRow
            label="Calendar reminders"
            description="Notifications for calendar events"
            checked={settings.notifications.inAppCalendar}
            onChange={(v) => updateNotification('inAppCalendar', v)}
          />
        </Stack>
      </SectionCard>
    </>
  );

  const renderJobPreferences = () => (
    <>
      <SectionCard
        title="Preferred Job Types"
        subtitle="Select the types of jobs you're interested in."
      >
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
          {jobTypeOptions.map((type) => {
            const selected = settings.jobPreferences.jobTypes.includes(type);
            return (
              <Chip
                key={type}
                label={type}
                onClick={() => toggleJobType(type)}
                variant={selected ? 'filled' : 'outlined'}
                color={selected ? 'primary' : 'default'}
                sx={{
                  borderRadius: 2,
                  fontWeight: selected ? 700 : 500,
                  transition: 'all 0.15s',
                  cursor: 'pointer',
                }}
              />
            );
          })}
        </Stack>
      </SectionCard>

      <SectionCard
        title="Preferred Work Arrangement"
        subtitle="Choose your ideal work setup."
      >
        <FormControl>
          <RadioGroup
            value={settings.jobPreferences.workArrangement}
            onChange={(e) => updateJobPref('workArrangement', e.target.value)}
            row
          >
            {['remote', 'hybrid', 'on-site'].map((opt) => (
              <FormControlLabel
                key={opt}
                value={opt}
                control={<Radio size="small" />}
                label={
                  <Typography variant="body2" sx={{ fontWeight: 500, textTransform: 'capitalize' }}>
                    {opt}
                  </Typography>
                }
                sx={{
                  mr: 4,
                  '& .MuiRadio-root': { p: 0.75 },
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </SectionCard>

      <SectionCard
        title="Preferred Locations"
        subtitle="Add your preferred work locations."
      >
        <TextField
          label="Locations"
          value={settings.jobPreferences.locations}
          onChange={(e) => updateJobPref('locations', e.target.value)}
          size="small"
          fullWidth
          placeholder="e.g. San Francisco, New York, London"
          helperText="Separate multiple locations with commas"
        />
      </SectionCard>

      <SectionCard
        title="Salary Expectations"
        subtitle="Set your expected salary range (optional)."
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label="Minimum Salary"
            value={settings.jobPreferences.salaryMin}
            onChange={(e) => updateJobPref('salaryMin', e.target.value)}
            size="small"
            type="number"
            placeholder="50000"
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }
            }}
            sx={{ maxWidth: 220 }}
          />
          <TextField
            label="Maximum Salary"
            value={settings.jobPreferences.salaryMax}
            onChange={(e) => updateJobPref('salaryMax', e.target.value)}
            size="small"
            type="number"
            placeholder="120000"
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }
            }}
            sx={{ maxWidth: 220 }}
          />
        </Stack>
      </SectionCard>

      <SectionCard
        title="Default Application Settings"
        subtitle="Customize default behaviors for your job applications."
      >
        <Stack divider={<Divider />}>
          <ToggleRow
            label="Automatically save new jobs"
            description="New matching jobs will be added to your saved list"
            checked={settings.jobPreferences.autoSaveJobs}
            onChange={(v) => updateJobPref('autoSaveJobs', v)}
          />
          <ToggleRow
            label="Application reminders"
            description="Get reminders to follow up on applications"
            checked={settings.jobPreferences.applicationReminders}
            onChange={(v) => updateJobPref('applicationReminders', v)}
          />
          <ToggleRow
            label="Deadline warnings"
            description="Receive warnings about approaching deadlines"
            checked={settings.jobPreferences.deadlineWarnings}
            onChange={(v) => updateJobPref('deadlineWarnings', v)}
          />
        </Stack>
      </SectionCard>
    </>
  );

  const renderSecurity = () => (
    <>
      <SectionCard
        title="Password Management"
        subtitle="Update your account password."
      >
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <TextField
            label="Current Password"
            type={showCurrentPw ? 'text' : 'password'}
            value={settings.security.currentPassword}
            onChange={(e) => updateSecurity('currentPassword', e.target.value)}
            size="small"
            fullWidth
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowCurrentPw(!showCurrentPw)} edge="end">
                      {showCurrentPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
          />
          <TextField
            label="New Password"
            type={showNewPw ? 'text' : 'password'}
            value={settings.security.newPassword}
            onChange={(e) => updateSecurity('newPassword', e.target.value)}
            size="small"
            fullWidth
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowNewPw(!showNewPw)} edge="end">
                      {showNewPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={settings.security.confirmPassword}
            onChange={(e) => updateSecurity('confirmPassword', e.target.value)}
            size="small"
            fullWidth
          />
          <Button
            variant="contained"
            startIcon={<Lock size={16} />}
            sx={{ textTransform: 'none', borderRadius: 2, alignSelf: 'flex-start' }}
          >
            Update Password
          </Button>
        </Stack>
      </SectionCard>

      <SectionCard
        title="Two-Factor Authentication"
        subtitle="Add an extra layer of security to your account."
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Status:
          </Typography>
          <Chip
            label={settings.security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
            color={settings.security.twoFactorEnabled ? 'success' : 'default'}
            size="small"
            variant="outlined"
            icon={settings.security.twoFactorEnabled ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
          />
        </Stack>
        <FormControlLabel
          control={
            <Switch
              checked={settings.security.twoFactorEnabled}
              onChange={(e) => updateSecurity('twoFactorEnabled', e.target.checked)}
              size="small"
            />
          }
          label={
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {settings.security.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </Typography>
          }
        />
      </SectionCard>

      <SectionCard
        title="Active Sessions"
        subtitle="Manage your active sessions across devices."
      >
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            borderRadius: 2,
            borderColor: 'divider',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              p: 1.25,
              borderRadius: 2,
              bgcolor: '#f0fdf4',
              color: '#16a34a',
              display: 'flex',
            }}
          >
            <Monitor size={20} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Current Device
              </Typography>
              <Chip label="Active" size="small" color="success" sx={{ height: 20, fontSize: '0.7rem' }} />
            </Stack>
            <Typography variant="caption" color="text.secondary">
              macOS • Chrome • Last active: Just now
            </Typography>
          </Box>
        </Paper>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            borderRadius: 2,
            borderColor: 'divider',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              p: 1.25,
              borderRadius: 2,
              bgcolor: 'grey.50',
              color: 'text.secondary',
              display: 'flex',
            }}
          >
            <Smartphone size={20} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              iPhone 15
            </Typography>
            <Typography variant="caption" color="text.secondary">
              iOS • Safari • Last active: 2 hours ago
            </Typography>
          </Box>
        </Paper>
        <Button
          variant="outlined"
          color="error"
          size="small"
          startIcon={<LogOut size={16} />}
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          Sign Out Other Sessions
        </Button>
      </SectionCard>
    </>
  );

  const renderPrivacy = () => (
    <>
      <SectionCard
        title="Profile Visibility"
        subtitle="Control who can see your profile."
      >
        <FormControl>
          <RadioGroup
            value={settings.privacy.profileVisibility}
            onChange={(e) => updatePrivacy('profileVisibility', e.target.value)}
          >
            {[
              {
                value: 'public',
                label: 'Public',
                desc: 'Anyone can view your profile',
                icon: <Globe size={18} />,
              },
              {
                value: 'private',
                label: 'Private',
                desc: 'Only you can view your profile',
                icon: <Lock size={18} />,
              },
            ].map((opt) => (
              <Paper
                key={opt.value}
                variant="outlined"
                sx={{
                  p: 2,
                  mb: 1.5,
                  borderRadius: 2,
                  borderColor:
                    settings.privacy.profileVisibility === opt.value
                      ? 'primary.main'
                      : 'divider',
                  borderWidth: settings.privacy.profileVisibility === opt.value ? 2 : 1,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  '&:hover': { borderColor: 'primary.light' },
                }}
                onClick={() => updatePrivacy('profileVisibility', opt.value)}
              >
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Radio
                    checked={settings.privacy.profileVisibility === opt.value}
                    value={opt.value}
                    size="small"
                  />
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1.5,
                      bgcolor:
                        settings.privacy.profileVisibility === opt.value
                          ? 'primary.light'
                          : 'grey.50',
                      color:
                        settings.privacy.profileVisibility === opt.value
                          ? 'primary.main'
                          : 'text.secondary',
                      display: 'flex',
                    }}
                  >
                    {opt.icon}
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {opt.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {opt.desc}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            ))}
          </RadioGroup>
        </FormControl>
      </SectionCard>

      <SectionCard
        title="Data Preferences"
        subtitle="Manage how your data is used."
      >
        <Stack divider={<Divider />}>
          <ToggleRow
            label="Allow profile discovery"
            description="Let others find your profile through search"
            checked={settings.privacy.allowDiscovery}
            onChange={(v) => updatePrivacy('allowDiscovery', v)}
          />
          <ToggleRow
            label="Allow recruiters to contact me"
            description="Recruiters can reach out with opportunities"
            checked={settings.privacy.allowRecruiters}
            onChange={(v) => updatePrivacy('allowRecruiters', v)}
          />
          <ToggleRow
            label="Personalized recommendations"
            description="Get job recommendations based on your activity"
            checked={settings.privacy.personalizedRecs}
            onChange={(v) => updatePrivacy('personalizedRecs', v)}
          />
        </Stack>
      </SectionCard>

      <SectionCard
        title="Data Management"
        subtitle="Download or export your account data."
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            variant="outlined"
            startIcon={<Download size={16} />}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            Download My Data
          </Button>
          <Button
            variant="outlined"
            startIcon={<FileDown size={16} />}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            Export Account Data
          </Button>
        </Stack>
      </SectionCard>
    </>
  );

  const renderAppearance = () => {
    const themeOptions = [
      { value: 'light', label: 'Light', icon: <Sun size={24} />, desc: 'Clean light interface' },
      { value: 'dark', label: 'Dark', icon: <Moon size={24} />, desc: 'Easy on the eyes' },
      { value: 'system', label: 'System', icon: <Monitor size={24} />, desc: 'Match your device' },
    ];

    return (
      <>
        <SectionCard title="Theme Selection" subtitle="Choose your preferred theme.">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
            {themeOptions.map((opt) => (
              <Paper
                key={opt.value}
                variant="outlined"
                onClick={() => updateAppearance('theme', opt.value)}
                sx={{
                  p: 3,
                  borderRadius: 2.5,
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderColor: settings.appearance.theme === opt.value ? 'primary.main' : 'divider',
                  borderWidth: settings.appearance.theme === opt.value ? 2 : 1,
                  bgcolor: settings.appearance.theme === opt.value ? 'primary.light' : 'transparent',
                  transition: 'all 0.15s',
                  '&:hover': {
                    borderColor: 'primary.light',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  },
                }}
              >
                <Box
                  sx={{
                    color: settings.appearance.theme === opt.value ? 'primary.main' : 'text.secondary',
                    mb: 1.5,
                  }}
                >
                  {opt.icon}
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {opt.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {opt.desc}
                </Typography>
              </Paper>
            ))}
          </Box>
        </SectionCard>

        <SectionCard title="Interface Preferences" subtitle="Adjust the layout density.">
          <FormControl>
            <RadioGroup
              value={settings.appearance.layout}
              onChange={(e) => updateAppearance('layout', e.target.value)}
              row
            >
              {['compact', 'comfortable'].map((opt) => (
                <FormControlLabel
                  key={opt}
                  value={opt}
                  control={<Radio size="small" />}
                  label={
                    <Typography variant="body2" sx={{ fontWeight: 500, textTransform: 'capitalize' }}>
                      {opt} Layout
                    </Typography>
                  }
                  sx={{ mr: 4 }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </SectionCard>

        <SectionCard title="Dashboard Preferences" subtitle="Personalize your dashboard experience.">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>Default Dashboard View</InputLabel>
              <Select
                value={settings.appearance.defaultView}
                onChange={(e) => updateAppearance('defaultView', e.target.value)}
                label="Default Dashboard View"
              >
                <MenuItem value="dashboard">Overview</MenuItem>
                <MenuItem value="jobs">Jobs List</MenuItem>
                <MenuItem value="analytics">Analytics</MenuItem>
                <MenuItem value="calendar">Calendar</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Landing Page After Login</InputLabel>
              <Select
                value={settings.appearance.landingPage}
                onChange={(e) => updateAppearance('landingPage', e.target.value)}
                label="Landing Page After Login"
              >
                <MenuItem value="dashboard">Dashboard</MenuItem>
                <MenuItem value="jobs">Jobs</MenuItem>
                <MenuItem value="calendar">Calendar</MenuItem>
                <MenuItem value="analytics">Analytics</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </SectionCard>
      </>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfile();
      case 'account':
        return renderAccount();
      case 'notifications':
        return renderNotifications();
      case 'job-preferences':
        return renderJobPreferences();
      case 'security':
        return renderSecurity();
      case 'privacy':
        return renderPrivacy();
      case 'appearance':
        return renderAppearance();
      default:
        return renderProfile();
    }
  };

  const sectionTitles: Record<SettingsSection, string> = {
    profile: 'Profile Settings',
    account: 'Account Settings',
    notifications: 'Notification Preferences',
    'job-preferences': 'Job Preferences',
    security: 'Security Settings',
    privacy: 'Privacy Settings',
    appearance: 'Appearance',
  };

  return (
    <Box sx={{ p: { xs: 2.5, sm: 3 }, flexGrow: 1, maxWidth: 1200, mx: 'auto', width: '100%' }}>
      {/* Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 4 }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
            Settings
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            Manage your account and preferences.
          </Typography>
        </Box>
      </Stack>

      {/* Mobile sidebar (rendered above content) */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 3 }}>
        <SettingsSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      </Box>

      {/* Two-column layout */}
      <Stack direction="row" spacing={3}>
        {/* Desktop sidebar */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <SettingsSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        </Box>

        {/* Content area */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Section subtitle header */}
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
            {sectionTitles[activeSection]}
          </Typography>

          {renderSection()}

          {/* Save / Cancel bar */}
          {saving && <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />}
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 3,
              borderColor: 'divider',
              display: 'flex',
              flexDirection: { xs: 'column-reverse', sm: 'row' },
              justifyContent: 'flex-end',
              gap: 1.5,
              position: 'sticky',
              bottom: 16,
              bgcolor: 'white',
              zIndex: 5,
              boxShadow: '0 -10px 20px rgba(0,0,0,0.02)'
            }}
          >
            <Button
              variant="outlined"
              fullWidth={{ xs: true, sm: false } as any}
              startIcon={<X size={16} />}
              sx={{ textTransform: 'none', borderRadius: 2, px: 3 }}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              fullWidth={{ xs: true, sm: false } as any}
              startIcon={<Save size={16} />}
              onClick={saveSettings}
              disabled={saving}
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                px: 3,
                bgcolor: 'primary.main',
              }}
            >
              Save Changes
            </Button>
          </Paper>
        </Box>
      </Stack>

      {/* Feedback snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
