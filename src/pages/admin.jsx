import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Paper, Drawer, List, ListItem, ListItemIcon, ListItemText, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, InputBase, useMediaQuery,Box } from '@mui/material';
import { Menu, Search, People, DirectionsBus, AccountBalanceWallet, Help, Settings, Person, Notifications } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import cinecLogo from "/src/assets/cinec.png";

import { authMethods } from '../backend/authMethods';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
      if (res && res.accessToken && res.ID && res.role == "Admin") {
        ID = res.ID;
      }
      else {
        navigate("/");
      }
    }

 
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <div style={{ flexGrow: 1 }}>
        <Header handleDrawerToggle={handleDrawerToggle} />
        <MainContent />
      </div>
    </div>
  );
};

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedIndex, setSelectedIndex] = useState(0);// Initialize the hook

  const navigate = useNavigate();

  const handleListItemClick = (index, route) => {
    setSelectedIndex(index);
    navigate(route); // Navigate to the specified route
  };

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div style={{ padding: '16px', alignSelf: 'center' }}>
        <img src={cinecLogo} alt="logo" width={60} height={60} />
      </div>
      <List>
        {[
          { text: 'Dashboard', route: '/admindashboard' },
          { text: 'Students', route: '/students' },
          { text: 'Staff', route: '/staff' },
          { text: 'Shuttles', route: '/shuttles' },
          
        ].map((item, index) => (
          <ListItem
            button
            key={item.text}
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index, item.route)}
            sx={{
              color: selectedIndex === index ? 'white' : 'inherit',
              backgroundColor: selectedIndex === index ? 'secondary.light2' : 'inherit',
              '&:hover': {
                backgroundColor: selectedIndex === index ? 'secondary.light2' : 'white',
              },
            }}
          >
            <ListItemIcon sx={{ color: selectedIndex === index ? 'black' : 'inherit' }}>
              {index === 0 ? (
                <People />
              ) : index === 1 ? (
                <Person />
              ) : index === 2 ? (
                <People />
              ) : index === 3 ? (
                <DirectionsBus />
              ) : (
                <AccountBalanceWallet />
              )}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ padding: 5 }}>
        <Button
          onClick={() => authMethods.deleteToken().then(() => navigate('/'))}
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#1E67BB',
            '&:hover': {
              backgroundColor: 'secondary.light2',
              color: 'black',
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant={isSmDown ? 'temporary' : 'permanent'}
        open={isSmDown ? mobileOpen : true}
        onClose={handleDrawerToggle}
        anchor="left"
        sx={{
          width: 240,
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: 'secondary.light',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: "auto",
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: "auto",
    width: '30%',
    borderRadius: '25px',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create('width'),
  [theme.breakpoints.up('md')]: {
    width: '100%',
  },
}));

const Header = ({ handleDrawerToggle }) => {
  return (
    <AppBar position="static" color="default" elevation={0} sx={{ padding: '8px 16px' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: 'none' }, mr: 2 }}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6">
          Dashboard
        </Typography>
        <SearchBar>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            startAdornment={<Search sx={{ position: 'absolute', left: '10px' }} />}
          />
        </SearchBar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const MainContent = () => {
  return (
    <div style={{ padding: '16px' }}>
      <DashboardStats />
      <Grid container spacing={2} sx={{ marginTop: '16px' }}>
        <Grid item xs={12} md={8}>
          <RecentPayments />
        </Grid>
        <Grid item xs={12} md={4}>
          <NewShuttles />
        </Grid>
      </Grid>
    </div>
  );
};

const DashboardStats = () => {
  const stats = [
    { label: 'Students', value: 115, icon: <People /> },
    { label: 'Staff', value: 24, icon: <People /> },
    { label: 'Shuttles', value: 6, icon: <DirectionsBus /> }
   
  ];

  return (
    <Grid container spacing={4} justifyContent="center">
      {stats.map((stat) => (
        <Grid item xs={3} key={stat.label}>
          <Paper
            style={{
              padding: '18px',
              textAlign: 'center',
              boxShadow: '1px 0px 10px 4px rgba(0, 0, 0, 0.1)', // Adds a 3D-like shadow effect
              borderRadius: '8px', // Rounds the corners slightly for a polished look
             
            }}
          >
            {stat.icon}
            <Typography variant="h5">{stat.value}</Typography>
            <Typography variant="subtitle1">{stat.label}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};


const RecentPayments = () => {

  return (
    <Paper sx={{ padding: '16px', boxShadow:'3' }}>
      <Typography variant="h6">Students</Typography>
     <Link to="/students"> <Button variant="contained" sx={{ float: 'right', marginBottom: '8px', backgroundColor:'secondary.light','&:hover': {
           backgroundColor:'secondary.light2',
           }, }}>View All</Button></Link>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone No.</TableCell>
              <TableCell>StudentID</TableCell>
              <TableCell>Shuttle</TableCell>
              <TableCell>Last Payment Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>abs@gmail.com</TableCell>
              <TableCell>071 123 4567</TableCell>
              <TableCell>123456</TableCell>
              <TableCell>Gampaha I</TableCell>
              <TableCell>20.11.2024</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>abs@gmail.com</TableCell>
              <TableCell>071 123 4567</TableCell>
              <TableCell>123456</TableCell>
              <TableCell>Gampaha I</TableCell>
              <TableCell>20.11.2024</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>abs@gmail.com</TableCell>
              <TableCell>071 123 4567</TableCell>
              <TableCell>123456</TableCell>
              <TableCell>Gampaha I</TableCell>
              <TableCell>20.11.2024</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const NewShuttles = () => {

  return (
    <Paper sx={{ padding: '16px',boxShadow:'3'  }}>
      <Typography variant="h6">Shuttles</Typography>
     <Link to="/Shuttles"> <Button variant="contained" sx={{ float: 'right', marginBottom: '8px',backgroundColor:'secondary.light','&:hover': {
           backgroundColor:'secondary.light2',
           }, }}>View All</Button></Link>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Shuttle name</TableCell>
              <TableCell>Driver name</TableCell>
              <TableCell>Phone number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Gampaha 1</TableCell>
              <TableCell>Sumane</TableCell>
              <TableCell>071 123 4567</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gampaha 2</TableCell>
              <TableCell>Deshan</TableCell>
              <TableCell>071 123 4567</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mabale</TableCell>
              <TableCell>Wickramasinghe</TableCell>
              <TableCell>071 123 4567</TableCell>
            </TableRow>
    
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Admin;


