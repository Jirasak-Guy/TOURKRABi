import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography, ThemeProvider, createTheme, Button } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TourAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
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

  return (
    <ThemeProvider theme={Theme}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Box>
              <div>
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
              </div>
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