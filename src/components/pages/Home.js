import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import List from "../student/List";
import axios from "axios";
import { useState } from "react";
const useStyles = makeStyles({
 headingColor: {
  backgroundColor: deepPurple[400],
  color: "white"
 },
 addStuColor: {
  backgroundColor: green[400],
  color: "white"
 },
})

const Home = () => {
 const classes = useStyles();
 const [student, setStudent] = useState({
  body: "",
  title: "",
  userId:""
 });
 const [status, setStatus] = useState();

 function onTextFieldChange(e) {
  setStudent({
   ...student,
   [e.target.name]: e.target.value
  })
 }

 async function onFormSubmit(e) {
  e.preventDefault()
  try {
   await axios.post(`http://localhost:3333/students`, student)
   setStatus(true);
  } catch (error) {
   console.log("Something is Wrong");
  }
 }
 if (status) {
  return <Home />
 }
 return (
  <>
   <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
    <Typography variant="h5">React API</Typography>
   </Box>
   <Grid container justify="center" spacing={4}>
    <Grid item md={6} xs={12}>
     <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
      <Typography variant="h4">Add Person</Typography>
     </Box>
     <form noValidate>
      <Grid container spacing={2}>
       <Grid item xs={12}>
        <TextField autoComplete="body" name="body" variant="outlined" required fullWidth id="body" label="Body" onChange={e => onTextFieldChange(e)}/>
       </Grid>
       <Grid item xs={12}>
        <TextField autoComplete="title" name="title" variant="outlined" required fullWidth id="title" label="Title" onChange={e => onTextFieldChange(e)} />
       </Grid>
       <Grid item xs={12}>
        <TextField autoComplete="number" name="userId" variant="outlined" required fullWidth id="userId" label="userId" onChange={e => onTextFieldChange(e)} />
       </Grid>
      </Grid>
      <Box m={3}>
       <Button type="submit" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}>Add</Button>
      </Box>
     </form>
    </Grid>

    <Grid item md={6} xs={12}>
     <List />
    </Grid>
   </Grid>
  </>
 )
}

export default Home
