import React from 'react';
import { Grid2, Typography, Box, Button} from '@mui/material';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import { Link } from 'react-router-dom';

function Interaction() {
  return (

    <Grid2 container
      sx={{
        mt:'-1%',
        mb:'-1%',
        marginLeft: { xs: "-1.6%", sm: "-0.98%", md: "-0.51%" },
        marginRight: { xs: "-1.6%", sm: "-0.97%", md: "-0.51%" },
        height: { xs: '120vh', sm: '120vh', md: '100vh', lg:'101vh' },
        backgroundImage: `url('src/assets/B2.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        color: '#ffffff',
      }}>
    
      <Box
        sx={{
          width: '100%',
          maxWidth: 800,
          textAlign: 'center',
          mt: { xs: '100px', sm: '95px', md: '110px', lg:'120px' }, 
          borderRadius: 2,
        }}
      >
  
        <Typography
          sx={{fontSize: { xs: '18px', sm: '20px', md: '23px',lg:'28px' },fontFamily: 'Inter',fontWeight: 500, letterSpacing: '0.1em',mb: 2,
          }}
        > Welcome To
        </Typography>

        <Typography
          sx={{fontFamily: 'Inter',fontSize: { xs: '24px', sm: '26px', md: '30px', lg:'36px' },fontWeight: 900, letterSpacing: '0.15em',mb: 4,
          }}
        >CINEC SHUTTLE SERVICES
        </Typography>

       <Grid2>
           <Link to="/signup2"> <Button href=" " variant="contained" color="warning" fullWidth
            sx={{
                  width: { xs: '15rem', sm: '20rem', md: '25rem', lg:'25rem' } , borderRadius: '35px' ,mb: 2,fontWeight: 600,textTransform: 'none',py: { xs: 1, sm: 1.2, md: 1.2, lg:1.5},fontSize: { xs: '12px', sm: '14px', md: '16px', lg:'16px' }, bgColor: '#D4790E', 
                  '&:hover': { bgColor: '#e67e00' },
                }}> 
              <AssignmentIndOutlinedIcon sx={{ mr: 1 }} /> 
            Sign Up as a Staff Member
            </Button></Link>
      </Grid2>

      <Grid2>
        <Link to="/signup"><Button href=" " variant="contained" color="warning" fullWidth
          sx={{
            width: { xs: '15rem', sm: '20rem', md: '25rem', lg:'25rem' } , borderRadius: '35px' ,mb: 2,fontWeight: 600,textTransform: 'none',py: { xs: 1, sm: 1.2, md: 1.2, lg:1.5 },fontSize: { xs: '12px', sm: '14px', md: '16px', lg:'16px' }, bgColor: '#D4790E', textAlign:'left', 
            '&:hover': { bgColor: '#e67e00' },
          }}> 
          <PermContactCalendarOutlinedIcon sx={{ mr: 5,  }}/>
        Sign Up as a Student
      </Button></Link>
        </Grid2>

        <Grid2>
        <Link to="/SignIn2"><Button href=" " variant="contained" color="warning" fullWidth
          sx={{
            width: { xs: '15rem', sm: '20rem', md: '25rem', lg:'25rem' } , borderRadius: '35px' ,mb: 2,fontWeight: 600,
            justifyContent:'center',textTransform: 'none',py: { xs: 1, sm: 1.2, md: 1.2, lg:1.5 },fontSize: { xs: '12px', sm: '14px', md: '16px', lg:'16px' }, bgColor: '#D4790E', textAlign:'left', 
            '&:hover': { bgColor: '#e67e00' },
          }}> 
          <PermContactCalendarOutlinedIcon sx={{ mr: 5,  }}/>
        Sign In as a Driver
        </Button></Link>
        </Grid2>
   
      <Typography
        sx={{fontFamily: 'Inter',fontSize: { xs: '12px', sm: '14px', md: '16px', lg:'16px' },fontWeight: 400, mt: { xs: 1.5, sm: 1.5, md: 2, lg:2 }, textAlign:'right', marginRight:{ xs: '3rem', sm: '14rem', md: '13rem', lg:'13rem' }}}
        > Already a member?<br/>
         <Link to='/signin' ><Button href="#" sx={{ color: '#DAEEF5', fontWeight: '600', fontSize:{ xs: '12px', sm: '14px', md: '16px', lg:'16px' }, textAlign:'right',  color:'#DAEEF5', textDecoration:'none,' }}>
            Sign In
          </Button></Link> 
        </Typography>
      </Box>

      <Box
        sx={{width: '70%', height: '2px',position: 'absolute',  top:{ xs: '85%', sm: '85%', md: '87%', lg:'92%' }, borderBottom:'2px solid #ffffff', left:0,
        }}/>
      
      <Box
        sx={{width: '28%', height: '2px',position: 'absolute',  top:{ xs: '85%', sm: '85%', md: '87%', lg:'92%' }, borderBottom:'2px solid #ffffff', left:'72%',
        }}/>

    </Grid2>
  );
}

export default Interaction;
