import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  IconButton, 
  Typography,
  Slide 
} from '@mui/material';
import { CheckCircle, Error, Close } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Popup = ({ open, onClose, message, type = 'info' }) => {
  // Updated color scheme
  const getColor = () => {
    switch (type) {
      case 'success':
        return { 
          main: '#4CAF50', // Keep green for success
          light: '#E8F5E9' 
        };
      case 'error':
        return { 
          main: '#D32F2F', // Slightly darker red for better contrast
          light: '#FFEBEE' 
        };
      default:
        return { 
          main: '#002147', // Primary dark blue
          light: '#E3F2FD' // Light blue background
        };
    }
  };

  const colors = getColor();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: '12px',
          minWidth: '400px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF' // White background for the dialog
        }
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: colors.light,
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: `1px solid ${colors.main}`
        }}
      >
        {type === 'success' ? (
          <CheckCircle sx={{ color: colors.main, fontSize: '28px' }} />
        ) : (
          <Error sx={{ color: colors.main, fontSize: '28px' }} />
        )}
        <Typography
          variant="h6"
          sx={{
            color: colors.main,
            fontWeight: 600,
            flexGrow: 1
          }}
        >
          {type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Notification'}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: colors.main,
            '&:hover': {
              backgroundColor: 'rgba(0, 33, 71, 0.04)' // Primary color with opacity
            }
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ padding: '24px' }}>
        <Typography variant="body1" sx={{ color: '#002147' }}> {/* Primary text color */}
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: colors.main,
            borderRadius: '8px',
            padding: '8px 24px',
            textTransform: 'none',
            color: '#FFFFFF', // White text for buttons
            '&:hover': {
              backgroundColor: colors.main === '#002147' ? '#00122E' : colors.main, // Darker shade for hover
              opacity: 0.9
            }
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;