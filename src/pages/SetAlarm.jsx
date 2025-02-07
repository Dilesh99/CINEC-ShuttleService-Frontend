// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Radio,
  Typography,
  IconButton,
  RadioGroup,
} from '@mui/material';
import { margin, styled } from '@mui/system';
import { Link } from 'react-router-dom';
import Layout from "../components/Layout";
import BackgroundImage from "/src/assets/bg5.jpg";
import { useLocation, useNavigate } from 'react-router-dom';

import { authMethods } from '../backend/authMethods';

const ContentContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1440px',
  height: '100%',
  padding: '50px',
  borderRadius: '10px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'row',
  marginLeft: '70px',
  marginRight: '4%',
  marginTop: '100px',
  [theme.breakpoints.down('lg')]: {
    padding: '30px',
    marginLeft: '30px',
    marginRight: '30px',
    flexDirection: 'column',
    alignItems: 'center',
  },
  [theme.breakpoints.down('md')]: {
    padding: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    flexDirection: 'column',
    alignItems: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0px',
    marginLeft: '10px',
    marginRight: '10px',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: "30%",
    marginBottom: "5%"

  },
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: '30%',
  padding: theme.spacing(4),
  backgroundColor: '#f2f2f2',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopLeftRadius: '20px',
  borderBottomLeftRadius: '20px',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2), // Add spacing when stacked
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(0),
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',

    borderBottomLeftRadius: '0',

  },
  [theme.breakpoints.down('sm')]: {
    width: '90%',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(0),
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',

    borderBottomLeftRadius: '0',

  },
}));

const FormSection = styled(Box)(({ theme }) => ({
  width: '70%',
  minHeight: '450px',
  backgroundColor: 'rgba(0, 33, 71, 0.85)',
  padding: theme.spacing(4),
  position: 'relative',
  color: '#fff',
  display: 'flex',
  borderTopRightRadius: '20px',
  borderBottomRightRadius: '20px',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    padding: theme.spacing(3),

  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: theme.spacing(2),
    borderBottomLeftRadius: '20px',
    borderTopRightRadius: '0px',
    marginBottom: '5%'
  },
  [theme.breakpoints.down('sm')]: {
    width: '90%',
    padding: theme.spacing(1),
    borderBottomLeftRadius: '20px',
    borderTopRightRadius: '0px',
    marginBottom: '10%'
  },
}));

const SaveButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  backgroundColor: '#f59e0b',
  color: '#002147',
  marginBottom: '2%',
  fontWeight: 'bold',
  alignSelf: 'flex-end',
  '&:hover': {
    backgroundColor: '#d4790e',
  },
  [theme.breakpoints.down('md')]: {
    alignSelf: 'center', // Center button on tablet screens
    width: 'auto',
    marginTop: '5%', // No marginTop on tablet view
  },
  [theme.breakpoints.down('sm')]: {
    alignSelf: 'center', // Center button on smaller screens
    width: 'auto',
    marginTop: '15%', // Add 15% marginTop on mobile view
  },
  [theme.breakpoints.up('md')]: {
    marginTop: '0%', // Remove marginTop on desktop view
  },
}));


const DayButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#fff',
  color: '#d4790e',
  borderRadius: '50%', // Ensure the button is perfectly round
  width: '60px', // Equal width and height for a circular shape
  height: '60px',
  fontSize: '14px',
  border: '1px solid #d4790e',
  cursor: 'pointer',
  padding: '0', // No padding to ensure proper shape
  display: 'flex', // Center content inside the button
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle shadow for aesthetics
  '&:hover': {
    backgroundColor: '#f59e0b', // Change background color on hover
    color: '#fff',
  },
  [theme.breakpoints.down('md')]: {
    width: '35px', // Slightly smaller for medium screens
    height: '35px',
    fontSize: '12px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '60px', // Even smaller for small screens
    height: '60px',
    fontSize: '10px',
  },
}));


