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
  TextField
} from '@mui/material';
import {
  Menu,
  Search,
  People,
  DirectionsBus,
  AccountBalanceWallet,
  Person,
  Edit,
  Delete
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import cinecLogo from "/src/assets/cinec.png";
import { useNavigate } from 'react-router-dom';

import { StaffMethods } from '../backend/StaffMethods';
import { authMethods } from '../backend/authMethods';

const St = () => {
  const navigate = useNavigate();
  let ID = null;
  const hasRun = useRef(false);

  // Store the staff list here.
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      handleAuth();
      fetchAllStaff();
    }
  }, []);

  // Check if the user is authenticated and has the Admin role.
  const handleAuth = async () => {
    const res = await authMethods.refreshToken();
    if (res && res.accessToken && res.ID && res.role === "Admin") {
      ID = res.ID;
    } else {
      navigate("/");
    }
  };

  // Fetch all staff from the backend and store them in state.
  const fetchAllStaff = async () => {
    try {
      const staffData = await StaffMethods.getAllStaff();
      setStaff(staffData);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a staff member
  const deleteStaff = async (staffID) => {
    try {
      await StaffMethods.deleteStaff(staffID);
      setStaff(prev => prev.filter(staff => staff.staffID !== staffID));
    } catch (error) {
      console.error(error);
    }
  };

  // Update a staff member
  const updateStaff = async (staffID, username, email, phone_number, password) => {
    try {
      await StaffMethods.updateStaff(staffID, username, email, phone_number, password);
      setStaff(prev =>
        prev.map(staff =>
          staff.staffID === staffID
            ? { ...staff, username, email, phone_number }
            : staff
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle payment status
  const makeStaffPaid = async (staffID) => {
    try {
      await StaffMethods.makeStaffPaid(staffID);
      setStaff(prev =>
        prev.map(staff =>
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
      setStaff(prev =>
        prev.map(staff =>
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
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <div style={{ flexGrow: 1 }}>
        <Header handleDrawerToggle={handleDrawerToggle} />
        <MainContent
          staff={staff}
          updateStaff={updateStaff}
          deleteStaff={deleteStaff}
          makeStaffPaid={makeStaffPaid}
          makeStaffUnpaid={makeStaffUnpaid}
          refreshStaff={fetchAllStaff}
        />
      </div>
    </div>
  );
};

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedIndex, setSelectedIndex] = useState(2);
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
  staff,
  updateStaff,
  deleteStaff,
  makeStaffPaid,
  makeStaffUnpaid,
  refreshStaff
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
  makeStaffUnpaid
}) => {
  const [editingStaff, setEditingStaff] = useState(null);

  const handlePaymentToggle = (staffMember) => {
    if (staffMember.paymentStatus) {
      makeStaffUnpaid(staffMember.staffID);
    } else {
      makeStaffPaid(staffMember.staffID);
    }
  };

  const handleDelete = (staffID) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      deleteStaff(staffID);
    }
  };

  return (
    <Paper sx={{ padding: "16px", boxShadow: 3 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Staff Members
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone No.</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Staff ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Paid</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staff && staff.length > 0 ? (
              staff.map(staffMember => (
                <TableRow key={staffMember.staffID}>
                  <TableCell>{staffMember.username}</TableCell>
                  <TableCell>{staffMember.email}</TableCell>
                  <TableCell>{staffMember.phone_number}</TableCell>
                  <TableCell>{staffMember.staffID}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={staffMember.paymentStatus || false}
                      onChange={() => handlePaymentToggle(staffMember)}
                      color="primary"
                    />
                    {staffMember.paymentStatus ? "Paid" : "Not Paid"}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => setEditingStaff(staffMember)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(staffMember.staffID)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
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
              data.username,
              data.email,
              data.phone_number,
              editingStaff.password
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
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default St;