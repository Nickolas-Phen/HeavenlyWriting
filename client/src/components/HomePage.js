import React, {useState} from 'react';
//import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link}    from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import defaultPicture from "../assets/defaultSignInPic.jpeg";
import {Redirect} from 'react-router-dom';
import './HomePage.css';
//import Button from 'react-bootstrap/Button';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Heavenly Writing
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
export default function HomePage(props) {
return (
<div>
     {/* If I end up having a problem with background image just switch it to div and remove from body in css */}
    <div class="navbar">
    <a href="#home">Sign Up</a>
    <a href="#news">Sign In</a>
    <a href="#contact">Contact</a>
  </div>
 <div class="pic"> 
<h1 >Heavenly Writing Astrology</h1>
{/* About information */}
<hr class="line"></hr>
<h2>About</h2>
<div class="box">
<p>
The application leverages the current popularity of astrology and empowers others to shift their relationship to time and move through their world in ways that are more sane, present, and sustainable.

The identification of patterns and trends allows users to plan more wisely, reducing stress and becoming more aware of their own personal relationship to time and its cycles. Helps users create a schedule that works for them, rather than mindlessly overscheduling and living in states of overwhelm and exhaustion. Over time, the biodynamic feature shows patterns connected to lunation phase, moon sign or placement, season, etc., which help users forecast future trends and schedule high demand events on high energy days. 

Increases awareness of the right action at the right time and one’s individual peaks and troughs of energy. 

Connects people to a more nature-based, embodied sense of time.

</p>
</div>
{/* These are the 2 buttons */}
<button >SignIn</button>
{/* <Button variant="success">SignUp</Button> */}
<hr></hr>
<Button                   type="submit"
                        variant="contained"
                        color="primary"
                        
                        
                    >
                        SignUp
                    </Button>
<Box mt={8} class="cr">
            <Copyright />
        </Box>
{/* 
      <h1 >Heavenly Writing</h1>
        <Box mt={8} class="cr">
            <Copyright />
        </Box> */}
  
  </div>
  </div>
);
}