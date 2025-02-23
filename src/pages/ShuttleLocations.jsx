import React, { useState, useEffect, useRef } from 'react';
import {
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
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import cinecLogo from '/src/assets/cinec.png';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import busIconMap from "/src/assets/busIconMap.png";
import { LocationMethods } from '../backend/LocationMethods';
import { authMethods } from '../backend/authMethods';

const PaymentRecords = () => {
  const navigate = useNavigate();
  let ID = null;
  const [role, setRole] = useState('');
  const hasRun = useRef(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shuttleLocations, setShuttleLocations] = useState([]); // Initialize as empty array
  const apiKey = "AIzaSyDHSsPvUNS84N5jUnEyt5xxzGYkkynf6TU";

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      handleAuth();
    }
  }, []);

  useEffect(() => {
    const fetchAllShuttles = () => {
      // Assuming LocationMethods.getAllShuttles fetches all shuttle data
      LocationMethods.getAllShuttles().then(data => {
        setShuttleLocations(data || []); // Ensure data is an array
      }).catch(error => {
        console.error("Error fetching shuttle locations:", error);
        setShuttleLocations([]); // Fallback to empty array on error
      });
    };

    const intervalId = setInterval(fetchAllShuttles, 1000);
    return () => clearInterval(intervalId);
  }, []);

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
        <Header handleDrawerToggle={handleDrawerToggle} />
        <MainContent shuttleLocations={shuttleLocations} />
      </div>
    </div>
  );
};

const Sidebar = ({ mobileOpen, handleDrawerToggle, role }) => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedIndex, setSelectedIndex] = useState(6);
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
              ) : (
                <Person />
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
        <Typography variant="h6">Dashboard</Typography>
        <SearchBar>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={onSearchChange}
            startAdornment={<Search sx={{ position: 'absolute', left: '10px' }} />}
          />
        </SearchBar>
      </Toolbar>
    </AppBar>
  );
};

const MainContent = ({ shuttleLocations }) => {
  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={2} sx={{ marginTop: '16px' }}>
        <Grid item xs={12} md={12}>
          <Paper sx={{ padding: '16px', boxShadow: 3 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Shuttle Locations
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>GAMPAHA1</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>GAMPAHA2</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>MALABE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <ShuttleMap shuttle={shuttleLocations.find(shuttle => shuttle?.shuttleID === 'GAMPAHA1')} />
                    </TableCell>
                    <TableCell>
                      <ShuttleMap shuttle={shuttleLocations.find(shuttle => shuttle?.shuttleID === 'GAMPAHA2')} />
                    </TableCell>
                    <TableCell>
                      <ShuttleMap shuttle={shuttleLocations.find(shuttle => shuttle?.shuttleID === 'MALABE')} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>MORATUWA</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>WATTALA</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>NEGOMBO</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <ShuttleMap shuttle={shuttleLocations.find(shuttle => shuttle?.shuttleID === 'MORATUWA')} />
                    </TableCell>
                    <TableCell>
                      <ShuttleMap shuttle={shuttleLocations.find(shuttle => shuttle?.shuttleID === 'WATTALA')} />
                    </TableCell>
                    <TableCell>
                      <ShuttleMap shuttle={shuttleLocations.find(shuttle => shuttle?.shuttleID === 'NEGAMBO')} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const ShuttleMap = ({ shuttle }) => {
  const apiKey = "AIzaSyDHSsPvUNS84N5jUnEyt5xxzGYkkynf6TU";
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [mapZoom, setMapZoom] = useState(12);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          if (shuttle?.latitude && shuttle?.longitude) {
            adjustMapView({ lat: latitude, lng: longitude }, { lat: shuttle.latitude, lng: shuttle.longitude });
          }
        },
        (error) => console.error("Error getting user location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, [shuttle]);

  const adjustMapView = (user, shuttle) => {
    const latDiff = Math.abs(user.lat - shuttle.lat);
    const lngDiff = Math.abs(user.lng - shuttle.lng);
    
    // Dynamic zoom calculation (basic approximation)
    const newZoom = Math.max(10, 15 - Math.max(latDiff * 50, lngDiff * 50));

    // Center between user & shuttle
    setMapCenter({
      lat: (user.lat + shuttle.lat) / 2,
      lng: (user.lng + shuttle.lng) / 2
    });

    setMapZoom(newZoom);
  };

  return (
    <Box sx={{ height: '200px', width: '100%', borderRadius: '10px', overflow: 'hidden' }}>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={mapCenter}
          zoom={mapZoom}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {/* Shuttle Marker */}
          {shuttle?.latitude && shuttle?.longitude && (
            <Marker
              position={{ lat: shuttle.latitude, lng: shuttle.longitude }}
              icon={{
                url: busIconMap,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              label={shuttle.shuttleID}
            />
          )}

          {/* User Location Marker */}
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              label="You"
            />
          )}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
};


export default PaymentRecords;