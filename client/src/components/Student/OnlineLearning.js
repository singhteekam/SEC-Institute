import React from 'react';
import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate } from 'react-router-dom';

export default function OnlineLearning() {
  const theme = useTheme();
  const navigate = useNavigate();

  const youtubeChannelUrl = "https://youtube.com/@somnatheducationcomputerin9400?si=bWw-sWGbs2vHa7uw"; // Replace with your actual channel URL

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Box
        textAlign="center"
        sx={{
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: 4,
          p: 4,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
          📺 Online Learning Portal
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          Learn anytime, anywhere with our free online learning resources.
          Subscribe to our YouTube channel for video lectures and tutorials.
        </Typography>

        {/* YouTube Embed */}
        <Box
          sx={{
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
            overflow: "hidden",
            borderRadius: 3,
            mb: 3,
            boxShadow: 3,
          }}
        >

            {/* <iframe width="914" height="514" src="https://www.youtube.com/embed/CfnMMYm0_H0" title="BASIC COMPUTER CONCEPT l FILMED BY AKASK KUMAR l ACT BY DAULAT" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
            
          <iframe
            title="Online Learning Channel"
            src="https://www.youtube.com/embed/CfnMMYm0_H0"
            // src="https://www.youtube.com/embed?listType=user_uploads&list=yourchannelname"
            frameBorder="0"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: 8,
            }}
          />
        </Box>

        {/* Button to YouTube */}
        <Button
          variant="contained"
          color="error"
          startIcon={<YouTubeIcon />}
          href={youtubeChannelUrl}
          target="_blank"
          sx={{ mr: 2 }}
        >
          Visit YouTube Channel
        </Button>

        {/* Optional Navigation Button */}
        <Button variant="outlined" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}
