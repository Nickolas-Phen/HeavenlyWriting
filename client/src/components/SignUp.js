//taken from https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-up
import React, {useState} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link}    from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import defaultPicture from "./../assets/defaultSignInPic.jpeg"
import {Redirect} from 'react-router-dom'
import httpUser from '../httpUser'
import Calendar from 'react-calendar' //https://github.com/wojtekmaj/react-calendar
import 'react-calendar/dist/Calendar.css';

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

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp(props) {
    const [userInfo, setUserInfo] = useState(
        {
            firstName: '',
            lastName: '',
            birthday: '',
            email: '',
            password: '',
            birthtime: 0,
            username: '',
        }
    );
    const [toUserPage, setToUserPage] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [AM_PM, setAM_PM] = useState("AM");

    const passwordsMatch = () =>
    {
        //if both password fields have input and are equal, return true
        return ((userInfo.password && confirmPassword) && (userInfo.password === confirmPassword))
    };

    const onChangeBirthday = (date) =>
    {
      setBirthday({date});
      const newState = {...userInfo};
      newState.birthday = date;
      console.log(newState.birthday);
      setUserInfo(newState);
    };

    const onChangeText = (e) => {
        //when a user types in info to any box, update userInfo state to match
        const newState = {...userInfo};
        newState[e.target.name] = e.target.value;
        setUserInfo(newState);
    };

    const onAM_PMChange = (e) => {
        //allows AM and PM radio buttons to operate
        const target = e.target;
        if (target.name === "AM")
        {
            setAM_PM("AM");
        }
        else
        {
            setAM_PM("PM");
        }
    };

    const submitUserInfo = async (e) => {
        //When submit button is pressed, send post userInfo to /api/signup and place it in database
        e.preventDefault();
        //add AM or PM to birth time based on selected radio button
        if (AM_PM === "AM")
        {
            userInfo.birthtime += " AM";
        }
        else
        {
            userInfo.birthtime += " PM";
        }
        //create account for user and get their token
        const user = await httpUser.signUp(userInfo);
        //reset fields back to defaults
        setUserInfo({
                firstName: '',
                lastName: '',
                birthday: '',
                email: '',
                password: '',
                birthtime: 0,
                username: '',
            }
        );
        if(user)
        {
            //sign user in
            props.onSignUpSuccess(user);
            //go to user page
            setToUserPage(true);
        }
    };
    const classes = useStyles();

    if (toUserPage)
    {
        return <Redirect to = 'user'></Redirect>
    }
    return (
        <Container component="main" maxWidth= "md">
            <CssBaseline />
            <div className={classes.paper}>
                <img src = {defaultPicture}></img>
                {/*<Avatar className={classes.avatar}>*/}
                {/*    <LockOutlinedIcon />*/}

                {/*</Avatar>*/}
                <h1 component="h1" variant="h5">
                    Sign up
                </h1>
                {/* adding get post inside of form */}
                <form className={classes.form} noValidate method="POST">
                    <Grid container spacing={2} justify="center">
                        <Grid item xs={12} sm={3}>
                            <TextField
                                autoComplete="firstName"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={onChangeText}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={onChangeText}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing = {2} justify="center">
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={onChangeText}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="username"
                                label="Username"
                                id="username"
                                autoComplete="username"
                                onChange={onChangeText}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing = {2} justify="center">
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={onChangeText}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="passwordConfirm"
                                label="Confirm Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={e=> setConfirmPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                        <h3>Select your birthday</h3>
                    <Grid container spacing = {2} justify="center">
                        <Grid item xs={12} sm={3}>
                            <Calendar
                                onChange = {onChangeBirthday}
                                value = {userInfo.birthday}
                            />
                        </Grid>
                    <Grid container spacing = {2} justify="center">
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="placeBirth"
                                label="Place of Birth"
                                name="placeBirth"
                                autoComplete="pbirth"
                                onChange={onChangeText}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="timeBirth"
                                label="Time of Birth (ex: 12:34)"
                                name="birthtime"
                                autoComplete="tbirth"
                                onChange={onChangeText}
                            />
                        </Grid>
                        <Grid>
                        <label>
                        <input
                            name = "AM"
                            type = "radio"
                            value = "option1"
                            checked = {AM_PM === "AM"}
                            onChange = {onAM_PMChange}>
                        </input>
                            AM
                        </label>
                        <label>
                            <input
                                name = "PM"
                                type = "radio"
                                value = "option2"
                                checked = {AM_PM === "PM"}
                                onChange = {onAM_PMChange}>
                            </input>
                            PM
                        </label>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Button
                        component = {Link} to ="/user"
                        //enable button if passwords match
                        disabled = {!passwordsMatch()}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submitUserInfo}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to = "/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}