import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Layout from "../components/Layout";
import { Link } from 'react-router-dom';
import BackgroundImage from "/src/assets/bg5.jpg";

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import busIcon from '../assets/busIconMap.png';

import { LocationMethods } from '../backend/LocationMethods';




export default function Location() {
  // Get the query parameter 'route' from the URL
  const location = useLocation();
  const routeName = new URLSearchParams(location.search).get('route'); // Extract route name from the query string

  const [shuttleLocation, setShuttleLocation] = useState({
    shuttleID: "",
    longitude: null,
    latitude: null
  });
  const [canTrack, setCanTrack] = useState(true);

  const containerStyle = {
    width: `{100%}`,
    height: '300px',
    border: 0,
    borderRadius: '10px',
  };

  const center = shuttleLocation.latitude && shuttleLocation.longitude ? {
    lat: shuttleLocation.latitude,
    lng: shuttleLocation.longitude,
  } : { lat: 0, lng: 0 };

  const apiKey = 'AIzaSyDHSsPvUNS84N5jUnEyt5xxzGYkkynf6TU';


  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      setCanTrack(true);
    } else {
      setCanTrack(false);
    }
  });
  useEffect(() => {
    if (canTrack) {
      const intervalId = setInterval(() => {
        LocationMethods.fetchLocation(routeName, setShuttleLocation);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [canTrack, routeName]);

  const isValidLocation = shuttleLocation.latitude && shuttleLocation.longitude;

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
              marginBottom: { xs: "15%", sm: "0", md: "5%", lg: "5%" },
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
                          textAlign: 'center'
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
                    marginLeft={{ xs: '-11%', sm: '30%', md: '12%' }}
                    padding={{ xs: 5, md: 0 }}

                  >
                    <LoadScript googleMapsApiKey={apiKey}>
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={13}
                      >
                        {isValidLocation && (
                          <Marker
                            position={{
                              lat: shuttleLocation.latitude,
                              lng: shuttleLocation.longitude,
                            }}
                            /*icon={{
                              url: busIcon,
                              scaledSize: new window.google.maps.Size(40, 40),
                            }}*/
                          />
                        )}
                      </GoogleMap>
                    </LoadScript>
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
