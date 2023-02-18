import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography, ThemeProvider, createTheme, Button, Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Menu as MenuIcon, AccountCircle, ChevronLeft, Home, Campaign } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TourAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorNav, setAnchorNav] = useState(false);
  const navigate = useNavigate();

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const Theme = createTheme({
    palette: {
      primary: {
        main: '#0194F3',
      },
    },
  });

  //mock
  const ismobile = false;
  const ispc = !ismobile;

  return (
    <ThemeProvider theme={Theme}>
      <AppBar position="sticky" color="primary">
      <Drawer
        anchor='left'
        open={anchorNav}
        onClose={() => setAnchorNav(false)}
      >
        <IconButton onClick={() => setAnchorNav(false)}>
          <ChevronLeft />
        </IconButton>
        <Divider />
        <List>
          <ListItem>
            <ListItemButton onClick={() => navigate('/home')}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => navigate('/announcement')}>
              <ListItemIcon>
                <Campaign />
              </ListItemIcon>
              <ListItemText primary="Announcement" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Box>
              {ismobile && <Box>
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
                  onClick={() => navigate('/home')}
                  color="inherit"
                >
                  <img src="applogo.png" alt="(HomeIcon)" width={"168.15"} height={"33.3"} />
                </Button>
              </Box>}
              {ispc && <Box>
                <Button
                  size="large"
                  aria-label="logo"
                  onClick={() => navigate('/home')}
                  color="inherit"
                >
                  <img src="applogo.png" alt="(HomeIcon)" width={"168.15"} height={"33.3"} />
                </Button>
                <Button
                  size="large"
                  aria-label="Home Button"
                  onClick={() => navigate('/home')}
                  color="inherit"
                >
                  <img src="HomeIcon.png" alt="(HomeIcon)" width={"33.3"} height={"33.3"} />
                  &nbsp;Home
                </Button>
                <Button
                  size="large"
                  aria-label="One Day Trip Button"
                  onClick={() => navigate('/onedaytrip')}
                  color="inherit"
                >
                  <img src="OneDayTripIcon.png" alt="(OneDayTripIcon)" width={"33.3"} height={"33.3"} />
                  &nbsp;One Day Trip
                </Button>
                <Button
                  size="large"
                  aria-label="Package Button"
                  onClick={() => navigate('/package')}
                  color="inherit"
                >
                  <img src="PackageIcon.png" alt="(PackageIcon)" width={"33.3"} height={"33.3"} />
                  &nbsp;Package
                </Button>
                <Button
                  size="large"
                  aria-label="Booking Button"
                  onClick={() => navigate('/booking')}
                  color="inherit"
                >
                  <img src="BookingIcon.png" alt="(BookingIcon)" width={"33.3"} height={"33.3"} />
                  &nbsp;Booking
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
            <MenuItem onClick={() => navigate('/login')}>Log in</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default TourAppBar; 