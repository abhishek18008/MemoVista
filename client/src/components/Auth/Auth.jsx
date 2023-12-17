import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles.js'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input.jsx';
import { GoogleLogin } from '@react-oauth/google';
import Icon from './Icons.jsx';
import { jwtDecode } from "jwt-decode";
import {login,jwtsignin,jwtsignup} from '../../features/authSlice.js';
import { useNavigate } from 'react-router-dom';

const initialState = {
   firstName: '', 
   lastName: '', 
   email: '', 
   password: '', 
   confirmPassword: '' 
};

const Auth = () => {
  const dispatch=useDispatch();
  const classes = useStyles();
  const navigate=useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState(initialState);

  const [isSignup, setIsSignup] = useState(false);

  const handleShowPassword = () => setShowPassword((pre) => !pre);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    if (isSignup) {
      dispatch(jwtsignup(form));

    } else {
      dispatch(jwtsignin(form));
      navigate('/');
    }

  }


  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value})
    
    
  }

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (response) => {
    console.log("google login success",response);
    try {
      const decoded=jwtDecode(response.credential);
      console.log(decoded);
      dispatch(login(decoded));
      navigate('/');
    } catch (error) {
      console.log(error);
      
    }
  };

  const googleError = (error) => alert('Google Sign In was unsuccessful. Try again later','the error is ',error);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          {/* <GoogleLogin
             render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess} onError={googleError}

          /> */}
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>

        </form>
      </Paper>
    </Container>
  )
}

export default Auth