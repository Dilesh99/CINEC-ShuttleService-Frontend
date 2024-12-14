
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { CssBaseline, Button, Typography, Box, Checkbox, FormControlLabel, TextField, Paper } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

function ShuttleService2() {
  const [selectedReasons, setSelectedReasons] = useState([]);

  const handleCheckboxChange = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]
    );
  };


  return (
    <>
    <CssBaseline />
    
    <Box display="flex" justifyContent="center" 
    sx={{
      backgroundColor: '#47758C',
      p: { xs: 2, sm: 4, md: 7.4 },
      mt:'-3%',
      mb:'-10%',
      }}>
      <Box sx={{ width: '100%', maxWidth: '1440px' }}>
        {/* Logo */}
        <Box
          component="img"
          src="/src/assets/W-PNG.png"
          alt="CINEC Logo"
          sx={{
            height: { xs: '30px', sm: '40px', md: '40px', lg: '40px' },
         
          }}
        />

        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem', lg: '2.5rem' },
            color: '#ffffff',
            mb: 1.5,
          }}
        >
          SHUTTLE - GAMPAHA 1
        </Typography>

        <Box display="flex" justifyContent="center" sx={{ backgroundColor: '#47758C' }}>
          <Paper elevation={3} sx={{ width: '100%', maxWidth: '1500px', borderRadius: '10px' }}>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
              {/* Left Section */}
              <Box
                sx={{
                  borderTopLeftRadius:10,
                  borderBottomLeftRadius:10,
                  flex: 1.4,
                  backgroundColor: '#022E61',
                  color: '#fff',
                
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >

                <Box
                  sx={{
                    borderTopLeftRadius:10,
                    borderBottomLeftRadius:10,
                    position: 'relative',
                    width: '100%',
                    height: '535px',
                    overflow: 'hidden',
                    
                  
                  }}
                >
                   <Button href='/shuttleService'
        variant="contained"
        sx={{
          position: 'absolute', // Position it relative to the map container
          top: '10px', // Offset from the bottom edge
          left: '10px', // Offset from the right edge
          backgroundColor: '#022E61', // Button styling
          color: '#ffffff',
          fontWeight: 'bold',
          borderRadius:'20px',
          '&:hover': { backgroundColor: '#d9d9d9' },
        }}
      >
       Turn off
      </Button>
                
                  
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31724.940489733215!2d79.9528444!3d6.9110197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMzkuNyJOIDc5wrA1NyAwMy40IkU!5e0!3m2!1sen!2slk!4v1698535609472!5m2!1sen!2slk"
                    width="100%"
                    height="300%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  > </iframe>
               
                  
               
                  </Box>
                 
              </Box>

              {/* Right Section */}
              <Box sx={{
                borderTopRightRadius:10,
                borderBottomRightRadius:10,
                flex: 1,
                backgroundColor: '#ffffff', 
                p: 4 }}>
                <Typography variant="h6" gutterBottom>
                  <EditIcon /> Add a note
                </Typography>

                <Box mb={2}>
                  {[
                    'The shuttle will depart from Malabe in 10 mins',
                    'Just started the journey',
                    'The bus will be a little late due to reasonable cause',
                    'The bus will be delayed due to an emergency',
                    'The shuttle schedule is cancelled due to an inconvenient reason',
                    'The bus is packed, so try the next turn',
                    'Other',
                  ].map((reason, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={selectedReasons.includes(reason)}
                          onChange={() => handleCheckboxChange(reason)}
                        />
                      }
                      label={reason}
                    />
                  ))}
                </Box>

                <TextField
                  variant="outlined"
                  label="Other reasons"
                  fullWidth
                  multiline
                  minRows={3}
                  sx={{ mb: 2 }}
                />

                <Box display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#022e61',
                      color: '#fff',
                      fontWeight: 'bold',
                      width: { xs: '100%', sm: '50%' },
                      borderRadius: '10px',
                      '&:hover': { bgcolor: '#001f42' },
                    }}
                  >
                    SUBMIT
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
    </>
  );
}

export default ShuttleService2;
