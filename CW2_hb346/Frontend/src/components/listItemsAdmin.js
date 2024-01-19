import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { AccountCircleOutlined, Logout } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

import { useAuth } from '../pages/AuthContext';

import { Link } from 'react-router-dom';

const scrollDown = () => {
  // Scroll down 300px using the react-scroll library
  scroll.scrollMore(800);
};
export const mainListItems = (
  
  
  <React.Fragment>
    <ListItemButton component={Link} to="/adminDashboard">
  <div style={{ display: 'flex', alignItems: 'center' }}>
    {/* Your logo image */}
    <img src="./blue-party.png" alt="Logo" height={'30px'} width={'30px'} style={{ marginRight: '-30px' ,borderRadius: '50%'}} />
    
    {/* Dashboard Icon (or any other icon you want) */}
    <ListItemIcon>
    </ListItemIcon>
    
    {/* Text for the list item */}
    <ListItemText primary="Hello Admin" />
  </div>
</ListItemButton>
    <ListItemButton component={Link} to="/adminDashboard">
      <ListItemIcon>
      <img src="./Dashboard.png" alt="Logo" height={'30px'} width={'30px'} style={{ marginRight: '-30px' ,borderRadius: '50%'}} />
   
        {/* <DashboardIcon /> */}
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    
  </React.Fragment>
);

export const secondaryListItems = (
  
  
  <React.Fragment>
    <ListSubheader component="div" inset>
      Account
    </ListSubheader>
    <ListItemButton component={Link} to="/list">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Party List" />
    </ListItemButton>
    
    <ListItemButton component={Link} to="/signin" onClick={() => handleSignOut()}>
      <ListItemIcon>
        <Logout />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>
);

const handleSignOut = () => {
  
 
  // Add your sign-out logic here
  // Update the state or dispatch an action to handle sign-out
};