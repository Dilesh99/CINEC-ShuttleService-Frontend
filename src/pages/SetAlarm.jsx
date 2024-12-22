// eslint-disable-next-line no-unused-vars
import React from 'react';
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
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import Layout from "../components/Layout";
import BackgroundImage from "/src/assets/bg5.jpg";

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
    padding: '10px',
    marginLeft: '10px',
    marginRight: '10px',
    flexDirection: 'column',
    alignItems: 'center',
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
  },
  [theme.breakpoints.down('sm')]: {
    width: '90%',
    padding: theme.spacing(1),
    borderBottomLeftRadius: '20px',
    borderTopRightRadius: '0px',
    marginBottom:'10%'
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
    width: '20%',
  },
  [theme.breakpoints.down('sm')]: {
    alignSelf: 'center', // Center button on smaller screens
    width: 'auto',
    
  },
  
}));

const DayButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#fff',
  color: '#d4790e',
  borderRadius: '80%', // Ensures the button is circular
  width: '35px', // Equal width and height
  height: '35px',
  fontSize: '12px',
  border: '1px solid #d4790e',
  cursor: 'pointer',
  padding: '0', // No negative padding
  display: 'flex', // Ensures the content is centered
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    width: '30px',
    height: '30px',
    fontSize: '11px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '25px',
    height: '25px',
    fontSize: '10px',
  },
}));


const SetAlarmSection = () => (
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
    <Link to="/location">
      <Button
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
    </Link>
  </Sidebar>
);

const AlarmForm = () => {
  const activeDays = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'];

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
          <SetAlarmSection />
          <FormSection>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" alignItems="center">
                <Typography variant="h6" sx={{ width: '30%' }}>
                  Alarm name:
                </Typography>
                <TextField
                  variant="outlined"
                  
                  InputProps={{
                    style: { backgroundColor: '#fff', color: '#000', borderRadius:'10px' },
                  }}
                />
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="h6" sx={{ width: '35%' }}>
                  Alarm on/off:
                </Typography>
                <RadioGroup row name="alarmOnOff" defaultValue="on">
                  <FormControlLabel value="on" control={<Radio />} label="On" />
                  <FormControlLabel value="off" control={<Radio />} label="Off" />
                </RadioGroup>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="h6" sx={{ width: '30%' }}>
                  Radius:
                </Typography>
                <TextField
                  variant="outlined"
                  value="100 m"
                 
                  InputProps={{
                    style: { backgroundColor: '#fff', color: '#000',borderRadius:'10px' },
                  }}
                />
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="h6" sx={{ width: '35%' }}>
                  Repeat:
                </Typography>
                <RadioGroup row name="repeat" defaultValue="on">
                  <FormControlLabel value="on" control={<Radio />} label="On" />
                  <FormControlLabel value="off" control={<Radio />} label="Off" />
                </RadioGroup>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="h6" sx={{ width: '30%' }}>
                  Active days:
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '10px',
                    
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
