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
  Dashboard,
  EventAvailable,
  Edit,
  Delete
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import cinecLogo from "/src/assets/cinec.png";

import { LocationMethods } from '../backend/LocationMethods';
import { DriverMethods } from '../backend/DriverMethods';
import { CashierMethods } from '../backend/CashierMethods';
import { authMethods } from '../backend/authMethods';

const Shu = () => {
  const navigate = useNavigate();
  let ID = null;
  const hasRun = useRef(false);

  // Error state for displaying error messages gracefully
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [shuttles, setShuttles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [cashiers, setCashiers] = useState([]);

  const [filteredShuttles, setFilteredShuttles] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [filteredCashiers, setFilteredCashiers] = useState([]);

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorMessage('');
  };

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      handleAuth();
      fetchAllData();
    }
  }, []);

  const filterData = (query) => {
    const lowerQuery = query.toLowerCase();

    setFilteredShuttles(shuttles.filter(s =>
      s.shuttleID.toLowerCase().includes(lowerQuery) ||
      s.vehicleNumber.toLowerCase().includes(lowerQuery)
    ));

    setFilteredDrivers(drivers.filter(d =>
      d.username.toLowerCase().includes(lowerQuery) ||
      d.driverID.toLowerCase().includes(lowerQuery) ||
      d.shuttleID.toLowerCase().includes(lowerQuery)
    ));

    setFilteredCashiers(cashiers.filter(c =>
      c.username.toLowerCase().includes(lowerQuery) ||
      c.cashierID.toLowerCase().includes(lowerQuery) ||
      c.email.toLowerCase().includes(lowerQuery)
    ));
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterData(query);
  };

  const fetchAllData = async () => {
    try {
      const [shuttlesData, driversData, cashiersData] = await Promise.all([
        LocationMethods.getAllShuttles(),
        DriverMethods.getAllDrivers(),
        CashierMethods.getAllCashier()
      ]);

      setShuttles(shuttlesData);
      setDrivers(driversData);
      setCashiers(cashiersData);

      setFilteredShuttles(shuttlesData);
      setFilteredDrivers(driversData);
      setFilteredCashiers(cashiersData);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to fetch data");
    }
  };

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
  const addDriver = async (driverID, shuttleID, username, phone_number, password) => {
    try {
      await DriverMethods.updateDriver(driverID, shuttleID, username, phone_number, password);
      fetchAllDrivers();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to add driver.");
    }
  };

  const updateDriver = async (driverID, shuttleID, username, phone_number, password) => {
    try {
      await DriverMethods.updateDriver(driverID, shuttleID, username, phone_number, password);
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

  const fetchAllCashiers = async () => {
    try {
      const cashiersData = await CashierMethods.getAllCashier();
      setCashiers(cashiersData);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to fetch cashiers.");
    }
  };

  // Add a new cashier
  const addCashier = async (cashierID, username, email, phone_number, password) => {
    try {
      await CashierMethods.updateCashier(cashierID, username, email, phone_number, password);
      fetchAllCashiers();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to add cashier.");
    }
  };

  // Update an existing cashier
  const updateCashier = async (cashierID, username, email, phone_number, password) => {
    try {
      await CashierMethods.updateCashier(cashierID, username, email, phone_number, password);
      fetchAllCashiers();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update cashier.");
    }
  };

  // Delete a cashier
  const deleteCashier = async (cashierID) => {
    try {
      await CashierMethods.deleteCashier(cashierID);
      setCashiers(prev => prev.filter(c => c.cashierID !== cashierID));
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to delete cashier.");
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
          <Header
            handleDrawerToggle={handleDrawerToggle}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
          <MainContent
            shuttles={filteredShuttles}
            drivers={filteredDrivers}
            cashiers={filteredCashiers} // Pass cashiers to MainContent
            addShuttle={addShuttle}
            updateShuttle={updateShuttle}
            deleteShuttle={deleteShuttle}
            addDriver={addDriver}
            updateDriver={updateDriver}
            deleteDriver={deleteDriver}
            addCashier={addCashier} // Pass cashier methods
            updateCashier={updateCashier}
            deleteCashier={deleteCashier}
            refreshShuttles={fetchAllShuttles}
            refreshDrivers={fetchAllDrivers}
            refreshCashiers={fetchAllCashiers} // Pass refresh function
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
          { text: 'Cashiers, Shuttles & Drivers', route: '/shuttles' },
          { text: 'Payment Records', route: '/paymentRecords' },
          { text: 'Attendance Records', route: '/attendanceRecords' },
          { text: 'Shuttle locations', route: '/shuttleLocations' },
        ].map((item, index) => (
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
              {index === 0 ? <Dashboard /> : index === 1 ? <Person /> : index === 2 ? <Person /> : index === 3 ? <People /> : index === 4? <AccountBalanceWallet/> : index === 5? <EventAvailable/> : index === 6? <DirectionsBus />: <Person/>}
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
        <Typography variant="h6">Cashiers, Shuttles & Drivers</Typography>
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

const MainContent = ({
  shuttles,
  drivers,
  cashiers,
  addShuttle,
  updateShuttle,
  deleteShuttle,
  addDriver,
  updateDriver,
  deleteDriver,
  addCashier,
  updateCashier,
  deleteCashier,
  refreshShuttles,
  refreshDrivers,
  refreshCashiers,
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
        <Grid item xs={12}>
          <CashiersTable
            cashiers={cashiers}
            addCashier={addCashier}
            updateCashier={updateCashier}
            deleteCashier={deleteCashier}
            refreshCashiers={refreshCashiers}
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
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Vehicle Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
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
              <TableCell sx={{ fontWeight: 'bold' }}>Shuttle</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Driver Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
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
        onSave={(driverID, shuttleID, username, phone_number, password) => {
          addDriver(driverID, shuttleID, username, phone_number, password);
          setAddingDriver(false);
        }}
      />
      {editingDriver && (
        <EditDriverDialog
          open={Boolean(editingDriver)}
          driver={editingDriver}
          shuttles={shuttles}
          onClose={() => setEditingDriver(null)}
          onSave={(driverID, shuttleID, username, phone_number, password) => {
            updateDriver(driverID, shuttleID, username, phone_number, password);
            setEditingDriver(null);
          }}
        />
      )}
    </Paper>
  );
};

const CashiersTable = ({ cashiers, addCashier, updateCashier, deleteCashier }) => {
  const [editingCashier, setEditingCashier] = useState(null);
  const [addingCashier, setAddingCashier] = useState(false);

  const handleDelete = (cashierID) => {
    if (window.confirm("Are you sure you want to delete this cashier?")) {
      deleteCashier(cashierID);
    }
  };

  return (
    <Paper sx={{ padding: "16px", boxShadow: 3, marginBottom: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Cashiers</Typography>
        <Button variant="contained" onClick={() => setAddingCashier(true)}>
          Add Cashier
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Cashier ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cashiers && cashiers.length > 0 ? (
              cashiers.map((cashier) => (
                <TableRow key={cashier.cashierID}>
                  <TableCell>{cashier.cashierID}</TableCell>
                  <TableCell>{cashier.username}</TableCell>
                  <TableCell>{cashier.email}</TableCell>
                  <TableCell>{cashier.phone_number}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => setEditingCashier(cashier)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(cashier.cashierID)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No cashiers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <AddCashierDialog
        open={addingCashier}
        onClose={() => setAddingCashier(false)}
        onSave={(cashierID, username, email, phone_number, password) => {
          addCashier(cashierID, username, email, phone_number, password);
          setAddingCashier(false);
        }}
      />
      {editingCashier && (
        <EditCashierDialog
          open={Boolean(editingCashier)}
          cashier={editingCashier}
          onClose={() => setEditingCashier(null)}
          onSave={(cashierID, username, email, phone_number, password) => {
            updateCashier(cashierID, username, email, phone_number, password);
            setEditingCashier(null);
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
  const [driverID, setDriverID] = useState('');
  const [password, setPassword] = useState('');
  const [shuttleID, setShuttleID] = useState('');
  const [username, setUsername] = useState('');
  const [phone_number, setPhoneNumber] = useState('');

  const handleSave = () => {
    onSave(driverID, shuttleID, username, phone_number, password);
    setDriverID('');
    setPassword('');
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
          autoFocus
          margin="dense"
          label="Driver ID"
          fullWidth
          required
          value={driverID}
          onChange={(e) => setDriverID(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
    // Pass driverID, password (from the driver object), and other fields to onSave
    onSave(driver.driverID, shuttleID, username, phone_number, driver.password);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Driver</DialogTitle>
      <DialogContent>
        {/* Display Driver ID (non-editable) */}
        <TextField
          margin="dense"
          label="Driver ID"
          fullWidth
          value={driver?.driverID || ''}
          disabled
        />
        {/* Display Password (non-editable, masked) */}
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value="********" // Placeholder to indicate password is not editable
          disabled
        />
        {/* Shuttle Selection */}
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
        {/* Driver Name */}
        <TextField
          margin="dense"
          label="Driver Name"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* Phone Number */}
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

const AddCashierDialog = ({ open, onClose, onSave }) => {
  const [cashierID, setCashierID] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    onSave(cashierID, username, email, phone_number, password);
    setCashierID('');
    setUsername('');
    setEmail('');
    setPhoneNumber('');
    setPassword('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Cashier</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Cashier ID"
          fullWidth
          value={cashierID}
          onChange={(e) => setCashierID(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          fullWidth
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

const EditCashierDialog = ({ open, onClose, cashier, onSave }) => {
  const [username, setUsername] = useState(cashier?.username || '');
  const [email, setEmail] = useState(cashier?.email || '');
  const [phone_number, setPhoneNumber] = useState(cashier?.phone_number || '');

  useEffect(() => {
    if (cashier) {
      setUsername(cashier.username);
      setEmail(cashier.email);
      setPhoneNumber(cashier.phone_number);
    }
  }, [cashier]);

  const handleSave = () => {
    onSave(cashier.cashierID, username, email, phone_number, cashier.password);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Cashier</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Cashier ID"
          fullWidth
          value={cashier?.cashierID || ''}
          disabled
        />
        <TextField
          margin="dense"
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
