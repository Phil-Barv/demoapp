import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../../firebase";


const EditProfile = () => {

  const [user, loading, error] = useAuthState(auth);

  return (
    <Stack spacing={2} height="80vh">
        <Paper component="form" sx={{background:"none",outline:"none",boxShadow:"none"}}>
          <Typography mb={2} variant="h5" component="h2">Profile Information</Typography>
          <Stack direction="row" alignItems="center" spacing={3} mb={2}>
          <div>
            <b> Name: </b>
            {(user) ? user.displayName : ""}
          </div>
          <div>
            <b> Email: </b>
            {(user) ? user.email : ""}
          </div>
          </Stack>
        </Paper>
    </Stack>

  )
  
}

export default EditProfile;