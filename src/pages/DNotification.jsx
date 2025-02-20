// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom"; // for capturing the dynamic ID from the URL
import {
  CssBaseline,
  Button,
  Typography,
  Box,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
  Paper,
  CircularProgress,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import cinecLogo from "/src/assets/W-PNG.png";
import busImage from "/src/assets/images.png";

import { LocationMethods } from "../backend/LocationMethods";
import { authMethods } from "../backend/authMethods";

function ShuttleService() {
  const { driverID } = useParams(); // Capturing driverID from the URL
  const [locationOn, setLocationOn] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [busDetails, setBusDetails] = useState(null); // To store dynamic bus details
  const navigate = useNavigate();
  let ID = null;
  const hasRun = useRef(false);

  let wakeLock = null;
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, []);

  async function requestWakeLock() {
    try {
      // Check if the Screen Wake Lock API is supported
      if ('wakeLock' in navigator) {
        wakeLock = await navigator.wakeLock.request('screen');
        console.log('Screen wake lock is active!');
      } else {
        console.log('Screen Wake Lock API is not supported on this device.');
      }
    } catch (err) {
      console.error('Error requesting screen wake lock:', err);
    }
  }

  // Optionally, release the wake lock when the page is no longer active
   window.addEventListener('visibilitychange', () => {
    if (document.hidden && wakeLock) {
      wakeLock.release().then(() => {
        console.log('Screen wake lock released!');
      }).catch(err => {
        console.error('Failed to release wake lock:', err);
      });
    }
    else{
      requestWakeLock()
    }
  });

   useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      try {
        requestWakeLock();
        handleAuth();
      } catch {
        return null;
      }
    }
  }, []);

  const handleAuth = async () => {
    const res = await authMethods.refreshToken();
    if (res && res.accessToken && res.ID && res.role == "Driver") {
      ID = res.ID;
    }
    else {
      navigate("/");
    }
  }

  const handleLogout = async () => {
    authMethods.deleteToken().then(() => navigate('/'));
  };

  const [isTracking, setIsTracking] = useState("TURN ON");

  const startTracking = () => {
    LocationMethods.startTracking(busDetails.route);
    setIsTracking("TRACKING...");
  };

  const stopTracking = () => {
    LocationMethods.stopTracking();
    setIsTracking("TURN ON");
  };

  const handleCheckboxChange = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          mt: "-2%",
          backgroundColor: "#47758C",
          p: { xs: 2, sm: 4, md: 5.9 },
          minHeight: "120vh",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "1440px" }}>
          {/* Logo */}
          <Box
            component="img"
            src={cinecLogo}
            alt="CINEC Logo"
            sx={{ height: { xs: "35px", sm: "40px", md: "40px", lg: "40px" } }}
          />

          {/* Title */}
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontSize: { xs: "16px", sm: "22px", md: "23px", lg: "2.5rem" },
              color: "#ffffff",
              mt: { xs: "14px", sm: "2px", md: "0px", lg: "0px" },
              mb: 1.5,
            }}
          >
            SHUTTLE - {busDetails.route}
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
            sx={{ backgroundColor: "#47758C" }}
          >
            <Paper
              elevation={3}
              sx={{
                width: "100%",
                maxWidth: "1500px",
                borderRadius: "10px",
                minHeight: { md: "700px", lg: "700px" },
              }}
            >
              <Box display="flex" flexDirection={{ xs: "column" }}>
                
                <CardContent
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: "#022E61",
                    color: "#fff",
                    flex: 0.8,
                    p: { xs: 2, sm: 3, md: 5 },
                    textAlign: { xs: "center", md: "left" },
                    minHeight: { md: "700px", lg: "700px" },
                  }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontSize: {
                        xs: "16px",
                        sm: "18px",
                        md: "30px",
                        lg: "30px",
                      },
                    }}
                  >
                    <LocationOnIcon /> Turn on your location
                  </Typography>
                  <br />

                  <Box display="flex" justifyContent="center" gap={2} mb={3}>
                    <Button
                      variant="contained"
                      color={locationOn ? "primary" : "default"}
                      onClick={startTracking}
                      sx={{
                        bgcolor: locationOn ? "#ffffff" : "#ffffff",
                        color: locationOn ? "#000000" : "#000000",
                        borderRadius: "30px",
                        width: { xs: "45%", sm: "30%" },
                        height: { md: "50px", lg: "50px" },
                      }}
                    >
                      {isTracking}
                    </Button>
                    <Button
                      variant="contained"
                      color={!locationOn ? "primary" : "default"}
                      onClick={stopTracking}
                      sx={{
                        bgcolor: !locationOn ? "#ffffff" : "#ffffff",
                        color: !locationOn ? "#000000" : "#000000",
                        borderRadius: "30px",
                        width: { xs: "45%", sm: "35%" },
                      }}
                    >
                      TURN OFF
                    </Button>
                  </Box>

                  <Box display="flex" justifyContent="center" mb={2}>
                    <Box
                      component="img"
                      src={busImage}
                      alt="CINECBus"
                      sx={{
                        height: {
                          xs: "100px",
                          sm: "140px",
                          md: "350px",
                          lg: "380px",
                        },
                      }}
                    />
                  </Box>

                  {/* <Box textAlign="center">
                    <Typography variant="h5">{busDetails.busNo}</Typography>
                    <Typography>Bus No: {busDetails.busNo}</Typography>
                    <Typography>Driver name: {busDetails.driverName}</Typography>
                    <Typography>Start place: {busDetails.startPlace}</Typography>
                    <Typography>Destination: {busDetails.destination}</Typography>
                  </Box>*/}
                </CardContent>
              </Box>
            </Paper>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
               onClick={handleLogout}
              sx={{
                mt: 2,
                backgroundColor: "#05183A",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
                px: 3,
                py: 1,
                "&:hover": {
                  backgroundColor: "#193D61",
                },
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ShuttleService;
