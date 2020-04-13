import mongoose from 'mongoose';
import User from '../models/userSchema.js';
import axios from 'axios'
import * as authHelper from '../authHelperFunctions.js'
//import findMoon from '../../client/src/api/getMoonData.js'
import request from 'superagent';
import express from 'express'
import bodyParser from 'body-parser';

//import coordinates from './coordinatesController.js';

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var mailchimpInstance   = 'us19',
    listUniqueId        = 'de644ad1de',
    mailchimpApiKey     = '31d36951a5db54c9db20da653fb109b3-us19',
    mailchimpClientId   = '175466601412',
    mailchimpSecretKey  = '5d835fb683d1825acd624c20698d3bbcb1103926a3a5ca31ed';


//function to create a new object
//req is the object to be created
export const create = async (req, res) => {
    //creates user and saves it at the same time
   // /*

   //turns the birthtime into military time
   //formatting afterwards is "HH:MM"
    let time = req.body.birthTime;
    if (time[6] === 'A')
    {
        if (time[0] === '1' && time[1] === '2')
        {
            time[0] = '0'; 
            time[1] = '0';
        }
        time = time[0]+time[1] + time[2] + time[3] + time[4];
    }
    else 
    {
        if (time[0] === '1' && time[1] === '2')
        {
            time = time[0] + time[1] + time[2] + time[3] + time[4];
        }
        else 
        {
            const hours = time[0] + time[1]; //grab hour part of string
            let hours_int = (parseInt(hours) + 12); //make it into an int
            time = hours_int + time[2] + time[3] + time[4];
        }
    }
    req.body.birthTime = time;
    try {
        //create sign token, showing success
      //  console.log("Creating user");
      //  console.log(req.body);
        const user = await User.create(req.body);
        console.log(user);
        console.log("user created");
        const token = await authHelper.signToken(user);
        res.json({success: true, message: "User created with token", token});
        console.log("User added to database!");
    }
    catch (err)
    {
        console.log("failed to add user to database");
        console.log(err);
        //res.json({success: false, code: err.code});
    }


    //calls the function that adds the user to mailchimp
    if (req.body.mailchimp === 'true')
    {
     mail(req, res);
    }
    else 
    {
        console.log("User opted out of mailchimp.")
    }
};



//finds a user by the username
//input is the username requested
export const findByUsername = (req, res) =>
{
    User.find({username:req.params.username}).then(user =>
    {
        if (user.length === 0) {//if no user by the entered username is found, the returned user object is an empty array, []
            return res.status(200).send({
                message: "unique"
            });
        }
        //else { res.send(data);}
        else
        {
            return res.status(200).send({
                message: "not unique"
            });
        }
    })
};

export const findByEmail = (req, res) =>
{
    User.find({email:req.params.email}).then(user =>
    {
        if (user.length === 0) {//if no user by the entered email is found, the returned user object is an empty array, []
            return res.status(200).send({
                message: "unique"
            });
        }
        //else { res.send(data);}
        else
        {
            return res.status(200).send({
                message: "not unique"
            });
        }
    })
};

//finds a user by the id
export const read = (req, res) =>
{
    Schema.findById(req.params.userId, (err, data) =>
    {
        if (err) {console.log(err);}
        //else { res.send(data);}
        res.send(data);
    })
};

//can do finebybrithday/other variables

export const update = (req, res) => {

    User.findById(req.params.userId, (err, data) => {
        if (err)
        {
            res.status(404).send("Error: Unable to update");
            console.log("Update error");
        }
        else{

            /* Replace the user's properties with the new required properties found in req.body */
            data.firstName = req.body.firstName;
            data.lastName = req.body.lastName;
            data.birthday = req.body.brithday;
            data.email = req.body.email;
            data.username = req.body.username;
            data.password = req.body.password;

            //calls functions to add more info to the user
            //addNonRequired(req,temp);


             /* Save the user */
            data.save( (err) => {
                if (err) { 
                    res.status(404).send("Error");
                    console.log(err);
                }
                else {
                    res.json(data);
                }
            });
        }
    });
};


/* Delete a user */

export const remove = (req, res) => {
    User.findByIdAndDelete(req.params.userId, (err, data) => 
    {
        if (err) 
        {
            res.status(404).send("Error: User could not be deleted");
            res.json({success: false, code: err.code});
        }
        else
        {
            res.send(data);
            res.json({success: true, message: "User deleted", user});
        }
    });
};

export const makeAdmin = (req, res) =>
{
    Schema.find({username:req.body.username}, (err, data) =>
    {
        if (err) {console.log(err);}
        //else { res.send(data);}
        if (data.admin === 'false' || !data.admin)
        {
            data.admin = 'true';
        }
        else
        {
            data.admin = 'false';
        }
        res.send(data);
    })
};


