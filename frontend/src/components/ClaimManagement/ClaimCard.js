// src/components/ClaimManagement/ClaimCard.jsx
import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

const ClaimCard = ({ claim, onUpdate, onAppeal, onCancel, onFeedback }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          Vehicle: {claim.vehicleInfo ? 
            `${claim.vehicleInfo.make} ${claim.vehicleInfo.model} (${claim.vehicleInfo.year})` : 
            'No vehicle info available'
          }
        </Typography>
        <Typography>Status: {claim.status}</Typography>
        <Typography>
          Submission Date: {new Date(claim.submissionDate).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          variant="outlined" 
          onClick={onUpdate}
        >
          Update
        </Button>
        {claim.status === 'Rejected' && (
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={onAppeal}
          >
            Appeal
          </Button>
        )}
        {claim.status === 'Completed' && (
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={onFeedback}
          >
            Feedback
          </Button>
        )}
        <Button 
          variant="outlined" 
          color="error" 
          onClick={onCancel}
        >
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};

export default ClaimCard;