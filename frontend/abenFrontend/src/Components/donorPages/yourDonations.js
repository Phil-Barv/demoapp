/* Page to load the user's donations.
*/

import React, { useState } from 'react';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ProjectCard from '../sharedComponents/projectCard';

const YourDonations = (props) => {

  const [projects, setProjects] = useState([""]);
  const [queried, setQueried] = useState(false);
  
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
        <Typography variant="h4" component="h2" mb={3}>Projects You Liked</Typography>
        <Stack direction="row" spacing={3}>
          {projects.map(((project, index) => {
            return(
              <div key={index}>
                <ProjectCard
                  pk={project["pk"]}
                  name={project["name"]}
                  description={project["description"]}
                  raised={project["raised"]}
                  target={project["target"]}
                  donorID={props.donorID}
                />
              </div>
            )
          } ))}
        </Stack>
        </div>
    </Stack>

  )
  
}

export default YourDonations;