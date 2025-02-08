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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Menu,
  Person,
  Search,
  People,
  DirectionsBus,
  AccountBalanceWallet,
  Edit,
  Delete
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import cinecLogo from "/src/assets/cinec.png";

import { LocationMethods } from '../backend/LocationMethods';
import { DriverMethods } from '../backend/DriverMethods';
import { authMethods } from '../backend/authMethods';

const Shu = () => {
  const navigate = useNavigate();
  let ID = null;
  const hasRun = useRef(false);

  // Error state for displaying error messages gracefully
  const [errorMessage, setErrorMessage] = useState('');
  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorMessage('');
  };

  const [shuttles, setShuttles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      handleAuth();
      fetchAllShuttles();
      fetchAllDrivers();
    }
  }, []);

  const handleAuth = async () => {
    try {
      const res = await authMethods.refreshToken();
      if (res && res.accessToken && res.ID && res.role === "Admin") {
        ID = res.ID;
      } else {
        setErrorMessage("Authentication failed. Redirecting to login.");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Authentication failed. Please login again.");
      navigate("/");
    }
  };

  const fetchAllShuttles = async () => {
    try {
      const shuttlesData = await LocationMethods.getAllShuttles();
      setShuttles(shuttlesData);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to fetch shuttles.");
    }
  };

  const fetchAllDrivers = async () => {
    try {
      const driversData = await DriverMethods.getAllDrivers();
      setDrivers(driversData);
    } catch (error) {
      console.error(error);
      if (error.message && error.message.includes('CORS')) {
        setErrorMessage("CORS error: Unable to fetch drivers. Please check your API CORS settings.");
      } else {
        setErrorMessage("Failed to fetch drivers.");
      }
    }
  };

  // Shuttle CRUD operations
  const addShuttle = async (shuttleID, vehicleNumber) => {
    try {
      await LocationMethods.updateShuttle(shuttleID, vehicleNumber);
      fetchAllShuttles();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to add shuttle.");
    }
  };

  const updateShuttle = async (shuttleID, vehicleNumber) => {
    try {
      await LocationMethods.updateShuttle(shuttleID, vehicleNumber);
      fetchAllShuttles();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update shuttle.");
    }
  };

  const deleteShuttle = async (shuttleID) => {
    try {
      await LocationMethods.deleteShuttle(shuttleID);
      setShuttles(prev => prev.filter(s => s.shuttleID !== shuttleID));
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to delete shuttle.");
    }
  };

  // Driver CRUD operations
  const addDriver = async (shuttleID, username, phone_number) => {
    try {
      await DriverMethods.addDriver(shuttleID, username, phone_number);
      fetchAllDrivers();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to add driver.");
    }
  };

  const updateDriver = async (driverID, shuttleID, username, phone_number) => {
    try {
      await DriverMethods.updateDriver(driverID, shuttleID, username, phone_number);
      fetchAllDrivers();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update driver.");
    }
  };

  const deleteDriver = async (driverID) => {
    try {
      await DriverMethods.deleteDriver(driverID);
      setDrivers(prev => prev.filter(d => d.driverID !== driverID));
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to delete driver.");
    }
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <div style={{ flexGrow: 1 }}>
          <Header handleDrawerToggle={handleDrawerToggle} />
          <MainContent
            shuttles={shuttles}
            drivers={drivers}
            addShuttle={addShuttle}
            updateShuttle={updateShuttle}
            deleteShuttle={deleteShuttle}
            addDriver={addDriver}
            updateDriver={updateDriver}
            deleteDriver={deleteDriver}
            refreshShuttles={fetchAllShuttles}
            refreshDrivers={fetchAllDrivers}
          />
        </div>
      </div>

      {/* Error Snackbar */}
      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedIndex, setSelectedIndex] = useState(3);
  const navigate = useNavigate();

  const handleListItemClick = (index, route) => {
    setSelectedIndex(index);
    navigate(route);
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '16px', alignSelf: 'center' }}>
        <img src={cinecLogo} alt="logo" width={60} height={60} />
      </div>
      <List>
        {[
          { text: 'Dashboard', route: '/admindashboard' },
          { text: 'Students', route: '/students' },
          { text: 'Staff', route: '/staff' },
          { text: 'Shuttles & Drivers', route: '/shuttles' },
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
              {index === 0 ? <People /> : index === 1 ? <Person /> : index === 2 ? <People /> : index === 3 ? <DirectionsBus /> : <AccountBalanceWallet />}
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
    width: '50%',
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
        <Typography variant="h6">Dashboard</Typography>
        <SearchBar>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            startAdornment={<Search sx={{ position: 'absolute', left: '10px' }} />}
          />
        </SearchBar>
      </Toolbar>
    </AppBar>
  );
};

