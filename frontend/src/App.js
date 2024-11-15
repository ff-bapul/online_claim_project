import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ClaimManagement from './components/ClaimManagement/index';
import RepairCentreLocator from './components/RepairCentreLocator';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  const username = localStorage.getItem('username'); // Assuming you store the username in localStorage
  const [mobileOpen, setMobileOpen] = useState(false); // State for mobile menu

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload();
  };

  // Handle mobile drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Drawer content for mobile
  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem button component={Link} to="/" onClick={() => setMobileOpen(false)}>
          <ListItemText primary="Home" />
        </ListItem>
        {!isAuthenticated && (
          <>
            <ListItem button component={Link} to="/login" onClick={() => setMobileOpen(false)}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/register" onClick={() => setMobileOpen(false)}>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
        {isAuthenticated && (
          <>
            <ListItem button component={Link} to="/claims" onClick={() => setMobileOpen(false)}>
              <ListItemText primary="Claims" />
            </ListItem>
            <ListItem button component={Link} to="/repair-centre" onClick={() => setMobileOpen(false)}>
              <ListItemText primary="Repair Centre" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Router>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Claim Submission System
          </Typography>

          {/* Mobile menu icon */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{
              display: { xs: 'block', sm: 'none' }, // Show only on small screens
            }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* Links for large screens */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Button color="inherit" component={Link} to="/">Home</Button>

            {!isAuthenticated && (
              <>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/register">Register</Button>
              </>
            )}

            {isAuthenticated && (
              <>
                <Button color="inherit" component={Link} to="/claims">Claims</Button>
                <Button color="inherit" component={Link} to="/repair-centre">Repair Centre</Button>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile view */}
      <Drawer
        sx={{
          display: { xs: 'block', sm: 'none' }, // Show only on small screens
        }}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
      >
        {drawer}
      </Drawer>

      <Container component="main" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/claims" element={isAuthenticated ? <ClaimManagement /> : <Navigate to="/login" />} />
          <Route path="/repair-centre" element={isAuthenticated ? <RepairCentreLocator /> : <Navigate to="/login" />} />
        </Routes>
      </Container>

      {/* Footer at the end */}
      <Box component="footer" sx={{ bgcolor: 'background.paper', p: 3, textAlign: 'center', marginTop: '280px' }}>
        <Typography variant="body2" color="textSecondary">
          © 2024 Claim Submission System. All rights reserved.
        </Typography>
      </Box>
    </Router>
  );
}

export default App;
