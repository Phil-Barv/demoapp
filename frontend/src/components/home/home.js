import React, { useEffect, useState } from "react";

import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

/*
import ProjectBrowser from './browse-projects';
import YourDonations from './your-donations';
import EditProfile from './edit-profile'; */

import "./index.css"

function Deploy(props) {

  const renderView = () => {
    return (<div>{props.response.tutorial}</div>)
    /*
    switch(props.user){
      case "in":
        return <ProjectBrowser donorID={donorID} />
      case "not_in":
        return <YourDonations donorID={donorID} />
      case "out":
        return<EditProfile donorID={donorID} />
    }*/
  }


  return (
      <Stack>
        
    <Stack direction="row">
      <Stack id="donor-dashboard-sidebar">
        <List component="nav">
        <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <DashboardOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Browse Projects" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <FavoriteBorderOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Your Donations" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <PermIdentityOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Profile Settings" />
      </ListItemButton>
    
  </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>

    <ListItemButton>
      <ListItemIcon>
        <LogoutOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItemButton>
  </React.Fragment>
      </List>
      <Typography component="h1" id="app-title">
          donatello
        </Typography>
    </Stack>
          <Container id="donor-dashboard-body">
          {renderView()}
          </Container>
        </Stack>
      </Stack>
  );
};

export {Deploy};
