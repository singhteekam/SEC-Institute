import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Fade, Container, Grid, Button, Avatar, Link as MuiLink } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import EmailIcon from '@mui/icons-material/Email';
import './styles/style.css'; 
import logo from '../assets/logo.png';

import img1 from '../assets/img1.jpeg';
import img2 from '../assets/img2.jpeg';
import img3 from '../assets/img3.jpeg'; 
import img4 from '../assets/img4.jpeg';
import img5 from '../assets/img5.jpeg';
import img6 from '../assets/img6.jpeg';
import img7 from '../assets/img7.jpeg';
import img8 from '../assets/img8.jpeg';
import img9 from '../assets/img9.jpeg';
import img10 from '../assets/img10.jpeg';
import img11 from '../assets/img11.jpeg';
import img12 from '../assets/img12.jpeg';
import DeveloperInfo from './DeveloperInfo';

const galleryImages = [
  img1,
  img2, img3,img4, img5, img6, img7, img8, img9, img10, img11, img12
];

export default function Homepage() {
  const [current, setCurrent] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % galleryImages.length);
        setFadeIn(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      setFadeIn(true);
    }, 300);
  };

  const handleNext = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % galleryImages.length);
      setFadeIn(true);
    }, 300);
  };

  return (
    <>
    
    <Box sx={{ position: 'relative', width: '100%', mt: 2 }}>
      <Fade in={fadeIn} timeout={500}>
        <Box
          component="img"
          src={galleryImages[current]}
          alt={`Gallery Image ${current + 1}`}
          sx={{ width: '100%', height: '70vh', objectFit: 'cover' }}
        />
      </Fade>

      <IconButton onClick={handlePrev} sx={{ position: 'absolute', top: '50%', left: 10, color: 'white', zIndex: 2 }}>
        <ArrowBackIos />
      </IconButton>

      <IconButton onClick={handleNext} sx={{ position: 'absolute', top: '50%', right: 10, color: 'white', zIndex: 2 }}>
        <ArrowForwardIos />
      </IconButton>

      <Box sx={{ textAlign: 'center', mt: 1 }}>
        {galleryImages.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrent(index)}
            sx={{
              display: 'inline-block',
              width: 10,
              height: 10,
              mx: 0.5,
              borderRadius: '50%',
              backgroundColor: current === index ? '#1976d2' : '#ccc',
              cursor: 'pointer'
            }}
          />
        ))}
      </Box>

    
    </Box>

    {/* ABOUT SEC INSTITUTE SECTION */}
      <div id="aboutsec">
          <Box sx={{ py: 6, backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <img
                src={logo} // Replace with your actual image path
                alt="About SEC Institute"
                style={{ width: '80px', borderRadius: 12 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                About SEC Institute
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Somnath Education & Computer Institute (SEC Institute) is a dedicated hub for quality computer and technical education. 
                We aim to provide affordable and industry-relevant courses to students in both urban and rural regions. Our curriculum includes diploma programs, short-term certifications, and skill development training designed to meet real-world demands.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Our goal is to empower youth through digital literacy and hands-on experience. With experienced faculty and structured training, SEC Institute is paving the path to a brighter future for learners.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      </div>

      {/* DEVELOPER INFO SECTION */}
      {/* <DeveloperInfo /> */}
    </>
  );
}