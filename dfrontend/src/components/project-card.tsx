import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { getDatabase, get, ref, child, push, update, onValue } from 'firebase/database';
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
  const [donorProject, setDonorProject] = useState({money_donated:-10});
  const [triggered, setTriggered] = useState(false);

  if (!triggered && props.pk && props.donorID > -1 ){
    setTriggered(true);
    const getDonorRef = ref(db, 'DonorProject');
    onValue(getDonorRef, (snapshot:any) => {
      const data = snapshot.val();
      const donorProject = data.filter((data:any) => (data.donor_id==props.donorID && data.project_id == props.pk )) ;
      setDonorProject(donorProject[0]);
    });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>

      <CardHeader
        action={
          <IconButton aria-label="add to favorites" onClick={(e)=> {console.log("You unliked-like dme");}}>
            {(donorProject && donorProject.money_donated > 0) ? <FavoriteIcon sx={{color:"red"}} /> : <FavoriteIcon /> }
          </IconButton>
        }
        title={props.name}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
        <Typography>
          Raised {props.raised} of {props.target} needed
        </Typography>
      </CardContent>

    </Card>
  );
}