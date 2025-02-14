import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const UploadIDPopup = ({ open, onClose, message, examplePhoto }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Upload Campus ID</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
        {examplePhoto && (
          <img
            src={examplePhoto}
            alt="Example Campus ID"
            style={{ width: '400px', height: '200px', marginTop: '10px', borderRadius: '8px' }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadIDPopup;