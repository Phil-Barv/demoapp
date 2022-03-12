import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { getDatabase, get, ref, set, child, push, update, onValue } from 'firebase/database';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../firebase";

import "./project-card.css"

interface ProjectData {
  pk: number,
  donorID: number,
  name: string,
  description: string,
  raised: number,
  target: number
}

export default function ProjectCard(props: ProjectData) {

  const db = getDatabase();
  const [donorProject, setDonorProject] = useState({pk:0,donor_id:0,project_id:0,liked:0});
  const [donorProjectExists, setDonorProjectExists] = useState(false);
  const [triggered, setTriggered] = useState(false);

  function likeProject() {
    if (donorProjectExists && donorProject){
      set(ref(db, 'DonorProject/' + donorProject.pk), {
        donor_id: donorProject.donor_id,
        liked: 1,
        pk: donorProject.pk,
        project_id: donorProject.project_id
      });
  }
};

  if (!triggered && props.pk && props.donorID > -1 ){
    setTriggered(true);
    const getDonorRef = ref(db, 'DonorProject');
    onValue(getDonorRef, (snapshot:any) => {
      const data = snapshot.val();
      const donorProject = data.filter((data:any) => (data.donor_id==props.donorID && data.project_id == props.pk )) ;
      setDonorProject(donorProject[0]);
      setDonorProjectExists(true);
    });
  };

  return (
    <Paper sx={{ maxWidth: 345, borderRadius:6, padding:0.3}}>

      <Paper className="default-cover-gradient" sx={{borderRadius:4}}>
      <Stack className="default-cover-text" height="100%" justifyContent="end" spacing={1} padding={1}>
        <Typography variant="h5" color="text.secondary">
          {props.name}
          </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
        </Stack>
      </Paper>
  
        <Stack alignItems="center" justifyContent="space-between">
        <Typography mt={1} mb={1} sx={{textAlign:"center"}}>
          {(props.raised/props.target*100).toFixed(0)}% raised. ${props.target-props.raised} more to go.
        </Typography>

        <IconButton aria-label="add to favorites" onClick={likeProject}>
            {(donorProject && donorProject.liked) ? <FavoriteIcon sx={{color:"red"}} /> : <FavoriteIcon /> }
        </IconButton>
        </Stack>

    </Paper>
  );
}