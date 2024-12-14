import React from "react";
import { CssBaseline,Box, Button, Grid, TextField, Typography, InputAdornment } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import St1 from "../assets/St1.jpg"; // Update with your actual image path

const SignUp2 = () => {
  return (
    <>
    <CssBaseline />
    <Grid
      container
      sx={{
        width: "100%",
        height: "100%",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Left Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(136, 193, 255, 0.8)",
          p: 4,
          
          
          
        }}
      >
        <Typography
          sx={{
            color: "#000000",
            fontFamily: "inter",
            textAlign: "center",
            fontSize: { xs: "16px", md: "24px" },
            mt: { xs: 2, md: 10 },
          }}
        >
          Create an Account for
        </Typography>
        <Typography
          sx={{
            color: "#002147FF",
            fontFamily: "inter",
            textAlign: "center",
            fontSize: { xs: "20px", md: "32px" },
            mb: 2,
            fontWeight: "800",
          }}
        >
          CINEC SHUTTLE SERVICES
        </Typography>

        {/** Input Fields */}
        {["Username", " Staff ID", "Email", "Phone No", "Password"].map(
          (placeholder, index) => (
            <Box
              key={index}
              component="form"
              sx={{
                width: { xs: "220px", md: "380px" },
                mb: 2,
                textAlign:'center'
              }}
            >
              <TextField
                id={`input-${index}`}
                placeholder={placeholder}
                variant="outlined"
                type={placeholder === "Password" ? "password" : placeholder === "Email" ? "email" : placeholder === "Phone No" ? "number" : "text"} // Secure password input

                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {index === 0 && <AccountCircleOutlinedIcon />}
                      {index === 1 && <BadgeOutlinedIcon />}
                      {index === 2 && <EmailOutlinedIcon />}
                      {index === 3 && <BadgeOutlinedIcon />}
                      {index === 4 && <LockIcon />}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: { xs: "40px", md: "50px" },
                    borderRadius: "30px",
                  },
                }}
              />
            </Box>
          )
        )}

        <Button
          href=""
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#002147",
            color: "white",
            fontWeight: 800,
            width: { xs: "220px", md: "300px" },
            height: { xs: "40px", md: "50px" },
            borderRadius: "30px",
            mb: 2,
            '&:hover': { bgcolor: "#D4790E" },
          }}
        >
          SEND CODE
        </Button>
        <Typography
          sx={{
            color: "#002147FF",
            fontFamily: "inter",
            textAlign: "center",
            fontSize: { xs: "12px", md: "16px" },
            fontWeight: 300,
          }}
        >
          Already have an account?
        </Typography>
        <Link to="/signin" style={{ textDecoration: "none" }}>
          <Button
            variant="text"
            sx={{
              color: "#D4790E",
              fontWeight: 800,
              '&:hover': { color: "#000000" },
            }}
          >
            Sign In
          </Button>
        </Link>
      </Grid>

      {/* Right Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          bgcolor: "white",
          p: 3,
        }}
      >
        <Box
          component="img"
          src={St1}
          alt="Cinec Campus"
          sx={{
            mt:{xs:3, sm:18, md:0},
            width: { xs: "100%", md: "380px" },
            height: { xs: "auto", md: "380px" },
            mb: { xs: 2, md: 0 },
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography
            sx={{ fontSize: { xs: "16px", md: "20px" }, fontWeight: 700 }}
          >
            ACCOUNT VERIFICATION
          </Typography>
          <TextField
            placeholder="Enter the Code"
            inputProps={{
              maxLength: 4,
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            sx={{
              width: { xs: "150px", md: "200px" },
              textAlign: "center",
              border: "1px solid #1D3B5C",
              borderRadius: "10px",
              mt: 2,
            }}
          />
          <Button
            href="/signin"
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#4B7B98",
              color: "white",
              fontWeight: 800,
              mt: 2,
              '&:hover': { bgcolor: "#D4790E" },
            }}
          >
            CONTINUE
          </Button>
          <Typography sx={{ color: "#000", fontWeight: 300, mt: 2 }}>
            Did not get the code?
          </Typography>
          <Button
            variant="text"
            sx={{ color: "#D4790E", fontWeight: 800, '&:hover': { color: "#000" } }}
          >
            Send again
          </Button>
        </Box>
      </Grid>
    </Grid>
    </>
  );
};

export default SignUp2;
