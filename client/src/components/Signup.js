import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Avatar,
  Paper,
  Stack,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate= useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
       const response= await axios.post('/api/admin/signup', {
        fullName,
        email,
        password,
        confirmPassword,
      });
      if (response.status === 201) {
        toast.success('Sign up successful! Welcome aboard!');
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        toast.error(response.data.message || 'Sign up failed. Please try again.');
      }
    } catch (error) {
      toast.error(`Sign up failed..: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    toast.info('');
  };

  const handleForgotPassword = () => {
    toast.info('Redirect to Forgot Password flow...');
  };

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      <Paper elevation={6} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" gutterBottom>
            Student Sign Up
          </Typography>

          <Box component="form" onSubmit={handleSubmit} width="100%">
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
            />


            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ borderRadius: 2 }}
              >
                Sign Up
              </Button>
              <Button
                onClick={handleReset}
                fullWidth
                variant="outlined"
                sx={{ borderRadius: 2 }}
              >
                Reset
              </Button>
            </Stack>

            <Button
              onClick={()=>navigate("/login")}
              fullWidth
              variant="text"
              sx={{ mt: 2 }}
            >
              Already have an account? Sign in
            </Button>
            <Button
              onClick={handleForgotPassword}
              fullWidth
              variant="text"
            >
              Forgot Password?
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
