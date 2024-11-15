import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Stepper, Step, StepLabel, CircularProgress,
  Select, MenuItem, Typography, Box, Grid, TextField
} from '@mui/material';

const getYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 20; i++) {
    years.push(currentYear - i);
  }
  return years;
};

const ClaimDialog = ({
  isOpen,
  onClose,
  dialogType,
  step,
  onPreviousStep,
  onNextStep,
  vehicleInfo,
  onVehicleInfoChange,
  loading,
  onCreateClaim,
  onUpdateClaim,
  selectedClaimId
}) => {
  const years = getYears();

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {dialogType === 'create' ? 'Create New Claim' :
          dialogType === 'update' ? 'Update Claim' : 'Claim Details'}
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={step} alternativeLabel>
          <Step>
            <StepLabel>Vehicle Information</StepLabel>
          </Step>
          {(dialogType === 'create' || dialogType === 'update') && (
            <Step>
              <StepLabel>Review Details</StepLabel>
            </Step>
          )}
        </Stepper>

        {step === 0 && (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Enter Vehicle Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Make"
                  name="make"
                  value={vehicleInfo.make || ''}
                  onChange={onVehicleInfoChange}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Model"
                  name="model"
                  value={vehicleInfo.model || ''}
                  onChange={onVehicleInfoChange}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  value={vehicleInfo.year || ''}
                  name="year"
                  onChange={onVehicleInfoChange}
                  displayEmpty
                  margin="dense"
                >
                  <MenuItem value="" disabled>Select Year</MenuItem>
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="License Plate"
                  name="licensePlate"
                  value={vehicleInfo.licensePlate || ''}
                  onChange={onVehicleInfoChange}
                  margin="dense"
                />
              </Grid>
            </Grid>
          </Box>
        )}

        {step === 1 && (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Review Vehicle Details
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(vehicleInfo).map(([key, value]) => (
                <Grid item xs={12} key={key}>
                  <Typography variant="body1">
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value || 'N/A'}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Button
          onClick={onPreviousStep}
          disabled={step === 0}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box>
          {step === 1 && dialogType === 'create' && (
            <Button
              onClick={onCreateClaim}
              color="primary"
              variant="contained"
              disabled={loading}
              sx={{ mr: 1 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Claim'}
            </Button>
          )}
          {step === 1 && dialogType === 'update' && (
            <Button
              onClick={() => onUpdateClaim(selectedClaimId)}
              color="primary"
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Update Claim'}
            </Button>
          )}
          <Button
            onClick={onNextStep}
            disabled={step === 1}
            sx={{ ml: 1 }}
          >
            Next
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ClaimDialog;
