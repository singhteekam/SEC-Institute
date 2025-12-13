import { Box, Container, Typography, Grid, Avatar, Button, Link as MuiLink } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function DeveloperInfo() {
  return (
    <Box sx={{ py: 6, backgroundColor: '#f0f4f8' }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
          👨‍💻 Developer Info
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* Frontend Developer */}
          <Grid item xs={12} sm={6}>
            <Box textAlign="center">
              <Avatar
                src="https://avatars.githubusercontent.com/u/frontend_dev_id" // Replace with actual image or GitHub avatar
                alt="Frontend Developer"
                sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                Ankit Sharma
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Frontend Developer (React + MUI)
              </Typography>
              <Button
                startIcon={<GitHubIcon />}
                component={MuiLink}
                href="https://github.com/frontend-username"
                target="_blank"
                sx={{ mr: 1 }}
              >
                GitHub
              </Button>
              <Button
                startIcon={<LinkedInIcon />}
                component={MuiLink}
                href="https://linkedin.com/in/frontend-profile"
                target="_blank"
                sx={{ mr: 1 }}
              >
                LinkedIn
              </Button>
              <Button
                startIcon={<EmailIcon />}
                component={MuiLink}
                href="mailto:frontend@example.com"
              >
                Email
              </Button>
            </Box>
          </Grid>

          {/* Backend Developer */}
          <Grid item xs={12} sm={6}>
            <Box textAlign="center">
              <Avatar
                src="https://avatars.githubusercontent.com/u/backend_dev_id" // Replace with actual image or GitHub avatar
                alt="Backend Developer"
                sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                Rahul Verma
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Backend Developer (Node.js + MongoDB)
              </Typography>
              <Button
                startIcon={<GitHubIcon />}
                component={MuiLink}
                href="https://github.com/backend-username"
                target="_blank"
                sx={{ mr: 1 }}
              >
                GitHub
              </Button>
              <Button
                startIcon={<LinkedInIcon />}
                component={MuiLink}
                href="https://linkedin.com/in/backend-profile"
                target="_blank"
                sx={{ mr: 1 }}
              >
                LinkedIn
              </Button>
              <Button
                startIcon={<EmailIcon />}
                component={MuiLink}
                href="mailto:backend@example.com"
              >
                Email
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
