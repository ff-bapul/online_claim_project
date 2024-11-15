import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Snackbar, Alert, Container, Box, Divider, Accordion, AccordionSummary, AccordionDetails, Card, CardContent } from '@mui/material';
import { 
  fetchClaims, 
  createClaim, 
  updateClaim, 
  appealClaim, 
  cancelClaim,
  submitFeedback
} from '../../api/claimsApi';
import ClaimCard from './ClaimCard';
import ClaimDialog from './ClaimDialog';
import FeedbackDialog from './FeedbackDialog';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ClaimManagement = () => {
  const [claims, setClaims] = useState([]);
  const [vehicleInfo, setVehicleInfo] = useState({
    make: '',
    model: '',
    year: '',
    licensePlate: ''
  });
  const [step, setStep] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('create');
  const [selectedClaimId, setSelectedClaimId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);

  const loadClaims = async () => {
    try {
      const claimsData = await fetchClaims();
      setClaims(claimsData.data || []);
    } catch (error) {
      console.error('Error loading claims', error);
    }
  };

  useEffect(() => {
    loadClaims();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateVehicleInfo = () => {
    const { make, model, year, licensePlate } = vehicleInfo;
    if (!make || !model || !year || !licensePlate) {
      setError('All fields are required. Please fill out the form.');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 0 && !validateVehicleInfo()) return;
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => setStep((prevStep) => prevStep - 1);

  const openFeedbackDialog = (claimId) => {
    setSelectedClaimId(claimId);
    setIsFeedbackDialogOpen(true);
  };

  const closeFeedbackDialog = () => {
    setIsFeedbackDialogOpen(false);
  };

  const handleCreateClaim = async () => {
    if (!validateVehicleInfo()) return;

    setLoading(true);
    try {
      await createClaim(vehicleInfo);
      setSuccess('Claim created successfully!');
      closeDialog();
      loadClaims();
    } catch (error) {
      console.error("Error creating claim", error);
      setError('Failed to create the claim. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClaim = async (id) => {
    if (!validateVehicleInfo()) return;

    setLoading(true);
    try {
      await updateClaim(id, vehicleInfo);
      setSuccess('Claim updated successfully!');
      closeDialog();
      loadClaims();
    } catch (error) {
      console.error("Error updating claim", error);
      setError('Failed to update the claim. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAppealClaim = async (id) => {
    const appealMessage = prompt("Enter your appeal message:");
    if (!appealMessage) return;

    setLoading(true);
    try {
      await appealClaim(id, appealMessage);
      setSuccess('Appeal submitted successfully!');
      loadClaims();
    } catch (error) {
      console.error("Error appealing claim", error);
      setError('Failed to submit the appeal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClaim = async (id) => {
    setLoading(true);
    try {
      await cancelClaim(id);
      setSuccess('Claim canceled successfully!');
      loadClaims();
    } catch (error) {
      console.error("Error canceling claim", error);
      setError('Failed to cancel the claim. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackSubmit = async (claimId, feedback) => {
    try {
      await submitFeedback(claimId, feedback);
      setSuccess('Feedback submitted successfully!');
      loadClaims();
    } catch (error) {
      setError('Failed to submit feedback.');
    }
  };

  const openDialog = (type, claimId = null) => {
    setDialogType(type);
    setSelectedClaimId(claimId);
    setStep(0);
    setIsDialogOpen(true);

    if (type === 'update' && claimId) {
      const claimToEdit = claims.find((claim) => claim._id === claimId);
      if (claimToEdit) {
        setVehicleInfo(claimToEdit.vehicleInfo);
      }
    } else {
      resetVehicleInfo();
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    resetVehicleInfo();
  };

  const resetVehicleInfo = () => {
    setVehicleInfo({
      make: '',
      model: '',
      year: '',
      licensePlate: ''
    });
    setError('');
  };

  // Filter claims based on their status
  const pendingClaims = claims.filter((claim) => claim.status === 'Pending');
  const completedClaims = claims.filter((claim) => claim.status === 'Completed');
  const appealClaims = claims.filter((claim) => claim.status === 'Rejected');

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" gutterBottom>List of Claims</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => openDialog('create')}
          sx={{ mb: 3 }}
        >
          Submit a Claim
        </Button>
        
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="pending-claims-header">
            <Typography variant="h6">Pending Claims</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              {pendingClaims.map((claim) => (
                <Grid item xs={12} sm={6} md={4} key={claim._id}>
                  <ClaimCard
                    claim={claim}
                    onUpdate={() => openDialog('update', claim._id)}
                    onAppeal={() => handleAppealClaim(claim._id)}
                    onCancel={() => handleCancelClaim(claim._id)}
                    onFeedback={() => openFeedbackDialog(claim._id)}
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="completed-claims-header">
            <Typography variant="h6">Completed Claims</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              {completedClaims.map((claim) => (
                <Grid item xs={12} sm={6} md={4} key={claim._id}>
                  <ClaimCard
                    claim={claim}
                    onUpdate={() => openDialog('update', claim._id)}
                    onAppeal={() => handleAppealClaim(claim._id)}
                    onCancel={() => handleCancelClaim(claim._id)}
                    onFeedback={() => openFeedbackDialog(claim._id)}
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="appeals-claims-header">
            <Typography variant="h6">Appeals Claims</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              {appealClaims.map((claim) => (
                <Grid item xs={12} sm={6} md={4} key={claim._id}>
                  <ClaimCard
                    claim={claim}
                    onUpdate={() => openDialog('update', claim._id)}
                    onAppeal={() => handleAppealClaim(claim._id)}
                    onCancel={() => handleCancelClaim(claim._id)}
                    onFeedback={() => openFeedbackDialog(claim._id)}
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>

      <ClaimDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        dialogType={dialogType}
        step={step}
        onPreviousStep={handlePreviousStep}
        onNextStep={handleNextStep}
        vehicleInfo={vehicleInfo}
        onVehicleInfoChange={handleChange}
        loading={loading}
        onCreateClaim={handleCreateClaim}
        onUpdateClaim={handleUpdateClaim}
        selectedClaimId={selectedClaimId}
        error={error}
      />
      <FeedbackDialog
        isOpen={isFeedbackDialogOpen}
        onClose={closeFeedbackDialog}
        claimId={selectedClaimId}
        onSubmitFeedback={handleFeedbackSubmit}
      />
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert severity="error" onClose={() => setError('')}>{error}</Alert>
      </Snackbar>
      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
        <Alert severity="success" onClose={() => setSuccess('')}>{success}</Alert>
      </Snackbar>
    </Container>
  );
};

export default ClaimManagement;

