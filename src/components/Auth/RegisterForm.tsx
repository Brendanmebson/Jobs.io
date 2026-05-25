import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  IconButton, 
  InputAdornment, 
  Alert, 
  CircularProgress,
  Stack,
  Link
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import AuthLayout from './AuthLayout';

interface RegisterFormProps {
  onToggleMode: () => void;
}

const RegisterForm = ({ onToggleMode }: RegisterFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!name.trim()) {
      setError('Please enter your full name');
      setLoading(false);
      return;
    }

    if (!email.trim()) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const success = await register(name.trim(), email.trim(), password);
      if (!success) {
        setError('Registration failed');
      }
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="CREATE ACCOUNT" 
      subtitle="Join Jobs.io and start tracking your success."
      leftTitle={<>START YOUR<br />JOURNEY<br />TODAY</>}
      leftSubtitle="Create an account to centralize your search, organize company outreach, and fast-track your career."
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}>
              Full Name
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0,
                  bgcolor: 'transparent'
                }
              }}
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}>
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
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}>
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

          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}>
              Confirm Password
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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

          {error && (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ 
              py: 1.5, 
              mt: 1,
              borderRadius: 0,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              bgcolor: '#0f172a',
              '&:hover': { bgcolor: '#1e293b' }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Create account'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Already have an account?{' '}
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
                Sign in
              </Link>
            </Typography>
          </Box>
        </Stack>
      </form>
    </AuthLayout>
  );
};

export default RegisterForm;