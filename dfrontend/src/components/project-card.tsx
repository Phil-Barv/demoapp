import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { getDatabase, get, ref, set, child, push, update, onValue } from 'firebase/database';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../firebase";

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
    <Card sx={{ maxWidth: 345 }}>

      <CardHeader
        action={
          <IconButton aria-label="add to favorites" onClick={likeProject}>
            {(donorProject && donorProject.liked) ? <FavoriteIcon sx={{color:"red"}} /> : <FavoriteIcon /> }
          </IconButton>
        }
        title={props.name}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
        <Typography>
          {(props.raised/props.target*100).toFixed(0)}% raised. ${props.target-props.raised} more to go.
        </Typography>
      </CardContent>

    </Card>
  );
}