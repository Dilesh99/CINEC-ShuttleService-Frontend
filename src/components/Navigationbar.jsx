import { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
import { Link } from 'react-router-dom';

const pages = [
  { name: 'HOME', path: '/home' },
  { name: 'BOOKING', path: '/booking' },
  { name: 'PAYMENT', path: '/payment' },
  { name: 'NOTIFICATION', path: '/notification' }
];
const settings = [
  { name: 'Profile', path: '/profile' },
  { name: 'Logout', path: '/SignIn' }
];

const Navigationbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  
  const location = useLocation(); // Hook to access current path

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // Example logic to disable specific buttons
  const isBookingDisabled = true; // Set to true to disable the "BOOKING" button
  const isPaymentDisabled = true; // Set to true to disable the "PAYMENT" button

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
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  disabled={page.name === 'BOOKING' && isBookingDisabled || page.name === 'PAYMENT' && isPaymentDisabled}
                >
                  <Typography
                    textAlign="center"
                    color="secondary"
                    sx={{
                      borderBottom:
                        (location.pathname === page.path || (page.name === 'HOME' && location.pathname === '/'))
                          ? '2px solid #D4790E'
                          : 'none' // Underline for active page
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'secondary.main',
                  display: 'block',
                  fontSize: '1rem',
                  textTransform: 'none',
                  mx: 2,
                  borderBottom:
                    (location.pathname === page.path || (page.name === 'HOME' && location.pathname === '/'))
                      ? '2px solid #F5A623'
                      : 'none', // Underline for active page or root for HOME
                }}
                disabled={
                  (page.name === 'BOOKING' && isBookingDisabled) ||
                  (page.name === 'PAYMENT' && isPaymentDisabled)
                } // Disable condition
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* User Avatar and Settings Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  component={Link}
                  to={setting.path}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center" color="secondary.main">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigationbar;

