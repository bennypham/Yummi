import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Yummi
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignUpPage = () => (
    <SignUpForm />
);

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { firstName, lastName, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.firebase.doAddName(firstName, lastName)
        this.props.history.push('/home');
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const invalid = this.state.passwordOne === '' ||
                  this.state.email === '' ||
                  this.state.firstName === '' ||
                  this.state.lastName === '' ||
                  this.state.passwordTwo === '' ||
                  this.state.passwordOne !== this.state.passwordTwo
    return (

<div><br/><br/><br/>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="paper">
        {/* <Avatar className="avatar">
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Sign up
        </Typography><br/>
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={this.state.firstName}
                onChange={this.onChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={this.state.lastName}
                onChange={this.onChange}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordOne"
                label="Password"
                type="password"
                id="passwordOne"
                value={this.state.passwordOne}
                onChange={this.onChange}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordTwo"
                label="Confirm Password"
                type="password"
                id="passwordTwo"
                value={this.state.passwordTwo}
                onChange={this.onChange}
                autoComplete="current-password"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <br/><br/>
          <Button
            disabled={invalid} 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
            onClick={this.onSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        {this.state.error && <p>{this.state.error.message}</p>}
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </div>

/* 
      <form onSubmit={this.onSubmit}>
        <input
          name="name"
          value={this.state.name}
          onChange={this.onChange}
          type="text"
          placeholder="Name"
        /><br/>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        /><br/>
        <input
          name="passwordOne"
          value={this.state.passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        /><br/>
        <input
          name="passwordTwo"
          value={this.state.passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        /><br/>
        <button disabled={invalid} type="submit">
          Sign Up
        </button>

        {this.state.error && <p>{this.state.error.message}</p>}
      </form> */
    );
  }
}

const SignUpForm = withRouter(withFirebase(SignUp));
export default SignUpPage;
