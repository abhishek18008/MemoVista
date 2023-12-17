import React, { useState,useEffect } from "react";
import { AppBar, Toolbar, Typography,Button,Avatar } from "@material-ui/core";
import useStyles from './styles.js';
import memories from '../../images/memories.jpg'
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { useNavigate,useLocation} from "react-router-dom";
import { _logout } from "../../features/authSlice.js";

const Navbar = () => {
  const classes = useStyles();
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const location=useLocation();

  const logout=()=>{
    dispatch(_logout())
    setUser(null);
    navigate('/');
  }

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div>
      <Toolbar>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
