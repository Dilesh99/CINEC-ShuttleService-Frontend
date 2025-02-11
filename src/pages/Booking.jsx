// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  CssBaseline,
} from "@mui/material";
import Layout from "../components/Layout";
import BackgroundImage from "/src/assets/bg5.jpg";
import { useNavigate } from "react-router-dom";
import { authMethods } from "../backend/authMethods";

const TransportBookingForm = () => {
  const navigate = useNavigate();
  let ID = null;
  let role = "";
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      try {
        handleAuth();
      } catch {
        return null;
      }
    }
  }, []);

  const handleAuth = async () => {
    const res = await authMethods.refreshToken();
    if (res && res.accessToken && res.ID) {
      ID = res.ID;
      role = res.role;
      if (role == "Student") {
        window.alert("Please see a Lecturer to book a shuttle.");
        navigate("/home");
        return;
      }
    } else {
      navigate("/");
    }
  };

  const textFieldStyles = {
    InputLabelProps: {
      style: { color: "#000000" },
    },
    sx: {
      input: { color: "#000000" },
      backgroundColor: "#fff",
      borderRadius: 3,
      "& .MuiFilledInput-root": {
        backgroundColor: "#fff",
        borderRadius: 3,
        "&:before, &:after": {
          borderBottom: "none !important", // Completely removes the orange underline
        },
        "&:hover:not(.Mui-disabled):before": {
          borderBottom: "none !important", // Prevents it from appearing on hover
        },
      },
    },
  };

  return (
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
        {/* Form Container */}
        <Box
          sx={{
            bgcolor: "rgba(0, 33, 71, 0.95)",
            borderRadius: 4,
            p: { xs: 2, sm: 4, md: 6 },
            color: "#fff",
            maxWidth: { xs: "95%", sm: "80%", md: "70%", lg: "60%" },
            mx: "auto",
            mt: { xs: 4, sm: 6 },
            mb: "2%",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: "bold",
              mb: 3,
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            TRANSPORT BOOKING FORM
            <br />
            FORM NO.001
          </Typography>
          <form>
            <Grid container spacing={2}>
              {[
                { label: "Department", xs: 12 },
                { label: "Purpose", xs: 12 },
                { label: "Date", xs: 12, sm: 6 },
                { label: "Time", xs: 12, sm: 6 },
                { label: "Destination", xs: 12, sm: 4 },
                { label: "From", xs: 12, sm: 4 },
                { label: "To", xs: 12, sm: 4 },
                { label: "Place to pickup", xs: 12 },
                { label: "Pax/ Load", xs: 12, sm: 6 },
                { label: "No. of packs", xs: 12, sm: 6 },
                { label: "Route", xs: 12 },
                { label: "In charge Of the Journey", xs: 12 },
              ].map(({ label, xs, sm }) => (
                <Grid item xs={xs} sm={sm} key={label}>
                  <TextField
                    fullWidth
                    label={label}
                    variant="filled"
                    {...textFieldStyles}
                  />
                </Grid>
              ))}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
                  Requested by
                </Typography>
                <TextField
                  fullWidth
                  label="Name"
                  variant="filled"
                  {...textFieldStyles}
                  sx={{
                    mt: 1,
                    input: { color: "#000000" },
                    backgroundColor: "#fff",
                    borderRadius: 3,
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#fff",
                      borderRadius: 3,
                      "&:before, &:after": { borderBottom: "none !important" },
                      "&:hover:not(.Mui-disabled):before": {
                        borderBottom: "none !important",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Staff ID"
                  variant="filled"
                  {...textFieldStyles}
                  sx={{
                    mt: 2,
                    input: { color: "#000000" },
                    backgroundColor: "#fff",
                    borderRadius: 3,
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#fff",
                      borderRadius: 3,
                      "&:before, &:after": { borderBottom: "none !important" },
                      "&:hover:not(.Mui-disabled):before": {
                        borderBottom: "none !important",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
                  HOD
                </Typography>
                <TextField
                  fullWidth
                  label="Name"
                  variant="filled"
                  {...textFieldStyles}
                  sx={{
                    mt: 1,
                    input: { color: "#000000" },
                    backgroundColor: "#fff",
                    borderRadius: 3,
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#fff",
                      borderRadius: 3,
                      "&:before, &:after": { borderBottom: "none !important" },
                      "&:hover:not(.Mui-disabled):before": {
                        borderBottom: "none !important",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="filled"
                  {...textFieldStyles}
                  sx={{
                    mt: 2,
                    input: { color: "#000000" },
                    backgroundColor: "#fff",
                    borderRadius: 3,
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#fff",
                      borderRadius: 3,
                      "&:before, &:after": { borderBottom: "none !important" },
                      "&:hover:not(.Mui-disabled):before": {
                        borderBottom: "none !important",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="right">
                <Button
                  variant="contained"
                  sx={{
                    mt: 3,
                    px: { xs: 4, sm: 5 },
                    backgroundColor: "gold",
                    color: "black",
                    borderRadius: 3,
                    
                  }}
                >
                  SUBMIT
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Layout>
  );
};

export default TransportBookingForm;
