/* Page for users to edit their profile.
Currently, we only list their display name and user email.
*/

import Stack from "@mui/material/Stack";
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import { Carousel, CarouselItem } from "react-bootstrap";
// import Layout from '@mui/material/Layout';
import { CircularProgress } from '@mui/material';
import { ImageList, ImageListItem } from "@mui/material";
import CircularProgressWithLabel from '@mui/material/CircularProgress';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import { flexbox } from '@mui/system';
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Avatar } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Image_upload from "../../components/image_upload/image_upload"

interface IndividualProjectPageProps{
  donorID: number
}

const IndividualProjectPage = (props:IndividualProjectPageProps) => {
  

  
  return (
    <Grid container spacing={2} height = "fit-content">
      <Grid item xs={8}>

          <Stack spacing={5} height="fit-content">
            
              <h1>Project Name</h1>
              <img src = 'https://dqelp6tva12fr.cloudfront.net/original_images/charities.jpg' alt="people unpacking donation boxes"/>
              
              <Stack spacing= {2}>
                <h2>What is this project about?</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis iaculis et velit. Tristique viverra mauris nibh tortor. Lacinia viverra elementum quis id arcu sit sed aliquet at. Rutrum tincidunt purus ut velit, egestas amet eu, sagittis, sit. Eget blandit at enim eget. Lorem morbi eget sociis egestas et libero nulla consequat. Neque sit at non est ornare. Pulvinar pulvinar egestas pharetra, diam ipsum vitae magna. Arcu.</p>
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
                  <h3>75,000USD</h3>
                  <p>out of 100,000 raised</p>
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
                <Avatar alt="Remy Sharp" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBAQEBAWEBAVDRYbDRUVDRcQEA4WIB0iIiAdHx8kKDQsJCYxJx8fLTstMTM3MDAwIys9TT81NzQuMEABCgoKDg0OFQ8PFTcZFhkrKzcrNyswOC83KysrKys4Ky43MS41LTc3KystNysrKy0rKzcrKysrKy0rKysrKysrLf/AABEIAMgAyAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBAYFB//EADkQAAIBAgMEBwcDBAIDAAAAAAABAgMRBAUhEjFBUQZhcYGRobETIiMywdHwUmLhBxRC8TNDU4OS/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAECAwQFBv/EACYRAAICAgIBBAEFAAAAAAAAAAABAhEDIRIxQQQiUWEUEyMygdH/2gAMAwEAAhEDEQA/ANqwWg2CYm4DBYbQLQAAxgmhgECIcYAGGCGAARmEMwAjZHJhyIpMQASAHGAkZjDsQDGYzHGYAMxmOIYwWIdgsAGYhxwA0rBZI0A0AAMFoksC0AyNjNBMFgAw1hxAIEZjszfS3pVHBJQjD2laUbxT0hGN2rvw3ADdGhnJJNtpJb23ZI4uYdKsFRTcsRCbTtswl7SV+48yzvpXisXeM5qFN/8AXCOzD7vvZwjRQ+TNz+D0rEf1FobDcKNR1L6Rk4xjbtV/QmyvpvhqzUailQm/1O9O/b90eXiHwRPNnut+Ix49lWfYnDOPs6j2E/kb2oeHDuN3knTKliJKnOLpzcd91sN8iHBopSTNMMNCae5p94RBYww4wAMMOKwxgsZhDMAGEIcANOCwxmAEbBaDYLAAGgWg2gWgGAMwiOrLZTb3JNsAMf006YrCv2FG0qzj8SX/AIeXf6Hl+NxlStNzqzc5ve5O7CzLEOrWrVXq5VZS8WVjaMaMJOxCQrB+z0v1jJAES06LvZgyh3dQWFACTEIYGn6O59VgtlyclHdd3Nhl+fwnZS0Z5pltW0tnnxOvFtbjOUS4s9OhVUtU7hWPP8JmtSnuehpMsztTspbzNxLs7dhhRmnqOIYIzCGGMYQhwA1DQLRJJAMABaAZIwWgAjYLDYLQDAZTzOoo0asnuVKW11qzLrKeNp7UJRte8Xo+wAZ4Hq2297kT/wBk2rpNq2rtu1Oh0cyuWIxUKVv87z/ak9T1OFPCYCnsSau/lWztTn3cgnl46Q8ODmrb0edZR0QrV6UqkUk/8U9GzoYPoVUlTXtPcltO/UuvyNnSzunKyUJRTdr+zsky/WpxcU4zTuZPJJnZH0+Mw+XdCVSlt1Z7VpJwtx7SPH9EKUtpxk4tyvu3dSN5GgthtvQ4Wb42FJNRTk+pE853aZp+jjUaoxU+iqi7ubkk9Vaxy8dlLhtPhvRo62dyV3Ok9nqepUr16dVPZd1bsaNFKd2zlnjxVSMvhpbM4vr4ndSOHjKexNrk9Ow7kNy7EdD3s4ap0EHSqOLugBCKNXkmZXtFs0UXc8+wFW0kbfL6u1FPqIZSLTGY7GEMYQhAM1jAaJGDJAMjaGZI0AwAjYLDkgWIRGyBosSRXkBRhf6eYVQxmOvvhOUVffbbf2NUsnpVakq04ud/lb3acr/6OfhskpvG19mpODqQ257FWdOW0pW1aa0d/JHbhS2qMKc37qgotKbi3ZWafgYzau0duGDUeLRQx+Pw9K0WkpcE5Q+4qNaE7W93Xi1byfqRZjkGEmoxVCEWl7to6ogxOHnQobFKLleSXz2su3etbbnpdCtNmqtJssZhVdPRvRa9xy6uPpxV6uyov9UrP0+pT6TZaoU4ySvVt1JX5KyGynDOvHaqKMpp+7tJTtH8uHFdicpN0VsXmuHqaQnSfJWt9Th16UIOUlp+qytb1NpXydNaqFuKVNI4mOwcYJpLZ7FZMpSV0Zzxyq2YrNZqU007rZOrRTUYp79lEOMpxU03G/w3w4p/yWmdCeqPPnFp2MISHKIJcO/eRs8ln7iMTTeqNbkEtCZDR3RmEMyShhhxgGa5jNBsFoBgWBaDaBYARtAMlkgGhARSRBULEiCqAyvSoxjXhO/vTUo24Wsm34rzJq+GqRbcNlptvZlda8bNbvDix6ME3F2u4ttPatb7nSxLWy2+COZabPQU7UTOYmFW6bhFf+6/0Cu24xlK7WqShp3viS4aDrS9q/8AjT9xfq6yzUnayio3W9yTbFdm5nuktByj12vHgcXAVXTktqUqTlZJ2Uoy5X5GlzuVSq3GkouUVxlojI5lSrVUoz2INS1cIyS07WxxE15NV7Oco3dVtc1CH2OPmODVm3OUnzbX0QeBzKUGlvT3oLpHXUYtLitATd0EqoxGLXxErXTjJPqv/oIOq9XvWiI7nXDo8nM/A4hhyzEKG9GpyCSMqjqZZjNlolgjcIFkGAxKmi3KBBZGMO0IYzYNAsMFiKBBaDYLGBG0AyRkcgERTZWqlmoVK7EMhmzqYlKrRdt0oNO3DmceciXBY7YbjJ+49/7XzMpq0a4p1IoY7H4rDUvhYeNfZXvJzcWubS4rjY6FF4itThUp7DUleNo+W/qZ0ZQT1KNfASV3Rm6TbW1svZ1/GzBNtUejFq/9KWMynF6ygqansXbt5GRzyniqcW5OEbyVrxtwvzNRiK+KilFV6trWk3CDfo/EyGaYeo53m5yStZzm5PTRWTLjRUlLjuiLoxQq1ZOrXkowjqko2cu3kXc0rqSVSX+VRyS5U0rR8d4Eaip0Wt1/m7DgY7Gym9X/AAuRSTlKzknNQjRFUqXbfWMmRJhI6+jzG7dkiHBQ6YxBFjCrUrFrB7xMZr8ni0lc7Jycrfuo6SkQWNMQ0mIBmyaBZI0C0IoCwLDYLACNkUiWRBUYxENRlOtInqzKVWQmMhqTK8nd2XHQDG4iFNXnOMI85SUV5j5LWhXqRdOcakVO8nGSklbXgRLSsqKtpGncWtUtP8kPa6vF3LFJaEFWjbWLt2HL9nenujl4yLvyM3nEFFuU3ZHfzKpUjro+4wnSDG1Jys9OWgR2zScqic/H4z2j2Vor6nJb1faW5aK/JHOTO3Ejy/USurJ0wkyFSDTNTmJkwkRINMBkiOnllC7RRw1JyZqcowdrNksaOpg6WykWbgxVh7kmgrjgiADcNAtBsFgMBoGSDZQzTNcPhlevVjT0uk3ecuxLViKSvonmVazMdm/9R6cbrDUXP91R7K/+Vr5ox+ZdLMbX0lWcF+mn8NeK18xlrFI9CzfPcNQdqtZKX6V78/Bbu8yOcdN7xaw0Gm3pOaV11pffwMe9W+d9esCor/yVFKwnjqLaNF0Wy9ZhXqSxM5VXBJqLnvu3v8Nx6llOBhSiowioq+5KyR4/0Qzf+1xUZv8A42tmo7e6k+Pc7HtWDqqWqOb1CfL6NfSuPD7OhFDNIdMZtGZZzM1jdWS4nn3SnZjLZ4noeZV1GEtNbaHlWaqTqSlN3bkEFs0m/bRzcSvcdt9tDj+2s7STi+s7VbcczMaScdFqjqxutHBmhexoskizm0qslpfTky5CquOhuzmim+iymSQ1YNKi5arUv4PBSb3EjOrk2Fu0zU0IWRzssw2ykdVEM0Q7GEM2IYhwWIAN6ytjcTClCdWpJQhGN5t8EWWYnp3j1NrCp6KO1Ws97e5c92vehN0bYcTyS4oz/SLp/WqylTwvwadvn/7pd/Du16zD4nESk3KUnKT+ZuW032snxq8U7S0v3/nIqOF9w0dLio6RE5CUgWNcozskTFNXVgIssUl6fn56h0UvcqKVTm/Pd4HpXQPpA5U1Sk/iU1pf/sp/x6GArU+Ona9bIbK8Y6FWFSL+WV2+Y8kecTljeLJT6Z79h8YpK25hSqWucDLMXGpCE4O8XFOD6vzQWPx8lojz2z0lFeC1mVTRtbzz3N4N1etvRGzo7c7XehysbgPiubXYOLphONqjI4zDOLae9W8y1l2Bjf3ldnUxmAdWe0uGnaVsypf2tGVWc7NaQSXzS4I0Ur0jnlDjbZgKitJr9zJkyvdt9bJ0zufRw4u2T4fESpu8XZmjyrpLC6VaCX7kjLyERRq4pnq+BxNOpG9OSkvMtXPKMBj50ZJxk0urgbDLOkt7Kr3SQqM3o09xXIqNeM1eLug2yQHbECIANxmWMjQpVK0/lhBt62u+C73oeSzxE6ntKstZVJNy039duXpzNb/UzHWhSw8XZye3PsWkfO/gZCKaju3rlx5/z5mc2ev6HHUXL5ODmdtu97pqz3P78SvTklJX/nf+eRdx6umr3v5eb/O04nteHI0jtGeV8ZWT5lQ2JtcCnc6mKftKMJ8bNS14pfZHKiyl0c+VJS10w0WKLK/3J6b3Awgy1fTVflijiKVuxfKi5GW/sYpx39/qEZUy82JZEW+jOfVcLNQvtQlK84t6Q678OBtaWZ08TJbDtJaTg1s1IPimjzarR37N3fjxJI1G/ei3GdOPu2dnJW8br07NSeKM9o5oZZ4dNWj1mlU2dCpmGIbtZHnC6TYyKilXbtG7vGM34tE0ukuKVNSnKLcvkvBJtLfLTst48jD8aRv+bB+DXf36hF3/AFMwfSPOJ4mpa/w46QXPmytiM1rTvtTbT3pJL0KtOF9WbQxKG2c2XO8ntiPTjxJEIKK9S27FCNaCaEHwIoyEavQ7RLhq+y7P5fQapGyIHzQyJx+TSZdmE6TTi9OXA2eAxsa0U1v4o86wM7wXNOzOrl2NlSkmnpxE0YJ06Ny2IgwmJjVipR7xiSzk9Ksw9vjask/djNxg09NmOm+/HfvW/rIcR7sI3ata99NOvd56d5Qpayvre+97+rv38eZfx9lFNblFXt99NfyzMX2fRYo8YOjk4pt8/VXXb9/rbh4ynZu27idmlJSur624ceflr3dRSx9C3K1tfL+P9GkXTo4c8eUbBy93oTXKfqrfQ5j0Z0cmelaP7Yvwf8lLFQtJrrLXbOae8cWMTU3uIYk0F6oGKJNF+gfB9n1I4/ReoSfp9STZDpvRb9fqBK2jtqtz5Pt7iaK2vzrK7+v3GhSWi/DKpVKUsUqb9lGTVTZkldpJ6K+i1V+XkcfEPad32LlFckWlipxpypqVoSs5Lu09Sm2XbOSUFfREqaJLDxQn9ABRSGsSQQCXqSxWniIqKBvvXURUwqrBpcBibuVE9bh2ESJqyI7adokVPsny2Ws1zs0dBHKwEviW5pnVQzlfZoejNbVxb7BHHwVdwmmuY5LBMlwDvbh+a/nV1a9DME9h24w4L0f52CEYS7PpsW8bMjXrShVbTs1N+p0o4yFZKLWzPhutJ8BCNWtJnl45tTcfDK+VQ2a1WPOi1u61zKWYfO3z18dRCGuxZF+1/bIYFmmt3cOIbM8YcVu7vz88xtNO64hCNg4ytb84g148fziIQB4Ks2RsQijmYSGsIQAOg76CEA0VqrDgtwhDMo/yJ5kVae4QhI0yPTGwT+JHv9DsxEIbORhIcQgA/9k=" />
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
export default IndividualProjectPage;