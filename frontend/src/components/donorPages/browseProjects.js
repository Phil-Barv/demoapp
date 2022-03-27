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

  import ProjectCard from '../sharedComponents/projectCard';  
  import ProjectPage from '../sharedComponents/projectPage';  
  
  const ProjectBrowser = (props) => {
  
    const [projects, setProjects] = useState([""]);
    const [queried, setQueried] = useState(false);
    const [currentProject, setCurrentProject]  = useState(null);
  
    useEffect(() => {
        fetch('/project').then(response => {
          if (response.status === 200) {
            return response.json()
          }
        }).then(data => setProjects(data.response))
        .then(error => console.log(error))
      }, [])

    
    
    return (
        <div>
        {(currentProject) ? <ProjectPage props={currentProject}/>
        :
          <Stack spacing={2}>
          <Typography variant="h3">Find Meaningful Projects</Typography>
          <Typography variant="h4">Popular Near You</Typography>
          <Stack direction="row" spacing={3}>
            {projects.map((project, i) => {
              return(
                <div key={i}>
                <ProjectCard
                  pk={project["id"]}
                  name={project["title"]}
                  description={project["description"]}
                  raised={project["raised_amount"]}
                  target={project["target_amount"]}
                  setCurrentProject={setCurrentProject}
                />
              </div>
              )
            })
            }
          </Stack>
        
          </Stack>
        }
    </div>
    )
  }
  
  export default ProjectBrowser;