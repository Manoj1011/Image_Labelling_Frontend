import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'; // Import the Menu icon
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import Hidden from '@mui/material/Hidden';
import UserStore from '../contexts/UserStore';
import Logout from './signout';

function Navbar() {
  const titleStyle = {
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
  };

  const navbarStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  };

  const { getSession } = useContext(UserStore);

  // State to control the mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <AppBar position="static" color="primary" style={navbarStyle}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={titleStyle}>
            Image Labelling
          </Link>
        </Typography>

        {/* Hamburger menu for mobile */}
        <Hidden mdUp>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={openMobileMenu}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>

        {/* Desktop navigation */}
        <Hidden smDown>
          <div>
            {getSession() ? (
              <div>
                <Button component={Link} to="/user" color="inherit">
                  Home
                </Button>
                <Button component={Link} to="/dashboard" color="inherit">
                  Dashboard
                </Button>
                <Button color="secondary">
                  {<Logout />}
                </Button>
              </div>
            ) : (
              <div>
                <Button component={Link} to="/signup" color="inherit">
                  Sign Up
                </Button>
                <Button component={Link} to="/signin" color="inherit">
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </Hidden>
      </Toolbar>

      {/* Mobile menu */}
      <Drawer anchor="right" open={mobileMenuOpen} onClose={closeMobileMenu}>
        <List>
          {getSession() ? (
            <div>
              <ListItem button component={Link} to="/admin">
                <ListItemText primary="My progress" />
              </ListItem>
              <ListItem button component={Link} to="/stats">
                <ListItemText primary="My Stats" />
              </ListItem>
              <ListItem button component={Link} to="/leaderboard">
                <ListItemText primary="Leaderboard" />
              </ListItem>
              <ListItem button component={Link} to="/settings">
                <ListItemText primary="Settings" />
              </ListItem>
              <ListItem button>
                {<Logout />}
              </ListItem>
            </div>
          ) : (
            <div>
              <ListItem button component={Link} to="/signup">
                <ListItemText primary="Sign Up" />
              </ListItem>
              <ListItem button component={Link} to="/signin">
                <ListItemText primary="Sign In" />
              </ListItem>
            </div>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
