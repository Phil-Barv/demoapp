/* Page for users to edit their profile.
Currently, we only list their display name and user email.
*/

import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";


const EditProfile = (props) => {

  return (
    <Stack spacing={2} height="80vh">
        <Paper component="form" sx={{background:"none",outline:"none",boxShadow:"none"}}>
          <Typography mb={2} variant="h5" component="h2">Profile Information</Typography>
          <Stack direction="row" alignItems="center" spacing={3} mb={2}>
          <div>
            <b> Name: </b>
            {(props.user) ? props.user.displayName : ""}
          </div>
          <div>
            <b> Email: </b>
            {(props.user) ? props.user.email : ""}
          </div>
          </Stack>
        </Paper>
    </Stack>

  )
  
}

export default EditProfile;