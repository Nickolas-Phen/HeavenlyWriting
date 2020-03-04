import mongoose from 'mongoose';
import User from '../modles/userSchema.js';


//function to create a new object
export const create = async (req, res) => {
    let temp = new User();

    //initializes the required variables
    temp.name = req.body.name;
    temp.birthday = req.body.brithday;
    temp.email = req.body.email;
    temp.username = req.body.username;
    temp.password = req.body.password;

    //schema that is being used
    /*
    name: {type: String, required: true},
    birthtime: {type: Number},
    birthday: {type: Date, required: true},
    email: {type: String, required:true},
    house: {type: String},
    zodiac: {type: String},
        
    username: {type: String, required: true, unique:true},
    password: {type: String}
    */

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
export const findByUsername = (reqUsername, res) => 
{
    Schema.find({username:reqUsername}, (err, data) =>
    {
        if (err) {console.log(err);}
        //else { res.send(data);}
        res(null, data);
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
            data.name = req.body.name;
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
/*
export const remove = (req, res) => {
    User.findByIdAndDelete(req.params.userId, (err, data) => 
    {
        if (err) 
        {
            res.status(404).send("Error: User could not be deleted");
        }
        else {
            res.send(data);
        }
     
    });
};
*/

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