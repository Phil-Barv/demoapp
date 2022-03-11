import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface ProjectData {
  pk: number,
  name: string,
  description: string,
  raised: number,
  target: number
}

export default function ProjectCard(props: ProjectData) {

  

  return (
    <Card sx={{ maxWidth: 345 }}>

      <CardHeader
        action={
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
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