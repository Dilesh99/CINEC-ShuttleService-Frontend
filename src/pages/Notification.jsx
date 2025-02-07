import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { CssBaseline, Typography, Icon } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Layout from "../components/Layout";
import InnerBackgroundImage from "/src/assets/bg5.jpg";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

import { authMethods } from '../backend/authMethods';
import { useNavigate } from 'react-router-dom';

export default function Notification() {

  const navigate = useNavigate();
  let ID = null;
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
    }
    else {
      navigate("/");
    }
  }

  return (
    <Layout>
      <CssBaseline />
      <div>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            minHeight: "100vh",
            width: "100vw", // Ensures full viewport width
            backgroundImage: `url(${InnerBackgroundImage})`,
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

              width: { xs: "90%", sm: "80%", md: "60%", lg: "70%" }
              , overflow: 'hidden',
              backgroundImage: `url('src/assets/secondBg.png')`,
              backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", position: 'relative',
              marginTop: { xs: "30%", sm: "13%", md: "8%", lg: "8%" },
              borderRadius: 6,
              marginBottom: { xs: "10%", sm: "0", md: "5%", lg: "5%" },

              boxShadow: 3
            }}>

            <Box
              sx={{

                backgroundColor: "rgba(10, 33, 71, 0.8)", borderRadius: 6,
              }}>

              <Typography variant='h3' color='white' textAlign={'center'} sx={{ fontSize: '200%', position: 'relative', top: '20px', letterSpacing: '3px', fontWeight: "50" }}>Notification
              </Typography>

              <Box sx={{ width: '80%', height: '80%', marginLeft: 'auto', marginRight: 'auto', position: 'relative', marginTop: '2%', }}>

                <Typography color='white' sx={{ position: 'relative', top: '3vh', marginLeft: '5%', fontSize: '24px', letterSpacing: '3px' }} >Today</Typography>

                <List sx={{ color: 'white', position: 'relative', marginTop: '4%', marginLeft: '10%', }}>
                  <ListItem>
                    <Box
                    > <Icon
                      sx={{
                        fontSize: { xs: 36, sm: 40, md: 44, lg: 44 },
                        color: "primary.main",
                      }}
                    >
                        <DirectionsBusIcon fontSize="inherit" />
                      </Icon>

                    </Box>
                    <ListItemText sx={{ marginLeft: '1.8%', }}>End of route.thank you for your service today</ListItemText>
                  </ListItem>

                  <ListItem>
                    <Box
                    ><Icon
                      sx={{
                        fontSize: { xs: 36, sm: 40, md: 44, lg: 44 },
                        color: "primary.main",
                      }}
                    >
                        <DirectionsBusIcon fontSize="inherit" />
                      </Icon>

                    </Box>
                    <ListItemText sx={{ marginLeft: '1.8%' }}>End of route.thank you for your service today</ListItemText>
                  </ListItem>
                  <ListItem>
                    <Box
                    ><Icon
                      sx={{
                        fontSize: { xs: 36, sm: 40, md: 44, lg: 44 },
                        color: "primary.main",
                      }}
                    >
                        <DirectionsBusIcon fontSize="inherit" />
                      </Icon>

                    </Box>
                    <ListItemText sx={{ marginLeft: '1.8%' }}>End of route.thank you for your service today</ListItemText>
                  </ListItem>


                </List>

                <Typography color='white' sx={{ position: 'relative', top: '1vh', marginLeft: '5%', fontSize: '24px', letterSpacing: '3px' }} >Yesterday</Typography>

                <List sx={{ color: 'white', position: 'relative', marginTop: '4%', marginLeft: '10%' }}>
                  <ListItem>
                    <Box
                    ><Icon
                      sx={{
                        fontSize: { xs: 36, sm: 40, md: 44, lg: 44 },
                        color: "primary.main",
                      }}
                    >
                        <DirectionsBusIcon fontSize="inherit" />
                      </Icon>

                    </Box>
                    <ListItemText sx={{ marginLeft: '1%' }}>Notification 1</ListItemText>
                  </ListItem>

                  <ListItem>
                    <Box
                    ><Icon
                      sx={{
                        fontSize: { xs: 36, sm: 40, md: 44, lg: 44 },
                        color: "primary.main",
                      }}
                    >
                        <DirectionsBusIcon fontSize="inherit" />
                      </Icon>

                    </Box>
                    <ListItemText sx={{ marginLeft: '1%' }}>Notification 2</ListItemText>
                  </ListItem>
                  <ListItem>
                    <Box
                    ><Icon
                      sx={{
                        fontSize: { xs: 36, sm: 40, md: 44, lg: 44 },
                        color: "primary.main",
                      }}
                    >
                        <DirectionsBusIcon fontSize="inherit" />
                      </Icon>

                    </Box>
                    <ListItemText sx={{ marginLeft: '1%' }}>Notification 3</ListItemText>
                  </ListItem>


                </List>

              </Box>

            </Box>



          </Box>






        </Box>


      </div>
    </Layout>
  )
}
