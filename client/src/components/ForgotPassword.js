import React, {useState} from "react";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';

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

export default function ForgotPassword() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);//state for whether the user has submitted an email
    const onChangeText = (e) => {
        //when a user types in info to email box, update email state to match
        setEmail(e.target.value);
    };

    const checkValidEmail = () =>
    {
        return !(!email.includes("@") || !email.includes(".com"));

    };

    const sendEmail = () =>
    {
        //TODO: figure out how to send an email to someone
    };

    const submitPressed = async (e) =>
    {
        e.preventDefault();
        setSubmitted(true);
        sendEmail();
    };
    if (!submitted) {
        return (
            <Container component="main" maxWidth="md">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Typography>
                            To recover your password, please enter your email in the box. If that email is linked
                            to an account, you will receive an email with instructions on recovering your password.
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={onChangeText}
                        />
                        <div>{email && (!checkValidEmail()) ? <font color = "red" >That doesn't look like an email address</font> : null}</div>
                        <Button
                            component={Link} to="/user"
                            disabled = {!checkValidEmail()}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={submitPressed}
                        >
                            Submit
                        </Button>
                    </form>
                    <Grid container justify="flex-end">
                    <Grid item>
                        <Link to = "/signin" variant="body2">
                            Return to sign in
                        </Link>
                    </Grid>
                </Grid>
                </div>
            </Container>
        );
    }
    else
    {
        return (
            <Container component="main" maxWidth="md">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Typography>
                            Thank you. You should receive an email shortly with instructions on recovering your password. If you would like us to send another email, press the button.
                        </Typography>
                        <Button
                            component={Link} to="/user"
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={sendEmail}
                        >
                            Send another email
                        </Button>
                    </form>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to = "/signin" variant="body2">
                                Return to sign in
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        );
    }
}