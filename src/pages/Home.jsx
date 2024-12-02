import { Box, Typography, Grid, Card, CardContent, Icon } from "@mui/material";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import BackgroundImage from "/src/assets/Home-bgimg.jpg";
import InnerBackgroundImage from "/src/assets/home img.jpg";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const routes = [
  { name: "Gampaha1", route: "Route A" },
  { name: "Gampaha2", route: "Route B" },
  { name: "Malabe", route: "Route C" },
  { name: "Moratuwa", route: "Route D" },
  { name: "Wattla", route: "Route E" },
  { name: "Negombo", route: "Route F" },
];

function RouteSelection() {
  const navigate = useNavigate();

  const handleRouteClick = (routeName) => {
    navigate(`/location?route=${routeName}`); // Navigate to location page with query parameter
  };

  return (
    <Layout>
      <Box
        sx={{
          marginLeft: { xs: "-1.6%", sm: "-0.98%", md: "-0.51%" },
          marginRight: { xs: "-1.6%", sm: "-0.97%", md: "-0.51%" },
          display: "fixed",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
          minHeight: "90vh",
          justifyContent: "center",
          padding: 2,
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
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
            marginTop: { xs: "14%", sm: "13%", md: "8%", lg: "1%" },
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
                maxWidth: { xs: "100%", sm: "100%", md: "80%", lg: "75%" },
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
                          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.3rem" },
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
  );
}

export default RouteSelection;
