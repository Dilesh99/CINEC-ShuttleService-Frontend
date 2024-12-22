import React, { useState } from "react";
import { CssBaseline, Box, Button, Grid, TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import St1 from "../assets/St1.jpg"; // Update with your actual image path
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";


const SignUp2 = () => {
  const [username, setUsername] = useState('');
  const [staffID, setStaffID] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showsecondPassword, setShowsecondPassword] = useState(false);

  const handleSignUp = async () => {
    var canSignUp = true;
    var errors = "";
    if (staffID.length != 6) {
      errors += "\nMissing characters in ID";
      canSignUp = false;
    }
    if (phone_number.length != 10) {
      errors += "\nInvalid phone number";
      canSignUp = false;
    }
    if (password != secondPassword) {
      errors += "\nPasswords do not match";
      canSignUp = false;
    }

    if (canSignUp) {
      const response = await fetch(`http://localhost:8080/sendStaffLogins`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ staffID, password })
      });
      if (await response.json()) {
        window.alert("Staff member already signed up");
      }
      else {
        const response = await fetch(`http://localhost:8080/updateStaff`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ staffID, username, email, phone_number, password })
        });
        const data = await response.text();
        console.log(data);
      }
    }
    else {
      window.alert(errors);
    }

  }


  return (
    <>
      <CssBaseline />
      <Grid
        container
        sx={{
          width: "100%",
          height: "100%",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Left Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(136, 193, 255, 0.8)",
            p: 4,



          }}
        >
          <Typography
            sx={{
              color: "#000000",
              fontFamily: "inter",
              textAlign: "center",
              fontSize: { xs: "16px", md: "24px" },
              mt: { xs: 2, md: 10 },
            }}
          >
            Create an Account for
          </Typography>
          <Typography
            sx={{
              color: "#002147FF",
              fontFamily: "inter",
              textAlign: "center",
              fontSize: { xs: "20px", md: "32px" },
              mb: 2,
              fontWeight: "800",
            }}
          >
            CINEC SHUTTLE SERVICES
          </Typography>

          {/** Input Fields */}
          <Box //Text field 1
                                component="form"
                                sx={{
                                    '& > :not(style)': {
                                        m: { xs: 0, sm: 1, md: 1, lg: 1 },
                                        width: { xs: '180px', sm: '300px', md: '320px', lg: '380px' },
                                        mt: { xs: 1, sm: 1, md: 1, lg: 2 },
                                        mb: { xs: 0.5, sm: 1, md: 1, lg: 1 },
                                    }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                }} noValidate autoComplete="off">
                                <TextField id="outlined-basic" label="" variant="outlined" placeholder="Username" onChange={(e) => setUsername(e.target.value)}
                                    InputProps={{ startAdornment: (<InputAdornment position="start"><AccountCircleOutlinedIcon /></InputAdornment>), }}
                                    sx={{
                                        width: { xs: '180px', sm: '300px', md: '320px', lg: '380px' },
                                        '& .MuiOutlinedInput-root': {
                                            height: { xs: '34px', sm: '40px', md: '45px', lg: '50px' }, borderRadius: '30px',
                                            '& fieldset': { borderColor: '#000000', },
                                            '&:hover fieldset': { borderColor: '#002147FF', },
                                        },
                                        '& input': { padding: '0 5px', fontSize: '12px', color: '#002147FF', height: '100%', },
                                    }} />
                            </Box>


                            <Box //Text field 2
                                component="form"
                                sx={{
                                    '& > :not(style)': {
                                        m: { xs: 0, sm: 1, md: 1, lg: 1 },
                                        width: { xs: '180px', sm: '300px', md: '320px', lg: '380px' },
                                        mt: { xs: 1, sm: 1, md: 1, lg: 1 },
                                        mb: { xs: 0.5, sm: 1, md: 1, lg: 1 },
                                    }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                }} noValidate autoComplete="off">
                                <TextField id="outlined-basic" label="" variant="outlined" placeholder="Student ID" onChange={(e) => setStaffID(e.target.value)}
                                    InputProps={{ startAdornment: (<InputAdornment position="start"><BadgeOutlinedIcon /></InputAdornment>), }}
                                    sx={{
                                        width: { xs: '180px', sm: '300px', md: '320px', lg: '380px' },
                                        '& .MuiOutlinedInput-root': {
                                            height: { xs: '34px', sm: '40px', md: '45px', lg: '50px' }, borderRadius: '30px',
                                            '& fieldset': { borderColor: '#000000', },
                                            '&:hover fieldset': { borderColor: '#002147FF', },
                                        },
                                        '& input': { padding: '0 5px', fontSize: '12px', color: '#002147FF', height: '100%', },
                                    }} />
                            </Box>

                            <Box //Text field 3
                                component="form"
                                sx={{
                                    '& > :not(style)': {
                                        m: { xs: 0, sm: 1, md: 1, lg: 1 },
                                        width: { xs: '180px', sm: '300px', md: '320px', lg: '380px' },
                                        mt: { xs: 1, sm: 1, md: 1, lg: 1 },
                                        mb: { xs: 0.5, sm: 1, md: 1, lg: 1 },
                                    }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                }} noValidate autoComplete="off">
                                <TextField id="outlined-basic" label="" type='email' variant="outlined" placeholder="Email" onChange={(e) => setEmail(e.target.value)}
                                    InputProps={{ startAdornment: (<InputAdornment position="start"><EmailOutlinedIcon /></InputAdornment>), }}
                                    sx={{
                                        width: { xs: '180px', sm: '300px', md: '320px', lg: '380px' },
                                        '& .MuiOutlinedInput-root': {
                                            height: { xs: '34px', sm: '45px', md: '40px', lg: '50px' }, borderRadius: '30px',
                                            '& fieldset': { borderColor: '#000000', },
                                            '&:hover fieldset': { borderColor: '#002147FF', },
                                        },
                                        '& input': { padding: '0 5px', fontSize: '12px', color: '#002147FF', height: '100%', },
                                      }} />
                            </Box>

                            <Box //Text field 4
                                component="form"
                                sx={{
                                    '& > :not(style)': {
                                        m: { xs: 0, sm: 1, md: 1, lg: 1 },
                                        width: { xs: '180px', sm: '300px', md: '320px', lg: '380px' },
                                        mt: { xs: 1, sm: 1, md: 1, lg: 1 },
                                        mb: { xs: 0.5, sm: 1, md: 1, lg: 1 },
                                    }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                }} noValidate autoComplete="off">
                                <TextField id="outlined-basic" label="" type="tel" variant="outlined" placeholder="Phone No." onChange={(e) => setPhone_number(e.target.value)}
                                    InputProps={{ startAdornment: (<InputAdornment position="start"><BadgeOutlinedIcon /></InputAdornment>), }}
                                    sx={{
                                        width: { xs: '180px', sm: '300px', md: '320px', lg: '380px' },
                                        '& .MuiOutlinedInput-root': {
                                            height: { xs: '34px', sm: '40px', md: '45px', lg: '50px' }, borderRadius: '30px',
                                            '& fieldset': { borderColor: '#000000', },
                                            '&:hover fieldset': { borderColor: '#002147FF', },
                                        },
                                        '& input': { padding: '0 5px', fontSize: '12px', color: '#002147FF', height: '100%', },
                                      }} />
                            </Box>

                            <Box // password field
                                component="form"
                                sx={{
                                    '& > :not(style)': {
                                        m: { xs: 0, sm: 1, md: 1, lg: 1 },
                                        width: { xs: '180px', sm: '300px', md: '320px', lg: '380px' },
                                        mt: { xs: 1, sm: 1, md: 1, lg: 1 },
                                        mb: { xs: 0.5, sm: 1, md: 1, lg: 1.5 },
                                    }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                }} noValidate autoComplete="off">
                                <TextField id="outlined-basic" label="" variant="outlined" type={showPassword ? "text" : "Password"} placeholder="Password" 
                                onChange={
                                    (e) => setPassword(e.target.value)}
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            <LockIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                            <IconButton
                                                 onClick={(e) => {
                                                    e.preventDefault(); // Prevent default action
                                                    setShowPassword((prev) => !prev); // Toggle password visibility
                                                  }}
                                                  edge="end"
                                            >
                                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                            </InputAdornment>
                                        ),
                                        }}
                                    sx={{
                                        width: { xs: '180px', sm: '300px', md: '320px', lg: '380px' },
                                        '& .MuiOutlinedInput-root': {
                                            height: { xs: '34px', sm: '40px', md: '45px', lg: '50px' }, borderRadius: '30px',
                                            '& fieldset': { borderColor: '#000000', },
                                            '&:hover fieldset': { borderColor: '#002147FF', },
                                        },
                                        '& input': { padding: '0 5px', fontSize: '12px', color: '#002147FF', height: '100%', },
                                    }} />
                            </Box>

                            <Box // conform password field
                                component="form"
                                sx={{
                                    '& > :not(style)': {
                                        m: { xs: 0, sm: 1, md: 1, lg: 1 },
                                        width: { xs: '180px', sm: '300px', md: '320px', lg: '380px' },
                                        mt: { xs: 1, sm: 1, md: 1, lg: 1 },
                                        mb: { xs: 0.5, sm: 1, md: 1, lg: 1.5 },
                                    }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                }} noValidate autoComplete="off">
                                <TextField id="outlined-basic" label="" variant="outlined" type={showsecondPassword? "text" : "password"} placeholder="Conform password" 
                                onChange={
                                    (e) => setSecondPassword(e.target.value)}
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            <LockIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                            <IconButton
                                                 onClick={(e) => {
                                                    e.preventDefault(); // Prevent default action
                                                    setShowsecondPassword((prev) => !prev); // Toggle password visibility
                                                  }}
                                                  edge="end"
                                            >
                                                {showsecondPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                            </InputAdornment>
                                        ),
                                        }}
                                    sx={{
                                        width: { xs: '180px', sm: '300px', md: '320px', lg: '380px' },
                                        '& .MuiOutlinedInput-root': {
                                            height: { xs: '34px', sm: '40px', md: '45px', lg: '50px' }, borderRadius: '30px',
                                            '& fieldset': { borderColor: '#000000', },
                                            '&:hover fieldset': { borderColor: '#002147FF', },
                                        },
                                        '& input': { padding: '0 5px', fontSize: '12px', color: '#002147FF', height: '100%', },
                                    }} />
                            </Box>

                            <Box  //Box of Button that used to center the box
                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                            <Link to="#" style={{ textDecoration: 'none' }}> <Button href=" " type="submit" variant="contained"
                                sx={{
                                    alignItems: 'center', justifyContent: 'center', justifyItems: 'center', display: 'flex', fontWeight: 800,
                                    bgcolor: '#002147', padding: '5px',
                                    fontSize: { xs: '14px', sm: '18px', md: '16px', lg: '18px' },
                                    width: { xs: '170px', sm: '290px', md: '310px', lg: '370px' },
                                    height: { xs: '34px', sm: '40px', md: '45px', lg: '50px' },
                                    borderRadius: '30px',
                                    mt: { xs: 1.5, sm: 1.5, md: 1.5, lg: 1 },
                                    mb: { xs: 1, sm: 1, md: 1.5, lg: 2 },
                                    '&:hover': {
                                        bgcolor: '#D4790E',
                                    },
                                }}>
                                SEND CODE
                            </Button></Link>
                        </Box>
           <Typography
            sx={{
              color: "#002147FF",
              fontFamily: "inter",
              textAlign: "center",
              fontSize: { xs: "12px", md: "16px" },
              fontWeight: 300,
            }}
          >
            Already have an account?
          </Typography>
          <Link to="/signin" style={{ textDecoration: "none" }}>
            <Button
              variant="text"
              sx={{
                color: "#D4790E",
                fontWeight: 800,
                '&:hover': { color: "#000000" },
              }}
            >
              Sign In
            </Button>
          </Link>
        </Grid>

        {/* Right Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            bgcolor: "white",
            p: 3,
          }}
        >
          <Box
            component="img"
            src={St1}
            alt="Cinec Campus"
            sx={{
              mt: { xs: 3, sm: 18, md: 0 },
              width: { xs: "100%", md: "380px" },
              height: { xs: "auto", md: "380px" },
              mb: { xs: 2, md: 0 },
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography
              sx={{ fontSize: { xs: "16px", md: "20px" }, fontWeight: 700 }}
            >
              ACCOUNT VERIFICATION
            </Typography>
            <TextField
              placeholder="Enter the Code"
              inputProps={{
                maxLength: 4,
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              sx={{
                width: { xs: "150px", md: "200px" },
                textAlign: "center",
                border: "1px solid #1D3B5C",
                borderRadius: "10px",
                mt: 2,
              }}
            />
            <Button
              href="/signin"
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#4B7B98",
                color: "white",
                fontWeight: 800,
                mt: 2,
                '&:hover': { bgcolor: "#D4790E" },
              }}
            >
              CONTINUE
            </Button>
            <Typography sx={{ color: "#000", fontWeight: 300, mt: 2 }}>
              Did not get the code?
            </Typography>
            <Button
              variant="text"
              sx={{ color: "#D4790E", fontWeight: 800, '&:hover': { color: "#000" } }}
            >
              Send again
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp2;
