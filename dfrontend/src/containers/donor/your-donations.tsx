import React, { useState } from 'react';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';

import ProjectCard from '../../components/project-card';
import { autocompleteClasses } from '@mui/material';

const YourDonations = () => {

  return (
    <Stack spacing={2} height="80vh">
        <Stack direction="row" spacing={3} alignItems="center">
            <Box
            component="img"
            sx={{
              height: 60,
              width: 60,
              borderRadius: 100
            }}
            alt="The house from the offer."
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
          />
          <Typography variant="h4" component="h1">Your Donations</Typography>
        </Stack>
        <Stack>
        </Stack>
        <div>
        <Typography variant="h4" component="h2">Projects You Donated To</Typography>
        <Stack>
        <ProjectCard
            id={21}
            name={"Project Name"}
            tags={["Gender","Recommended For You"]}
            image_path={process.env.PUBLIC_URL + "/assets/dummy_media/landfill.png"}
            description={"Help us manage the landfills in Somalia."}
            />
        </Stack>
        </div>
    </Stack>

  )
  
}

export default YourDonations;