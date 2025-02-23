import React from "react";
import { Container, Grid, Card, CardContent, Avatar, Typography, IconButton, CssBaseline, Box, } from "@mui/material";
import { Email, LinkedIn, GitHub } from "@mui/icons-material";
import BackgroundImage from "/src/assets/bg5.jpg";
import Layout from "../components/Layout";

import naveenImg from "../assets/naveen.jpg";
import deshanImg from "../assets/deshan.jpg";
import thepuliImg from "../assets/thepuli.jpg";
import imashaImg from "../assets/imasha.jpg";
import buddhikaImg from "../assets/buddhika.jpg";

const teamMembers = [
  {
    name: "Deshan Wickramasingha",
    role: "Project Leader",
    description: "Provided the idea | Project leader",
    image: deshanImg,
    email: "deshantharaka422@gmail.com",
    linkedin: "https://lk.linkedin.com/in/deshan-wickramasinghe-147886288",
    github: "https://github.com/Deshan-AI"
  },
  {
    name: "Naveen Sandaru",
    role: "Full Stack Developer",
    description: "Full Stack Developer",
    image: naveenImg,
    email: "naveensandaru2@gmail.com",
    linkedin: "https://lk.linkedin.com/in/naveen-sandaru-6919772a1",
    github: "https://github.com/NaveenSandaru"
  },
  {
    name: "Dilesha Gayashan",
    role: "Front End Developer",
    description: "Frontend Developer",
    image: "https://creatie.ai/ai/api/search-image?query=A%20professional%20headshot%20of%20a%20young%20male%20software%20developer&width=400&height=400",
    email: "john.smith@company.com",
    linkedin: "https://lk.linkedin.com/in/dilesha-gayashan-11bb15282",
    github: "https://github.com/Dilesh99"
  },
  {
    name: "Thepuli Kavindhya",
    role: "Frontend Developer",
    description: "Frontend Developer",
    image: thepuliImg,
    email: "thepulikavindhya@gmail.com",
    linkedin: "http://www.linkedin.com/in/thepuli-kavindhya-1552bb2a2",
    github: "https://github.com/thepulikavindhya"
  },
  {
    name: "Imasha Sewwandi",
    role: "Frontend Developer",
    description: "Frontend Developer",
    image: imashaImg,
    email: "imashasewwandi9355@gmail.com",
    linkedin: "https://www.linkedin.com/in/imasha-ariyasingha-ba08881a6",
    github: "https://github.com/imashasew"
  },
  {
    name: "Buddhika Madhushan",
    role: "Frontend Developer",
    description: "Frontend Developer",
    image: buddhikaImg,
    email: "buddhikamadhushan97@gmail.com",
    linkedin: "https://www.linkedin.com/in/buddhika-madhushan-b5067b319",
    github: "https://github.com/Madhushan404"
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
          <Container maxWidth="lg" sx={{ textAlign: "center", marginTop: { xs: "25%", sm: "13%", md: "0%", lg: "5%" }, }}>
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
