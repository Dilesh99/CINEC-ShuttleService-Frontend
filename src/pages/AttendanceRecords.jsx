import React, { useState, useEffect, useRef } from 'react';
import {
  InputAdornment,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputBase,
  useMediaQuery,
  Box,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Menu,
  Search,
  People,
  DirectionsBus,
  AccountBalanceWallet,
  EventAvailable,
  Dashboard,
  Person,
  Edit,
  Delete,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import cinecLogo from '/src/assets/cinec.png';
import { useNavigate } from 'react-router-dom';

import { StuMethods } from '../backend/StuMethods';
import { authMethods } from '../backend/authMethods';
import { LocationMethods } from '../backend/LocationMethods';
import { AttendanceMethods } from '../backend/AttendanceMethods';

const AttendanceRecords = () => {
  const navigate = useNavigate();
  let ID = null;
  const [role, setRole] = useState('');
  const hasRun = useRef(false);
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecords, setFilteredRecords] = useState([]);


  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      handleAuth();
      getAllRecords();
    }
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRecords(records);
    } else {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = records.filter((record) => {
        if (!record.date) return false;
        const dateParts = record.date.split('/');
        if (dateParts.length < 3) return false;
      
        const monthIndex = parseInt(dateParts[1]) - 1;
        const year = dateParts[2].split(',')[0];
      
        return (
          record.userID.toLowerCase().includes(lowercasedQuery) ||
          record.shuttleID.toLowerCase().includes(lowercasedQuery) ||
          year.toLowerCase().includes(lowercasedQuery) ||
          (monthIndex >= 0 && monthIndex < 12 && monthNames[monthIndex].toLowerCase().includes(lowercasedQuery))
        );
      });
      setFilteredRecords(filtered);
    }
  }, [searchQuery, records]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getAllRecords = async () => {
    const retrievedData = await AttendanceMethods.getAllAttendances();
    setRecords(retrievedData);
  };

  const deleteAllRecords = async () => {
    try {
      await AttendanceMethods.deleteAllAttendance();
      getAllRecords();
    } catch (error) {
      console.error("Error deleting records:", error);
    }
  }

  const handleAuth = async () => {
    const res = await authMethods.refreshToken();
    if (res && res.accessToken && res.ID && res.role === 'Admin') {
      ID = res.ID;
      setRole(res.role);
    } else {
      navigate('/');
    }
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} role={role} />
      <div style={{ flexGrow: 1 }}>
        <Header handleDrawerToggle={handleDrawerToggle} searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        <MainContent records={filteredRecords} deleteAllRecords={deleteAllRecords} />
      </div>
    </div>
  );
};

const Sidebar = ({ mobileOpen, handleDrawerToggle, role }) => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedIndex, setSelectedIndex] = useState(5);
  const navigate = useNavigate();

  const handleListItemClick = (index, route) => {
    setSelectedIndex(index);
    navigate(route);
  };

  const sidebarItems = [
    { text: 'Dashboard', route: '/admindashboard' },
    { text: 'Students', route: '/students' },
    { text: 'Staff', route: '/staff' },
    { text: 'Cashiers, Shuttles & Drivers', route: '/shuttles' },
    { text: 'Payment Records', route: '/paymentRecords' },
    { text: 'Attendance Records', route: '/attendanceRecords' },
    { text: 'Shuttle locations', route: '/shuttleLocations' },
  ];

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
        {sidebarItems.map((item, index) => (
          <ListItem
            button
            key={item.text}
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index, item.route)}
            sx={{
              cursor: 'pointer',
              color: selectedIndex === index ? 'white' : 'inherit',
              backgroundColor: selectedIndex === index ? 'secondary.light2' : 'inherit',
              '&:hover': {
                backgroundColor: selectedIndex === index ? 'secondary.light2' : 'white',
              },
            }}
          >
            <ListItemIcon sx={{ color: selectedIndex === index ? 'black' : 'inherit' }}>
              {item.text === 'Dashboard' ? (
                <Dashboard />
              ) : item.text === 'Students' ? (
                <Person />
              ) : item.text === 'Staff' ? (
                <Person />
              ) : item.text === 'Cashiers, Shuttles & Drivers' ? (
                <People />
              ) : item.text === 'Payment Records' ? (
                <AccountBalanceWallet />
              ) : item.text === 'Attendance Records' ? (
                <EventAvailable />
              ) : item.text === 'Shuttle locations' ? (
                <DirectionsBus />
              ) :
                <Person />
              }
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
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
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

const Header = ({ handleDrawerToggle, searchQuery, onSearchChange }) => {
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
        <Typography variant="h6">Attendance Records</Typography>
        <SearchBar>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={onSearchChange}
            startAdornment={<InputAdornment position="start">
              <Search />
            </InputAdornment>}
          />
        </SearchBar>
      </Toolbar>
    </AppBar>
  );
};

const MainContent = ({ records, deleteAllRecords, searchQuery, onSearchChange }) => {
  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={2} sx={{ marginTop: '16px' }}>
        <Grid item xs={12} md={12}>
          <RecentPayments records={records} deleteAllRecords={deleteAllRecords} />
        </Grid>
      </Grid>
    </div>
  );
};

const RecentPayments = ({ records, deleteAllRecords }) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return (
    <Paper sx={{ padding: '16px', boxShadow: 3 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Attendance Records
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Shuttle ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Month</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records && records.length > 0 ? (
              records.map((record) => (

                <TableRow key={record.id}>
                  <TableCell>{record.userID}</TableCell>
                  <TableCell>{record.shuttleID}</TableCell>
                  <TableCell>{record.date.split('/')[2].split(',')[1]}</TableCell>
                  <TableCell>{record.date.split('/')[0].split(',')[0]}</TableCell>
                  <TableCell>{monthNames[(parseInt(record.date.split('/')[1]) - 1)]}</TableCell>
                  
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
        <Button variant="contained" onClick={deleteAllRecords}>
          Delete Records
        </Button>
      </Box>
    </Paper>
  );
};

export default AttendanceRecords;