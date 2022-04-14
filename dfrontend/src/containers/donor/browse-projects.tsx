/* Page where users can browse projects
  In this page, we fetch the current projects from firebase
  and iterate through them using .map. Like a for loop, 
  everytime we iterate through one project, we render a card for the project
  and pass the project props into the project components.
 */

import React, { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ProjectCard from '../../components/project-card';
import { getDatabase, ref, onValue} from "firebase/database";


interface browseProjectsProps{
  donorID: number
}


const ProjectBrowser = (props: browseProjectsProps) => {

  const [projects, setProjects] = useState([""]);
  const [queried, setQueried] = useState(false);

  if (!queried){
    const db = getDatabase();
    const starCountRef = ref(db, 'Project');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setProjects(data);
    });
    setQueried(true);
  }
  
  return (
    <div>
        <Stack spacing={2}>
        <Typography variant="h3">Find Meaningful Projects</Typography>
        <Typography variant="h4">Popular Near You</Typography>
        <Stack direction="row" spacing={3}>
          {projects.map((project:any,i:number) => {
            return(
              <div key={i}>
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
          })
          }
        </Stack>
        <Paper component="form" sx={{borderRadius:4}}>
          <IconButton type="submit" aria-label="search" disabled>
            <SearchIcon />
          </IconButton>
          <InputBase type="text" placeholder="search inspiring projects" disabled/>
        </Paper>
        </Stack>
    </div>
  )
}

export default ProjectBrowser;