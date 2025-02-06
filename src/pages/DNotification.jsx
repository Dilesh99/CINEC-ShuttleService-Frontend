// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // for capturing the dynamic ID from the URL
import { CssBaseline, Button, Typography, Box, CardContent, Checkbox, FormControlLabel, TextField, Paper, CircularProgress } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';

import { LocationMethods } from '../backend/LocationMethods';
import { authMethods } from '../backend/authMethods';


function ShuttleService() {
  const { driverID } = useParams();  // Capturing driverID from the URL
  const [locationOn, setLocationOn] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [busDetails, setBusDetails] = useState(null); // To store dynamic bus details
  const navigate = useNavigate();
    let ID = null;
    const hasRun = useRef(false);
    useEffect(() => {
      if (!hasRun.current) {
        hasRun.current = true;
        try {
          handleAuth();
        } catch {
          return null;
        }
      }
  
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }, []);
  
    const handleAuth = async () => {
      const res = await authMethods.refreshToken();
      if (res && res.accessToken && res.ID) {
        ID = res.ID;
      }
      else {
        navigate("/");
      }
    }

  const [isTracking, setIsTracking] = useState('TURN ON');

  const startTracking = () => {
    LocationMethods.startTracking(busDetails.route);
    setIsTracking('TRACKING...');
  };

  const stopTracking = () => {
    LocationMethods.stopTracking();
    setIsTracking('TURN ON');
  };

  const handleCheckboxChange = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]
    );
  };

  useEffect(() => {
    // Simulating fetching bus data based on driverID (mock data)
    const fetchBusDetails = async () => {
      // Mock data for bus details
      const busData = {
        D001: {
          route: 'GAMPAHA1',
          busNo: 'S0001',
          driverName: 'John Doe',
          startPlace: 'Malabe',
          destination: 'Gampaha',
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31724.940489733215!2d79.9528444!3d6.9110197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMzkuNyJOIDc5wrA1NyAwMy40IkU!5e0!3m2!1sen!2slk!4v1698535609472!5m2!1sen!2slk",
        },
        D002: {
          route: 'GAMPAHA2',
          busNo: 'S0002',
          driverName: 'Jane Smith',
          startPlace: 'Colombo',
          destination: 'Gampaha',
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31724.940489733215!2d80.1234567!3d7.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMzkuNyJOIDc5wrA1NyAwMy40IkU!5e0!3m2!1sen!2slk!4v1698535609472!5m2!1sen!2slk",
        },
        D003: {
          route: 'MALABE',
          busNo: 'S0003',
          driverName: 'Mike Johnson',
          startPlace: 'Kelaniya',
          destination: 'Gampaha',
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31724.940489733215!2d80.1234567!3d7.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMzkuNyJOIDc5wrA1NyAwMy40IkU!5e0!3m2!1sen!2slk!4v1698535609472!5m2!1sen!2slk",
        },
        D004: {
          route: 'MORATUWA',
          busNo: 'S0003',
          driverName: 'Mike Johnson',
          startPlace: 'Kelaniya',
          destination: 'Gampaha',
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31724.940489733215!2d80.1234567!3d7.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMzkuNyJOIDc5wrA1NyAwMy40IkU!5e0!3m2!1sen!2slk!4v1698535609472!5m2!1sen!2slk",
        },
        D005: {
          route: 'WATTALA',
          busNo: 'S0003',
          driverName: 'Mike Johnson',
          startPlace: 'Kelaniya',
          destination: 'Gampaha',
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31724.940489733215!2d80.1234567!3d7.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMzkuNyJOIDc5wrA1NyAwMy40IkU!5e0!3m2!1sen!2slk!4v1698535609472!5m2!1sen!2slk",
        },
        D006: {
          route: 'NEGAMBO',
          busNo: 'S0003',
          driverName: 'Mike Johnson',
          startPlace: 'Kelaniya',
          destination: 'Gampaha',
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31724.940489733215!2d80.1234567!3d7.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMzkuNyJOIDc5wrA1NyAwMy40IkU!5e0!3m2!1sen!2slk!4v1698535609472!5m2!1sen!2slk",
        },
      };


      // Get bus data based on the driverID from the URL
      const busInfo = busData[driverID] || null;
      setBusDetails(busInfo);
    };

    fetchBusDetails();
  }, [driverID]); // Fetch new data when the driverID changes

  if (!busDetails) {
    return <div>Loading...</div>; // Loading state while data is being fetched
  }

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
            SHUTTLE - {busDetails.route}
          </Typography>

          <Box display="flex" justifyContent="center" sx={{ backgroundColor: '#47758C' }}>
            <Paper elevation={3} sx={{ width: '100%', maxWidth: '1500px', borderRadius: '10px' }}>
              <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
                {/* Left Section */}
                <CardContent sx={{
                  borderTopLeftRadius: 10, borderBottomLeftRadius: { xs: 0, sm: 0, md: 10, lg: 10 },
                  borderTopRightRadius: { xs: 10, sm: 10, md: 0, lg: 0 }, backgroundColor: '#022E61', color: '#fff',
                  flex: 0.8, p: { xs: 2, sm: 3, md: 5 }, textAlign: { xs: 'center', md: 'left' },
                }}>
                  <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '16px', sm: '18px', md: '18px', lg: '18px' } }}>
                    <LocationOnIcon /> Turn on your location
                  </Typography><br />

                  <Box display="flex" justifyContent="center" gap={2} mb={3}>
                    <Button 
                      variant="contained"
                      color={locationOn ? 'primary' : 'default'}
                      onClick={startTracking}
                      sx={{
                        bgcolor: locationOn ? '#ffffff' : '#ffffff', color: locationOn ? '#000000' : '#000000',
                        borderRadius: '30px', width: { xs: '45%', sm: '30%' },
                      }}
                    >
                      {isTracking}
                    </Button>
                    <Button
                      variant="contained"
                      color={!locationOn ? 'primary' : 'default'}
                      onClick={stopTracking}
                      sx={{
                        bgcolor: !locationOn ? '#ffffff' : '#ffffff', color: !locationOn ? '#000000' : '#000000',
                        borderRadius: '30px', width: { xs: '45%', sm: '35%' },
                      }}
                    >
                      TURN OFF
                    </Button>
                  </Box>

                  <Box display="flex" justifyContent="center" mb={2}>
                    <Box component="img" src="/src/assets/images.png" alt="CINECBus" sx={{
                      height: { xs: '100px', sm: '140px', md: '150px', lg: '180px' },
                    }} />
                  </Box>

                  <Box textAlign="center">
                    <Typography variant="h5">{busDetails.busNo}</Typography>
                    <Typography>Bus No: {busDetails.busNo}</Typography>
                    <Typography>Driver name: {busDetails.driverName}</Typography>
                    <Typography>Start place: {busDetails.startPlace}</Typography>
                    <Typography>Destination: {busDetails.destination}</Typography>
                  </Box>
                </CardContent>

                {/* Right Section */}
                <Box sx={{
                  flex: 0.8, backgroundColor: '#ffffff', p: 4, borderTopRightRadius: 10, borderBottomRightRadius: 10,
                }}>
                  <Typography variant="h6" gutterBottom sx={{ xs: '12px' }}>
                    <EditIcon /> Add a note
                  </Typography>

                  <Box mb={3}>
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
                        bgcolor: '#022e61', color: '#fff', fontWeight: 'bold', width: { xs: '100%', sm: '50%' },
                        borderRadius: '10px', '&:hover': { bgcolor: '#001f42' },
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

export default ShuttleService;
