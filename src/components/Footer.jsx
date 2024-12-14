import { CssBaseline, Box, Grid, Typography, Link } from '@mui/material';
import React, { useEffect } from 'react';
import L3 from '../assets/Logo2.png'; // Replace with your logo image path
import SocialMediaIcons from '../assets/S1.png'; // Replace with the social media icons image path

const Footer = () => {
  useEffect(() => {
    // Disable horizontal scrolling on desktop
    const handleResize = () => {
      
        // Disable horizontal scrolling on desktop
        document.body.style.overflowX = "hidden";
     
    };

    // Call the resize handler on component mount and resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Run effect once on mount and cleanup on unmount

  return (
    <>
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          bgcolor: '#181818',
          color: '#ffffff',
          py: 4,
          px: { xs: 2, sm: 8, md: 10, lg: 15 },
          margin: 0,
          overflow: "hidden",
          width: "100vw",
          mt: 0,
          fontFamily: 'Arial, sans-serif',
        
        }}
      >
        <Grid container spacing={4}>
          {/* Left Column: Logo and Description */}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                display: { xs: 'flex', sm: 'block' },
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: { xs: '100%', sm: 'auto' },
              }}
            >
              <Box
                component="img"
                src={L3}
                alt="Cinec Logo"
                sx={{
                  width: { xs: '140px', sm: '160px' },
                  height: 'auto',
                  mb: 2,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '12px', sm: '12px' },
                  lineHeight: 1.6,
                  textAlign: { xs: 'center', sm: 'left' },
                }}
              >
                The Colombo International Nautical and Engineering College, also known as the
                CINEC campus, is a Sri Lankan private institute of higher education.
              </Typography>
            </Box>
          </Grid>

          {/* Center Column: Services */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '14px', sm: '14px' },
                mb: 3,
                textAlign: 'center',
              }}
            >
              SERVICES
            </Typography>
            <Box textAlign="center">
              <Link
                href="/home"
                sx={{
                  display: 'block',
                  color: '#ffffff',
                  fontSize: { xs: '12px', sm: '12px' },
                  textDecoration: 'none',
                  mb: 2,
                  '&:hover': { color: '#D4790E' },
                }}
              >
                HOME
              </Link>
              <Link
                href="/booking"
                sx={{
                  display: 'block',
                  color: '#ffffff',
                  fontSize: { xs: '12px', sm: '12px' },
                  textDecoration: 'none',
                  mb: 2,
                  '&:hover': { color: '#D4790E' },
                }}
              >
                BOOKING
              </Link>
              <Link
                href="/payment"
                sx={{
                  display: 'block',
                  color: '#ffffff',
                  fontSize: { xs: '12px', sm: '12px' },
                  textDecoration: 'none',
                  mb: 2,
                  '&:hover': { color: '#D4790E' },
                }}
              >
                PAYMENT
              </Link>
              <Link
                href="/notification"
                sx={{
                  display: 'block',
                  color: '#ffffff',
                  fontSize: { xs: '12px', sm: '12px' },
                  textDecoration: 'none',
                  mb: 1.5,
                  '&:hover': { color: '#D4790E' },
                }}
              >
                NOTIFICATION
              </Link>
            </Box>
          </Grid>

          {/* Right Column: Contact Info */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '14px', sm: '14px' },
                mb: 3,
                textAlign: 'center',
              }}
            >
              CONTACT US
            </Typography>

            <Grid container spacing={2}>
              {/* Row 1: Address */}
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ fontSize: { xs: '12px', sm: '13px' }, fontWeight: 'bold', textAlign:'right' }}>
                  Address:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ fontSize: { xs: '12px', sm: '12px' } }}>
                  CINEC Campus, <br />Millennium Drive IT Park, <br />Malabe, <br />Sri Lanka.
                </Typography>
              </Grid>

              {/* Row 2: Phone */}
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ fontSize: { xs: '12px', sm: '13px' }, fontWeight: 'bold',textAlign:'right' }}>
                  Phone:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ fontSize: { xs: '12px', sm: '12px' } }}>
                  0114 486 400
                </Typography>
              </Grid>

              {/* Row 3: Hotline */}
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ fontSize: { xs: '12px', sm: '13px' }, fontWeight: 'bold',textAlign:'right' }}>
                  Hotline:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ fontSize: { xs: '12px', sm: '12px' } }}>
                  +94 114 486 400
                </Typography>
              </Grid>

              {/* Row 4: Fax */}
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ fontSize: { xs: '12px', sm: '13px' }, fontWeight: 'bold',textAlign:'right' }}>
                  Fax:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ fontSize: { xs: '12px', sm: '12px' } }}>
                  +94 112 413 505
                </Typography>
              </Grid>

              {/* Row 5: Email */}
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ fontSize: { xs: '12px', sm: '13px' }, fontWeight: 'bold',textAlign:'right' }}>
                  Email:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ fontSize: { xs: '12px', sm: '12px' } }}>
                  info@cinec.edu, maritime@cinec.edu
                </Typography>
              </Grid>

              {/* Row 6: Website */}
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ fontSize: { xs: '12px', sm: '13px' }, fontWeight: 'bold',textAlign:'right' }}>
                  Website:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ fontSize: { xs: '12px', sm: '12px' } }}>
                  www.cinec.edu
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box
          sx={{
            borderTop: '1px solid #ffffff',
            mt: 6,
            pt: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ fontSize: { xs: '11px', sm: '13px' }, mb: 2 }}>
            All Copyrights Reserved By CINEC Campus - © 2023
          </Typography>
          <Typography variant="body2" sx={{ fontSize: { xs: '11px', sm: '13px' }, mb: 2 }}>
            <Link
              href="#"
              sx={{
                color: '#ffffff',
                textDecoration: 'none',
                '&:hover': { color: '#D4790E' },
                mx: 1,
              }}
            >
              Terms & Conditions
            </Link>
            |
            <Link
              href="#"
              sx={{
                color: '#ffffff',
                textDecoration: 'none',
                '&:hover': { color: '#D4790E' },
                mx: 1,
              }}
            >
              Privacy Policy
            </Link>
            |
            <Link
              href="#"
              sx={{
                color: '#ffffff',
                textDecoration: 'none',
                '&:hover': { color: '#D4790E' },
                mx: 1,
              }}
            >
              Sitemap
            </Link>
          </Typography>

          {/* Social Media Icons */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Box
              component="img"
              src={SocialMediaIcons}
              alt="Social Media Icons"
              sx={{
                width: { xs: '180px', sm: '220px' }, // Adjust size for different screen widths
                height: 'auto',
                display: 'inline-block',
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
