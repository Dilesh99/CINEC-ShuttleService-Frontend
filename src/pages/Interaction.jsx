
import React, {useState, useEffect, useRef} from 'react';
import { CssBaseline, Grid2, Typography, Box, Button } from '@mui/material';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import { Link } from 'react-router-dom';
import BackgroundImage from "/src/assets/B2.png";

import { authMethods } from '../backend/authMethods';
import { useNavigate } from 'react-router-dom';

function Interaction() {
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

  return (
    <>
      <CssBaseline />
      <Grid2 container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          minHeight: "100vh",
          width: "100vw", // Ensures full viewport width
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          margin: 0,
          padding: 0,
          overflow: "hidden", // Prevent scrollbars if content overflows
        }}>

        <Box
          sx={{
            width: '100%',
            maxWidth: 800,
            textAlign: 'center',
            mt: { xs: '0px', sm: '95px', md: '110px', lg: '120px' },
            borderRadius: 2,
          }}
        >

          <Typography
            sx={{
              fontSize: { xs: '18px', sm: '20px', md: '23px', lg: '28px' }, fontFamily: 'Inter', fontWeight: 500, letterSpacing: '0.1em', mb: 1,
            }}
          >WELCOME TO
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Inter', fontSize: { xs: '24px', sm: '26px', md: '30px', lg: '36px' }, fontWeight: 900, letterSpacing: '0.15em', mb: 4,
            }}
          >CINEC SHUTTLE SERVICES
          </Typography>

          <Grid2>
            <Link to="/signup2"> <Button href=" " variant="contained" color="warning" fullWidth
              sx={{
                width: { xs: '15rem', sm: '20rem', md: '25rem', lg: '25rem' }, borderRadius: '35px', mb: 2, fontWeight: 600, textTransform: 'none', py: { xs: 0.5, sm: 1.2, md: 1.2, lg: 1.5 }, fontSize: { xs: '12px', sm: '14px', md: '16px', justifyContent: 'left', lg: '16px' }, bgColor: '#D4790E',
                '&:hover': { bgColor: '#e67e00' },
              }}>
              <table>
                <tr>
                  <td>
                    <AssignmentIndOutlinedIcon sx={{ mr: 1, mt: { xs: 0.6, md: 1 } }} />
                  </td>
                  <td>
                    Sign Up as a Staff Member
                  </td>
                </tr>
              </table>


            </Button></Link>
          </Grid2>

          <Grid2>
            <Link to="/signup"><Button href=" " variant="contained" color="warning" fullWidth
              sx={{
                width: { xs: '15rem', sm: '20rem', md: '25rem', lg: '25rem' }, borderRadius: '35px', mb: 2, fontWeight: 600, textTransform: 'none', py: { xs: 0.5, sm: 1.2, md: 1.2, lg: 1.5 }, fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '16px' }, bgColor: '#D4790E', textAlign: 'left', justifyContent: 'left',
                '&:hover': { bgColor: '#e67e00' },
              }}>

              <table>
                <tr>
                  <td>
                    <PermContactCalendarOutlinedIcon sx={{ mr: 1, mt: { xs: 0.6, md: 1 } }} />
                  </td>
                  <td>
                    Sign Up as a Student
                  </td>
                </tr>
              </table>

            </Button></Link>
          </Grid2>


          <Typography
            sx={{ fontFamily: 'Inter', fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '16px' }, mt: { xs: 1.5, sm: 1.5, md: 1.5, lg: 1.5 }, textAlign: 'right', marginRight: { xs: '3.2rem', sm: '14rem', md: '13rem', lg: '13rem' } }}
          > Already a member?<br />
            <Link to='/signin' ><Button href="#" sx={{ fontWeight: '600', fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '16px' }, textAlign: 'right', color: '#DAEEF5', textDecoration: 'none,' }}>
              Sign In
            </Button></Link>
          </Typography>
        </Box>

        <Box
          sx={{
            width: '70%', height: '2px', position: 'absolute', top: { xs: '85%', sm: '85%', md: '87%', lg: '92%' }, borderBottom: '2px solid #ffffff', left: 0,
          }} />

        <Box
          sx={{
            width: '28%', height: '2px', position: 'absolute', top: { xs: '85%', sm: '85%', md: '87%', lg: '92%' }, borderBottom: '2px solid #ffffff', left: '72%',
          }} />

      </Grid2>
    </>
  );
}

export default Interaction;