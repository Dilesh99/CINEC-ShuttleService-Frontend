import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button, Paper, Drawer, List, ListItem, ListItemIcon, ListItemText,
  Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, InputBase, useMediaQuery, Box
} from '@mui/material';
import { Menu, Search, People, DirectionsBus, Person } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import cinecLogo from "/src/assets/cinec.png";
import { authMethods } from '../backend/authMethods';
import { StuMethods } from '../backend/StuMethods';
import { StaffMethods } from '../backend/StaffMethods';
import { DriverMethods } from '../backend/DriverMethods';

const Admin = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [allStaff, setAllStaff] = useState([]);
  const [loadingStaff, setLoadingStaff] = useState(false);
  const [allDrivers, setAllDrivers] = useState([]);
  const [loadingDrivers, setLoadingDrivers] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      handleAuth();
      fetchAllStudents();
      fetchAllStaff();
      fetchAllDrivers();
    }
  }, []);

  const handleAuth = async () => {
    try {
      const res = await authMethods.refreshToken();
      if (!res || !res.accessToken || !res.ID || res.role !== "Admin") {
        throw new Error("Unauthorized access");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      navigate("/");
    }
  };

  const fetchAllStudents = async () => {
    setLoadingStudents(true);
    try {
      const students = await StuMethods.getAllStudents();
      setAllStudents(students);
    } catch (error) {
      console.error('Error fetching students:', error);
      setAllStudents([]);
    } finally {
      setLoadingStudents(false);
    }
  };

  const fetchAllStaff = async () => {
    setLoadingStaff(true);
    try {
      const staff = await StaffMethods.getAllStaff();
      setAllStaff(staff);
    } catch (error) {
      console.error('Error fetching staff:', error);
      setAllStaff([]);
    } finally {
      setLoadingStaff(false);
    }
  };

  const fetchAllDrivers = async () => {
    setLoadingDrivers(true);
    try {
      const drivers = await DriverMethods.getAllDrivers();
      setAllDrivers(drivers);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      setAllDrivers([]);
    } finally {
      setLoadingDrivers(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter students and drivers based on the search query
  const filteredStudents = allStudents.filter(student =>
    student.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentsID.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDrivers = allDrivers.filter(driver =>
    driver.shuttleID.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={() => setMobileOpen(!mobileOpen)} />
      <div style={{ flexGrow: 1 }}>
        <Header handleDrawerToggle={() => setMobileOpen(!mobileOpen)} searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        <MainContent 
          allStudents={filteredStudents} 
          loadingStudents={loadingStudents}
          allStaff={allStaff}
          loadingStaff={loadingStaff}
          allDrivers={filteredDrivers}
          loadingDrivers={loadingDrivers}
        />
      </div>
    </div>
  );
};

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const handleListItemClick = (index, route) => {
    setSelectedIndex(index);
    navigate(route);
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
          { text: 'Cashiers, Shuttles & Drivers', route: '/shuttles' },
          { text: 'Payment Records', route: '/paymentRecords'},
          { text: 'Attendance Records', route: '/attendanceRecords'},
          { text: 'Shuttle locations', route: '/shuttleLocations'},
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
        <Typography variant="h6">
          Dashboard
        </Typography>
        <SearchBar>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={onSearchChange}
            startAdornment={<Search sx={{ position: 'absolute', left: '10px' }} />}
          />
        </SearchBar>
        <div style={{ display: 'flex', alignItems: 'center' }}></div>
      </Toolbar>
    </AppBar>
  );
};

const MainContent = ({
  allStudents,
  loadingStudents,
  allStaff,
  loadingStaff,
  allDrivers,
  loadingDrivers
}) => {
  return (
    <div style={{ padding: '16px' }}>
      <DashboardStats 
        studentCount={(allStudents ?? []).length}
        staffCount={(allStaff ?? []).length}
        driverCount={(allDrivers ?? []).length}
      />
      <Grid container spacing={2} sx={{ marginTop: '16px' }}>
        {/* Left column: Students table */}
        <Grid item xs={12} md={8}>
          <RecentStudents 
            allStudents={allStudents} 
            loadingStudents={loadingStudents} 
          />
        </Grid>
        {/* Right column: Drivers table */}
        <Grid item xs={12} md={4}>
          <DriverDetails 
            allDrivers={allDrivers} 
            loadingDrivers={loadingDrivers} 
          />
        </Grid>
      </Grid>
    </div>
  );
};

const DashboardStats = ({ studentCount, staffCount, driverCount }) => {
  const stats = [
    { label: 'Students', value: studentCount, icon: <People /> },
    { label: 'Staff', value: staffCount, icon: <People /> },
    { label: 'Shuttles', value: driverCount, icon: <DirectionsBus /> },
  ];

  return (
    <Grid container spacing={4} justifyContent="center">
      {stats.map((stat) => (
        <Grid item xs={3} key={stat.label}>
          <Paper
            style={{
              padding: '18px',
              textAlign: 'center',
              boxShadow: '1px 0px 10px 4px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
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

const RecentStudents = ({ allStudents, loadingStudents }) => {
  return (
    <Paper sx={{ padding: '16px', boxShadow: 3 }}>
      <Typography variant="h6">Students</Typography>
      <Link to="/students">
        <Button
          variant="contained"
          sx={{
            float: 'right',
            marginBottom: '8px',
            backgroundColor: 'secondary.light',
            '&:hover': {
              backgroundColor: 'secondary.light2',
            },
          }}
        >
          View All
        </Button>
      </Link>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Phone No.</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Student ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Payment Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingStudents ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : allStudents && allStudents.length > 0 ? (
              allStudents.map((student, index) => (
                <TableRow key={student.id || index}>
                  <TableCell>{student.username}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{String(student.phone_number)}</TableCell>
                  <TableCell>{student.studentsID}</TableCell>
                  <TableCell>{student.paymentStatus ? "Paid" : "Not paid"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No students found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const DriverDetails = ({ allDrivers, loadingDrivers }) => {
  return (
    <Paper sx={{ padding: '16px', boxShadow: 3 }}>
      <Typography variant="h6">Shuttles</Typography>
      <Link to="/shuttles">
        <Button
          variant="contained"
          sx={{
            float: 'right',
            marginBottom: '8px',
            backgroundColor: 'secondary.light',
            '&:hover': {
              backgroundColor: 'secondary.light2',
            },
          }}
        >
          View All
        </Button>
      </Link>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Shuttle</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Driver</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Phone No.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingDrivers ? (
              <TableRow>
                <TableCell colSpan={4}>Loading...</TableCell>
              </TableRow>
            ) : allDrivers && allDrivers.length > 0 ? (
              allDrivers.map((driver, index) => (
                <TableRow key={driver.id || index}>
                  <TableCell>{driver.shuttleID}</TableCell>
                  <TableCell>{driver.username}</TableCell>
                  <TableCell>{String(driver.phone_number)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No drivers found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Admin;