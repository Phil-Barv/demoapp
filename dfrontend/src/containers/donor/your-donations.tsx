/* Page to load the user's donations. Here we fetch from the database all available projects
and compare whether the donor ID of the user has a relationship with the project
that is stored in the DonorProject endpoint. If we find this relationship, then we use it to display the given project.
The relationship can get created when a user donates or interacts with the project by liking/unliking it.
*/

import React, { useState } from 'react';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ProjectCard from '../../components/project-card';
import { getDatabase, ref, onValue} from "firebase/database";

interface yourDonationProps {
  donorID: number
}

const YourDonations = (props:yourDonationProps) => {

  const [projects, setProjects] = useState([""]);
  const [queried, setQueried] = useState(false);

  if ( !queried ) {

    const db = getDatabase();
    const donorProjectRef = ref(db, 'DonorProject');

    onValue(donorProjectRef, (snapshot) => {
      const data = snapshot.val();
      const userProjects = data.filter( (data:any) => (data.donor_id == props.donorID));
      const projectIds = new Set(userProjects.map( (item:any) => item.project_id));
      const projectRef = ref(db, 'Project');
      onValue(projectRef, (snapshot) => {
        const data = snapshot.val();
        const projects = data.filter( (data:any) => (projectIds.has(data.pk)));
        setProjects(projects);
      });
    });
    setQueried(true);
  }
  
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
          {projects.map(((project:any, index:number) => {
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