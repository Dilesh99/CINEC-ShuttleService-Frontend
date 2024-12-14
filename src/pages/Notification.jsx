import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { CssBaseline,Typography } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Layout from "../components/Layout";
import InnerBackgroundImage from "/src/assets/notificationBG.png";

export default function Notification() {
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
                    ,overflow: 'hidden',
                    backgroundImage: `url('src/assets/secondBg.png')`,
                    backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", position:'relative', marginTop: { xs: "14%", sm: "13%", md: "8%", lg: "6%" },
                    borderRadius: 6,
                    
                    boxShadow:3}}>

                    <Box
                        sx={{
                            
                            backgroundColor:'rgba(0, 33, 71, 0.85)',borderRadius: 6,
                        }}>

                            <Typography variant='h3'color='white' textAlign={'center'} sx={{ fontSize:'200%', position:'relative', top:'20px',letterSpacing:'3px',fontWeight:"50"}}>Notification
                            </Typography>

                            <Box sx={{width:'80%', height:'80%',marginLeft:'auto', marginRight:'auto',position:'relative',marginTop:'2%',}}>

                                <Typography color='white' sx={{position:'relative',top:'3vh',marginLeft:'5%',fontSize:'24px',letterSpacing:'3px'}} >Today</Typography>

                                <List sx={{color:'white',position:'relative',marginTop:'4%',marginLeft:'10%',}}>
                                    <ListItem>
                                        <Box
                                             sx={{width: "45px",height: "45px",backgroundImage: `url('src/assets/busicon.png')`,backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",boxShadow:'2px 2px 5px #181818'}}>
                                            
                                        </Box>
                                        <ListItemText sx={{marginLeft:'1.8%',}}>End of route.thank you for your service today</ListItemText>
                                    </ListItem>

                                    <ListItem>
                                        <Box
                                             sx={{width: "45px",height: "45px",backgroundImage: `url('src/assets/busicon.png')`,backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",boxShadow:'2px 2px 5px #181818'}}>
                                            
                                        </Box>
                                        <ListItemText sx={{marginLeft:'1.8%'}}>End of route.thank you for your service today</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <Box
                                             sx={{width: "45px",height: "45px",backgroundImage: `url('src/assets/busicon.png')`,backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",boxShadow:'2px 2px 5px #181818'}}>
                                            
                                        </Box>
                                        <ListItemText sx={{marginLeft:'1.8%'}}>End of route.thank you for your service today</ListItemText>
                                    </ListItem>
                                    
                                    
                                </List>

                                <Typography color='white' sx={{position:'relative',top:'1vh',marginLeft:'5%',fontSize:'24px',letterSpacing:'3px'}} >Yesterday</Typography>

                                <List sx={{color:'white',position:'relative',marginTop:'4%',marginLeft:'10%'}}>
                                    <ListItem>
                                        <Box
                                             sx={{width: "45px",height: "45px",backgroundImage: `url('src/assets/busicon.png')`,backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",boxShadow:'2px 2px 5px #181818'}}>
                                            
                                        </Box>
                                        <ListItemText sx={{marginLeft:'1%'}}>Notification 1</ListItemText>
                                    </ListItem>

                                    <ListItem>
                                        <Box
                                             sx={{width: "45px",height: "45px",backgroundImage: `url('src/assets/busicon.png')`,backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",boxShadow:'2px 2px 5px #181818'}}>
                                            
                                        </Box>
                                        <ListItemText sx={{marginLeft:'1%'}}>Notification 2</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <Box
                                             sx={{width: "45px",height: "45px",backgroundImage: `url('src/assets/busicon.png')`,backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",boxShadow:'2px 2px 5px #181818'}}>
                                            
                                        </Box>
                                        <ListItemText sx={{marginLeft:'1%'}}>Notification 3</ListItemText>
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
