import React, { useEffect, useState } from 'react'
<<<<<<< HEAD
import { CssBaseline, Box, Button, Grid2, TextField, Typography, InputAdornment, IconButton  } from '@mui/material'
=======
import { CssBaseline, Box, Button, Grid2, TextField, Typography, InputAdornment, CircularProgress } from '@mui/material'
>>>>>>> 46af9913fcd406f715b9fadbf1b584172be9b6a5
import BG from "../assets/bg5.jpg"
import IM2 from "../assets/M2.png"
import L1 from "../assets/Logo2.png"
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Link } from 'react-router-dom';


const SignUp = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [username, setUsername] = useState('');
    const [studentID, setStudentID] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showsecondPassword, setShowsecondPassword] = useState(false);

    const handleSignUp = async () => {
        setIsLoading(true);
        var canSignUp = true;
        var errors = "";
        if(studentID.length != 12){
            errors += "\nInvalid ID length";
            canSignUp = false;
        }
        if(studentID[0] !="M" && studentID[0] != "F"){
            errors += "\nInvalid student ID";
            canSignUp = false;
        }
        if(phone_number.length != 10){
            errors += "\nInvalid phone number";
            canSignUp = false;
        }
        if(password != secondPassword){
            errors += "\nPasswords do not match";
            canSignUp = false;
        }

        if(canSignUp){
            const response = await fetch(`http://localhost:8080/sendStudentLogins`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ studentID, password })
            });
            if (await response.json()) {
                window.alert("Student already signed up");
                setIsLoading(false);
            }
            else {
                var studentsID = studentID;
                const response = await fetch(`http://localhost:8080/updateStudent`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ studentsID, username, email, phone_number, password })
                });
                const data = await response.text();
                console.log(data);
                window.location.href = "/home";
            }
        }
        else{
            window.alert(errors);
            setIsLoading(false);
        }

    }


    return (
        <>
            <CssBaseline />
            <Grid2 container size={{ xs: 10 }}  >
                <Box
                    component="img"
                    src={BG}
                    alt="Background Image"
                    sx={{

                        width: "100vw",
                        height: { xs: '1000px', sm: '1100px', md: '701px', lg: '701px' },
                    }}
                />

                <Grid2 container size={{ xs: 10 }} >

                    <Grid2 container size={{ xs: 6 }}>

                        <Box
                            component="img"
                            src={L1}
                            alt="Overlay Image"
                            sx={{

                                width: { xs: '190px', sm: '250px', md: '0px', lg: '0px' },
                                height: { xs: '60px', sm: '80px', md: '0px', lg: '0px' },
                                position: 'absolute',
                                top: { xs: '32px', sm: '36px', md: '0px', lg: '0px' },
                                left: { xs: '22%', sm: '35%', md: '0px', lg: '0px' },

                            }}
                        />


                        <Box container size={{ xs: 6 }}
                            sx={{
                                mt: '-1%',
                                width: { xs: '84%', sm: '78%', md: '48%', lg: '48%' },
                                height: { xs: '550px', sm: '530px', md: '615px', lg: '630px' },
                                borderTopLeftRadius: { xs: 10, sm: 10, md: 10, lg: 10 },
                                borderEndStartRadius: { xs: 0, sm: 0, md: 10, lg: 10 },
                                borderTopRightRadius: { xs: 10, sm: 10, md: 0, lg: 0 },
                                borderEndEndRadius: { xs: 0, sm: 0, md: 0, lg: 0 },
                                bgcolor: '#ffffff',
                                opacity: 0.9,
                                flexDirection: 'column',
                                marginLeft: { xs: '8%', sm: '11%', md: '8%', lg: '8%' },
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                position: 'absolute',
                                left: 0,
                                top: { xs: '120px', sm: '140px', md: '8%', lg: '8%' },
                            }}>


                            <Typography
                                sx={{
                                    color: { xs: '#D4790E', sm: '#D4790E', md: '#D4790E', lg: '#002147FF' }, fontFamily: 'inter', textAlign: 'center',
                                    fontSize: { xs: '16px', sm: '20px', md: '20px', lg: '24px' },
                                    mt: { xs: 3, sm: 3, md: 5, lg: 4 },
                                    
                                }}>
                                Create an Account for
                            </Typography>

                            <Typography sx={{
                                color: '#002147FF', fontFamily: 'inter', textAlign: 'center',
                                fontSize: { xs: '18px', sm: '30px', md: '30px', lg: '32px' },
                                mb: 0,  fontWeight: '800'
                            }}>
                                CINEC SHUTTLE SERVICES
                            </Typography>


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
                                <TextField id="outlined-basic" label="" variant="outlined" placeholder="Student ID" onChange={(e) => setStudentID(e.target.value)}
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

                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography sx={{
                                    color: '#002147FF', fontFamily: 'inter', textAlign: 'center',
                                    fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '16px' },
                                    mt: 0, mb: 0, fontFamily: 'inter', fontWeight: 300,
                                }}>
                                    Already have an account?
                                </Typography>


                                <Box  //Box of Button that used to center the box
                                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                    <Link to="/signin" style={{ textDecoration: 'none' }}><Button href=" " variant='text'
                                        sx={{

                                            alignItems: 'center', justifyContent: 'center', justifyItems: 'center',
                                            fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '16px' },
                                            color: '#D4790E', fontWeight: 800, mt: { xs: '-1.5vh', sm: '-1.1vh' },
                                            '&:hover': { color: '#002147', },
                                        }}>
                                        Sign in
                                    </Button></Link>
                                </Box>
                            </Box>
                        </Box>


                    </Grid2>

                    <Grid2 container size={{ xs: 4 }}>
                        <Box container size={{ xs: 4 }}
                            sx={{
                                mt: '-1%',
                                width: { xs: '84%', sm: '600px', md: '36%', lg: '36%' },
                                height: { xs: '300px', sm: '300px', md: '615px', lg: '630px' },
                                borderTopRightRadius: { xs: 0, sm: 0, md: 10, lg: 10 },
                                borderEndEndRadius: { xs: 10, sm: 10, md: 10, lg: 10 },
                                borderEndStartRadius: { xs: 10, sm: 10, md: 10, lg: 10 },
                                borderTopLeftRadius: 0,
                                bgcolor: '#000000',
                                flexDirection: 'column',
                                marginRight: {
                                    xs: '8%', sm: '84.5px', md: '8%', lg: '8%'
                                },
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                position: 'absolute',
                                right: 0,
                                top: { xs: '585px', sm: '670px', md: '8%', lg: '8%' }
                            }}>

                            <Box
                                sx={{

                                    width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
                                    height: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
                                    position: 'relative'  //  absolute positioning
                                }}
                            >
                                {/* Main Image */}
                                <Box
                                    component="img"
                                    src={IM2}
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
                                        width: { xs: 0, sm: 0, md: '250px', lg: '400px' },  // Adjust the size of the overlay image
                                        height: { xs: 0, sm: 0, md: '100px', lg: '140px' },
                                        position: 'absolute',  // Position it absolutely within the main container
                                        top: '10%',
                                        left: '19%',


                                    }}
                                />

                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',  // Center the content
                                        textAlign: 'center',
                                    }}
                                >

                                    <Typography sx={{ fontSize: { xs: '14px', sm: '15px', md: '22px', lg: '24px' }, fontWeight: 600, color: '#ffffff', mt: { xs: 0, sm: 0, md: 8, lg: 18 } }}>ACCOUNT</Typography>
                                    <Typography sx={{ fontSize: { xs: '14px', sm: '15px', md: '22px', lg: '24px' }, fontWeight: 600, color: '#ffffff', mb: 1 }}>VERIFICATION</Typography>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',

                                        }}
                                    >
                                        <TextField
                                            variant="outlined"
                                            label=""
                                            placeholder='Enter the Code'

                                            inputProps={{
                                                maxLength: 4,          // Limit input to 4 characters
                                                inputMode: 'numeric',   // Show numeric keyboard on mobile devices
                                                pattern: "[0-9]*",      // Allow only numbers

                                            }}
                                            sx={{
                                                width: { xs: '140px', sm: '140px', md: '180px', lg: '200px' },
                                                textAlign: 'center',
                                                border: { xs: '1px solid #D4790E', sm: '1px solid #D4790E', md: '2px solid #D4790E', lg: '2px solid #D4790E' },
                                                borderRadius: { xs: '8px', sm: '8px', md: '10px', lg: '10px' },
                                                mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                                                mb: { xs: 2, sm: 2, md: 4, lg: 4 },
                                                '& input': {
                                                    textAlign: 'center',  // Center-align text
                                                    color: '#ffffff'
                                                },
                                            }}

                                        />
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                fontWeight: 800,
                                                bgcolor: '#D4790E',
                                                color: '##002147',
                                                padding: { xs: '3px', sm: '4px', md: '5px', lg: '5px' },
                                                fontSize: { xs: '12px', sm: '13px', md: '16px', lg: '17px' },
                                                width: { xs: '150px', sm: '150px', md: '180px', lg: '190px' },
                                                height: { xs: '35px', sm: '35px', md: '40px', lg: '40px' },
                                                borderRadius: { xs: '28px', sm: '28px', md: '30px', lg: '30px' },
                                                mb: 0,
                                                '&:hover': { bgcolor: '#ffffff', color: '#000000' },
                                            }} onClick={handleSignUp}
                                            disabled={isLoading}
                                        >
                                            {isLoading?<CircularProgress size={24} color='inherit'/>:"CONTINUE"}
                                        </Button>
                                    </Box>

                                    <Typography
                                        sx={{
                                            color: '#FFFFFF',
                                            fontFamily: 'inter',
                                            fontSize: { xs: '3', sm: '3', md: '4', lg: '4' },
                                            mt: { xs: 1, sm: 1, md: 2, lg: 2 },
                                            fontWeight: 300,
                                        }}
                                    >
                                        Did not get the code?
                                    </Typography>

                                    <Box sx={{

                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <Button href=" "
                                            variant="text"
                                            sx={{
                                                fontSize: { xs: '12px', sm: '13px', md: '14px', lg: '16px' },
                                                color: '#D4790E',
                                                fontWeight: 800,
                                                '&:hover': { color: '#ffffff' },
                                            }}
                                        >
                                            Send again
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>




                    </Grid2>


                </Grid2>
            </Grid2>



        </>
    )
}

export default SignUp