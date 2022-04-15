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

import ProjectBrowser from '../donorPages/browseProjects';
import YourDonations from '../donorPages/yourDonations';
import EditProfile from '../donorPages/editProfile'; 

import "./index.css"

function DonorDashboard(props) {

  const [state, setState] = useState(1);

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
        case 1:
            return(<ProjectBrowser token={props.token}/>)
        case 2:
            return(<YourDonations token={props.token} />)
        case 3:
            return(<EditProfile token={props.token} />)
        default:
            return(<ProjectBrowser token={props.token} />)
    }
  }

  return (
      <Stack>
        
    <Stack direction="row">
      <Stack id="dashboard-sidebar">
        <List component="nav">
        <React.Fragment>
      <ListItemButton onClick={() => setState(1)}>
        <ListItemIcon>
          <DashboardOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Browse Projects" />
      </ListItemButton>
      <ListItemButton onClick={() => setState(2)}>
        <ListItemIcon>
          <FavoriteBorderOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Your Donations" />
      </ListItemButton>
      <ListItemButton onClick={() => setState(3)} disabled>
        <ListItemIcon>
          <PermIdentityOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Profile Settings" />
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

export default DonorDashboard;
