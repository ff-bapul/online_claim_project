// src/components/ClaimManagement/ClaimManagement.jsx
import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid } from '@mui/material';
import { fetchClaims, createClaim, updateClaim, appealClaim, checkClaimStatus, cancelClaim } from '../../api/claimsApi';
import ClaimCard from './ClaimCard';
import ClaimDialog from './ClaimDialog';

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

  const loadClaims = async () => {
    try {
      const claimsData = await fetchClaims();
      console.log('Fetched Claims:', claimsData.data);
      setClaims(claimsData.data);
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

  const handleNextStep = () => setStep(prevStep => prevStep + 1);
  const handlePreviousStep = () => setStep(prevStep => prevStep - 1);

  const handleCreateClaim = async () => {
    setLoading(true);
    try {
      await createClaim(vehicleInfo);
      setIsDialogOpen(false);
      loadClaims();
    } catch (error) {
      console.error("Error creating claim", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClaim = async (id) => {
    setLoading(true);
    try {
      await updateClaim(id, vehicleInfo);
      setIsDialogOpen(false);
      loadClaims();
    } catch (error) {
      console.error("Error updating claim", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAppealClaim = async (id) => {
    setLoading(true);
    try {
      const appealMessage = prompt("Enter your appeal message:");
      await appealClaim(id, appealMessage);
      loadClaims();
    } catch (error) {
      console.error("Error appealing claim", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClaim = async (id) => {
    setLoading(true);
    try {
      await cancelClaim(id);
      loadClaims();
    } catch (error) {
      console.error("Error canceling claim", error);
    } finally {
      setLoading(false);
    }
  };

  const openDialog = (type, claimId = null) => {
    setDialogType(type);
    setSelectedClaimId(claimId);
    setIsDialogOpen(true);
    setStep(0);
    
    if (type === 'update' && claimId) {
      const claimToEdit = claims.find(claim => claim._id === claimId);
      if (claimToEdit) {
        setVehicleInfo(claimToEdit.vehicleInfo);
      }
    } else {
      setVehicleInfo({
        make: '',
        model: '',
        year: '',
        licensePlate: ''
      });
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setStep(0);
    setVehicleInfo({
      make: '',
      model: '',
      year: '',
      licensePlate: ''
    });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Claim Management</Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => openDialog('create')}
      >
        Create a Claim
      </Button>

      <Grid container spacing={2} mt={3}>
        {claims.map(claim => (
          <Grid item xs={12} sm={6} md={4} key={claim._id}>
            <ClaimCard
              claim={claim}
              onUpdate={() => openDialog('update', claim._id)}
              onAppeal={() => handleAppealClaim(claim._id)}
              onCancel={() => handleCancelClaim(claim._id)}
            />
          </Grid>
        ))}
      </Grid>

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
      />
    </div>
  );
};

export default ClaimManagement;