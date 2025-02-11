import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import BackgroundImage from "/src/assets/bg5.jpg";
import busIconMap from "/src/assets/busIconMap.png";
import busIcon from "/src/assets/busIcon.png";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { LocationMethods } from "../backend/LocationMethods";
import { authMethods } from "../backend/authMethods";

export default function Location() {
  const location = useLocation();
  const navigate = useNavigate();
  const apiKey = "AIzaSyDHSsPvUNS84N5jUnEyt5xxzGYkkynf6TU";
  const routeName = new URLSearchParams(location.search).get("route");
  const hasRun = useRef(false);
  const shuttleMarkerRef = useRef(null);
  const userMarkerRef = useRef(null);
  const [map, setMap] = useState(null);

  // State variables
  const [shuttleLocation, setShuttleLocation] = useState({
    shuttleID: "",
    longitude: null,
    latitude: null,
  });
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
    accuracy: null,
  });
  const [canTrack, setCanTrack] = useState(true);

  // Authentication check
  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      handleAuth().catch(() => navigate("/"));
    }
  }, []);

  const handleAuth = async () => {
    const res = await authMethods.refreshToken();
    if (!res?.accessToken || !res.ID || !(res.role === "Student" || res.role === "Staff")) {
      navigate("/");
    }
  };

  // Location tracking effects
  useEffect(() => {
    const handleVisibilityChange = () => {
      setCanTrack(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Shuttle location tracking
  useEffect(() => {
    if (canTrack) {
      const intervalId = setInterval(() => {
        LocationMethods.fetchLocation(routeName, setShuttleLocation);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [canTrack, routeName]);

  // User location tracking
  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setUserLocation({ latitude, longitude, accuracy });
        },
        (error) => console.error("Error fetching user location:", error.message),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    };

    const intervalId = setInterval(getUserLocation, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Map bounds adjustment
  useEffect(() => {
    if (map && shuttleLocation.latitude && userLocation.latitude) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend({ lat: shuttleLocation.latitude, lng: shuttleLocation.longitude });
      bounds.extend({ lat: userLocation.latitude, lng: userLocation.longitude });
      map.fitBounds(bounds);
    }
  }, [shuttleLocation, userLocation, map]);

  // Shuttle marker animation
  useEffect(() => {
    if (shuttleMarkerRef.current && shuttleLocation.latitude) {
      const newPos = new window.google.maps.LatLng(
        shuttleLocation.latitude,
        shuttleLocation.longitude
      );
      animateMarkerPosition(shuttleMarkerRef.current, newPos);
    }
  }, [shuttleLocation]);

  // Animation function
  const animateMarkerPosition = (marker, newPos) => {
    const currentPos = marker.getPosition();
    if (!currentPos) return;

    const startLat = currentPos.lat();
    const startLng = currentPos.lng();
    const endLat = newPos.lat();
    const endLng = newPos.lng();

    let startTime;
    const duration = 1000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;

      if (progress < 1) {
        const lat = startLat + (endLat - startLat) * progress;
        const lng = startLng + (endLng - startLng) * progress;
        marker.setPosition({ lat, lng });
        requestAnimationFrame(animate);
      } else {
        marker.setPosition(newPos);
      }
    };
    requestAnimationFrame(animate);
  };

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
            width: "100vw",
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            margin: 0,
            padding: 0,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              marginTop: { xs: "30%", sm: "13%", md: "7%", lg: "7%" },
              width: { xs: "90%", sm: "52%", md: "60%", lg: "70%" },
              height: "85%",
              backgroundColor: "rgba(10, 33, 71, 0.8)",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              position: "relative",
              top: "10%",
              marginBottom: { xs: "10%", sm: "0", md: "5%", lg: "5%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
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
                        marginTop: { xs: "0", sm: "0", md: "-2rem", lg: "-4rem" },
                      }}
                    >
                      <Box
                        width={"50%"}
                        marginLeft={"auto"}
                        marginRight={"auto"}
                        sx={{ marginTop: "10%" }}
                      ></Box>

                      <Box
                        width={{ xs: "50%", sm: "60%", md: "50%", lg: "50%" }}
                        height={{ xs: "180px", sm: "140px", md: "160px", lg: "180px" }}
                        padding={"2%"}
                        sx={{
                          backgroundColor: "#D4790E",
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginTop: "18%",
                          borderRadius: "15px",
                          display: "flex",
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
                            marginBottom: "5%",
                          }}
                        >
                          <Box
                            sx={{
                              width: "45px",
                              height: "45px",
                              backgroundImage: `url(${busIcon})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              marginRight: "10px",
                            }}
                          ></Box>
                          {routeName}
                        </Button>

                        <Typography fontSize={{ xs: "13px", md: "14px" }} marginTop={"2%"}>
                          {routeName} to Campus: 07:00AM
                        </Typography>
                        <Typography fontSize={{ xs: "13px", md: "14px" }} marginTop={"2%"}>
                          Campus to {routeName}: 07:00AM
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item lg={12} md={6} sm={12} xs={12}>
                    <Box width={"50%"} marginLeft={"auto"} marginRight={"auto"} marginTop={"10%"}>
                      <Button
                        onClick={() => navigate(`/schedule?route=${routeName}`)}
                        sx={{ backgroundColor: "white", width: "100%", textAlign: "center" }}
                      >
                        VIEW BUS SCHEDULE
                      </Button>

                      <Link to="/setAlarm">
                        <Button
                          sx={{ backgroundColor: "white", width: "100%", marginTop: "10%" }}
                        >
                          Set Alarm
                        </Button>
                      </Link>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              {/* Map Section */}
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    margin: "0 auto",
                    marginTop: { xs: "2rem", sm: "4rem", md: "1.6rem", lg: "1.6rem" },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "90%", sm: "90%", md: "80%" },
                      height: "300px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                      marginBottom: { xs: "15%", sm: "0%", md: "0%" },
                    }}
                  >
                    <LoadScript googleMapsApiKey={apiKey}>
                      <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        onLoad={(map) => setMap(map)}
                        options={{
                          streetViewControl: false,
                          mapTypeControl: false,
                          fullscreenControl: false,
                        }}
                      >
                        {shuttleLocation.latitude && (
                          <Marker
                            position={{
                              lat: shuttleLocation.latitude,
                              lng: shuttleLocation.longitude,
                            }}
                            icon={{
                              url: busIconMap,
                              scaledSize: new window.google.maps.Size(40, 40),
                            }}
                            label="Shuttle"
                            onLoad={(marker) => (shuttleMarkerRef.current = marker)}
                          />
                        )}

                        {userLocation.latitude && (
                          <Marker
                            position={{
                              lat: userLocation.latitude,
                              lng: userLocation.longitude,
                            }}
                            label="You"
                            onLoad={(marker) => (userMarkerRef.current = marker)}
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