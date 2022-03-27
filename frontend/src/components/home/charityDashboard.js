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

import AddProjectForm from '../charityPages/addProjectForm'

import "./index.css"

function CharityDashboard(props) {

  const [state, setState] = useState(0);

  const logout = (e) => {
    props.setUserState(0);
  }

  const renderView = () => {
    switch(state){
      default:
        return(<AddProjectForm />)
    }
  }

  return (
      <Stack>
        
    <Stack direction="row">
      <Stack id="dashboard-sidebar">
        <List component="nav">
        <React.Fragment>
      <ListItemButton onClick={() => setState(1)} disabled>
        <ListItemIcon>
          <DashboardOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Your Projects" />
      </ListItemButton>
      <ListItemButton onClick={() => setState(2)}>
        <ListItemIcon>
          <FavoriteBorderOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Add Project" />
      </ListItemButton>
      <ListItemButton onClick={() => setState(3)} disabled>
        <ListItemIcon>
          <PermIdentityOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Charity Settings" />
      </ListItemButton>
    
  </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>

    <ListItemButton onClick={logout}>
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
          <Container id="dashboard-body">
          {renderView()}
          </Container>
        </Stack>
      </Stack>
  );
};

export default CharityDashboard;
