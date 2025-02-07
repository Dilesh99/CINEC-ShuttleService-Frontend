import { CssBaseline, Box, Typography, Grid, Card, CardContent, Icon } from "@mui/material";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import BackgroundImage from "/src/assets/bg5.jpg";
import InnerBackgroundImage from "/src/assets/home img.jpg";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

import React, { useEffect, useRef } from 'react'

import { authMethods } from "../backend/authMethods";

const routes = [
  { name: "GAMPAHA1", route: "Route A" },
  { name: "GAMPAHA2", route: "Route B" },
  { name: "MALABE", route: "Route C" },
  { name: "MORATUWA", route: "Route D" },
  { name: "WATTALA", route: "Route E" },
  { name: "NEGAMBO", route: "Route F" },
];

function RouteSelection() {
  const navigate = useNavigate();
  let ID = null;
  const hasRun = useRef(false);
  /*useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      try {
        handleAuth();
      } catch {
        return null;
      }
    }
  }, []);*/

  const handleAuth = async () => {
    const res = await authMethods.refreshToken();
    if (res && res.accessToken && res.ID) {
      ID = res.ID;
    }
    else {
      navigate("/");
    }
  }

  const handleRouteClick = (routeName) => {
    navigate(`/location?route=${routeName}`);
  };

  return (
    <>
      <Layout>
        <CssBaseline /> {/* Resets default margins and paddings globally */}
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
              backgroundImage: `url(${InnerBackgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: 5,
              textAlign: "center",
              width: { xs: "90%", sm: "80%", md: "60%", lg: "70%" },
              marginTop: { xs: "30%", sm: "13%", md: "0%", lg: "0%" },
              marginBottom: { xs: "10%", sm: "0", md: "0", lg: "0" },
              position: "relative",
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(10, 33, 71, 0.8)",
                padding: { xs: 6, sm: 9, md: 5, lg: 12 },
                borderRadius: 5,
                textAlign: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.5rem", lg: "1.8rem" },
                  textAlign: "center",
                  marginTop: { md: "-4%" },
                }}
              >
                SELECT YOUR ROUTE
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  fontSize: { xs: "0.9rem", sm: "0.9rem", md: "1rem", lg: "1.2rem" },
                  maxWidth: { xs: "80%", sm: "100%", md: "80%", lg: "75%" },
                  textAlign: "center",
                  mx: "auto",
                }}
              >
                Selecting your route, you receive daily updates on bus locations and
                can adjust your route at any time.
              </Typography>

              <Grid container spacing={2} justifyContent="center">
                {routes.map((route) => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={route.name}>
                    <Card
                      onClick={() => handleRouteClick(route.name)} // Navigate on card click
                      sx={{
                        backgroundColor: "transparent",
                        border: "2px solid #D4790E",
                        borderRadius: 3,
                        textAlign: "center",
                        color: "white",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "scale(1.05) translateY(-5px)",
                          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                        },
                      }}
                      elevation={0}
                    >
                      <CardContent>
                        <Icon
                          sx={{
                            fontSize: { xs: 36, sm: 40, md: 44, lg: 56 },
                            color: "primary.main",
                          }}
                        >
                          <DirectionsBusIcon fontSize="inherit" />
                        </Icon>
                        <Typography
                          variant="h6"
                          sx={{
                            mt: 1,
                            fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem" },
                          }}
                        >
                          {route.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "primary.main",
                            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem", lg: "1.1rem" },
                          }}
                        >
                          {route.route}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
}

export default RouteSelection;
