import { useState, useEffect, useRef } from 'react';
import { CssBaseline, Avatar, Box, Button, TextField, Typography, IconButton } from '@mui/material';
import Layout from "../components/Layout";
import EditIcon from '@mui/icons-material/Edit';
import InnerBackgroundImage from "/src/assets/bg5.jpg";

import { useNavigate } from 'react-router-dom';
import { authMethods } from '../backend/authMethods';
import { StuMethods } from '../backend/StuMethods';
import { StaffMethods } from '../backend/StaffMethods';

import Popup from '../components/Popup';

const ProfileCard = () => {

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info');
  const [popupCallback, setPopupCallback] = useState(null);

  const showPopup = (message, type = 'info') => {
    setPopupMessage(message);
    setPopupType(type);
    setPopupOpen(true);
  };

  const [ID, setID] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [shuttleID, setShuttleID] = useState(null);
  const [scannedStatus, setScannedStatus] = useState(null);

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState(0);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: ''
  });

  const [role, setRole] = useState("");


  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // 1) Refresh token
        const res = await authMethods.refreshToken();
        // 2) If valid, store ID and role in state
        if (res && res.accessToken && res.ID) {
          setID(res.ID);
          setRole(res.role);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Authentication error:", error);
      }
    })();
  }, [navigate]);

  useEffect(() => {
    // Only fetch user when ID and role are set
    (async () => {
      if (!ID || !role) return;

      let fetchedUser = null;
      try {
        if (role === "Student") {
          fetchedUser = await StuMethods.getStudent(ID);
        } else if (role === "Staff") {
          fetchedUser = await StaffMethods.getStaff(ID);
        }

        if (fetchedUser) {
          // Update your local state
          setUserName(fetchedUser.name);
          setEmail(fetchedUser.email);
          setPassword(fetchedUser.password);
          setPhoneNumber(fetchedUser.phone_number);
          setPaymentStatus(fetchedUser.paymentStatus);
          setShuttleID(fetchedUser.shuttleID);
          setScannedStatus(fetchedUser.scannedStatus);

          // Update formData from the *fetched* user object
          setFormData({
            username: fetchedUser.username,
            email: fetchedUser.email,
            phone_number: fetchedUser.phone_number,
            password: fetchedUser.password,
          });
        } else {
          // If no user found, reset
          setUserName("");
          setEmail("");
          setPassword("");
          setPhoneNumber(0);
          setFormData({
            username: "",
            email: "",
            phone_number: 0,
            password: "",
          });
        }
      } catch (error) {
        console.error("Fetching user error:", error);
      }
    })();
  }, [ID, role]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    let res = null;
    if (role == "Student") {
      res = await StuMethods.updateStudent(ID, shuttleID, formData.username, formData.email, formData.phone_number, formData.password, paymentStatus, scannedStatus);

    }
    else if (role == "Staff") {
      res = await StaffMethods.updateStaff(ID, shuttleID, formData.username, formData.email, formData.phone_number, formData.password, paymentStatus, scannedStatus);
    }
    if (res) {
      showPopup("Profile updated successfully!", 'info');
    } else {
      showPopup("Failed to update profile. Please try again later.", 'error');
    }
  };

  return (
    <>
      <Layout>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            minHeight: "100vh",
            width: "100vw", // Ensures full viewport width
            backgroundImage: `url(${InnerBackgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            margin: 0,
            padding: 0,
            overflow: "hidden", // Prevent scrollbars if content overflows
          }}
        >
          <Box
            sx={{
              marginTop: { xs: "-10%", sm: "13%", md: "8%", lg: "4%" },
              width: { xs: '90%', sm: '80%', md: '60%', lg: '70%' },
              borderRadius: 5,
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: 'rgba(10, 33, 71, 0.8)',
              boxShadow: 3,
            }}
          >
            {/* User Info Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: { xs: 5, sm: 3, md: 4 },
                mb: 2,
                borderBottomRightRadius: '80%',
                position: 'relative',
                backgroundColor: 'rgba(255, 140, 0, 0.3)',
                color: 'white',
              }}
            >
              <Avatar
                alt={username}
                src="path_to_avatar_image" // Ensure this path is correct
                sx={{
                  width: { xs: 50, sm: 60, md: 70 },
                  height: { xs: 50, sm: 60, md: 70 },
                  mr: 2,
                  border: '2px solid white',
                }}
              />
              <Box>
                <Typography variant="h6" fontWeight="bold" fontSize={{ xs: '1rem', sm: '1.25rem', md: '1.5rem' }}>
                  {ID}
                </Typography>
              </Box>
            </Box>

            {/* Centered Input Fields */}
            <Box
              sx={{
                padding: { xs: 5, sm: 5, md: 2 },
                pb: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Name Field */}
              <TextField
                name="username"
                label="Name"
                variant="outlined"
                fullWidth
                value={formData.username}
                onChange={handleChange}
                InputProps={{
                  style: { color: 'white' },
                  disableUnderline: true,
                }}
                sx={{
                  mb: 2,
                  width: { xs: '100%', sm: '80%', md: '70%', lg: '60%' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.8)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF8C00',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                  input: { color: 'white' },
                }}
              />

              {/* Email Field */}
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  style: { color: 'white' },
                  disableUnderline: true,
                }}
                sx={{
                  mb: 2,
                  width: { xs: '100%', sm: '80%', md: '70%', lg: '60%' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.8)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF8C00',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                  input: { color: 'white' },
                }}
              />

              {/* Phone Number Field */}
              <TextField
                name="phone_number"
                label="Phone Number"
                variant="outlined"
                type='number'
                fullWidth
                value={formData.phone_number}
                onChange={handleChange}
                InputProps={{
                  style: { color: 'white' },
                  disableUnderline: true,
                }}
                sx={{
                  mb: 2,
                  width: { xs: '100%', sm: '80%', md: '70%', lg: '60%' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.8)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF8C00',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                  input: { color: 'white' },
                }}
              />

              {/* Password Field */}
              <TextField
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  style: { color: 'white' },
                  disableUnderline: true,
                }}
                sx={{
                  mb: 2,
                  width: { xs: '100%', sm: '80%', md: '70%', lg: '60%' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.8)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF8C00',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                  input: { color: 'white' },
                }}
              />

              {/* Centered Edit Button for Mobile and Tablet */}
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: { xs: 'center', sm: 'center', md: 'flex-end' },
                  mt: 2,
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleSave}
                  size="small"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'secondary.main',
                    ':hover': { backgroundColor: '#FF7A00' },
                    width: { xs: 'auto', sm: 'auto' },
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                  }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Layout>
      <Popup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        message={popupMessage}
        type={popupType}
        onConfirm={popupCallback}
      />
    </>
  );
};

export default ProfileCard;
