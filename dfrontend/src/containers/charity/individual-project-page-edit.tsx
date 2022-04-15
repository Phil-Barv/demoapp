/* Page for users to edit their profile.
Currently, we only list their display name and user email.
*/

import Stack from "@mui/material/Stack";
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
// import Layout from '@mui/material/Layout';
import { CircularProgress } from '@mui/material';
import CircularProgressWithLabel from '@mui/material/CircularProgress';
import { ImageList, ImageListItem } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Avatar } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";



interface IndividualProjectPageEditProps{
  donorID: number
}

const IndividualProjectPageEdit = (props:IndividualProjectPageEditProps) => {

  return(
    <Grid>
        <Grid item xs = {8}>
         <Stack spacing ={4}>
          <Stack spacing={2}>
          <h2>Project Name</h2>
          <TextField required id="project_name" label="Project Name" variant="outlined" />
          </Stack>

          <Stack spacing={1}>
          <h2>Project Description</h2>
          <TextField multiline required id="project_description" label="Project Description" variant="outlined" />
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
                <h3>Goal 123</h3> 
              </Grid>
              <Grid item xs ={10}>
                <TextField required fullWidth id="goals_name" label="goal name" variant="outlined" />
              </Grid>
            </Grid>
            <TextField multiline required id="goals_description" label="goal description" variant="outlined" />
          </Stack>

            </Stack>

        </Grid>
        <Grid item xs ={4}>
            <Button variant ='contained'>Save Changes</Button>
            <Button variant ='outlined'>Discard Changes</Button>

        </Grid>
    </Grid>
  )
}

export default IndividualProjectPageEdit;