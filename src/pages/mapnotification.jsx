
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CssBaseline, Button, Typography, Box, Checkbox, FormControlLabel, TextField, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


  
function ShuttleService2() {
  const { driverID } = useParams();  // Fetch the shuttleId from the URL
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [shuttleDetails, setShuttleDetails] = useState(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    // Simulating fetching bus data based on driverID (mock data)
    const fetchBusDetails = async () => {
      // Mock data for bus details
      const busData = {
        D001: {
          route: 'GAMPAHA 1',
          busNo: 'S0001',
          driverName: 'John Doe',
          startPlace: 'Malabe',
          destination: 'Gampaha',
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31724.940489733215!2d79.9528444!3d6.9110197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMzkuNyJOIDc5wrA1NyAwMy40IkU!5e0!3m2!1sen!2slk!4v1698535609472!5m2!1sen!2slk",
        },
        D002: {
          route: 'GAMPAHA 2',
          busNo: 'S0002',
          driverName: 'Jane Smith',
          startPlace: 'Colombo',
          destination: 'Gampaha',
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31724.940489733215!2d80.1234567!3d7.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMzkuNyJOIDc5wrA1NyAwMy40IkU!5e0!3m2!1sen!2slk!4v1698535609472!5m2!1sen!2slk",
        },
        D003: {
          route: 'Malabe',
          busNo: 'S0003',
          driverName: 'Mike Johnson',
          startPlace: 'Kelaniya',
          destination: 'Gampaha',
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31724.940489733215!2d80.1234567!3d7.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMzkuNyJOIDc5wrA1NyAwMy40IkU!5e0!3m2!1sen!2slk!4v1698535609472!5m2!1sen!2slk",
        },
        D004: {
          route: 'Maradana',
          busNo: 'S0003',
          driverName: 'Mike Johnson',
          startPlace: 'Kelaniya',
          destination: 'Gampaha',
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31724.940489733215!2d80.1234567!3d7.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMzkuNyJOIDc5wrA1NyAwMy40IkU!5e0!3m2!1sen!2slk!4v1698535609472!5m2!1sen!2slk",
        },
        D005: {
          route: 'Wattala',
          busNo: 'S0003',
          driverName: 'Mike Johnson',
          startPlace: 'Kelaniya',
          destination: 'Gampaha',
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31724.940489733215!2d80.1234567!3d7.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMzkuNyJOIDc5wrA1NyAwMy40IkU!5e0!3m2!1sen!2slk!4v1698535609472!5m2!1sen!2slk",
        },
        D006: {
          route: 'Negambo',
          busNo: 'S0003',
          driverName: 'Mike Johnson',
          startPlace: 'Kelaniya',
          destination: 'Gampaha',
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31724.940489733215!2d80.1234567!3d7.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMzkuNyJOIDc5wrA1NyAwMy40IkU!5e0!3m2!1sen!2slk!4v1698535609472!5m2!1sen!2slk",
        },
      };

     // Get bus data based on the driverID from the URL
     const busInfo = busData[driverID] || null;

     setShuttleDetails(busInfo);
   };
   fetchBusDetails();
  }, [driverID]); // Fetch new data when the driverID changes

  if (!shuttleDetails) {
    return <div>Loading...</div>; // Loading state while data is being fetched
  }


  const handleCheckboxChange = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]
    );
  };

  const toggleLocation = () => {
    console.log('Tracking stopped');
  };

  return (
    <>
    <CssBaseline />
    
   <Box display="flex" justifyContent="center" sx={{ mt: '-2%', backgroundColor: '#47758C', p: { xs: 2, sm: 4, md: 5.9} }}>
           <Box sx={{ width: '100%', maxWidth: '1440px' }}>
             {/* Logo */}
             <Box component="img" src="/src/assets/W-PNG.png" alt="CINEC Logo" sx={{ height: { xs: '35px', sm: '40px', md: '40px', lg: '40px' } }} />
{/* Title */}
          <Typography variant="h5" sx={{
            textAlign: 'center', fontSize: { xs: '16px', sm: '22px', md: '23px', lg: '2.5rem' }, color: '#ffffff',
            mt: { xs: '14px', sm: '2px', md: '0px', lg: '0px' }, mb: 1.5
          }}>
          SHUTTLE - {shuttleDetails.route}
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
                   <Button
                   onClick={toggleLocation}
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
                    src= {shuttleDetails.mapUrl}  // Dynamically load the map based on driverID
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
