import React from "react";
import { Container, Grid, Card, CardContent, Avatar, Typography, IconButton,CssBaseline, Box, } from "@mui/material";
import { Email, LinkedIn, GitHub } from "@mui/icons-material";
import BackgroundImage from "/src/assets/bg5.jpg";
import Layout from "../components/Layout";

const teamMembers = [
  {
    name: "Deshan Wickramasingha",
    role: "Project Leader",
    description: "Full-stack developer with 8+ years of experience in building scalable web applications.",
    image: "https://creatie.ai/ai/api/search-image?query=A%20professional%20headshot%20of%20a%20young%20male%20software%20developer&width=400&height=400",
    email: "john.smith@company.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com/johnsmith"
  },
  {
    name: "Naveen Sandaru",
    role: "Full Stack Developer",
    description: "Full Stack Developer with 8+ years of experience in building scalable web applications.",
    image: "https://creatie.ai/ai/api/search-image?query=A%20professional%20headshot%20of%20a%20young%20female%20software%20engineer&width=400&height=400",
    email: "sarah.johnson@company.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com/sarahjohnson"
  },
  {
    name: "John Smith",
    role: "Lead Developer",
    description: "Full-stack developer with 8+ years of experience in building scalable web applications.",
    image: "https://creatie.ai/ai/api/search-image?query=A%20professional%20headshot%20of%20a%20young%20male%20software%20developer&width=400&height=400",
    email: "john.smith@company.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com/johnsmith"
  },
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    description: "UI/UX specialist with expertise in React and modern frontend frameworks.",
    image: "https://creatie.ai/ai/api/search-image?query=A%20professional%20headshot%20of%20a%20young%20female%20software%20engineer&width=400&height=400",
    email: "sarah.johnson@company.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com/sarahjohnson"
  },
  {
    name: "John Smith",
    role: "Lead Developer",
    description: "Full-stack developer with 8+ years of experience in building scalable web applications.",
    image: "https://creatie.ai/ai/api/search-image?query=A%20professional%20headshot%20of%20a%20young%20male%20software%20developer&width=400&height=400",
    email: "john.smith@company.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com/johnsmith"
  },
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    description: "UI/UX specialist with expertise in React and modern frontend frameworks.",
    image: "https://creatie.ai/ai/api/search-image?query=A%20professional%20headshot%20of%20a%20young%20female%20software%20engineer&width=400&height=400",
    email: "sarah.johnson@company.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com/sarahjohnson"
  },
  // Add more members as needed
];

const DevelopmentTeam = () => {
  return (
    <>
    <Layout>
    <CssBaseline />
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
    <Container maxWidth="lg" sx={{ textAlign: "center", marginTop: { xs: "30%", sm: "13%", md: "0%", lg: "0%" }, }}>
      <Typography variant="h5" fontWeight={300} mb={4}>
        Meet Our Development Team
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ p: 3, textAlign: "center", boxShadow: 3, borderRadius: 3 }}>
              <Avatar src={member.image} alt={member.name} sx={{ width: 100, height: 100, mx: "auto", mb: 2 }} />
              <Typography variant="h6" fontWeight={600}>{member.name}</Typography>
            {/*  <Typography color="primary" fontWeight={500}>{member.role}</Typography>*/}
              <Typography variant="body2" color="text.secondary" mt={1} mb={2}>{member.description}</Typography>
              <Grid container justifyContent="center" spacing={1}>
                <Grid item>
                  <IconButton component="a" href={`mailto:${member.email}`} target="_blank" color="secondary">
                    <Email />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton component="a" href={member.linkedin} target="_blank" color="secondary">
                    <LinkedIn />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton component="a" href={member.github} target="_blank" color="secondary">
                    <GitHub />
                  </IconButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </Box>
    </Layout>
    </>
  );
};

export default DevelopmentTeam;
