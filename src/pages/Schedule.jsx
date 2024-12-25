import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import BackgroundImage from "/src/assets/bg5.jpg";
import InnerBackgroundImage from "/src/assets/image 6.png";
import { useNavigate } from "react-router-dom";

const Schedule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const routeName = new URLSearchParams(location.search).get("route");

  const handleRouteClick = (routeName) => {
    navigate(`/location?route=${routeName}`); // Navigate to location page with query parameter
  };

  const [scheduleData, setScheduleData] = useState([]);
  const [returnScheduleData, setReturnScheduleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const capitalizeRouteName = (route) => {
    if (!route) return '';
    return route.charAt(0).toUpperCase() + route.slice(1).toLowerCase();
  };

  // Example data for different routes
  const exampleSchedules = {
    GAMPAHA1: {
      onward: [
        { time: "07:00 AM", route: "Gampaha to Campus" },
        { time: "08:00 AM", route: "Gampaha to Campus" },
        { time: "09:00 AM", route: "Gampaha to Campus" },
        { time: "07:00 AM", route: "Gampaha to Campus" },
        { time: "08:00 AM", route: "Gampaha to Campus" },
        { time: "09:00 AM", route: "Gampahato Campus" },
      ],
      return: [
        { time: "12:00 PM", route: "Campus to Gampaha" },
        { time: "01:00 PM", route: "Campus to Gampaha" },
        { time: "02:00 PM", route: "Campus to Gampaha" },
      ],
    },
    GAMPAHA2: {
      onward: [
        { time: "07:00 AM", route: "Gampaha to Campus" },
        { time: "08:00 AM", route: "Gampaha to Campus" },
        { time: "09:00 AM", route: "Gampaha to Campus" },
        { time: "07:00 AM", route: "Gampaha to Campus" },
        { time: "08:00 AM", route: "Gampaha to Campus" },
        { time: "09:00 AM", route: "Gampaha to Campus" },
      ],
      return: [
        { time: "12:00 PM", route: "Campus to Gampaha" },
        { time: "01:00 PM", route: "Campus to Gampaha" },
        { time: "02:00 PM", route: "Campus to Gampaha" },
      ],
    },
  };

  useEffect(() => {
    const fetchExampleData = () => {
      setIsLoading(true);
      setTimeout(() => {
        const schedules = exampleSchedules[routeName] || { onward: [], return: [] };
        setScheduleData(schedules.onward);
        setReturnScheduleData(schedules.return);
        setIsLoading(false);
      }, 1000); // Simulating a delay to mimic data fetching
    };

    if (routeName) fetchExampleData();
  }, [routeName]);

  return (
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
        {/* Decorative Image */}
        <Box
          sx={{
            backgroundImage: `url(${InnerBackgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: 5,
            textAlign: "center",
            width: { xs: "90%", sm: "80%", md: "60%", lg: "70%" },
            marginTop: { xs: "14%", sm: "13%", md: "8%", lg: "1%" },
            position: "relative",
          }}
        />

        {/* Content Container */}
        <Container
          sx={{
            bgcolor: "rgba(0, 30, 71, 0.85)",
            padding: { xs: 3, sm: 4, md: '5%' },
            borderRadius: 5,
            width: { xs: "90%", sm: "80%", md: "60%", lg: "70%" },
            marginTop: { xs: "15%", sm: "13%", md: "7%", lg: "7%" },
            
            height: "85%",
            zIndex: 2,
            marginBottom: { xs: "10%", sm: "0", md: "5%", lg: "5%" },
            
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              color: "white",
              fontWeight: "bold",
              marginBottom: { xs: 3, sm: 4 },
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            VIEW BUS SCHEDULES
          </Typography>

          {isLoading ? (
            <Typography align="center" sx={{ color: "white", fontWeight: "bold" }}>
              Loading schedules...
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {/* Onward Schedules */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h5"
                  align="center"
                  fontSize={{ xs: "16px", md: "20px" }}
                  fontWeight={'bold'}
                  sx={{ color: "white", marginBottom: 2 }}
                >
                  {capitalizeRouteName(routeName)} to Campus
                 </Typography>
              {scheduleData.length > 0 ? (
                scheduleData.map((schedule, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: "space-between",
                      color: 'white',
                      paddingX: { xs: '10%', md: '20%' },
                      marginBottom: 1,
                    }}
                  >
                    <Typography variant="body1" >
                      {schedule.time}
                    </Typography>
                    <Typography variant="body1">{schedule.route}</Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" align="center" sx={{ color: 'white' }}>
                  No schedules available.
                </Typography>
              )}
              </Grid>

              {/* Return Schedules */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h5"
                  align="center"
                  fontSize={{ xs: "16px", md: "20px" }}
                  fontWeight={'bold'}
                  sx={{ color: "white", marginBottom: 2 }}
                >
                  Campus to {capitalizeRouteName(routeName)}
                  </Typography>
              {returnScheduleData.length > 0 ? (
                returnScheduleData.map((schedule, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: 'white',
                      paddingX: { xs: '10%', md: '20%' },
                      marginBottom: 1,
                    }}
                  >
                    <Typography variant="body1">
                      {schedule.time}
                    </Typography>
                    <Typography variant="body1">{schedule.route}</Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" align="center" sx={{ color: 'white' }}>
                  No return schedules available.
                </Typography>
              )}
              </Grid>
            </Grid>
          )}

          {/* Back Button */}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
            <Button
               onClick={() => handleRouteClick(routeName)} // Navigate on location according to specific route
              variant="contained"
              sx={{
                backgroundColor: "#ffab00",
                fontWeight: "bold",
                borderRadius: 5,
                padding: { xs: "8px 16px", sm: "10px 24px" },
              }}
            >
              BACK
            </Button>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Schedule;
