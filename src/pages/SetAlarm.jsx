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
import {styled } from '@mui/system';
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
  marginLeft: '70px', // Default for large screens
  marginRight:'4%',
  marginTop:'100px',
  // Responsive styles
  
  [theme.breakpoints.down('lg')]: { // 1440px and below
    padding: '0px', // Adjust padding slightly for large screens
    marginLeft: '200px',
    width: '200%',
    display: 'flex', // Adjust margin for smaller screens
  },
  [theme.breakpoints.down('md')]: { // 1024px and below
    padding: '0px', // Reduce padding for medium screens
    marginLeft: '50px',
    flexDirection: 'column', // Stack items vertically
    alignItems: 'center',
  },
  [theme.breakpoints.down('sm')]: { // 768px and below
    padding: '30px', // Smaller padding for small screens
    marginLeft: '20px',
    width: '100%', // Take full width on small screens
  },
  [theme.breakpoints.down('xs')]: { // 600px and below (mobile view)
    padding: '10px', // Minimal padding for mobile
    marginLeft: '10px',
    borderRadius: '5px', // Adjust border radius for small screens
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
  [theme.breakpoints.down('lg')]: { // 1440px and below
    padding: theme.spacing(3),
  },
  [theme.breakpoints.down('md')]: { // 1024px and below
    width: '100%',
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: { // 768px and below
    padding: theme.spacing(1),
  },
}));

const StyledImage = styled(Box)(({ theme }) => ({
  position: 'absolute',
  height: '630px',
  width: '53%',
  objectFit: 'cover',
  objectPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  

 
  [theme.breakpoints.down('lg')]: {
    height: '640px',
    width: '58%',
  },
  [theme.breakpoints.down('md')]: {
    height: '570px',
    width: '44%',
    padding: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    height: '0',
    width: '0',
    padding: theme.spacing(2),
  },
}));
const FormSection = styled(Box)(({ theme }) => ({
  width: '70%',

  backgroundColor: 'rgba(0, 33, 71, 0.85)',
  padding: theme.spacing(4),
  position: 'relative',
  color: '#fff',
  [theme.breakpoints.down('lg')]: { // 1440px and below
    padding: theme.spacing(3),
  },
  [theme.breakpoints.down('md')]: { // 1024px and below
    width: '100%',
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: { // 768px and below
    width: '100%',
    padding: theme.spacing(1),
  },
}));








const MapContainer = styled(Box)(({ theme }) => ({
  height: '200px',
  borderRadius: '8px',
  overflow: 'hidden',
  marginBottom: theme.spacing(2),
  position: 'relative',
  [theme.breakpoints.down('md')]: { // 1024px and below
    height: '180px',
  },
  [theme.breakpoints.down('sm')]: { // 768px and below
    height: '150px',
  },
}));

const MapEmbed = styled('iframe')({
  width: '100%',
  height: '100%',
  border: '0',
});

const SaveButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  borderRadius: '20px',
  backgroundColor: '#f59e0b',
  color: '#002147',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#d4790e',
  },
  [theme.breakpoints.down('sm')]: { // 768px and below
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const DayButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#fff',
  color: '#d4790e',
  borderRadius: '100%', // Ensures it's a perfect circle
  width: '35px', // Default width for larger screens
  height: '35px',
  fontSize: '13px',
  border: '1px solid #d4790e',
  cursor: 'pointer',
padding:'-3px',
  // Responsive styles
  [theme.breakpoints.down('lg')]: { // Large screens 1024px and below
    width: '-9px',
    height: '35px',
    fontSize: '9px',
  },
  [theme.breakpoints.down('sm')]: { // Tablet screens 786px and below
    width: '10px',
    height: '25px',
    fontSize: '10px',
  },
}));


const SetAlarmSection = () => (

  
  <Sidebar sx={{

    }}>
    <Typography variant="h4" align="center" gutterBottom>
      SET AN ALARM
    </Typography>
    <IconButton>
      <img
        src="/src/assets/bell 1.png"alt="Alarm Icon"
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
    <Link to="/location"><Button
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
    </Button></Link>
  </Sidebar>
);
{/* Faculty Bar */}


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
      width: "100vw", // Ensures full viewport width
      backgroundImage: `url(${BackgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      margin: 0,
      padding: 0,
      overflow: "hidden", // Prevent scrollbars if content overflows
    }}
  >
    {/* Centered Container */}
    <ContentContainer>
      <SetAlarmSection />
      <Box>
        <StyledImage
          component="img"
          src="/src/assets/image 11.png"
          alt="Responsive Image"
          sx={{
            height:"75.5%",
            width: { xs: '5%', sm: '44%', md: '52%' },
            
          }}
        
        />
      </Box>
      <FormSection>
        <MapContainer>
          <MapEmbed
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31724.940489733215!2d79.9528444!3d6.9110197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMzkuNyJOIDc5wrA1NyAwMy40IkU!5e0!3m2!1sen!2slk!4v1698535609472!5m2!1sen!2slk"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </MapContainer>
        <SaveButton>SAVE</SaveButton>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" sx={{ width: '40%' }}>
              Alarm name:
            </Typography>
            <TextField
              variant="outlined"
              placeholder="_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ "
              fullWidth
              InputProps={{
                style: { backgroundColor: '#fff', color: '#000' },
              }}
            />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" sx={{ width: '40%' }}>
              Alarm on/off:
            </Typography>
            <RadioGroup row name="alarmOnOff" defaultValue="on">
              <FormControlLabel value="on" control={<Radio />} label="On" />
              <FormControlLabel value="off" control={<Radio />} label="Off" />
            </RadioGroup>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" sx={{ width: '40%' }}>
              Radius:
            </Typography>
            <TextField
              variant="outlined"
              value="100 m"
              fullWidth
              InputProps={{
                style: { backgroundColor: '#fff', color: '#000' },
              }}
            />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" sx={{ width: '40%' }}>
              Repeat:
            </Typography>
            <RadioGroup row name="repeat" defaultValue="on">
              <FormControlLabel value="on" control={<Radio />} label="On" />
              <FormControlLabel value="off" control={<Radio />} label="Off" />
            </RadioGroup>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" sx={{ width: '40%' }}>
              Alarm Tone:
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                backgroundColor: '#ffff',
                color: '#000',
                '&:hover': {
                  backgroundColor: '#b5670c',
                },
              }}
            >
              Choose File
              <input type="file" hidden />
            </Button>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" sx={{ width: '40%' }}>
              Active days:
            </Typography>
            <Box sx={{display: 'flex',
    flexWrap: 'wrap',        // Enable wrapping
    justifyContent: 'center', // Distribute space between items
    gap: '10px',  }}>
              {['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'].map((day) => (
                <DayButton key={day}>{day}</DayButton>
              ))}
            </Box>
          </Box>
        </Box>
      </FormSection>
    </ContentContainer>
  </Box>
</Layout>
  );
};

export default AlarmForm;
