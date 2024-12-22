import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Layout from "../components/Layout";
import { Link } from 'react-router-dom';
import BackgroundImage from "/src/assets/bg5.jpg";




export default function Location() {
  // Get the query parameter 'route' from the URL
  const location = useLocation();
  const routeName = new URLSearchParams(location.search).get('route'); // Extract route name from the query string

  return (
    <div>
      <Layout>
        <Box
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
          }}
        >
          <Box
            sx={{
              marginTop: { xs: "30%", sm: "13%", md: "8%", lg: "6%" },
              width: { xs: '90%', sm: '52%', md: '60%', lg: '70%' }, // Adjust width on tablet
              height: '85%',
              backgroundColor: "rgba(10, 33, 71, 0.8)",
              borderRadius: 6,
              marginLeft: 'auto',
              marginRight: 'auto',
              position: 'relative',
              top: '10%',
              marginBottom:{xs:"15%",sm:"0",md:"5%",lg:"5%"},
              display: 'flex',  // Center content vertically
              flexDirection: 'column',
              justifyContent: 'center', // Center vertically
              alignItems: 'center' // Center horizontally
            }}
          >
            <Grid container>
              <Grid item lg={6} md={12}>
                <Grid container>
                  <Grid item lg={12} md={6} sm={12} xs={12}>
                    <Box textAlign={'center'}>
                      <Box
                        width={'50%'}
                        marginLeft={'auto'}
                        marginRight={'auto'}
                        sx={{
                          marginTop: '10%',
                        }}
                      ></Box>

                      <Box
                        width={'50%'}
                        padding={'2%'}
                        sx={{
                          backgroundColor: '#D4790E',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          marginTop: '18%',
                          borderRadius: '15px',
                        }}
                      >
                        <Button
                          sx={{
                            backgroundColor: 'white',
                            height: '50px',
                            width: '80%',
                            marginTop: '5%',
                            borderRadius: '10px',
                          }}
                        >
                          <Box
                            sx={{
                              width: '45px',
                              height: '45px',
                              backgroundImage: `url('/src/assets/busicon.png')`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                            }}
                          ></Box>
                          {routeName} {/* Dynamic route name */}
                        </Button>

                        <Typography fontSize={'14px'} marginTop={'2%'}>
                          {routeName} to Campus: 07:00AM
                        </Typography>
                        <Typography fontSize={'14px'} marginTop={'2%'}>
                          Campus to {routeName}: 07:00AM
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item lg={12} md={6} sm={12} xs={12}>
                    <Box width={'50%'} marginLeft={'auto'} marginRight={'auto'} marginTop={'10%'}>
                      <Button
                        href='/schedule'
                        sx={{
                          backgroundColor: 'white',
                          width: '100%',
                          textAlign:'center'
                        }}
                      >
                        VIEW BUS SCHEDULE
                      </Button>

                      <Link to="/setAlarm">
                        <Button
                          sx={{
                            backgroundColor: 'white',
                            width: '100%',
                            marginTop: '10%',
                          }}
                        >
                          Set Alarm
                        </Button>
                      </Link>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              {/* Map Section */}
              <Grid item lg={6} md={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', sm: 'center', md: 'flex-start', lg: 'flex-start' }, // Center for xs/sm, align left for larger
                    justifyContent: 'center',
                    width: '100%', // Full width for consistency
                    margin: { xs: '0 auto', sm: '0 auto', md: '0' }, // Center horizontally for mobile/tablet
                    marginTop: { xs: '2rem', sm: '4rem', md: '16%' },
                  }}
                >
                  <Box
                    width={{ xs: 'auto', sm: '75%', md: '80%' }} // Adjust the width for responsiveness
                    margin={' auto'}
                    height={'100%'}
                    marginBottom={'13%'} 
                  //  marginLeft={{xs:'11%',sm:'30%',md:'12%'  }}
                    padding={{xs:5, md:0 }}
                    
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44810.48049958517!2d79.93826798411983!3d6.92352057383237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae256d59601df81%3A0x31a1dd96e8d49ba!2sMalabe!5e0!3m2!1sen!2slk!4v1731276460672!5m2!1sen!2slk"
                      width={'100%'}
                      height={'300px'}
                      style={{
                        border: 0,
                        borderRadius: '10px', // Optional: Add rounded corners for better aesthetics
                      }}
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Layout>
    </div>
  );
}
