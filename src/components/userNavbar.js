import React from 'react';
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom";

const UserNavbar = () => {
  const location=useLocation();
  const currentRoute = location.pathname;

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Image Labelling 
          </Typography>
          <div className="hidden md:flex items-center space-x-6">
                <Link to={(currentRoute === '/dashboard') ? '/user' : '/dashboard'} className="text-red-600 hover:text-blue-800   ">
                    {currentRoute === '/dashboard' ? (
                    <button className="px-3 py-2 rounded-md bg-blue-100 hover:bg-blue-200">Home</button>
                    ) : (
                    <button className="px-3 py-2 rounded-md bg-blue-100 hover:bg-blue-200">Dashboard</button>
                    )}
                </Link>
                
                <Link to='/' onClick={() => { localStorage.clear(); }} className="text-blue-600 hover:text-blue-800">
                    <button className="px-3 py-2 rounded-md bg-blue-100 hover:bg-blue-200">Logout</button>
                </Link>
            </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default UserNavbar;
