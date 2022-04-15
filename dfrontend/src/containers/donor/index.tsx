/* Main Interface for the donors
After importing required components, we create a sidebar and "donor-dashboard-body"
We use the sidebar for the user to navigate and load the relevant components like
browse projects, userinformation, and my projects. We've tested this navigation within tests.
We also define a function called createDonor() that gets called when the user does not have a donor profile.
If they do not have a donor profile, we create one for them by sending a post request to our firebase endpoint.
*/

import React, { useEffect, useState } from "react";
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
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { logout } from "src/firebase";

import { getDatabase, get, ref, child, push, update, onValue } from 'firebase/database';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../../firebase";

import ProjectBrowser from './browse-projects';
import YourDonations from './your-donations';
import EditProfile from './edit-profile';
import IndividualProjectPage from "./individual-project-page";

import "./index.css"

interface DonorViewProps {
  view: string
}

function DonorView(props:DonorViewProps) {

  const db = getDatabase();
  const [user, loading, error] = useAuthState(auth);
  const [donorID, setDonorID] = useState(-10);
  const [triggered, setTriggered] = useState(false);

  const createDonor = () => {

    const newPostKey = push(child(ref(db), 'posts')).key;

    const uid = user ? user.uid : "DEFAULTUSERID";

    const donorData = {
      pk: newPostKey,
      uid: uid
    };

    interface updateDict {
      [key: string]: any;
    };

    const updates : updateDict = {};

    updates['/Donor/'.concat( (typeof newPostKey == 'string') ? newPostKey : "null" )]=donorData;

    return update(ref(db), updates);
  }

  if (!triggered && user){
    setTriggered(true);
    const getDonorRef = ref(db, 'Donor');
    onValue(getDonorRef, (snapshot:any) => {
      const data = snapshot.val();
      const filteredData = data.filter((data:any) => (data.uid==user.uid)) ;
      if (filteredData.length>0){
        setDonorID(filteredData[0].pk);
      }else{
        createDonor();
      };
    });
  };

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
  const goToIndividualProjectPage = () => {
    navigate('/individual-project-page')
  }

  const renderView = () => {
    switch(props.view){
      case "project_browser":
        return <ProjectBrowser donorID={donorID} />
      case "your_donations":
        return <YourDonations donorID={donorID} />
      case "edit_profile":
        return<EditProfile donorID={donorID} />
        case "individual_project_page":
          return<IndividualProjectPage donorID={donorID} />
    }
  }

  return (
    <Stack>
        
    <Stack direction="row">
      <Stack id="donor-dashboard-sidebar">
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
          <Container id="donor-dashboard-body">
          {renderView()}
          </Container>
        </Stack>
      </Stack>
  );
};

export default DonorView;
