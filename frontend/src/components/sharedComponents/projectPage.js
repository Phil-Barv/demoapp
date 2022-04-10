import Stack from "@mui/material/Stack";
import Card from '@mui/material/Card';
import Modal from "@mui/material/Modal";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import CircularProgressWithLabel from '@mui/material/CircularProgress';
import StarIcon from '@mui/icons-material/Star';
import { TextField } from "@mui/material";
import { Avatar, Grid, Button } from "@mui/material";
import {useState, useEffect} from 'react';
import APIService from '../api';

const ProjectPage = (props) => {

    function closeProject(e){
        props.props.setCurrentProject(null);
      }

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
      height: '50%',
      overflowY: 'scroll',
      scrollBehavior: 'smooth',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    

    const [openM1, setOpenM1] = useState(false);
    const handleOpenM1 = () => setOpenM1(true);
    const handleCloseM1 = () => setOpenM1(false);      
    const [openM2, setOpenM2] = useState(false);

    const id = useState(props.props.pk);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goal, setGoal] = useState('');
    const [deadline, setDeadline] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [raisedAmount, setRaisedAmount] = useState('');
    const imageURL = "https://placekitten.com/200/140";
    
    const handleOpenM2 = () => {
      setOpenM2(true);
    };
    const handleCloseM2 = () => setOpenM2(false); // This one should be used for discard changes
    // Add one to update existing values 

    function deleteProject(){
      APIService.DeleteProject(props.props.pk, props.token)
      .then((response) => console.log(response))
      .catch(error => console.log('error',error));
      window.location.reload();
    }

    function handleSaveCloseM2 (e){
      APIService.UpdateProject(props.props.pk,{
        id,
        title,
        description,
        imageURL,
        // goal,
        // deadline,
        targetAmount,
        // raisedAmount
    }, props.token
    ).then((response) => console.log(response))
    .catch(error => console.log('error',error));
      setOpenM2(false);
      window.location.reload();
    };

    console.log(props.props.pk)
    const [userState, setUserState] = useState(1);
    const renderView = () => {
      switch(userState){
          case 1: // For charity
              return(
                <Grid container spacing={2} height = "fit-content">
                  <Grid item xs={8}>
                  <button onClick={closeProject}>close project</button>

                      <Stack spacing={5} height="fit-content">
                          <h1>{props.props.name}</h1>
                          <img src = 'https://dqelp6tva12fr.cloudfront.net/original_images/charities.jpg' alt="people unpacking donation boxes"/>
                          
                          <Stack spacing= {2}>
                            <h2>What is this project about?</h2>
                            <p>{props.props.description}</p>
                          </Stack>
                          
                          <Stack spacing= {4}>
                            <h2>Key Goals and Resource Needed</h2>
                            
                            <Stack spacing = {2}>
                              <h3>Goal 1: Lorem ipsum dolor sit amet</h3>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis iaculis et velit. Tristique viverra mauris nibh tortor. Lacinia viverra elementum quis id arcu sit sed aliquet at. Rutrum tincidunt purus ut velit, egestas amet eu, sagittis, sit. Eget blandit at enim eget. Lorem morbi eget sociis egestas et libero nulla consequat. Neque sit at non est ornare. Pulvinar pulvinar egestas pharetra, diam ipsum vitae magna. Arcu.</p>
                              <p>Resource Needed: <strong>5,0000 USD</strong></p>
                            </Stack>
                            
                            <Stack spacing = {1}>
                              <h3>Goal 2: Lorem ipsum dolor sit amet</h3>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis iaculis et velit. Tristique viverra mauris nibh tortor. Lacinia viverra elementum quis id arcu sit sed aliquet at. Rutrum tincidunt purus ut velit, egestas amet eu, sagittis, sit. Eget blandit at enim eget. Lorem morbi eget sociis egestas et libero nulla consequat. Neque sit at non est ornare. Pulvinar pulvinar egestas pharetra, diam ipsum vitae magna. Arcu.</p>
                              <p>Resource Needed: <strong>5,0000 USD</strong></p>
                            </Stack>
                          </Stack>
                      </Stack>
                  </Grid>
                  <Grid item xs={4} >

                    <Stack spacing = {2}>                      
                      <Card id= 'side-column-card'>
                        <Stack spacing = {2}>
                          {/* <Button variant ='contained'onClick ={handleOpenM1}>Update Progress</Button> */}
                          <Button variant ='outlined' onClick ={handleOpenM2}>Edit Info</Button>
                          <Button variant ='outlined' onClick ={deleteProject}>Delete Project</Button>

                          
                          {/* Modal for editing progress */}
                          <Modal
                            open={openM2}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Grid sx= {style} container style={{ gap:50 }}>
                              <Grid item xs = {8}>
                              <Stack spacing ={4}>
                                <Stack spacing={2}>
                                <h2>Project Name</h2>
                                <TextField 
                                  required id="project_name" 
                                  label="Project Name" 
                                  variant="outlined" 
                                  defaultValue={props.props.name}
                                  onChange={(e)=>setTitle(e.target.value, console.log(e.target.value))} 
                                  />
                                </Stack>

                                <Stack spacing={1}>
                                <h2>Project Description</h2>
                                <TextField 
                                  multiline 
                                  required 
                                  id="project_description" 
                                  label="Project Description" 
                                  variant="outlined" 
                                  defaultValue={props.props.description}
                                  onChange={(e)=>setDescription(e.target.value, console.log(e.target.value))} 
                                  />
                                </Stack>

                                <Stack spacing={1}>
                                <h2>Project Image</h2>
                                
                                <input
                                  accept="image/*"
                                  style={{ display: 'none' }}
                                  id="upload_org_img"
                                  type="image.file"
                                />
                                <label htmlFor="upload_org_img">
                                  <Button variant="contained" component="span">
                                    Upload
                                  </Button>
                                </label> 
                                {/* Something needs to happen here to take the image */}
                                </Stack>

                                {/* Key Goals */}
                                <Stack spacing={2}>
                                  <h2>Key Goals and Resource Needed</h2>
                                  <Grid container spacing ={0}>
                                    <Grid item xs= {2}>
                                      <h3>Goal 1</h3> 
                                    </Grid>
                                    <Grid item xs ={10}>
                                      <TextField 
                                        required 
                                        fullWidth id="goals_name" 
                                        label="goal name" 
                                        variant="outlined"
                                        // defaultValue={props.props.description}
                                        // onChange={(e)=>setDescription(e.target.value, console.log(e.target.value))} 
                                        />
                                    </Grid>
                                  </Grid>
                                  <TextField multiline required id="goals_description" label="goal description" variant="outlined" />
                                </Stack>

                                  </Stack>

                              </Grid>
                              <Grid item xs ={4} container style={{ gap: 20 }}>
                                  <Button variant ='contained' onClick ={handleSaveCloseM2}>Save Changes</Button>
                                  <Button variant ='outlined' onClick ={handleCloseM2}>Discard Changes</Button>
                              </Grid>
                          </Grid>
                          </Modal>

                          {/* Modal for editing progress */}
                          <Modal
                            open={openM1}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Stack sx= {style} spacing ={4}>
                              <Stack direction ='row' style={{justifyContent: 'space-between'}}>
                                <h3>Latest Progress Report from the Charity</h3>
                                <IconButton onClick={handleCloseM1}>
                                    <CloseIcon/>
                                </IconButton>
                              </Stack>
                              <TextField multiline placeholder="Update people who donate to your charity what your project has achieved since last time!"></TextField>
                            
                              <Grid container style={{justifyContent: 'space-between' }}>
                                <Grid item xs={8}>
                                  <Stack spacing = {2}>
                                      <h4>Goal 1: Lorem ipsum dolor sit amet</h4>
                                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis iaculis et velit. Tristique viverra mauris nibh tortor. Lacinia viverra elementum quis id arcu sit sed aliquet at. Rutrum tincidunt purus ut velit, egestas amet eu, sagittis, sit. Eget blandit at enim eget. Lorem morbi eget sociis egestas et libero nulla consequat. Neque sit at non est ornare. Pulvinar pulvinar egestas pharetra, diam ipsum vitae magna. Arcu.</p>
                                  </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                  <Stack spacing = {2}>
                                    <h4>% Completed</h4>
                                    <TextField placeholder="50%"></TextField>
                                  </Stack>
                                </Grid>
                              </Grid>
                            
                              <Grid container style={{justifyContent: 'space-between' }}>
                                <Grid item xs={8}>
                                  <Stack spacing = {2}>
                                      <h4>Goal 1: Lorem ipsum dolor sit amet</h4>
                                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis iaculis et velit. Tristique viverra mauris nibh tortor. Lacinia viverra elementum quis id arcu sit sed aliquet at. Rutrum tincidunt purus ut velit, egestas amet eu, sagittis, sit. Eget blandit at enim eget. Lorem morbi eget sociis egestas et libero nulla consequat. Neque sit at non est ornare. Pulvinar pulvinar egestas pharetra, diam ipsum vitae magna. Arcu.</p>
                                  </Stack>
                                </Grid>

                                <Grid item xs={3}>
                                  <Stack spacing = {2}>
                                    <h4>% Completed</h4>
                                    <TextField placeholder="50%"></TextField>
                                  </Stack>
                                </Grid>
                              </Grid>

                              <Stack spacing ={2}>
                                <Button variant ='contained' onClick={handleCloseM1}>Save Changes</Button>
                                <Button variant = 'outlined' onClick={handleCloseM1}>Discard Changes</Button>
                              </Stack>
                            </Stack>



                          </Modal>





                          <Stack direction='row' justifyContent="space-between">
                            <Stack spacing = {1}>
                              <h3>{props.props.raised}USD</h3>
                              <p>out of {props.props.target} raised</p>
                              <p>19 more days to go</p>
                            </Stack>
                            <CircularProgressWithLabel variant = 'determinate' value= {75} thickness = {4} size ={80}></CircularProgressWithLabel>
                          </Stack>
                          
                          <h4>Donate Now</h4>
                          <TextField id="outlined-basic" label="Donation Amount" variant="outlined" />
                          <Button variant="contained">Donate</Button>
                          


                        </Stack>  
                      </Card>

                      

                      <Card id= 'side-column-card'>
                        <Stack spacing = {2}>
                          <Stack direction='row' spacing= {2}>
                            <Avatar alt="Remy Sharp" src="data:image/jpeg;base64,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" />
                            <h4>Organization Name</h4>
                          </Stack>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut augue quisque nunc sed sodales. Consequat non.</p>
                          <Button variant="outlined">See Org Info</Button>

                        </Stack>  
                      </Card>
                    </Stack >

                  </Grid>
                </Grid>
              )
          case 2: // If it's a donar
              return(
                <Grid container spacing={2} height = "fit-content">
                  <Grid item xs={8}>
                  <button onClick={closeProject}>close project</button>

                      <Stack spacing={5} height="fit-content">
                        
                          <h1>{props.props.name}</h1>
                          <img src = 'https://dqelp6tva12fr.cloudfront.net/original_images/charities.jpg' alt="people unpacking donation boxes"/>
                          
                          <Stack spacing= {2}>
                            <h2>What is this project about?</h2>
                            <p>{props.props.description}</p>
                          </Stack>
                          
                          <Stack spacing= {4}>
                            <h2>Key Goals and Resource Needed</h2>
                            
                            <Stack spacing = {2}>
                              <h3>Goal 1: Lorem ipsum dolor sit amet</h3>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis iaculis et velit. Tristique viverra mauris nibh tortor. Lacinia viverra elementum quis id arcu sit sed aliquet at. Rutrum tincidunt purus ut velit, egestas amet eu, sagittis, sit. Eget blandit at enim eget. Lorem morbi eget sociis egestas et libero nulla consequat. Neque sit at non est ornare. Pulvinar pulvinar egestas pharetra, diam ipsum vitae magna. Arcu.</p>
                              <p>Resource Needed: <strong>5,0000 USD</strong></p>
                            </Stack>
                            
                            <Stack spacing = {1}>
                              <h3>Goal 2: Lorem ipsum dolor sit amet</h3>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis iaculis et velit. Tristique viverra mauris nibh tortor. Lacinia viverra elementum quis id arcu sit sed aliquet at. Rutrum tincidunt purus ut velit, egestas amet eu, sagittis, sit. Eget blandit at enim eget. Lorem morbi eget sociis egestas et libero nulla consequat. Neque sit at non est ornare. Pulvinar pulvinar egestas pharetra, diam ipsum vitae magna. Arcu.</p>
                              <p>Resource Needed: <strong>5,0000 USD</strong></p>
                            </Stack>
                          </Stack>
                      </Stack>
                  </Grid>

                  <Grid item xs={4} >

                    

                    <Stack spacing = {2}>
                      
                      <Card id= 'side-column-card'>
                        <Stack spacing = {2}>
                          <Stack direction='row' justifyContent="space-between">
                            <Stack spacing = {1}>
                              <h3>{props.props.raised}USD</h3>
                              <p>out of {props.props.target} raised</p>
                              <p>19 more days to go</p>
                            </Stack>
                            <CircularProgressWithLabel variant = 'determinate' value= {75} thickness = {4} size ={80}></CircularProgressWithLabel>
                          </Stack>
                          
                          <h4>Donate Now</h4>
                          <TextField id="outlined-basic" label="Donation Amount" variant="outlined" />
                          <Button variant="contained">Donate</Button>
                          


                        </Stack>  
                      </Card>

                      

                      <Card id= 'side-column-card'>
                        <Stack spacing = {2}>
                          <Stack direction='row' spacing= {2}>
                            <Avatar alt="Remy Sharp" src="data:image/jpeg;base64,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" />
                            <h4>Organization Name</h4>
                          </Stack>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut augue quisque nunc sed sodales. Consequat non.</p>
                          <Button variant="outlined">See Org Info</Button>
                          

                        </Stack>  
                      </Card>
                    </Stack >

                  </Grid>
                </Grid>
              )
      }
    }
  return (
    <div>
      {renderView()}
    </div>
    
  )
}
export default ProjectPage;