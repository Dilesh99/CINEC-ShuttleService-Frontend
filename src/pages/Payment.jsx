import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Grid2, Typography } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Layout from "../components/Layout";


export default function Payment() {
  return (
    <Layout>
    <div>
        <Box
            sx={{
                mt:'1.2%',
                padding:2,
                marginLeft: { xs: "-1.6%", sm: "-0.98%", md: "-0.51%" },
                marginRight: { xs: "-1.6%", sm: "-0.97%", md: "-0.51%" },
                height: "110vh",
                backgroundImage: `url('src/assets/paymentBG.png')`,
                backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", position:'relative'}}>
            
            <Box
                sx={{width:'90%',backgroundColor:'rgba(0, 33, 71, 0.90)',marginLeft:'auto',marginRight:'auto',
                borderRadius: 6,
                position:'relative',top:'10%',paddingBottom:'2.5%'}}>
                
                <Grid container>
                    <Grid item lg={6} md={12}>
                        <Box sx={{width: "64px",height: "64px",backgroundImage: `url('src/assets/paymentlogo.png')`,backgroundSize: "cover", backgroundRepeat: "no-repeat", position:'relative',marginLeft:'auto',marginRight:'auto',marginTop:'5%'}} ></Box>

                            <Typography  sx={{
                                textAlign:'center',
                                color:'white',
                                fontWeight:'600',
                                letterSpacing:'1px',
                                fontSize:'20px'

                            }}>
                                Select Payment Method
                                    <Typography>
                                    Credit/Debit Card
                                    </Typography>
                                </Typography>
                            
                            <Box sx={{
                                width:'40%',
                                height:'32px',
                                position:'relative',
                                marginLeft:'auto',
                                marginRight:'auto',
                                display:'flex',
                                marginTop:'1%',
                                justifyContent:'space-between'
                               
                            }}>
                                
                                <Box sx={{width: "30%",height: "100%",backgroundImage: `url('src/assets/visa.png')`,backgroundRepeat:'no-repeat', backgroundPosition:'center',}} ></Box>

                                <Box sx={{width: "30%",height: "100%",backgroundImage: `url('src/assets/master.png')`,backgroundRepeat:'no-repeat', backgroundPosition:'center'}} ></Box>

                                <Box sx={{width: "30%",height: "100%",backgroundImage: `url('src/assets/american.png')`,backgroundRepeat:'no-repeat', backgroundPosition:'center'}} ></Box>

                                
                            </Box>

                            <Box width={'80%'} marginLeft={'auto'} marginRight={'auto'} marginTop={'2%'} color={'white'}>
                                <Typography marginTop={'5%'}>Card number :</Typography>
                                <TextField id="outlined-basic" placeholder='0000 0000 0000 0000' variant="outlined" sx={{
                                    backgroundColor:'white',
                                    borderRadius:'10px',
                                    marginTop:'2%',
                                    width:'80%',
                                    position:'relative',
                                    marginLeft:'auto',
                                    marginRight:'auto'
                                    }}></TextField>

                                <Typography marginTop={'3%'}>Card Name :</Typography>
                                <TextField id="outlined-basic" placeholder='Card Name' variant="outlined" sx={{
                                    backgroundColor:'white',
                                    borderRadius:'10px',
                                    marginTop:'2%',
                                    width:'80%'
                                    }}></TextField>

                                <Grid container>
                                    <Grid item lg={4} >
                                        <Typography marginTop={'5%'}>Expiration date :</Typography>
                                        <TextField id="outlined-basic" placeholder='MM/YY'  variant="outlined" sx={{
                                             backgroundColor:'white',
                                            borderRadius:'10px',
                                            marginTop:'2%',
                                            width:'80%'
                                    }}></TextField>
                                    </Grid>
                                    <Grid item lg={4} >
                                        <Typography marginTop={'5%'}>CVV :</Typography>
                                        <TextField id="outlined-basic" placeholder='###'  variant="outlined" sx={{
                                             backgroundColor:'white',
                                            borderRadius:'10px',
                                            marginTop:'2%',
                                            width:'80%'
                                    }}></TextField>
                                    </Grid>

                                </Grid>

                              

                                <FormGroup color='white'sx={{
                                    marginTop:'5%'
                                }} >
                                    <FormControlLabel   control={<Checkbox defaultChecked />} label="Save Card" />
                                    
                                </FormGroup>
                                <Button sx={{
                                    backgroundColor:'#D4790E',color:'white',width:'40%',letterSpacing:'2px',height:'40px', borderRadius:'10px',fontWeight:'600',boxShadow:'1px 1px 10px black'
                                }}>Pay Now</Button>
                                
                            </Box>

                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>

                        <Box width={"70%"} marginLeft={'auto'} marginRight={'auto'}  marginTop={'10%'} padding={'10% 5% 10% 5%'} borderRadius={'15px'} sx={{
                            border:'dashed 1px white',backgroundColor:'rgba(255, 255, 255, 0.2)'
                        }} >
                            
                            <Typography color='white' fontSize={"20px"} textAlign={"center"} letterSpacing={'2px'} fontWeight={'600'}>Generate Your a Online Bus Pass</Typography>
                            
                            <Box sx={{ position:'relative', marginLeft:'auto', marginRight:'auto',width:'50%', marginTop:'10%'}}>
                            <Button sx={{
                                backgroundColor:'#D4790E', width:'100%',height:'50px' ,boxShadow:'1px 1px 10px black',color:'white',letterSpacing:'2px',fontWeight:'600'
                            }}>Download pass</Button>
                        </Box>

                            </Box>
                        
                    </Grid>

                </Grid>

            </Box>



        </Box>
    </div>
    </Layout>
  )
}
