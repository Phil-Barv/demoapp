import React, { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ProjectCard from '../../components/project-card';
import { useSelector } from "react-redux";


const ProjectBrowser = () => {

  const [projects, setProjects] = useState([""]);
  const post = useSelector((state:any) =>{
    console.log(state);}
  );
  
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
                id={21}
                name={"Project Name"}
                tags={["Gender","Recommended For You"]}
                image_path={process.env.PUBLIC_URL + "/assets/dummy_media/landfill.png"}
                description={"Help us manage the landfills in Somalia."}
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