const SetAlarmSection = ({ navigateBack }) => (
  <Sidebar>
    <Typography variant="h4" align="center" gutterBottom>
      SET AN ALARM
    </Typography>
    <IconButton>
      <img
        src="/src/assets/bell 1.png" alt="Alarm Icon"
        style={{ width: '70px' }}
      />
    </IconButton>
    <Typography
      variant="body1"
      align="center"
      sx={{ mt: 2, fontSize: '1rem', color: '#333' }}
    >
      Consistent routines foster better <br />
      <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>time management</span> skills for
      university <br />
      life.
    </Typography>

    <Button
      onClick={navigateBack}
      variant="contained"
      sx={{
        mt: 4,
        backgroundColor: '#f59e0b',
        borderRadius: '20px',
        color: '#fff',
        width: 'auto',
      }}
    >
      BACK
    </Button>

  </Sidebar>
);

const AlarmForm = () => {

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
  const activeDays = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'];

  // Function to navigate back to the previous page
  const navigateBack = () => {
    navigate(-1); // This will navigate back to the previous page
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          minHeight: "100vh",
          width: "100vw",
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          margin: 0,
          padding: 0,
          overflow: "hidden",

        }}
      >
        <ContentContainer>
          <SetAlarmSection navigateBack={navigateBack} />
          <FormSection>
            <Box display="flex" flexDirection="column" gap={4}>
              <Box display="flex" alignItems="center">
                <Typography
                  variant="h6"
                  sx={{ width: { xs: "45%", md: "30%" }, fontSize: "18px", mt: { xs: '15%', md: '0%' } }}
                >
                  Alarm name:
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  InputProps={{
                    style: {
                      backgroundColor: "#fff",
                      color: "#000",
                      borderRadius: "10px",
                      height: "40px",
                    },
                  }}
                  sx={{
                    mt: { xs: '15%', md: '0%' },
                    maxWidth: "250px",
                  }}
                />
              </Box>


              <Box display="flex" alignItems="center">
                <Typography variant="h6" sx={{ width: { xs: '45%', md: '35%' }, fontSize: '18px' }}>
                  Alarm on/off:
                </Typography>
                <RadioGroup row name="alarmOnOff" defaultValue="on">
                  <FormControlLabel value="on" control={<Radio />} label="On" />
                  <FormControlLabel value="off" control={<Radio />} label="Off" />
                </RadioGroup>
              </Box>

              <Box display="flex" alignItems="center">
                <Typography
                  variant="h6"
                  sx={{ width: { xs: "45%", md: "30%" }, fontSize: "18px" }}
                >
                  Radius:
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  InputProps={{
                    style: {
                      backgroundColor: "#fff",
                      color: "#000",
                      borderRadius: "10px",
                      height: "40px",
                    },
                  }}
                  sx={{

                    maxWidth: "250px",
                  }}
                />
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="h6" sx={{ width: { xs: '45%', md: '35%' }, fontSize: '18px' }}>
                  Repeat:
                </Typography>
                <RadioGroup row name="repeat" defaultValue="on">
                  <FormControlLabel value="on" control={<Radio />} label="On" />
                  <FormControlLabel value="off" control={<Radio />} label="Off" />
                </RadioGroup>
              </Box>
              <Box
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }} // Column for mobile, row for larger screens
                alignItems={{ xs: 'flex-start', md: 'center' }} // Adjust alignment for mobile
              >
                <Typography
                  variant="h6"
                  sx={{
                    width: { xs: '100%', md: '22%' }, // Full width for mobile, fixed width for larger screens
                    fontSize: '18px',
                    mb: { xs: 4, md: 0, sm: 4 }, // Add margin below the label for mobile view
                  }}
                >
                  Active days:
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: { xs: 'center', md: 'center', sm: "center" }, // Align left on mobile, center on larger screens
                    gap: '10px',
                    width: '100%', // Ensure the buttons take full width in mobile view
                  }}
                >
                  {activeDays.map((day) => (
                    <DayButton key={day}>{day}</DayButton>
                  ))}
                </Box>
              </Box>

            </Box>
            <SaveButton>Save</SaveButton>
          </FormSection>
        </ContentContainer>
      </Box>
    </Layout>
  );
};

export default AlarmForm;
