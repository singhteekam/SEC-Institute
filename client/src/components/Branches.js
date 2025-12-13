import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const branches = [
  'Somnath marriage home NH-19, MATHURA - 281006',
  'Mant Mathura',
  'Natwar Nagar Dholi pyau Mathura',
  'Narholi Mathura',
  'AGRA'
];

export default function Branches() {
  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" gutterBottom>
        Our Branches
      </Typography>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: '#f8f9fa' }}>
        <Box component="ol" sx={{ pl: 3, m: 0 }}>
          {branches.map((branch, index) => (
            <li key={index}>
              <Typography
                variant="body1"
                sx={{
                  mb: 1.5,
                  color: '#333',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'primary.main',
                    pl: 1,
                  },
                }}
              >
                {branch}
              </Typography>
            </li>
          ))}
        </Box>
      </Paper>
    </Container>
  );
}
