// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import BASE_URL from '../config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      alert("Login successful");
      window.location.reload();
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Login</Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
