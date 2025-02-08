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

import { StuMethods } from '../backend/StuMethods';
import { authMethods } from '../backend/authMethods';

const St = () => {
  const navigate = useNavigate();
  let ID = null;
  const hasRun = useRef(false);

  // Store the students list here.
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      handleAuth();
      fetchAllStudents();
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

  // Fetch all students from the backend and store them in state.
  const fetchAllStudents = async () => {
    try {
      const studentsData = await StuMethods.getAllStudents();
      // Assume studentsData is an array of student objects.
      setStudents(studentsData);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a student, then remove that student from state.
  const deleteStudent = async (studentsID) => {
    try {
      await StuMethods.deleteStudent(studentsID);
      setStudents(prev => prev.filter(student => student.studentsID !== studentsID));
    } catch (error) {
      console.error(error);
    }
  };

  // Update a student (note that studentsID is the primary key and is not changed).
  const updateStudent = async (studentsID, username, email, phone_number, password) => {
    try {
      await StuMethods.updateStudent(studentsID, username, email, phone_number, password);
      // Update the student’s data in state.
      setStudents(prev =>
        prev.map(student =>
          student.studentsID === studentsID
            ? { ...student, username, email, phone_number }
            : student
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle the student’s payment status.
  const makeStudentPaid = async (studentsID) => {
    try {
      await StuMethods.makeStudentPaid(studentsID);
      setStudents(prev =>
        prev.map(student =>
          student.studentsID === studentsID ? { ...student, paymentStatus: true } : student
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const makeStudentUnpaid = async (studentsID) => {
    try {
      await StuMethods.makeStudentUnpaid(studentsID);
      setStudents(prev =>
        prev.map(student =>
          student.studentsID === studentsID ? { ...student, paymentStatus: false } : student
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
          students={students}
          updateStudent={updateStudent}
          deleteStudent={deleteStudent}
          makeStudentPaid={makeStudentPaid}
          makeStudentUnpaid={makeStudentUnpaid}
          refreshStudents={fetchAllStudents}
        />
      </div>
    </div>
  );
};

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedIndex, setSelectedIndex] = useState(1);
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
  students,
  updateStudent,
  deleteStudent,
  makeStudentPaid,
  makeStudentUnpaid,
  refreshStudents
}) => {
  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={2} sx={{ marginTop: '16px' }}>
        <Grid item xs={12} md={12}>
          <RecentPayments
            students={students}
            updateStudent={updateStudent}
            deleteStudent={deleteStudent}
            makeStudentPaid={makeStudentPaid}
            makeStudentUnpaid={makeStudentUnpaid}
            refreshStudents={refreshStudents}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const RecentPayments = ({
  students,
  updateStudent,
  deleteStudent,
  makeStudentPaid,
  makeStudentUnpaid
}) => {
  // This state controls which student (if any) is being edited.
  const [editingStudent, setEditingStudent] = useState(null);

  const handlePaymentToggle = (student) => {
    if (student.paymentStatus) {
      makeStudentUnpaid(student.studentsID);
    } else {
      makeStudentPaid(student.studentsID);
    }
  };

  const handleDelete = (studentsID) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      deleteStudent(studentsID);
    }
  };

  return (
    <Paper sx={{ padding: "16px", boxShadow: 3 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Students
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone No.</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Student ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Paid</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students && students.length > 0 ? (
              students.map(student => (
                <TableRow key={student.studentsID}>
                  <TableCell>{student.username}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone_number}</TableCell>
                  <TableCell>{student.studentsID}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={student.paymentStatus || false}
                      onChange={() => handlePaymentToggle(student)}
                      color="primary"
                    />
                    {student.paymentStatus ? "Paid" : "Not Paid"}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => setEditingStudent(student)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(student.studentsID)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Render the edit dialog if a student is being edited */}
      {editingStudent && (
        <EditStudentDialog
          open={Boolean(editingStudent)}
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onSave={(data) => {
            // Call the update function; note that the student ID is not editable.
            updateStudent(
              editingStudent.studentsID,
              data.username,
              data.email,
              data.phone_number,
              editingStudent.password
            );
            setEditingStudent(null);
          }}
        />
      )}
    </Paper>
  );
};

const EditStudentDialog = ({ open, onClose, student, onSave }) => {
  // Local state to hold the form values.
  const [formData, setFormData] = useState({
    username: student ? student.username : '',
    email: student ? student.email : '',
    phone_number: student ? student.phone_number : '',
  });

  // When the student prop changes (i.e. a new student is being edited),
  // initialize the form data accordingly.
  useEffect(() => {
    if (student) {
      setFormData({
        username: student.username,
        email: student.email,
        phone_number: student.phone_number,
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    // Remember: the student ID is not modifiable.
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Student</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Student ID"
          value={student ? student.studentsID : ''}
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
          value={student ? student.password : ''}
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
