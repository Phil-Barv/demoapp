/* Project Card Component
   Stores the title, description, and total amount raised. 
*/

import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';
import "./projectCard.css"

export default function ProjectCard(props) {

  const [donorProject, setDonorProject] = useState({pk:0,donor_id:0,project_id:0,liked:0});
  const [donorProjectExists, setDonorProjectExists] = useState(false);

  function openProject(e){
    props.setCurrentProject(props);
  }

  return (
    <Paper sx={{ minWidth:300, maxWidth: 350, borderRadius:7, paddingTop:0.1, paddingBottom:0.7}}>

      <Paper className="default-cover-gradient" sx={{borderRadius:4}}>
      <Stack className="default-cover-text" height="100%" justifyContent="end" spacing={2} padding={1}>
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
          {(props.raised/props.target*100).toFixed(0)}% raised
        </Typography>
        <Typography mt={1} mb={1} sx={{textAlign:"center"}}>
            ${props.target-props.raised} more to go
        </Typography>


        <IconButton aria-label="add to favorites" onClick={openProject}>
            <Button variant='contained' className='card-button'>View More</Button>
        </IconButton>
        </Stack>

    </Paper>
  );
}