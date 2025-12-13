// components/VisitorBadge.js
import React, { useEffect, useState } from 'react';
import { Box, Chip, useTheme } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import axios from 'axios';

export default function VisitorBadge() {
  const [count, setCount] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await axios.get('/api/visitors/getvisitors');
        setCount(res.data.count);
      } catch (err) {
        console.error('Error fetching visitor count:', err);
      }
    };

    fetchVisitors();
  }, []);

  return (
    <Box>
      <Chip
        icon={<GroupIcon />}
        label={`Visitors: ${count !== null ? count : '1'}`}
        sx={{
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.getContrastText(theme.palette.secondary.main),
          fontWeight: 'bold',
          // fontSize: '1rem',
          px: 0.5,
        }}
      />
    </Box>
  );
}
