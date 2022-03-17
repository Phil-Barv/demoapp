/* Page for users to edit their profile.
Currently, we only list their display name and user email.
*/

import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../../firebase";


const individual_project_page = () => {

  return (
    <div>
        <Stack spacing={2}>
        <Typography variant="h3">Find Meaningful Projects</Typography>
        <Typography variant="h4">Popular Near You</Typography>
        </Stack>
    </div>

  )
  
}
export default individual_project_page;