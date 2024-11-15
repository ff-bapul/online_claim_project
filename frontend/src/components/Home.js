import React from 'react';
import { Container, Box, Typography, Button, Stack, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Claim Submission System
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Welcome! You are logged in.
        </Typography>
        <Typography variant="body1" paragraph>
          This is your portal to manage claims and find repair centres. Select the options below to begin.
        </Typography>
      </Box>

      {/* Action Buttons with Adjusted Spacing */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
        <Box flex={1} maxWidth={300} sx={{ height: 200, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper sx={{ padding: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Claim Management
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Manage and submit your claims with ease. Track the status and progress of your claims.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/claims"
              fullWidth
              sx={{ mt: 'auto' }} // Ensures the button stays at the bottom
            >
              Go to Claims
            </Button>
          </Paper>
        </Box>

        <Box flex={1} maxWidth={300} sx={{ height: 200, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper sx={{ padding: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Repair Centre Locator
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Find the nearest repair centre to get your claims processed faster.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/repair-centre"
              fullWidth
              sx={{ mt: 'auto' }} // Ensures the button stays at the bottom
            >
              Find Repair Centres
            </Button>
          </Paper>
        </Box>
      </Stack>

    </Container>
  );
}

export default Home;
