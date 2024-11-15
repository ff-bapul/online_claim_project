// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import BASE_URL from '../config';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/auth/register`, { email, password });
      alert("Registration successful");
      navigate('/login');
    } catch (error) {
      alert("Error registering user");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <Typography variant="h5" gutterBottom>Register</Typography>
        <form onSubmit={handleRegister} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            margin="normal"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Register</Button>
        </form>
      </Box>
    </Container>
  );
}

export default Register;
