import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Avatar,
  Grid,
  Box,
  Link,
  Card,
  CardContent,
  CardActions
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

import ts from "../../assets/devs/ts.jpeg"
import hs from "../../assets/devs/hs.png"



const developers = [
  {
    name: "Harendra Singh",
    role: "Frontend Developer",
    image: hs,
    // description: "Focused on building responsive, interactive UIs with React.js and MUI.",
    description: "Creative frontend developer skilled in React.js, Material UI, and responsive web design. ",
    links: {
      github: "https://github.com/imharendra",
      linkedin: "https://www.linkedin.com/in/imharendra/",
      portfolio: "https://harendra.web.app/",
      email: "mailto:imxharendra@gmail.com",
      instagram: "https://www.instagram.com/imxharendra/",
      facebook: "https://facebook.com/harendrasingh",
      blog: "https://bloggerspace.singhteekam.in/"
    }
  },
  {
    name: "Teekam Singh",
    role: "Backend Developer (6 years)",
    image: ts,
    description: "Backend specialist with expertise in Node.js, Express, and MongoDB. ",
    links: {
      portfolio: "https://www.singhteekam.in/",
      email: "mailto:singhteekam.in@gmail.com",
      instagram: "https://www.instagram.com/singh__teekam",
      linkedin: "https://www.linkedin.com/in/singhteekam/",
      github: "https://github.com/singhteekam",
      // facebook: "https://facebook.com/johndoe",
      blog: "https://bloggerspace.singhteekam.in/"
    }
  }
];

const DeveloperCard = ({ dev }) => (
  <Card sx={{ width: '100%', maxWidth: 360, mx: 'auto' }}>
    {/* <Box display="flex" justifyContent="center" mt={2} />  */}
    <Box display="flex" justifyContent="center" mt={2}>
      <Avatar src={dev.image} sx={{ width: 80, height: 80 }} />
    </Box>
    <CardContent>
      <Typography variant="h6" align="center">{dev.name}</Typography>
      <Typography variant="subtitle2" color="text.secondary" align="center">{dev.role}</Typography>
      {/* <Typography variant="subtitle2" color="text.secondary" align="left">Portfolio Website</Typography> */}
      <Typography variant="body2" sx={{ mt: 1 }}>{dev.description}</Typography>
    </CardContent>
    <CardActions sx={{ justifyContent: 'center', flexWrap: 'wrap' }}>
      <IconButton component={Link} href={dev.links.portfolio} target="_blank"><LanguageIcon /></IconButton>
      <IconButton component={Link} href={dev.links.email}><EmailIcon /></IconButton>
      <IconButton component={Link} href={dev.links.instagram} target="_blank"><InstagramIcon /></IconButton>
      <IconButton component={Link} href={dev.links.linkedin} target="_blank"><LinkedInIcon /></IconButton>
      {/* <IconButton component={Link} href={dev.links.github} target="_blank"><GitHubIcon /></IconButton> */}
      {/* <IconButton component={Link} href={dev.links.facebook} target="_blank"><FacebookIcon /></IconButton> */}
      <IconButton component={Link} href={dev.links.blog} target="_blank"><LanguageIcon fontSize="small" /></IconButton>
    </CardActions>
  </Card>
);

const DeveloperModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" px={3} pt={2}>
        <DialogTitle sx={{ m: 0, p: 0 }}>Meet the Developers</DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent>
        <Grid container spacing={4}>
          {developers.map((dev, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <DeveloperCard dev={dev} />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DeveloperModal;
