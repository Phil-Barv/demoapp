import React, { useState } from 'react';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ProjectCard from '../../components/project-card';
import {getDatabase, ref, child, get} from 'firebase/database';

const ProjectBrowser = () => {
  const dbRef = ref(getDatabase());
  const [queried, setQuery] = useState(false); // yet this won't do anything, as everytime browser loads, you'll have this!
  if (!queried){
    setQuery(true);
    get(child(dbRef, 'project/Category')).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
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
        <ProjectCard
            id={21}
            name={"Project Name"}
            tags={["Gender","Recommended For You"]}
            image_path={process.env.PUBLIC_URL + "/assets/dummy_media/landfill.png"}
            description={"Help us manage the landfills in Somalia."}
            />
        </Stack>
    </div>

  )
  
}

export default ProjectBrowser;