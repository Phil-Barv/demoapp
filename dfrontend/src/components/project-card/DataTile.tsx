import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, Form } from "react-bootstrap";
import { CardActionArea, CardActions } from '@mui/material';
import './data_tile.css'

interface LabeledValue {
  pool: string;
}

const DataTile = (props: LabeledValue) => {
	
  return (
    <Card
      className={`data-tile ${props.pool}`}
      sx={{ width: 80, height: 80,
            backgroundColor:"#F9F8F8",
            boxShadow:"none"}}>
      <CardActionArea sx={{ width: 80, height: 80 }} >
        <CardContent
            className="data-tile-action-trigger">
            </CardContent>
      </CardActionArea>
    </Card>
  )
  
}

export default DataTile;