//taken from https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-up
import React, {useState} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link}    from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Redirect} from 'react-router-dom'
import httpUser from '../httpUser'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


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
            birthTime: 0,
            username: '',
            phoneNumber: '',
            placeOfBirth: '',
            mailchimp: 'false',
        }
    );
    const [toUserPage, setToUserPage] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [AM_PM, setAM_PM] = useState("AM");
    const [uniqueEmail, setUniqueEmail] = useState(true);
    const [uniqueUsername, setUniqueUsername] = useState(true);

    const passwordsMatch = () =>
    {
        if(!((userInfo.password && confirmPassword) && (userInfo.password === confirmPassword)))
        {
            //console.log("The passwords do not match");
        }
        //if both password fields have input and are equal, return true
        return ((userInfo.password && confirmPassword) && (userInfo.password === confirmPassword))
    };

    const checkValidTime = () =>
    {
        //make sure the time field is a time
        const time = userInfo.birthTime;
        if (time.length !== 5)
        {
            //console.log("Invalid length for time of birth.")
            return false;
        }

        const hours = time[0] + time[1]; //grab hour part of string
        const hours_int = parseInt(hours); //make sure it is an int
        if (isNaN(hours_int) || (hours_int > 12))//make sure hours are a number less than 13
        {
            //console.log("Error: Hour value greater than 12");
            return false;
        }
        if (time[2] !== ':')//make sure time has colon
        {
            //console.log("Error: No colon in time statement.");
            return false;
        }
        const minutes = time[3] + time[4];
        const minutes_int = parseInt(minutes);
        if (isNaN(minutes_int) || (minutes_int > 59)) //make sure minutes are numbers under 60
        {
            //console.log("Error: Minute value greater than 60");
            return false;
        }
        return true;
    };

    const checkValidPhoneNumber = () =>
    {
        //make sure the phone number is valid
        let phoneNum = userInfo.phoneNumber;
        if (!((phoneNum.length === 10) || (phoneNum.length === 12)))
        {
            return false;
        }

        if (phoneNum[3] === '-' && phoneNum[7] === '-')
        {
            let temp = '';
            for (var i = 0; i < phoneNum.length; i++)
            {
                if (i !== 3 && i!== 7)
                {
                    temp = temp + phoneNum[i];
                }
            }
            phoneNum = temp;
        }
        const phone_int = parseInt(phoneNum); //make sure it is an int
        console.log(phone_int);
        if ((phone_int < 1000000000) || (phone_int > 9999999999))
            {return false;}
        return true;
    };

    const checkValidEmail = async () =>
    {
        const email = userInfo.email;
        if (!email.includes("@") || !email.includes(".com"))//make sure email has @ and .com in it
        {
            return false;
        }
        return true;
    };

    const emailIsUnique = async (email) =>
    {
        //check if email is unique
        const response = await axios.get('/api/user/email/' + email);
        if (response.data.message === "not unique")//if email is not unique
        {
            setUniqueEmail(false);
        }
        else
        {
            setUniqueEmail(true);
        }
    };

    const usernameIsUnique = async (username) =>
    {
        //check if email is unique
        const response = await axios.get('/api/user/username/' + username);
        if (response.data.message === "not unique")//if username is not unique
        {
            setUniqueUsername(false);
        }
        else
        {
            setUniqueUsername(true);
        }
    };

    const checkValidBirthday = () =>
    {
    //make sure the birthday field is in the correct format (01/31/2000)
        const birthday = userInfo.birthday;
        if (birthday.length !== 10)
        {
            //console.log("Invalid length for birthday");
            return false;
        }

        const month = parseInt(birthday[0] + birthday[1]); //grab month part of string
        const day = parseInt(birthday[3] + birthday[4]);//grab day part of string
        const year = parseInt(birthday[6] + birthday[7] + birthday[8] + birthday[9]);//grab year part of string

        if (isNaN(month) || (month > 12) ||(month < 1))//make sure month exists
        {
            //console.log("Error: month value greater than 12 or less than 1");
            return false;
        }
        if (birthday[2] !== '/' || birthday[5] !== '/')//make sure birthday has slashes
        {
            //console.log("Error: Missing slash in birthday");
            return false;
        }
        if (isNaN(day) || (day > 31) || (day < 1)) //make sure calendar day exists
        {
            //console.log("Error: Invalid day");
            return false;
        }
        //make sure calendar days exist for specific months
        const shortMonths = [4,6,9,11]; //months with 30 days
        if (shortMonths.includes(month) && day > 30)//make sure max day for short months is 30
        {
            //console.log("Error: day doesn't exist for that month");
            return false;
        }
        if (month === 2)//special case for February, lots of logic for determining leap year
        {
            if (year%4 === 0)
            {
                if (year % 100 === 0)
                {
                    if (year % 400 === 0) {
                        //is a leap year
                        if (day > 29) {
                            //console.log("Error: over 29 days for leap year");
                            return false;
                        }
                    }
                    else if (year % 400 !== 0)
                    {//centennial year that is not divisible by 400 is not a leap year (ex: 1900)
                        if (day > 28)
                        {
                            //console.log("Error: not a leap year, over 28 days");
                            return false;
                        }
                    }
                }
                //is a leap year
                if (day > 29) {
                    //console.log("Error: leap year, over 29 days");
                    return false;
                }
            }
            else {
                //is not a leap year
                if (day > 28)
                {
                    //console.log("Error: not a leap year, over 28 days 2");
                    return false;
                }
            }
        }
        return true;
    };

    const onChangeText = (e) => {
        //when a user types in info to any box, update userInfo state to match
        const newState = {...userInfo};
        newState[e.target.name] = e.target.value;
        setUserInfo(newState);
        if (e.target.name === "email")
            emailIsUnique(e.target.value);//check if email is unique
        else if (e.target.name === "username")
            usernameIsUnique(e.target.value);//check if username is unique
        // else if (e.target.name === "birthday")//check if birthday is in valid format
        //     checkValidBirthday(e.target.value);
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

    const onMailchimpChange = (e) => {
        const target = e.target;
        console.log(target);
        if (userInfo.mailchimp === 'false')
        {
            userInfo.mailchimp = 'true';
        }
        else 
        {
            userInfo.mailchimp = 'false';
        }
    };

    const submitUserInfo = async (e) => {
        //When submit button is pressed, send post userInfo to /api/signup and place it in database
        e.preventDefault();

        //make birthtime into military time by adding 12 hours for pm
        if (AM_PM === "PM")
        {
            var hours = parseInt(userInfo.birthTime[0] + userInfo.birthTime[1]);
            hours += 12;
            const hours_string = hours.toString();
            const newState = {...userInfo};
            const newTime = hours_string + userInfo.birthTime.substring(2,6);
            console.log("new time: " + newTime);
            newState["birthTime"] = newTime;
            setUserInfo(newState);
        }
        //create account for user and get their token
        
        const user = await httpUser.signUp(userInfo);
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
        return <Redirect to = 'today'></Redirect>
    }
    return (
        <Container component="main" maxWidth= "md">
            <CssBaseline />
            <div className={classes.paper}>
                <h1>
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
                        <Grid container spacing = {2} justify="center">
                        
                        <Grid item xs={12} sm={3}>
                            <TextField
                             
                                variant="outlined"
                                required
                                fullWidth
                                name="phoneNumber"
                                label="Phone Number"
                                type="phoneNumber"
                                id="phoneNumber"
                                autoComplete="phone-number"
                                onChange={onChangeText}
                            />
                        </Grid>
                    </Grid>
                    </Grid>
                        <h3>Select your birthday</h3>
                    <Grid container spacing = {2} justify="center">
                        <Grid item xs={12} sm={3}>
                            <TextField

                                variant="outlined"
                                required
                                fullWidth
                                name="birthday"
                                label="Birthday (ex: 01/30/2000)"
                                type="birthday"
                                id="birthday"
                                autoComplete="birthday"
                                onChange={onChangeText}
                            />
                        </Grid>
                    <Grid container spacing = {2} justify="center">
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="placeOfBirth"
                                label="Place of Birth"
                                name="placeOfBirth"
                                autoComplete="pbirth"
                                onChange={onChangeText}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="birthTime"
                                label="Time of Birth if known (ex: 12:34)"
                                name="birthTime"
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
                    <FormControlLabel
                        control={<Checkbox value="mailchimp" color="primary" />}
                        label="Opt into Mailchimp"
                        onChange = {onMailchimpChange}
                    />
                    </Grid>
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Recieve Email updates"
                    /> */}
                    <div>{userInfo.password !== confirmPassword ? <font color = "red" >Passwords don't match</font> : null}</div>
                    <div>{userInfo.birthTime && (!checkValidTime()) ? <font color = "red" >Invalid time</font> : null}</div>
                    <div>{userInfo.email && (!checkValidEmail()) ? <font color = "red" >That doesn't look like an email address</font> : null}</div>
                    <div>{!uniqueEmail ? <font color = "red" >That email is already in use</font> : null}</div>
                    <div>{!uniqueUsername ? <font color = "red" >That username is already in use</font> : null}</div>
                    <div>{userInfo.phoneNumber && (!checkValidPhoneNumber()) ? <font color = "red" >Invalid phone number.</font> : null}</div>
                    <div>{userInfo.birthday && (!checkValidBirthday()) ? <font color = "red" >Invalid birthday</font> : null}</div>
                    
                    <Button
                        component = {Link} to ="/user"
                        //enable button if all info is valid
                        disabled = {!passwordsMatch() || !checkValidTime() ||
                        !checkValidEmail() || !checkValidPhoneNumber() || !uniqueEmail || !uniqueUsername}
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
        </Container>
    );
}