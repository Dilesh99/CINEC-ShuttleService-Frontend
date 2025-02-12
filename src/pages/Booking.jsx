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
import Popup from "../components/Popup";

const TransportBookingForm = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info');
  const [popupCallback, setPopupCallback] = useState(null);

  // State for form fields
  const [formData, setFormData] = useState({
    department: "",
    purpose: "",
    date: "",
    time: "",
    destination: "",
    from: "",
    to: "",
    pickupPlace: "",
    paxLoad: "",
    numPacks: "",
    route: "",
    inCharge: "",
    requestedByName: "",
    requestedByStaffID: "",
    hodName: "",
    hodEmail: "",
  });

  const showPopup = (message, type = 'info') => {
    setPopupMessage(message);
    setPopupType(type);
    setPopupOpen(true);
  };

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
        showPopup("Please see a lecturer to book shuttle", 'info');
        setPopupCallback(() => () => {
          navigate("/home");
        });
        return;
      }
    } else {
      navigate("/");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the email body
    const emailBody = `
      Department: ${formData.department}
      Purpose: ${formData.purpose}
      Date: ${formData.date}
      Time: ${formData.time}
      Destination: ${formData.destination}
      From: ${formData.from}
      To: ${formData.to}
      Place to Pickup: ${formData.pickupPlace}
      Pax/Load: ${formData.paxLoad}
      No. of Packs: ${formData.numPacks}
      Route: ${formData.route}
      In Charge of the Journey: ${formData.inCharge}
      Requested By (Name): ${formData.requestedByName}
      Requested By (Staff ID): ${formData.requestedByStaffID}
      HOD (Name): ${formData.hodName}
    `;

    // Construct the mailto URL
    const mailtoUrl = `mailto:naveensandaru2@gmail.com?cc=${formData.hodEmail}subject=Transport Booking Request&body=${encodeURIComponent(emailBody)}`;

    // Open the email client
    window.location.href = mailtoUrl;
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
          borderBottom: "none !important",
        },
        "&:hover:not(.Mui-disabled):before": {
          borderBottom: "none !important",
        },
      },
    },
  };

  return (
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
            SHUTTLE BOOKING FORM
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {[
                { label: "Department", name: "department", xs: 12 },
                { label: "Purpose", name: "purpose", xs: 12 },
                { label: "Date", name: "date", xs: 12, sm: 6 },
                { label: "Time", name: "time", xs: 12, sm: 6 },
                { label: "Destination", name: "destination", xs: 12, sm: 4 },
                { label: "From", name: "from", xs: 12, sm: 4 },
                { label: "To", name: "to", xs: 12, sm: 4 },
                { label: "Place to pickup", name: "pickupPlace", xs: 12 },
                { label: "Pax/ Load", name: "paxLoad", xs: 12, sm: 6 },
                { label: "No. of packs", name: "numPacks", xs: 12, sm: 6 },
                { label: "Route", name: "route", xs: 12 },
                { label: "In charge Of the Journey", name: "inCharge", xs: 12 },
              ].map(({ label, name, xs, sm }) => (
                <Grid item xs={xs} sm={sm} key={name}>
                  <TextField
                    fullWidth
                    label={label}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
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
                  name="requestedByName"
                  value={formData.requestedByName}
                  onChange={handleChange}
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
                  name="requestedByStaffID"
                  value={formData.requestedByStaffID}
                  onChange={handleChange}
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
                  name="hodName"
                  value={formData.hodName}
                  onChange={handleChange}
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
                  name="hodEmail"
                  value={formData.hodEmail}
                  onChange={handleChange}
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
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    px: { xs: 4, sm: 5 },
                    backgroundColor: "#b13f03",
                    color: "white",
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
      <Popup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        message={popupMessage}
        type={popupType}
        onConfirm={popupCallback}
      />
    </Layout>
  );
};

export default TransportBookingForm;