/* Retreive all the directory users */
export const list = (req, res) => {
    User.find({}, (err, data) => 
    {
        if (err)
        {
            res.status(404).send('Error: User could not be found');
        }
        else
        {
            res.json(data);
        }
    })
};
export const index = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch(err) {
        alert(err);
    }
};

export const authenticate = async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if(!user || !user.validPassword(req.body.password)) {
        return res.json({success: false, message: "Invalid Login"});
    }

    const token = await authHelper.signToken(user);
    res.json({success: true, message: "Token attached", token});
};

export const show = async (req, res) => {
    console.log("Current User:");
    console.log(req.user);

    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch(err) {
        alert(err);
    }
};

//only function not included from BC 3 is middleware

export const mail = (input, res) =>
{
    request
    .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
    .set('Content-Type', 'application/json;charset=utf-8')
    .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
    .send({
      'email_address': input.body.email,
      'status': 'subscribed',
      'merge_fields': {
        'FNAME': input.body.firstName,
        'LNAME': input.body.lastName
      }
    })
        .end(function(err, response) {
          if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
            console.log('Signed Up for Mailchimp!');
            //response.send("Submitted!");
          } else {
            console.log('Mailchimp Sign Up Failed');
          }
      });



};




//adds all the values that may not exist
const addNonRequired = (req, res) =>
{
    if (req.phoneNumber)
        {res.phoneNumber = req.body.phoneNumber;}
    if(req.middleName)
        {res.phoneNumber = req.body.phoneNumber;}
    if(req.brithHour)
        {res.birthHour = req.body.birthHour;}
    if(req.birbirthMinute)
        {res.birbirthMinute = req.body.brithMinute;}
    if(req.house)
        {res.house = req.body.house;}
    if(req.zodiac)
        {res.zodiac = req.body.zodiac;}
};


//sets the zodiac sign for the user
export const findZodiac = (req, res) => {
   var day = new Date('12-12-1212');
   console.log(day.getMonth());
    if(day.getMonth()  ==  0)
    {
        if(req.body.birthday.getDay() <=  19)
        {req.zodiac   = "Capricorn";}

        else
        {
            req.zodiac   = "Aquarius";
        }
    }

    else if (req.body.brithday.getMonth()   == 1)
    {
        if(req.body.brithday.getDay()<= 18)
            {req.zodiac  =   "Aquarius";}
        else
            {req.zodiac  =  "Pisces";}
    }

    else if (req.body.brithday.getMonth()   == 2)
    {
        if(req.body.brithday.getDay()<= 20)
            {req.zodiac  =   "Pisces";}
        else
            {req.zodiac  =  "Aries";}
    }

    else if (req.body.brithday.getMonth()   == 3)
    {
        if(req.brithday.getDay()<= 19)
            {req.zodiac  =   "Aries";}
        else
            {req.zodiac  =  "Taurus";}
    }

    else if (req.brithday.getMonth()   == 4)
    {
        if(req.brithday.getDay()<= 20)
            {req.zodiac  =   "Taurus";}
        else
            {req.zodiac  =  "Gemini";}
    }

    else if (req.brithday.getMonth()   == 5)
    {
        if(req.brithday.getDay()<= 20)
            {req.zodiac  =   "Gemini";}
        else
            {req.zodiac  =  "Cancer";}
    }

    else if (req.brithday.getMonth()   == 6)
    {
        if(req.brithday.getDay()<= 22)
            {req.zodiac  =   "Cancer";}
        else
            {req.zodiac  =  "Leo";}
    }

    else if (req.brithday.getMonth()   == 7)
    {
        if(req.brithday.getDay()<= 22)
            {req.zodiac  =   "Leo";}
        else
            {req.zodiac  =  "Virgo";}
    }

    else if (req.brithday.getMonth()   == 8)
    {
        if(req.brithday.getDay()<= 22)
            {req.zodiac  =   "Virgo";}
        else
            {req.zodiac  =  "Libra";}
    }

    else if (req.brithday.getMonth()   == 9)
    {
        if(req.brithday.getDay()<= 22)
            {req.zodiac  =   "Libra";}
        else
            {req.zodiac  =  "Scorpio";}
    }

    else if (req.brithday.getMonth()   == 10)
    {
        if(req.brithday.getDay()<= 21)
            {req.zodiac  =   "Scorpio";}
        else
            {req.zodiac  =  "Sagittarius";}
    }

    else if (req.brithday.getMonth()   == 11)
    {
        if(req.brithday.getDay()<= 21)
            {req.zodiac  =   "Sagittarius";}
        else
            {req.zodiac  =  "Capricorn";}
    }


};

