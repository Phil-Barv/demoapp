import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../firebase";


const EditProfile = () => {
  
  const [user, loading, error] = useAuthState(auth);

  return (
    <Stack spacing={2} height="80vh">
        <Paper component="form" sx={{background:"none",outline:"none",boxShadow:"none"}}>
          <Stack direction="row" alignItems="center" spacing={3}>
          <Typography variant="h4" component="h2">Profile Information</Typography>
            <Fab size="small" color="primary" aria-label="edit">
              <EditIcon />
            </Fab>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={3} mb={2}>
          <label>
            <TextField id="standard-basic" label="Profile Name" variant="standard" />
          </label>
          <label>
            <TextField id="standard-basic" label="Email" variant="standard" />
          </label>
          </Stack>
          <Button sx={{marginLeft:"auto"}} variant="outlined">Save</Button>
        </Paper>
    </Stack>

  )
  
}

export default EditProfile;