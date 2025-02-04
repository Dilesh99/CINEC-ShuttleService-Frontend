import React, { useEffect, useState } from 'react'
import { CssBaseline, Box, Button, Grid2, TextField, Typography, InputAdornment ,IconButton, CircularProgress, Checkbox } from '@mui/material'
import BG from "../assets/bg5.jpg"
import IM1 from "../assets/IM1.png"
import L1 from "../assets/Logo2.png"
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import backEndURL from '../backend/backEndApi'




const SignIn = () => {

    var response = null;
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const [isResettingPassword, setIsResettingPassword] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [ID, setID] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState('');

    let person;

    const handleResetPassword = async () =>{
        selectPerson();
        console.log(person);
        setIsResettingPassword(true);
        setError('');
        if(ID == ""){
            setIsResettingPassword(false);
            return setError('Please Enter ID');
        }
        if(person == "Student"){
            try{
                const response = await fetch(`${backEndURL}/studentResetEmail`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ studentID: ID, password: "" })
                });
                const data = await response.json();
                if(!data.success){
                    throw new Error("Student not found");
                }
                setIsResettingPassword(false);
                window.alert("Password reset code sent via email");
            }
            catch(e){
                window.alert(e.message);
                setIsResettingPassword(false);
            }
        }

        else if(person == "Staff"){
            try{
                const response = await fetch(`${backEndURL}/staffResetEmail`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ staffID: ID, password: "" })
                });
                const data = await response.json();
                if(!data.success){
                    throw new Error("User not found");
                }
                setIsResettingPassword(false);
                window.alert("Password reset code sent via email");
            }
            catch(e){
                window.alert(e.message);
                setIsResettingPassword(false);
            }
        }

        else{
            setError("Invalid login");
            setIsResettingPassword(false);
        }
    }

    const selectPerson = () =>{
        console.log(ID);
        if (ID.length == 6) {
            person = 'Staff';
        }
        else if (ID[0] == 'M' || ID[0] == 'F') {
            person = 'Student';
        }
        else if (ID[0] == 'D') {
            person = 'Driver';
        }
        else if(ID[0] == "a"){
            person = 'Admin';
        }
        else {
            person = 'Invalid';
        }
    }
    const handleSignIn = async () => {
        setError('');
        selectPerson();
        console.log(person);
        setIsloading(true);
        try {
            switch (person) {
                case 'Staff':
                    var staffID = ID;
                    response = await fetch(`${backEndURL}/sendStaffLogins`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ staffID, password, role: "Staff" })
                    });
                    break;
                case 'Student':
                    var studentID = ID;
                    response = await fetch(`${backEndURL}/sendStudentLogins`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ studentID, password, role: "Student"})
                    });
                    break;
                case 'Driver':
                    var driverID = ID;
                    response = await fetch(`${backEndURL}/sendDriverLogins`, {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ driverID, password, role:"Driver"})
                    });
                    break;
                case 'Admin':
                    var adminID = ID;
                    response = await fetch(`${backEndURL}/sendAdminLogins`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ adminID, password, role: "Admin"})
                    });
                    break;
                default:
                    setError("Incorrect Login");
                    break;
            }
            if (response.ok && await response.json()) {
                window.alert("login successfull");
                if(person == "Student" || person == "Staff"){
                    //window.location.href = "/home";
                }
                else if(person == "Driver"){
                    window.location.href= `/shuttleService/${driverID}`
                }
                else{
                    setError("Error log in");
                }
            } else {
                setError("Incorrect ID or Password");
            }
        } catch (error) {
            setError("An error occurred while logging in. Please try again later.");
        }
        finally{
            setIsloading(false);
        }

    };

    return (
        <>
            <CssBaseline />
            <Grid2 container size={{ xs: 10 }}  >
                <Box
                    component="img"
                    src={BG}
                    alt="Background Image"
                    sx={{

                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        minHeight: "100vh",
                        width: "100vw", // Ensures full viewport width
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        margin: 0,
                        padding: 0,
                        overflow: "hidden", // Prevent scrollbars if content overflows
                    }}
                />

                <Grid2 container size={{ xs: 10 }} >

                    <Grid2 container size={{ xs: 6 }}>

                        <Box
                            component="img"
                            src={L1}
                            alt="Overlay Image"
                            sx={{

                                width: { xs: '190px', sm: '200px', md: '0px', lg: '0px' },
                                height: { xs: '60px', sm: '70px', md: '0px', lg: '0px' },
                                position: 'absolute',
                                top: { xs: '15px', sm: '150px', md: '0px', lg: '0px' },
                                left: { xs: '26%', sm: '37%', md: '0px', lg: '0px' },

                            }}
                        />


                        <Box container size={{ xs: 6 }}
                            sx={{
                                mt: '-2%',
                                width: { xs: '84%', sm: '70%', md: '48%', lg: '48%' },
                                height: { xs: '405px', sm: '425px', md: '615px', lg: '615px' },
                                borderTopLeftRadius: { xs: 10, sm: 10, md: 10, lg: 10 },
                                borderEndStartRadius: { xs: 10, sm: 10, md: 10, lg: 10 },
                                borderTopRightRadius: { xs: 10, sm: 10, md: 0, lg: 0 },
                                borderEndEndRadius: { xs: 10, sm: 10, md: 0, lg: 0 },
                                bgcolor: '#ffffff',
                                flexDirection: 'column',
                                marginLeft: { xs: '0%', sm: '0%', md: '8%', lg: '8%' },
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                opacity: 0.9,
                                position: 'absolute',
                                left: { xs: '50%', sm: '50%', md: 0, lg: 0 },
                                top: { xs: '50%', sm: '50%', md: '10%', lg: '10%' },
                                transform: { xs: 'translate(-50%, -50%)', sm: 'translate(-50%, -50%)', md: 'none', lg: 'none' }, // Center for smaller screens
                            }}>

                            <Typography
                                sx={{
                                    color: { xs: '#D4790E', sm: '#D4790E', md: '#D4790E', lg: '#002147FF' }, fontFamily: 'inter', textAlign: 'center',
                                    fontSize: { xs: '16px', sm: '20px', md: '24px', lg: '24px' },
                                    mt: { xs: 4, sm: 2.5, md: 8, lg: 10 },
                                    
                                }}>
                                WELCOME TO
                            </Typography>

                            <Typography sx={{
                                color: '#002147FF', fontFamily: 'inter', textAlign: 'center',
                                fontSize: { xs: '20px', sm: '22px', md: '30px', lg: '32px' },
                                mb: { xs: 1, sm: 2, md: 2, lg: 3 },
                                 fontWeight: '800'
                            }}>
                                CINEC SHUTTLE SERVICES
                            </Typography>

                            <Typography sx={{
                                color: '#002147FF', fontFamily: 'inter', textAlign: 'center', fontWeight: '500',
                                fontSize: { xs: '12px', sm: '16px', md: '16px', lg: '16px' },
                                mt: { xs: 2, sm: 3, md: 3, lg: 5 },
                                mb: { xs: 2, sm: 2, md: 2, lg: 2 },
                                
                            }}>
                                Enter your ID & Password to SignIn
                            </Typography>

                            <Box //Text field 1
                                component="form"
                                sx={{
                                    '& > :not(style)': {
                                        m: { xs: 0, sm: 1, md: 1, lg: 1 },
                                        width: { xs: '180px', sm: '300px', md: '320px', lg: '380px' },
                                        mt: { xs: 1, sm: 1, md: 1, lg: 2 },
                                        mb: { xs: 0.5, sm: 1, md: 1.5, lg: 1.5 },
                                    }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                }} noValidate autoComplete="off">
                                <TextField id="outlined-basic" label="" variant="outlined" placeholder="ID" onChange={(e) => {setID(e.target.value)}}

                                    InputProps={{ startAdornment: (<InputAdornment position="start" ><AccountCircleOutlinedIcon /></InputAdornment>), }}
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
                                <TextField id="outlined-basic" label="" variant="outlined" type={showPassword ? "text" : "password"} placeholder="Password" 
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setIsTyping(e.target.value.length > 0); // Toggle isTyping based on input
                                      }}
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            <LockIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: isTyping ? ( // Show the visibility toggle only while typing
                                            <InputAdornment position="end">
                                              <IconButton
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                edge="end"
                                              >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                              </IconButton>
                                            </InputAdornment>
                                          ) : null,
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


                            <Button sx={{
                                alignItems: 'center', justifyContent: 'center', justifyItems: 'center', display: 'flex', color: '#002147CC', fontFamily: 'inter',
                                marginLeft: { xs: '160px', sm: '280px', md: '480px', lg: '480px' },
                                fontSize: { xs: '9px', sm: '12px', md: '15px', lg: '15px' }, fontWeight: 300,
                                mb: 1,
                                mt: 0
                            }} onClick={handleResetPassword} disabled={isResettingPassword}>
                                {isResettingPassword ? 'Resetting Password...' : 'Forgot Password? '}
                            </Button>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
    <Checkbox
        checked={rememberMe} 
        onChange={(e) => setRememberMe(e.target.checked)} 
        sx={{ color: '#002147CC',transform: 'scale(0.8)' }} 
    />
    <Typography sx={{fontSize: { xs: '10px', sm: '12px', md: '15px', lg: '15px' }, fontWeight: 200, color: '#002147CC' }}>Remember Me</Typography>
