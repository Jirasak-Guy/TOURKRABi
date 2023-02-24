import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography, ThemeProvider, createTheme, Button, Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignupPopup from "./signupform";
import LoginPopup from "./loginform";

function TourAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorNav, setAnchorNav] = useState(false);
  const navigate = useNavigate();
  const [windowwidth, setWindowwidth] = useState(window.innerWidth);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const isPC = (windowwidth >= 830) ? true : false

  const Theme = createTheme({
    palette: {
      primary: {
        main: '#0194F3',
      },
    },
  });

  useEffect(() => {
    function handleWindowResize() {
      setWindowwidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  const handleCloseSignup = () => {
    setShowSignup(false);
  };

  const handleSignupLinkClick = () => {
    setShowLogin(false);
    setShowSignup(true);
  }

  const handleLoginLinkClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  }

  return (
    <ThemeProvider theme={Theme}>
      <AppBar position="sticky" color="primary">
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: 'rgba(1, 148, 243, .9)',
              color: 'white'
            }
          }}
          anchor='left'
          open={anchorNav}
          onClose={() => setAnchorNav(false)}
        >
          <Divider />
          <List>
            <ListItem>
              <ListItemButton onClick={() => navigate('/')}>
                <ListItemIcon>
                  <img src='../HomeIcon.png' width={'30'} />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => navigate('/onedaytrip')}>
                <ListItemIcon>
                  <img src='../OneDayTripIcon.png' width={'30'} />
                </ListItemIcon>
                <ListItemText primary="One Day Trip" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => navigate('/package')}>
                <ListItemIcon>
                  <img src='../PackageIcon.png' width={'30'} />
                </ListItemIcon>
                <ListItemText primary="Package" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => navigate('/booking')}>
                <ListItemIcon>
                  <img src='../BookingIcon.png' width={'30'} />
                </ListItemIcon>
                <ListItemText primary="Booking" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Box>
              {isPC ?
                <Box>
                  <Button
                    size="large"
                    aria-label="logo"
                    onClick={() => navigate('/')}
                    color="inherit"
                  >
                    <img src="../applogo.png" alt="(AppIcon)" width={"168.15"} height={"33.3"} />
                  </Button>
                  <Button
                    size="large"
                    aria-label="Home Button"
                    onClick={() => navigate('/')}
                    color="inherit"
                  >
                    <img src="../HomeIcon.png" alt="(HomeIcon)" width={"33.3"} height={"33.3"} />
                    &nbsp;Home
                  </Button>
                  <Button
                    size="large"
                    aria-label="One Day Trip Button"
                    onClick={() => navigate('/onedaytrip')}
                    color="inherit"
                  >
                    <img src="../OneDayTripIcon.png" alt="(OneDayTripIcon)" width={"33.3"} height={"33.3"} />
                    &nbsp;One Day Trip
                  </Button>
                  <Button
                    size="large"
                    aria-label="Package Button"
                    onClick={() => navigate('/package')}
                    color="inherit"
                  >
                    <img src="../PackageIcon.png" alt="(PackageIcon)" width={"33.3"} height={"33.3"} />
                    &nbsp;Package
                  </Button>
                  <Button
                    size="large"
                    aria-label="Booking Button"
                    onClick={() => navigate('/booking')}
                    color="inherit"
                  >
                    <img src="../BookingIcon.png" alt="(BookingIcon)" width={"33.3"} height={"33.3"} />
                    &nbsp;Booking
                  </Button>
                </Box>
                :
                <Box>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => setAnchorNav(true)}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Button
                    size="large"
                    aria-label="logo"
                    onClick={() => navigate('/')}
                    color="inherit"
                  >
                    <img src="../applogo.png" alt="(AppIcon)" width={"134.52"} height={"26.64"} />
                  </Button>
                </Box>}
            </Box>
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleLoginClick}>Log in</MenuItem>
            {showLogin && <LoginPopup onClose={handleCloseLogin} onSignupLinkClick={handleSignupLinkClick} />}
            <MenuItem onClick={handleSignupClick}>Sign up</MenuItem>
            {showSignup && <SignupPopup onClose={handleCloseSignup} onLoginLinkClick={handleLoginLinkClick} />}
          </Menu>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default TourAppBar; 