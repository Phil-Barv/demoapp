import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ProjectData {
  id: number;
  name: string;
  tags: string[];
  image_path: string;
  description: string
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
      <CardMedia
        component="img"
        height="194"
        image={props.image_path}
        alt={props.image_path}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>

    </Card>
  );
}