import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { 
  Box, 
  TextField, 
  Button, 
  IconButton, 
  InputAdornment, 
  Alert, 
  CircularProgress,
  Stack,
  Link,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../hooks/useAuth';
import AuthLayout from './AuthLayout';

// Google Icon Component
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.1c-.22-.66-.35-1.35-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

interface LoginFormProps {
  onToggleMode: () => void;
}

const LoginForm = ({ onToggleMode }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email.trim(), password, rememberMe);
      if (!success) {
        setError('Invalid email or password');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const success = await login('demo@jobs.io', 'password123', true); // Demo login always remembers for convenience, or false if user insists
      if (!success) setError('Demo login failed');
    } catch {
      setError('Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="WELCOME BACK !" 
      subtitle="Welcome back! Please enter your details."
      leftTitle={<>YOUR NEXT<br />ADVENTURE<br />AWAITS!</>}
      leftSubtitle="Log in to track your applications, manage interviews, and land your dream role. Whether it's tech, design, or finance."
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
              Email
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0,
                  bgcolor: 'transparent'
                }
              }}
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
              Password
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0,
                  bgcolor: 'transparent'
                }
              }}
            />
          </Box>

          <Stack sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <FormControlLabel
              control={
                <Checkbox 
                  size="small" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)} 
                  sx={{ color: 'divider' }}
                />
              }
              label={<Typography variant="body2" sx={{ fontWeight: 500 }}>Remember me</Typography>}
            />
            <Link 
              href="#" 
              variant="body2" 
              sx={{ 
                fontWeight: 600, 
                color: '#0f172a', 
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Forgot password
            </Link>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Stack spacing={2} sx={{ pt: 1 }}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ 
                py: 1.5, 
                borderRadius: 0,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                bgcolor: '#0f172a',
                '&:hover': { bgcolor: '#1e293b' }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign in'}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleDemoLogin}
              sx={{ 
                py: 1.5, 
                borderRadius: 0,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                borderColor: 'divider',
                color: 'text.primary',
                '&:hover': { borderColor: 'text.primary', bgcolor: 'transparent' }
              }}
            >
              Sign in with Google
            </Button>
            <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center', display: 'block', fontSize: '0.7rem' }}>
              Demo: demo@jobs.io / password123
            </Typography>
          </Stack>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Don't have an account?{' '}
              <Link
                component="button"
                type="button"
                onClick={onToggleMode}
                sx={{ 
                  fontWeight: 700, 
                  color: '#0f172a', 
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Stack>
      </form>
    </AuthLayout>
  );
};

export default LoginForm;