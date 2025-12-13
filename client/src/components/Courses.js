import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import coursesImage from '../assets/courses.jpeg';

export default function Courses() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Our Courses
      </Typography>

      <Box
        component="img"
        src={coursesImage}
        alt="Courses"
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: '100%',
        }}
      />
    </Container>
  );
}
