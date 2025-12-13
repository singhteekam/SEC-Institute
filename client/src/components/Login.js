import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
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
import LockOpenIcon from '@mui/icons-material/LockOpen';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate= useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }
    
    try {
      const response= await axios.post('/api/admin/login', {
        email,
        password,
      });
      if (response.status !== 200) {
        toast.error("Login failed, please check your credentials.");
        throw new Error('Login failed. Please check your credentials.');
      }
      // Assuming the response contains a token or user data
      const { token, user } = response.data;  
      localStorage.setItem('token', token); // Store token for future requests
      localStorage.setItem('user', JSON.stringify(user)); // Store user data
      console.log(localStorage.getItem('user'))
      setTimeout(()=>{
        navigate('/');
      },[500])

    } catch (error) {
      toast.error(`Login failed: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  const handleReset = () => {
    setFormData({
      email: '',
      password: '',
    });
  };

  const handleForgotPassword = () => {
    toast.info('Redirect to forgot password...');
    // Replace with actual navigation or modal
  };

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      <Paper elevation={6} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: 'secondary.main', mb: 2 }}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5" gutterBottom>
            Admin Login
          </Typography>

          <Box component="form" onSubmit={handleLogin} width="100%">
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

            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ borderRadius: 2 }}
              >
                Login
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

            {/* <Button
              onClick={()=>navigate("/signup")}
              fullWidth
              variant="text"
              sx={{ mt: 2, }}
            >
              Create a new account
            </Button> */}

            {/* <Button
              onClick={handleForgotPassword}
              fullWidth
              variant="text"
            >
              Forgot Password?
            </Button> */}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
