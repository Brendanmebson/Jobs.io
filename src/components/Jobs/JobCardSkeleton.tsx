import React from 'react';
import { Paper, Stack, Box, Skeleton } from '@mui/material';

const JobCardSkeleton = () => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 3,
        borderColor: 'divider',
        height: '100%',
      }}
    >
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Skeleton variant="rounded" width={48} height={48} sx={{ borderRadius: 2 }} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="70%" height={28} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="40%" height={20} />
        </Box>
      </Stack>

      <Stack spacing={1.5} sx={{ mb: 3 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Skeleton variant="circular" width={16} height={16} />
          <Skeleton variant="text" width="50%" height={20} />
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Skeleton variant="circular" width={16} height={16} />
          <Skeleton variant="text" width="40%" height={20} />
        </Stack>
      </Stack>

      <Skeleton variant="text" width="30%" height={24} sx={{ mb: 3 }} />

      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton variant="rounded" width={100} height={32} sx={{ borderRadius: 5 }} />
        <Skeleton variant="text" width="60px" height={20} />
      </Stack>

      <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
      </Box>
    </Paper>
  );
};

export default JobCardSkeleton;
