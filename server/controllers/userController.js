import mongoose from 'mongoose';
import User from '../models/userSchema.js';
import findMoon from '../../client/src/api/getMoonData.js'


//function to create a new object
//req is the object to be created
export const create = async (req, res) => {
    // console.log("find moon called");
    // findMoon();
    let temp = new User();

    //initializes the required variables
    temp.firstName = req.body.firstName;
    temp.lastName = req.body.lastName;
    temp.birthday = req.body.birthday;
    temp.email = req.body.email;
    temp.username = req.body.username;
    temp.password = req.body.password;


    //saves when done
    //if theres an error it print to the console
    //otherwise it sends the new object out
    temp.save( (err) =>
    {
        if (err) {console.log(err);}
        else {res.send(temp);}
    });
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
        }
        else
        {
            res.send(data);
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

//only function not included from BC 3 is middleware