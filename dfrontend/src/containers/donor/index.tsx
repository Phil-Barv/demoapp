import * as React from 'react';
import { useNavigate } from 'react-router-dom';

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
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { logout } from "src/firebase";

import ProjectBrowser from "./browse-projects";

interface DonorViewProps {
  view: JSX.Element
}

function DonorView(props:DonorViewProps) {

  const navigate = useNavigate();
  const goToBrowse = () => {
    navigate("/browse")
  }
  const goToEditProfile = () => {
    navigate("/edit-profile")
  }
  const goToYourDonations = () => {
    navigate("/my-profile")
  }

  return (
      <Stack>
        <Container sx={{backgroundColor:"black",color:"white",width:"100vw"}}>
          <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              donatello
            </Typography>
            </Container>
        <Stack direction="row">
          <Stack>
          <List component="nav">
          <React.Fragment>
    <ListItemButton onClick={goToBrowse}>
      <ListItemIcon>
        <DashboardOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Browse Projects" />
    </ListItemButton>
    <ListItemButton onClick={goToYourDonations}>
      <ListItemIcon>
        <FavoriteBorderOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Your Donations" />
    </ListItemButton>
    <ListItemButton onClick={goToEditProfile}>
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
        <HelpOutlineOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Help" />
    </ListItemButton>
    <ListItemButton onClick={logout}>
      <ListItemIcon>
        <LogoutOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItemButton>

  </React.Fragment>
          </List>
    </Stack>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {props.view}
          </Container>
        </Stack>
      </Stack>
  );
};

export default DonorView;
