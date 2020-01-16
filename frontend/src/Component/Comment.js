import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withFirebase } from '../Firebase';


const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: "100%",
      },    
    },
  }));
  
     function Comment(props) {
    const classes = useStyles();
  
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Comment"
            multiline
            rows="5"
           // defaultValue=""
            variant="outlined"
          />

        </div>
        <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={()=> props.firebase.doAddComments(props.recipe_id, document.getElementById("outlined-multiline-static").value)
}>
        Send Comment
      </Button>

            </div>
      </form>
    );
  }
  
  export default withFirebase(Comment);