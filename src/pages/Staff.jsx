import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Paper, Drawer, List, ListItem, ListItemIcon, ListItemText, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, InputBase, useMediaQuery,Box } from '@mui/material';
import { Menu, Search, People, DirectionsBus, AccountBalanceWallet, Help, Settings, Person, Notifications } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';


const Sta = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

 
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
  const [selectedIndex, setSelectedIndex] = useState(2);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div style={{ padding: '16px', marginLeft: '18px' }}>
        <img src="/src/assets/cinec.png" alt="logo" width={100} height={50} />
      </div>
      <List>
        {['Dashboard', 'Students', 'Staff', 'Shuttles', 'Income'].map((text, index) => (
          <Link to={`/${text.toLowerCase()}`} key={text} style={{ textDecoration: 'none', color:'black' }}>
            <ListItem
              button
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
              sx={{
                color: selectedIndex === index ? 'white' : 'inherit',  // Set text color to black for selected item
                backgroundColor: selectedIndex === index ? 'secondary.light2' : 'inherit',
                '&:hover': {
                  backgroundColor: selectedIndex === index ? 'secondary.light2' : 'white',
                },
              }}
            >
              <ListItemIcon sx={{ color: selectedIndex === index ? 'black' : 'inherit' }}>  {/* Set icon color to black */}
                {index === 0 ? <People /> : index === 1 ? <Person /> : index === 2 ? <People /> : index === 3 ? <DirectionsBus /> : <AccountBalanceWallet />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      {/* Spacer to push the logout button to the bottom */}
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ padding: 5, }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#1E67BB',
            '&:hover': {
              backgroundColor: 'secondary.light2',
              color:'black'
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
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '50%',
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
          <Button variant="contained" sx={{
            color: 'white',
            backgroundColor: 'secondary.light',
            '&:hover': {
              backgroundColor: 'secondary.light2',
            },
          }}>
            Add New
          </Button>
          <IconButton color="inherit" sx={{ marginLeft: '16px' }}>
            <Notifications />
          </IconButton>
          <IconButton color="inherit" sx={{ marginLeft: '8px' }}>
            <Avatar alt="User" src="https://via.placeholder.com/150" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};
const MainContent = () => {
  return (
    <div style={{ padding: '16px' }}>
      
      <Grid container spacing={2} sx={{ marginTop: '16px' }}>
        <Grid item xs={12} md={12}>
          <RecentPayments />
        </Grid>
        
      </Grid>
    </div>
  );
};



const RecentPayments = () => {
  const payments = Array(10).fill({ name: 'John Doe', email: 'abs@gmail.com', phone:'071 123 4567', sid:'123456', shuttle: 'Gampaha I', lpdate: '20.11.2024' });

  return (
    <Paper sx={{ padding: '16px' ,boxShadow:'3' }}>
      <Typography variant="h6">Staff</Typography>
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
            {payments.map((payment, index) => (
              <TableRow key={index}>
                <TableCell>{payment.name}</TableCell>
                <TableCell>{payment.email}</TableCell>
                <TableCell>{payment.phone}</TableCell>
                <TableCell>{payment.sid}</TableCell>
                <TableCell>{payment.shuttle}</TableCell>
                <TableCell>{payment.lpdate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};



export default Sta;
