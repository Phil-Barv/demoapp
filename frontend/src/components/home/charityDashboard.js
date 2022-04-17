import React, { useEffect, useState } from "react";
import axios from "axios";

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

import AddProjectForm from '../charityPages/addProjectForm';
import BrowseProjects from '../charityPages/browseProjects';


import "./index.css"

function CharityDashboard(props) {

  const [state, setState] = useState(0);

  function logout() {
    axios({
      method: "POST",
      url:"/logout",
    })
    .then((response) => {
       props.removeToken()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  const renderView = () => {
    switch(state){
      default:
        return(<BrowseProjects token={props.token}/>)
    }
  }

  return (
      <Stack>
        
    <Stack direction="row">
      <Stack id="dashboard-sidebar">
        <List component="nav">
        <React.Fragment>
      <ListItemButton onClick={() => setState(2)}>
        <ListItemIcon>
          <FavoriteBorderOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="View/Add Project" />
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
          Limpid
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
