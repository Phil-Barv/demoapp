/* Page where users can browse projects
  In this page, we fetch the current projects from firebase
  and iterate through them using .map. Like a for loop, 
  everytime we iterate through one project, we render a card for the project
  and pass the project props into the project components.
 */

  import React, { useState, useEffect } from 'react';

  import Grid from '@mui/material/Grid';
  import Modal from "@mui/material/Modal";
  import Typography from "@mui/material/Typography";
  import Stack from "@mui/material/Stack";
  import Paper from "@mui/material/Paper";
  import InputBase from "@mui/material/InputBase";
  import IconButton from "@mui/material/IconButton";
  import Button from "@mui/material/Button";
  import SearchIcon from "@mui/icons-material/Search";

  import ProjectCard from '../sharedComponents/projectCard';  
  import ProjectPage from '../sharedComponents/projectPage';  

  import APIService from '../api';
  import AddProjectForm from './addProjectForm';
  import CloseIcon from '@mui/icons-material/Close';

  
  const ProjectBrowser = (props) => {
  
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '20%',
      height: '50%',
      overflowY: 'scroll',
      scrollBehavior: 'smooth',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    const [projects, setProjects] = useState([""]);
    const [queried, setQueried] = useState(false);
    const [currentProject, setCurrentProject]  = useState(null);
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goal, setGoal] = useState('');
    const [deadline, setDeadline] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [raisedAmount, setRaisedAmount] = useState('');
    const [image_url, setImageUrl] = useState('');


    const [openM2, setOpenM2] = useState(false);
  
    const handleOpenM2 = () => {
      setOpenM2(true);
    };

    const handleClose = () => {
      setOpenM2(false);
    };

    const addProject = () => {
      APIService.AddProject({
            title,
            description,
            image_url,
            goal,
            // deadline,
            targetAmount
        }, props.token
        ).then((response) => console.log(response))
        .catch(error => console.log('error',error))
    }
    
    const handleSubmit=(event)=>{ 
      event.preventDefault()
      addProject()
      setOpenM2(false);
      window.location.reload()
    }

    useEffect(() => {
        APIService.GetProjects(props.token
          ).then(response => {
            if (response.status === 200) {
              return response.data
            }
          }).then(data => setProjects(data.response))
          .then(error => {if(error){console.log(error)}})
        }, []
    )
    
    return (
        <div>
        {(currentProject) ? <ProjectPage props={currentProject}/>
        :
          <Stack spacing={2}>
          <Typography variant="h3">Find Meaningful Projects</Typography>
          <Typography variant="h4">Popular Near You</Typography>
          <Button onClick = {handleOpenM2}>Add A Project</Button>

          <Modal
            sx= {style}
            open={openM2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <div className='container container-modal'>
          <Stack spacing = {3} sx ={{justifyContent: 'space-between'}} direction ='row'>
          <form onSubmit = {handleSubmit} >
              <Stack spacing ={1}>
                <label htmlFor="title" className="form-label">Title</label>
                <input 
                    type="text"
                    className="form-control" 
                    placeholder ="Enter title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    required />

                <label htmlFor="description" className="form-label">Description</label>
                <textarea 
                    className="form-control" 
                    placeholder ="Enter Description" 
                    rows='6'
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    required></textarea>

                <label htmlFor="image_url" className="form-label">Goal</label>
                <textarea 
                    className="form-control" 
                    placeholder ="Image Url" 
                    value={image_url}
                    onChange={(e)=>setImageUrl(e.target.value)}
                    required></textarea>

                <label htmlFor="deadline" className="form-label">Deadline</label>
                <input 
                    type="datetime-local"
                    className="form-control" 
                    value={deadline}
                    onChange={(e)=>setDeadline(e.target.value)}
                    required />

                <label htmlFor="targetAmount" className="form-label">Target Amount</label>
                <input 
                    type="number"
                    className="form-control" 
                    placeholder ="Enter your target amount"
                    value={targetAmount}
                    onChange={(e)=>setTargetAmount(e.target.value)}
                    required />

                {/* <label htmlFor="raisedAmount" className="form-label">Raised Amount</label>
                <input 
                    type="number"
                    className="form-control" 
                    placeholder ="Enter Your Riased Amount"
                    value={raisedAmount}
                    onChange={(e)=>setRaisedAmount(e.target.value)}
                    required /> */}

                <button onClick={handleSubmit} id='modal-submit'> Create Project </button>
                </Stack>
                </form>
          <CloseIcon onClick={handleClose} className='form-close'></CloseIcon>
          </Stack>
          </div>
          
          </Modal>

          <Grid container rowSpacing={3}>
            {projects.map((project, i) => {
              return(
                <Grid item xs={8} sm={4} >
                <div key={i} className='container-browse-project'>
                <ProjectCard
                  pk={project["id"]}
                  name={project["title"]}
                  description={project["description"]}
                  target={project["target_amount"]}
                  raised = {project["raised_amount"]}
                  image_url = {project['image_url']}
                  setCurrentProject={setCurrentProject}
                />
              </div>
              </Grid>
              )
            })
            }
          </Grid>
        
          </Stack>
        }
    </div>
    )
  }
  
  export default ProjectBrowser;