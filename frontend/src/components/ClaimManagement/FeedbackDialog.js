import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const FeedbackDialog = ({ isOpen, onClose, onSubmitFeedback, claimId }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (feedback.trim() !== '') {
      onSubmitFeedback(claimId, feedback);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Submit Feedback</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Feedback"
          multiline
          rows={10}
          cols={20}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackDialog;
