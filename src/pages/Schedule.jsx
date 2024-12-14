import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Layout from "../components/Layout";
import BackgroundImage from "/src/assets/schedule.png";
import InnerBackgroundImage from "/src/assets/image 6.png";

const Schedule = () => {
  const scheduleData = [
    { time: "07:00 AM", route: "Wattla to Campus" },
    { time: "08:00 AM", route: "Wattla to Campus" },
    { time: "09:00 AM", route: "Wattla to Campus" },
    { time: "10:00 AM", route: "Wattla to Campus" },
    { time: "11:00 AM", route: "Wattla to Campus" },
    { time: "12:00 PM", route: "Wattla to Campus" },
    { time: "01:00 PM", route: "Wattla to Campus" },
  ];

  const returnScheduleData = [
    { time: "07:00 AM", route: "Campus to Wattla" },
    { time: "08:00 AM", route: "Campus to Wattla" },
    { time: "09:00 AM", route: "Campus to Wattla" },
    { time: "10:00 AM", route: "Campus to Wattla" },
    { time: "11:00 AM", route: "Campus to Wattla" },
    { time: "12:00 PM", route: "Campus to Wattla" },
    { time: "01:00 PM", route: "Campus to Wattla" },
  ];

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
           
            bgcolor: 'rgba(0, 30, 71, 0.85)',
            padding: { xs: 3, sm: 4, md: 6 },
            borderRadius: 5,
            width: { xs: "90%", sm: "80%", md: "60%", lg: "70%" },
            marginTop: { xs: "14%", sm: "13%", md: "8%", lg: "7%" },
            zIndex: 2,
            marginBottom: '5%',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              marginBottom: { xs: 3, sm: 4 },
              fontSize: { xs: '1.5rem', sm: '2rem' },
            }}
          >
            VIEW BUS SCHEDULES
          </Typography>

          {/* Schedules Grid */}
          <Grid container spacing={3}>
            {/* Wattla to Campus */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                align="center"
                sx={{ color: 'white', fontWeight: 'bold', marginBottom: 2 }}
              >
                Wattla to Campus
              </Typography>
              {scheduleData.map((schedule, index) => (
                <Box
                  key={index}
                  sx={{
                    
                    display: 'flex',
                    justifyContent: "space-between",
                    color: 'white',
                    paddingX: '20%',
                    marginBottom: 1,
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {schedule.time}
                  </Typography>
                  <Typography variant="body1">{schedule.route}</Typography>
                </Box>
              ))}
            </Grid>

            {/* Campus to Wattla */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                align="center"
                sx={{ color: 'white', fontWeight: 'bold', marginBottom: 2 }}
              >
                Campus to Wattla
              </Typography>
              {returnScheduleData.map((schedule, index) => (
                <Box
                  key={index}
                  sx={{
                    
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: 'white',
                    paddingX: '20%',
                    marginBottom: 1,
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {schedule.time}
                  </Typography>
                  <Typography variant="body1">{schedule.route}</Typography>
                </Box>
              ))}
            </Grid>
          </Grid>

          {/* Back Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <Button href='/location'
              variant="contained"
              sx={{
                backgroundColor: '#ffab00',
                fontWeight: 'bold',
                padding: { xs: '8px 16px', sm: '10px 24px' },
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
