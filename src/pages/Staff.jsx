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
  Person,
  Edit,
  Delete,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import cinecLogo from '/src/assets/cinec.png';
import { useNavigate } from 'react-router-dom';

import { StaffMethods } from '../backend/StaffMethods';
import { authMethods } from '../backend/authMethods';
import { LocationMethods } from '../backend/LocationMethods';

const St = () => {
  const navigate = useNavigate();
  let ID = null;
  const [role, setRole] = useState('');
  const hasRun = useRef(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const [staff, setStaff] = useState([]);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      handleAuth();
      fetchAllStaff();
    }
  }, []);

  // Filter staff based on search query
  const filteredStaff = staff.filter((staffMember) =>
    staffMember.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staffMember.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staffMember.staffID.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query state
  };

  const handleAuth = async () => {
    const res = await authMethods.refreshToken();
    if (res && res.accessToken && res.ID && (res.role === 'Admin' || res.role === 'Cashier')) {
      ID = res.ID;
      setRole(res.role);
    } else {
      navigate('/');
    }
  };

  const fetchAllStaff = async () => {
    try {
      const staffData = await StaffMethods.getAllStaff();
      setStaff(staffData);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStaff = async (staffID) => {
    try {
      await StaffMethods.deleteStaff(staffID);
      setStaff((prev) => prev.filter((staff) => staff.staffID !== staffID));
    } catch (error) {
      console.error(error);
    }
  };

  const updateStaff = async (staffID, shuttleID, username, email, phone_number, password, paymentStatus, scannedStatus) => {
    try {
      await StaffMethods.updateStaff(staffID, shuttleID, username, email, phone_number, password, paymentStatus, scannedStatus);
      setStaff((prev) =>
        prev.map((staff) =>
          staff.staffID === staffID
            ? { ...staff, username, email, phone_number, shuttleID }
            : staff
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const makeStaffPaid = async (staffID) => {
    try {
      await StaffMethods.makeStaffPaid(staffID);
      setStaff((prev) =>
        prev.map((staff) =>
          staff.staffID === staffID ? { ...staff, paymentStatus: true } : staff
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const makeStaffUnpaid = async (staffID) => {
    try {
      await StaffMethods.makeStaffUnpaid(staffID);
      setStaff((prev) =>
        prev.map((staff) =>
          staff.staffID === staffID ? { ...staff, paymentStatus: false } : staff
        )
      );
    } catch (error) {
      console.error(error);
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
        <Header 
          handleDrawerToggle={handleDrawerToggle} 
          searchQuery={searchQuery} 
          onSearchChange={handleSearchChange} 
        />
        <MainContent
          staff={filteredStaff} // Pass filtered staff data
          updateStaff={updateStaff}
          deleteStaff={deleteStaff}
          makeStaffPaid={makeStaffPaid}
          makeStaffUnpaid={makeStaffUnpaid}
          refreshStaff={fetchAllStaff}
          role={role}
        />
      </div>
    </div>
  );
};

const Sidebar = ({ mobileOpen, handleDrawerToggle, role }) => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedIndex, setSelectedIndex] = useState(1);
  const navigate = useNavigate();

  const handleListItemClick = (index, route) => {
    setSelectedIndex(index);
    navigate(route);
  };

  const sidebarItems =
    role === 'Cashier'
      ? [
          { text: 'Students', route: '/students' },
          { text: 'Staff', route: '/staff' },
        ]
      : [
          { text: 'Dashboard', route: '/admindashboard' },
          { text: 'Students', route: '/students' },
          { text: 'Staff', route: '/staff' },
          { text: 'Cashiers, Shuttles & Drivers', route: '/shuttles' },
          { text: 'Payment Records', route: '/paymentRecords'},
          { text: 'Attendance Records', route: '/attendanceRecords'},
          { text: 'Shuttle locations', route: '/shuttleLocations'},
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
              color: selectedIndex === index ? 'white' : 'inherit',
              backgroundColor: selectedIndex === index ? 'secondary.light2' : 'inherit',
              '&:hover': {
                backgroundColor: selectedIndex === index ? 'secondary.light2' : 'white',
              },
            }}
          >
            <ListItemIcon sx={{ color: selectedIndex === index ? 'black' : 'inherit' }}>
              {item.text === 'Dashboard' ? (
                <People />
              ) : item.text === 'Students' ? (
                <Person />
              ) : item.text === 'Staff' ? (
                <People />
              ) : item.text === 'Cashiers, Shuttles & Drivers' ? (
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

const MainContent = ({
  staff,
  updateStaff,
  deleteStaff,
  makeStaffPaid,
  makeStaffUnpaid,
  refreshStaff,
  role,
}) => {
  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={2} sx={{ marginTop: '16px' }}>
        <Grid item xs={12} md={12}>
          <StaffList
            staff={staff}
            updateStaff={updateStaff}
            deleteStaff={deleteStaff}
            makeStaffPaid={makeStaffPaid}
            makeStaffUnpaid={makeStaffUnpaid}
            refreshStaff={refreshStaff}
            role={role}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const StaffList = ({
  staff,
  updateStaff,
  deleteStaff,
  makeStaffPaid,
  makeStaffUnpaid,
  role,
}) => {
  const [editingStaff, setEditingStaff] = useState(null);
  const [shuttles, setShuttles] = useState([]);

  useEffect(() => {
    const fetchShuttles = async () => {
      const shuttlesData = await LocationMethods.getAllShuttles();
      if (shuttlesData) {
        setShuttles(shuttlesData);
      }
    };
    fetchShuttles();
  }, []);

  const handleShuttleChange = async (staffMember, newShuttleID) => {
    await updateStaff(
      staffMember.staffID,
      newShuttleID,
      staffMember.username,
      staffMember.email,
      staffMember.phone_number,
      staffMember.password,
      staffMember.paymentStatus,
      staffMember.scannedStatus
    );
  };

  const handlePaymentToggle = (staffMember) => {
    if (staffMember.paymentStatus) {
      makeStaffUnpaid(staffMember.staffID);
    } else {
      makeStaffPaid(staffMember.staffID);
    }
  };

  const handleDelete = (staffID) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      deleteStaff(staffID);
    }
  };

  return (
    <Paper sx={{ padding: '16px', boxShadow: 3 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Staff Members
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Phone No.</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Staff ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Shuttle ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Paid</TableCell>
              {role === 'Admin' && <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {staff && staff.length > 0 ? (
              staff.map((staffMember) => (
                <TableRow key={staffMember.staffID}>
                  <TableCell>{staffMember.username}</TableCell>
                  <TableCell>{staffMember.email}</TableCell>
                  <TableCell>{staffMember.phone_number}</TableCell>
                  <TableCell>{staffMember.staffID}</TableCell>
                  <TableCell>
                    <Select
                      value={staffMember.shuttleID || 'undefined'}
                      onChange={(e) => handleShuttleChange(staffMember, e.target.value)}
                    >
                      <MenuItem value="undefined">Undefined</MenuItem>
                      {shuttles.map((shuttle) => (
                        <MenuItem key={shuttle.shuttleID} value={shuttle.shuttleID}>
                          {shuttle.shuttleID}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={staffMember.paymentStatus || false}
                      onChange={() => handlePaymentToggle(staffMember)}
                      color="primary"
                    />
                    {staffMember.paymentStatus ? 'Paid' : 'Not Paid'}
                  </TableCell>
                  {role === 'Admin' && (
                    <TableCell>
                      <IconButton onClick={() => setEditingStaff(staffMember)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(staffMember.staffID)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={role === 'Admin' ? 7 : 6} align="center">
                  No staff members found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {editingStaff && (
        <EditStaffDialog
          open={Boolean(editingStaff)}
          staff={editingStaff}
          onClose={() => setEditingStaff(null)}
          onSave={(data) => {
            updateStaff(
              editingStaff.staffID,
              editingStaff.shuttleID,
              data.username,
              data.email,
              data.phone_number,
              editingStaff.password,
              editingStaff.paymentStatus,
              editingStaff.scannedStatus
            );
            setEditingStaff(null);
          }}
        />
      )}
    </Paper>
  );
};

const EditStaffDialog = ({ open, onClose, staff, onSave }) => {
  const [formData, setFormData] = useState({
    username: staff ? staff.username : '',
    email: staff ? staff.email : '',
    phone_number: staff ? staff.phone_number : '',
  });

  useEffect(() => {
    if (staff) {
      setFormData({
        username: staff.username,
        email: staff.email,
        phone_number: staff.phone_number,
      });
    }
  }, [staff]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Staff Member</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Staff ID"
          value={staff ? staff.staffID : ''}
          fullWidth
          disabled
        />
        <TextField
          autoFocus
          margin="dense"
          name="username"
          label="Name"
          value={formData.username}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="phone_number"
          label="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Password"
          value={staff ? staff.password : ''}
          fullWidth
          disabled
          type="password"
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

export default St;