const MainContent = ({
  shuttles,
  drivers,
  addShuttle,
  updateShuttle,
  deleteShuttle,
  addDriver,
  updateDriver,
  deleteDriver,
  refreshShuttles,
  refreshDrivers,
}) => {
  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={2} sx={{ marginTop: '16px' }}>
        <Grid item xs={12} md={6}>
          <ShuttlesTable
            shuttles={shuttles}
            addShuttle={addShuttle}
            updateShuttle={updateShuttle}
            deleteShuttle={deleteShuttle}
            refreshShuttles={refreshShuttles}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DriversTable
            drivers={drivers}
            shuttles={shuttles}
            addDriver={addDriver}
            updateDriver={updateDriver}
            deleteDriver={deleteDriver}
            refreshDrivers={refreshDrivers}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const ShuttlesTable = ({ shuttles, addShuttle, updateShuttle, deleteShuttle }) => {
  const [editingShuttle, setEditingShuttle] = useState(null);
  const [addingShuttle, setAddingShuttle] = useState(false);

  const handleDelete = (shuttleID) => {
    if (window.confirm("Are you sure you want to delete this shuttle?")) {
      deleteShuttle(shuttleID);
    }
  };

  return (
    <Paper sx={{ padding: "16px", boxShadow: 3, marginBottom: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Shuttles</Typography>
        <Button variant="contained" onClick={() => setAddingShuttle(true)}>
          Add Shuttle
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Vehicle Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shuttles && shuttles.length > 0 ? (
              shuttles.map((shuttle) => (
                <TableRow key={shuttle.shuttleID}>
                  <TableCell>{shuttle.shuttleID}</TableCell>
                  <TableCell>{shuttle.vehicleNumber}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => setEditingShuttle(shuttle)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(shuttle.shuttleID)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No shuttles found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <AddShuttleDialog
        open={addingShuttle}
        onClose={() => setAddingShuttle(false)}
        onSave={(shuttleID, vehicleNumber) => {
          addShuttle(shuttleID, vehicleNumber);
          setAddingShuttle(false);
        }}
      />
      {editingShuttle && (
        <EditShuttleDialog
          open={Boolean(editingShuttle)}
          shuttle={editingShuttle}
          onClose={() => setEditingShuttle(null)}
          onSave={(shuttleID, vehicleNumber) => {
            updateShuttle(shuttleID, vehicleNumber);
            setEditingShuttle(null);
          }}
        />
      )}
    </Paper>
  );
};

const DriversTable = ({ drivers, shuttles, addDriver, updateDriver, deleteDriver }) => {
  const [editingDriver, setEditingDriver] = useState(null);
  const [addingDriver, setAddingDriver] = useState(false);

  const handleDelete = (driverID) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      deleteDriver(driverID);
    }
  };

  return (
    <Paper sx={{ padding: "16px", boxShadow: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Drivers</Typography>
        <Button variant="contained" onClick={() => setAddingDriver(true)}>
          Add Driver
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Shuttle</TableCell>
              <TableCell>Driver Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers && drivers.length > 0 ? (
              drivers.map((driver) => (
                <TableRow key={driver.driverID}>
                  <TableCell>{driver.shuttleID}</TableCell>
                  <TableCell>{driver.username}</TableCell>
                  <TableCell>{driver.phone_number}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => setEditingDriver(driver)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(driver.driverID)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No drivers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <AddDriverDialog
        open={addingDriver}
        shuttles={shuttles}
        onClose={() => setAddingDriver(false)}
        onSave={(shuttleID, username, phone_number) => {
          addDriver(shuttleID, username, phone_number);
          setAddingDriver(false);
        }}
      />
      {editingDriver && (
        <EditDriverDialog
          open={Boolean(editingDriver)}
          driver={editingDriver}
          shuttles={shuttles}
          onClose={() => setEditingDriver(null)}
          onSave={(driverID, shuttleID, username, phone_number) => {
            updateDriver(driverID, shuttleID, username, phone_number);
            setEditingDriver(null);
          }}
        />
      )}
    </Paper>
  );
};

const AddShuttleDialog = ({ open, onClose, onSave }) => {
  const [shuttleID, setShuttleID] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');

  const handleSave = () => {
    onSave(shuttleID, vehicleNumber);
    setShuttleID('');
    setVehicleNumber('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Shuttle</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Shuttle ID"
          fullWidth
          value={shuttleID}
          onChange={(e) => setShuttleID(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Vehicle Number"
          fullWidth
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const EditShuttleDialog = ({ open, onClose, shuttle, onSave }) => {
  const [vehicleNumber, setVehicleNumber] = useState(shuttle?.vehicleNumber || '');

  useEffect(() => {
    if (shuttle) {
      setVehicleNumber(shuttle.vehicleNumber);
    }
  }, [shuttle]);

  const handleSave = () => {
    onSave(shuttle.shuttleID, vehicleNumber);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Shuttle</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Shuttle ID"
          value={shuttle?.shuttleID || ''}
          fullWidth
          disabled
        />
        <TextField
          margin="dense"
          label="Vehicle Number"
          fullWidth
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AddDriverDialog = ({ open, onClose, onSave, shuttles }) => {
  const [shuttleID, setShuttleID] = useState('');
  const [username, setUsername] = useState('');
  const [phone_number, setPhoneNumber] = useState('');

  const handleSave = () => {
    onSave(shuttleID, username, phone_number);
    setShuttleID('');
    setUsername('');
    setPhoneNumber('');
  };

  const safeShuttles = Array.isArray(shuttles) ? shuttles : [];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Driver</DialogTitle>
      <DialogContent>
        <Select
          value={shuttleID}
          onChange={(e) => setShuttleID(e.target.value)}
          fullWidth
          margin="dense"
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select Shuttle
          </MenuItem>
          {safeShuttles.map((shuttle) => (
            <MenuItem key={shuttle.shuttleID} value={shuttle.shuttleID}>
              {shuttle.shuttleID}
            </MenuItem>
          ))}
        </Select>
        <TextField
          margin="dense"
          label="Driver Name"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          fullWidth
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const EditDriverDialog = ({ open, onClose, driver, shuttles, onSave }) => {
  const [shuttleID, setShuttleID] = useState(driver?.shuttleID || '');
  const [username, setUsername] = useState(driver?.username || '');
  const [phone_number, setPhoneNumber] = useState(driver?.phone_number || '');

  useEffect(() => {
    if (driver) {
      setShuttleID(driver.shuttleID);
      setUsername(driver.username);
      setPhoneNumber(driver.phone_number);
    }
  }, [driver]);

  const handleSave = () => {
    onSave(driver.driverID, shuttleID, username, phone_number);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Driver</DialogTitle>
      <DialogContent>
        <Select
          value={shuttleID}
          onChange={(e) => setShuttleID(e.target.value)}
          fullWidth
          margin="dense"
        >
          {Array.isArray(shuttles) && shuttles.map((shuttle) => (
            <MenuItem key={shuttle.shuttleID} value={shuttle.shuttleID}>
              {shuttle.shuttleID}
            </MenuItem>
          ))}
        </Select>
        <TextField
          margin="dense"
          label="Driver Name"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          fullWidth
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Shu;
