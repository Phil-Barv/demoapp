import React, { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ProjectCard from '../../components/project-card';
import { getDatabase, ref, onValue} from "firebase/database";

const ProjectBrowser = () => {

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
        <Typography variant="h1">HELLO</Typography>
        <Typography>Here are the community's most recent projects.</Typography>
        <Paper component="form">
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase type="text" placeholder="search inspiring projects"/>
        </Paper>
        <Stack direction="row">
          {projects.map((project:any,i:number) => {
            return(
              <div key={i}>
              <ProjectCard
                pk={project["pk"]}
                name={project["name"]}
                description={project["description"]}
                raised={project["raised"]}
                target={project["target"]}
              />
            </div>
            )
          })
          }
        </Stack>
        </Stack>
    </div>
  )
}

export default ProjectBrowser;