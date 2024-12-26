import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import BackgroundImage from "/src/assets/bg5.jpg";
import { useNavigate } from "react-router-dom";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import busIcon from "../assets/busIconMap.png";

import { LocationMethods } from "../backend/LocationMethods";

export default function Location() {
  // Get the query parameter 'route' from the URL
  const location = useLocation();
  const navigate = useNavigate();
  const routeName = new URLSearchParams(location.search).get("route"); // Extract route name from the query string

  const handleRouteClick = (routeName) => {
    navigate(`/schedule?route=${routeName}`); // Navigate to schedule page with query parameter
  };

  const [shuttleLocation, setShuttleLocation] = useState({
    shuttleID: "",
    longitude: null,
    latitude: null,
  });
  const [canTrack, setCanTrack] = useState(true);


  const center =
    shuttleLocation.latitude && shuttleLocation.longitude
      ? {
          lat: shuttleLocation.latitude,
          lng: shuttleLocation.longitude,
        }
      : { lat: 0, lng: 0 };


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
              marginTop: { xs: "30%", sm: "13%", md: "7%", lg: "7%" },
              width: { xs: "90%", sm: "52%", md: "60%", lg: "70%" }, // Adjust width on tablet
              height: "85%",
              backgroundColor: "rgba(10, 33, 71, 0.8)",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              position: "relative",
              top: "10%",
              marginBottom: { xs: "10%", sm: "0", md: "5%", lg: "5%" },
              display: "flex", // Center content vertically
              flexDirection: "column",
              justifyContent: "center", // Center vertically
              alignItems: "center", // Center horizontally
              padding: "5%",
            }}
          >
            <Grid container>
              <Grid item lg={6} md={12}>
                <Grid container>
                  <Grid item lg={12} md={6} sm={12} xs={12}>
                    <Box
                      textAlign="center"
                      sx={{
                        marginTop: {
                          xs: "0",
                          sm: "0",
                          md: "-2rem",
                          lg: "-4rem",
                        }, // Move up for larger screens
                      }}
                    >
                      <Box
                        width={"50%"}
                        marginLeft={"auto"}
                        marginRight={"auto"}
                        sx={{
                          marginTop: "10%",
                        }}
                      ></Box>

                      <Box
                         width={{ xs: "50%", sm: "60%", md: "50%", lg: "50%" }} // Adjust width for responsiveness
                         height={{ xs: "180px", sm: "140px", md: "160px", lg: "180px" }} // Fixed height with breakpoints
                        padding={"2%"}
                        sx={{
                          backgroundColor: "#D4790E",
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginTop: "18%",
                          borderRadius: "15px",
                          display: "flex", // To center content vertically and horizontally
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          sx={{
                            backgroundColor: "white",
                            height: "50px",
                            width: "90%",
                            marginTop: "5%",
                            borderRadius: "10px",
                            fontSize: { xs: "12px", sm: "14px", md: "14px" },
                            marginBottom: "5%", // Add spacing between the button and text
                          }}
                        >
                          <Box
                            sx={{
                              width: "45px",
                              height: "45px",
                              backgroundImage: `url('/src/assets/busicon.png')`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              marginRight: "10px", // Add spacing between icon and text
                            }}
                          ></Box>
                          {routeName} {/* Dynamic route name */}
                        </Button>

                        <Typography
                          fontSize={{ xs: "13px", md: "14px" }}
                          marginTop={"2%"}
                        >
                          {routeName} to Campus: 07:00AM
                        </Typography>
                        <Typography
                          
                          fontSize={{ xs: "13px", md: "14px" }}
                          marginTop={"2%"}
                        >
                          Campus to {routeName}: 07:00AM
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item lg={12} md={6} sm={12} xs={12}>
                    <Box
                      width={"50%"}
                      marginLeft={"auto"}
                      marginRight={"auto"}
                      marginTop={"10%"}
                    >
                      <Button
                       onClick={() => handleRouteClick(routeName)} // Navigate on schedule according to specific route
                        sx={{
                          backgroundColor: "white",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        VIEW BUS SCHEDULE
                      </Button>

                      <Link to="/setAlarm">
                        <Button
                          sx={{
                            
                            backgroundColor: "white",
                            width: "100%",
                            marginTop: "10%",
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
              {/* Map Section */}
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // Center-align for all devices
                    justifyContent: "center",
                    width: "100%", // Full width
                    margin: "0 auto", // Center horizontally
                    marginTop: {
                      xs: "2rem",
                      sm: "4rem",
                      md: "1.6rem",
                      lg: "1.6rem",
                    }, // Adjust spacing
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "90%", sm: "90%", md: "80%" }, // Adjust width for responsiveness
                      height: "300px", // Fixed height
                      borderRadius: "10px", // Rounded corners
                      overflow: "hidden", // Prevent content overflow
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Optional styling
                      marginBottom: { xs: "15%", sm: "0%", md: "0%" },
                    }}
                  >
                    <LoadScript googleMapsApiKey={apiKey}>
                      <GoogleMap
                        mapContainerStyle={{
                          width: "100%", // Responsive width
                          height: "100%", // Responsive height
                        }}
                        center={center}
                        zoom={13}
                      >
                        {isValidLocation && (
                          <Marker
                            position={{
                              lat: shuttleLocation.latitude,
                              lng: shuttleLocation.longitude,
                            }}
                          />
                          /*icon={{
                              url: busIcon,
                              scaledSize: new window.google.maps.Size(40, 40),
                            }}*/

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
