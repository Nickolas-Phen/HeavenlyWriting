import mongoose from 'mongoose';
import User from '../models/userSchema.js';
import axios from 'axios'
import * as authHelper from '../authHelperFunctions.js'
//import findMoon from '../../client/src/api/getMoonData.js'


//function to create a new object
//req is the object to be created
export const create = async (req, res) => {
    //creates user and saves it at the same time
    try {
        //create sign token, showing success
        const user = await User.create(req.body);
        const token = await authHelper.signToken(user);
        res.json({success: true, message: "User created with token", token});
        console.log("User added to database!");
    }
    catch
    {
        res.json({success: false, code: err.code});
    }
};

//finds a user by the username
//input is the username requested
export const findByUsername = (reqUsername, res) =>
{
    Schema.find({username:reqUsername}, (err, data) =>
    {
        if (err) {console.log(err);}
        //else { res.send(data);}
        res.send(data);
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

    const token = await signToken(user);
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