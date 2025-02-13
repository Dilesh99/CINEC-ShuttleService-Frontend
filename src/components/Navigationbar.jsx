import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { authMethods } from '../backend/authMethods';

const Navigationbar = () => {

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const location = useLocation(); // Hook to access current path

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const logUserOut = async () => {
    try {
      const res = await authMethods.deleteToken();
      if(res){
        console.log(res);
        window.location.href = '/';
      }
    }
    catch {

    }
  }

  // Example logic to disable specific buttons
  const isBookingDisabled = false; // Set to true to disable the "BOOKING" button
  const isPaymentDisabled = false; // Set to true to disable the "PAYMENT" button
  const isProfileDisabled = false; // Set to true to disable the "Profile" button

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'primary.light', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={anchorElNav ? handleCloseNavMenu : handleOpenNavMenu} // Toggle menu
              color="secondary"
            >
              {anchorElNav ? <CloseIcon /> : <MenuIcon />} {/* Toggle icons */}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              disableScrollLock={true} // Allow scrolling while the menu is open
            >
              <MenuItem
                component={Link}
                to="/home"
                onClick={handleCloseNavMenu}
              >
                <Typography
                  textAlign="center"
                  color="secondary"
                  sx={{
                    borderBottom: location.pathname === '/home' ? '2px solid #D4790E' : 'none',
                  }}
                >
                  HOME
                </Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/booking"
                onClick={handleCloseNavMenu}
                disabled={isBookingDisabled}
              >
                <Typography
                  textAlign="center"
                  color="secondary"
                  sx={{
                    borderBottom: location.pathname === '/booking' ? '2px solid #D4790E' : 'none',
                  }}
                >
                  BOOKING
                </Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/payment"
                onClick={handleCloseNavMenu}
                disabled={isPaymentDisabled}
              >
                <Typography
                  textAlign="center"
                  color="secondary"
                  sx={{
                    borderBottom: location.pathname === '/payment' ? '2px solid #D4790E' : 'none',
                  }}
                >
                  SHUTTLE PASS
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Button
              component={Link}
              to="/home"
              sx={{
                my: 2,
                color: 'secondary.main',
                display: 'block',
                fontSize: '1rem',
                textTransform: 'none',
                mx: 2,
                borderBottom: location.pathname === '/home' ? '2px solid #F5A623' : 'none',
              }}
            >
              HOME
            </Button>
            <Button
              component={Link}
              to="/booking"
              sx={{
                my: 2,
                color: 'secondary.main',
                display: 'block',
                fontSize: '1rem',
                textTransform: 'none',
                mx: 2,
                borderBottom: location.pathname === '/booking' ? '2px solid #F5A623' : 'none',
              }}
              disabled={isBookingDisabled}
            >
              BOOKING
            </Button>
            <Button
              component={Link}
              to="/payment"
              sx={{
                my: 2,
                color: 'secondary.main',
                display: 'block',
                fontSize: '1rem',
                textTransform: 'none',
                mx: 2,
                borderBottom: location.pathname === '/payment' ? '2px solid #F5A623' : 'none',
              }}
              disabled={isPaymentDisabled}
            >
              SHUTTLE PASS
            </Button>
          </Box>

          {/* User Avatar and Settings Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              disableScrollLock={true} // Allow scrolling while the menu is open
            >
              <MenuItem
                component={Link}
                to="/profile"
                onClick={handleCloseUserMenu}
                disabled={isProfileDisabled}
              >
                <Typography textAlign="center" color="secondary.main">
                  Profile
                </Typography>
              </MenuItem>
              <MenuItem onClick={logUserOut}>
                <Typography textAlign="center" color="secondary.main">
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigationbar;