</Box>

                            
                            {error  &&  (
                            <Typography sx={{ color: "red", fontSize: "12px", marginBottom: "16px", textAlign:'center', marginRight:{xs:'8%',md:'0'}, marginLeft:{xs:'8%', md:'0'}}}>
                                {error}
                            </Typography>
                            )}

                            <Box  //Box of Button that used to center the box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                }}
                            >
                                <Button type="submit" variant="contained"
                                    sx={{
                                        alignItems: 'center', justifyContent: 'center', justifyItems: 'center', display: 'flex', fontWeight: 800,
                                        bgcolor: '#002147', padding: '5px',
                                        fontSize: { xs: '16px', sm: '18px', md: '18px', lg: '20px' },
                                        width: { xs: '170px', sm: '290px', md: '310px', lg: '370px' },
                                        height: { xs: '34px', sm: '40px', md: '45px', lg: '50px' },
                                        borderRadius: '30px',
                                        mb: 2,
                                        '&:hover': {
                                            bgcolor: '#D4790E',
                                        },
                                    }} 
                                    onClick={handleSignIn}
                                    disabled={isLoading}
                                    >
                                    {isLoading?<CircularProgress size={24} color="inherit"/> : "Sign In"}
                                </Button>
                            </Box>

                            <Typography sx={{
                                color: '#002147FF', fontFamily: 'inter', textAlign: 'center',
                                fontSize: { xs: '10px', sm: '14px', md: '14px', lg: '16px' },
                                mb:{xs:'-1%',md:'0'},  fontWeight: 300,
                            }}>
                                If you don't have account
                            </Typography>


                            <Box  //Box of Button that used to center the box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                }}
                            >
                                <Link to="/interaction" style={{ textDecoration: 'none' }}><Button Button href=" " variant='text'
                                    sx={{
                                        alignItems: 'center', justifyContent: 'center', justifyItems: 'center', display: 'flex',
                                        fontSize: { xs: '10px', sm: '15px', md: '16px', lg: '16px' },
                                        color: '#D4790E', fontWeight: 800,
                                        '&:hover': {
                                            color: '#002147',
                                        },
                                    }}>
                                    Sign Up Now
                                </Button></Link>
                            </Box>


                        </Box>


                    </Grid2>

                    <Grid2 container size={{ xs: 4 }}>
                        <Box container size={{ xs: 4 }}
                            sx={{
                                mt: '-2%',
                                width: { xs: 0, sm: 0, md: '36%', lg: '36%' },
                                height: { xs: 0, sm: 0, md: '615px', lg: '615px' },
                                borderTopRightRadius: { xs: 0, sm: 0, md: 10, lg: 10 },
                                borderTopLeftRadius: { xs: 0, sm: 0, md: 0, lg: 0 },
                                borderEndEndRadius: { xs: 10, sm: 10, md: 10, lg: 10 },
                                borderEndStartRadius: { xs: 10, sm: 10, md: 0, lg: 0 },
                                bgcolor: '#000000',
                                flexDirection: 'column',
                                marginRight: '8%',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                position: 'absolute',
                                right: 0,
                                top: { xs: '650px', sm: '690px', md: '10%', lg: '10%' },
                            }}>

                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative'  //  absolute positioning
                                }}
                            >
                                {/* Main Image */}
                                <Box
                                    component="img"
                                    src={IM1}
                                    alt="Cinec Campus"
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />

                                {/* Overlay Image */}
                                <Box
                                    component="img"
                                    src={L1}  // Replace with the source of the second image
                                    alt="Overlay Image"
                                    sx={{
                                        width: { xs: '0px', sm: '0px', md: '340px', lg: '340px' },  // Adjust the size of the overlay image
                                        height: { xs: '0px', sm: '0px', md: '100px', lg: '100px' },
                                        position: 'absolute',  // Position it absolutely within the main container
                                        top: { xs: '0px', sm: '0px', md: '37%', lg: '37%' },
                                        left: { xs: '0px', sm: '0px', md: '12%', lg: '24%' },

                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    )
}

export default SignIn