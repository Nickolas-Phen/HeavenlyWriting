import React, {useState} from 'react';
//import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link}    from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Redirect} from 'react-router-dom'
import httpUser from '../httpUser.js'

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    image: {
        height: '200px',
        width: '900px',
    },
}));

export default function SignIn(props) {
    const classes = useStyles();
    const [toUserPage, setToUserPage] = useState(false);
    const [fields, setFields] = useState(
        {
            username: '',
            password: '',
        }
    );
    const [loginFailed, setLoginFailed] = useState(false);//state for showing failed to log in message
    const onChangeText = (e) => {
        //when a user types in info to any box, update fields state to match
        const newState = {...fields};
        newState[e.target.name] = e.target.value;
        setFields(newState);
    };

    const loginPressed = async (e) =>
    {
        e.preventDefault();
        const user = await httpUser.logIn(fields); //returns user token if user is in db
        if (user) {
            //travel to user page
            setToUserPage(true);
            //sets current user to the logged in user
            props.onLoginSuccess(user);
        }
        else
        {
            //failed to login, show failure message
            setLoginFailed(true);
        }
    };


    if (toUserPage)
    {
        return <Redirect to = 'today'></Redirect>
    }

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={onChangeText}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={onChangeText}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <div>{loginFailed ? <font color = "red" >Incorrect username or password</font> : null}</div>
                    <Button
                        component = {Link} to ="/user"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={loginPressed}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to = "/forgotpassword" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to = "/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}