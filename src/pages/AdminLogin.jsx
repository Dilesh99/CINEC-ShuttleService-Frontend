import React from 'react'
import { Box, Button, Grid2, TextField, Typography, InputAdornment } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


const AdminLogin = () => {
  return (

    <Grid2 container size={{xs:12}}  sx={{width:'100%', height:'100%'}}>
        <Box 
          sx= {{ 
                mt:'-0.52%',
                marginLeft: { xs: "-1.6%", sm: "-0.98%", md: "-0.51%" },
                marginRight: { xs: "-1.6%", sm: "-0.97%", md: "-0.51%" },
                width:'100%', 
                height: { xs: '540px',sm: '540px', md:'100%', lg:'100%'},
                position:'absolute', bgcolor: '#1E67BB' , }}
        />        
       
   
        <Grid2 container size={{xs:10}} >

            <Grid2 container size={{xs:10}}>

            <Box  container size={{xs:10}} 
            sx={{ 
                
                width: { xs: '84%', sm: '60%', md: '45%', lg:'40%' },
                height: { xs: '400px', sm:'450px',  md: '450px', lg:'480px' },
                borderRadius:{xs:10, sm:10, md:10, lg:10},
                bgcolor: '#ffffff', flexDirection: 'column', marginLeft: { xs: '8%', sm: '19%', md: '10%', lg:'12%' }, alignItems: 'center', justifyContent: 'center',  position: 'absolute', left:{ xs: 0, sm:'8px',  md: '190px', lg:'285px' },
                top: { xs: '50px', sm: '50px', md: '8%', lg:'12%' }, }}> 

            <Typography 
                sx={{color: { xs: '#D4790E', sm: '#D4790E', md: '#D4790E', lg:'#002147FF' }, fontFamily:'inter', textAlign:'center',
                fontSize: {xs:'16px', sm:'19px', md:'21px', lg:'24px'},
                mt:{xs:4, sm:4, md:8, lg:5}, 
                fontFamily:'inter'}}>
                    WELCOME TO
            </Typography>

            <Typography sx={{color:'#002147FF', fontFamily:'inter', textAlign:'center',
                fontSize:{xs:'20px', sm:'24px', md:'26px', lg:'32px'},
                mb:{xs:1, sm:2, md:2, lg:3}, 
                fontFamily:'inter', fontWeight:'1000'}}>
                    CINEC SHUTTLE SERVICES
            </Typography>

            <Typography sx={{color:'#002147FF', fontFamily:'inter', textAlign:'center', fontWeight: '500',  
                fontSize:{xs:'12px', sm:'14px', md:'16px', lg:'16px'},
                mt:{xs:2, sm:3, md:3, lg:5},
                mb:{xs:2, sm:2, md:2, lg:2}, 
                fontFamily:'inter'}}>
                    Enter your Username & Password to SignIn
            </Typography>



            
            <Box //Text field 1
                    component="form"
                    sx={{'& > :not(style)': {m: { xs: 0, sm: 1, md: 1, lg: 1 },
                        width: { xs: '180px', sm: '300px', md: '320px', lg: '380px' },
                        mt: { xs: 1, sm: 1, md: 1, lg: 2 },
                        mb: { xs: 0.5, sm: 1, md: 1.5, lg: 1.5 },
                        },display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center',
                    }}noValidate autoComplete="off">
                <TextField id="outlined-basic" label="" variant="outlined" placeholder="Enter Your Username"
                    InputProps={{startAdornment: (<InputAdornment position="start"><AccountCircleOutlinedIcon /></InputAdornment>),}}
                    sx={{width: { xs: '180px', sm: '300px', md: '320px', lg: '380px' },
                    '& .MuiOutlinedInput-root': {height: { xs: '34px', sm: '40px', md: '45px', lg: '50px' }, borderRadius: '30px', 
                        '& fieldset': {borderColor: '#000000',},
                        '&:hover fieldset': {borderColor: '#002147FF', },},
                    '& input': {padding: '0 5px', fontSize: '12px', color: '#002147FF', height: '100%',},}}/>
            </Box>

        <Box //Text field 5
                    component="form"
                    sx={{'& > :not(style)': {m: { xs: 0, sm: 1, md: 1, lg: 1 },
                        width: { xs: '180px', sm: '300px', md: '320px', lg: '380px' },
                        mt: { xs: 1, sm: 1, md: 1, lg: 1 },
                        mb: { xs: 0.5, sm: 1, md: 1, lg: 1.5 },
                        },display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center',
                    }}noValidate autoComplete="off">
                <TextField id="outlined-basic" label="" variant="outlined" placeholder="Enter Your Password"
                    InputProps={{startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>),}}
                    sx={{width: { xs: '180px', sm: '300px', md: '320px', lg: '380px' },
                    '& .MuiOutlinedInput-root': {height: { xs: '34px', sm: '40px', md: '45px', lg: '50px' }, borderRadius: '30px', 
                        '& fieldset': {borderColor: '#000000',},
                        '&:hover fieldset': {borderColor: '#002147FF', },},
                    '& input': {padding: '0 5px', fontSize: '12px', color: '#002147FF', height: '100%',},}}/>
            </Box>

            <Box  
                sx={{
                    display: 'flex', alignItems: 'center',justifyContent: 'center',}}
            >
                <Button href="/admindashboard"  type="submit" variant="contained"
                        sx={{alignItems:'center', justifyContent:'center', justifyItems:'center', display:'flex', fontWeight: 800, bgcolor:'#002147',  padding:'5px',
                            fontSize:{xs:'16px', sm:'18px', md:'18px', lg:'20px'},
                            width:{xs:'170px', sm:'290px', md:'310px', lg:'370px'}, 
                            height:{xs:'34px', sm:'40px', md:'45px', lg:'50px'}, 
                            borderRadius:'30px',  mt:2.5,
                            '&:hover': {bgcolor: 'secondary.light', },
                        }}>
                            Sign In</Button>
            </Box>                

            </Box>
            
                
            </Grid2>

            

            </Grid2>


        </Grid2>

        
  
    
  )
}

export default AdminLogin