import mongoose from 'mongoose';
import User from '../models/userSchema.js';
import axios from 'axios'
//import findMoon from '../../client/src/api/getMoonData.js'


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
    console.log(temp.email);
    //saves when done
    // if theres an error it print to the console
    // otherwise it sends the new object out
    temp.save(async (err) =>
    {
        if (err) {
            console.log(err);
            res.json({success: false, code: err.code});
        }

        else {
            res.send(temp);
            //create sign token, showing success
            const token = await signToken({username: temp.username, password: temp.password});
            res.json({success: true, message: "User created with token", token});
            console.log("User added to database!");}
    });


    //mailchimp

    // const {email}
    //constructs data for mailchimp subscriber
        const data={
            members:[
                {
                    email_address: temp.email,
                    status: 'subscribed',
                    // merge_fields:{
                    //     FNAME: temp.firstName,
                    //     LNAME: temp.lastName,
                    // }
                }
            ]
        }
        const postData=JSON.stringify(data);
        //console.log(temp.email);
        // creates mailchimp subscriber 
        const options ={
            url: 'https://us19.api.mailchimp.com/3.0/lists/363ae36a99',
            method: 'POST',
            headers:{
                Authorization: 'auth e6ed8d7427300d00fe7bb3d0eee6fed3-us19'
            },
            body: postData
        }

        axios.post(options.url, options.body.postData, {headers: options.headers}).then(
            res => {
                console.log("SENT");
            }
        )
            // if (err) {
            //   console.log("nah bih");
            // } else {
            //   if (response.statusCode === 200) {
            //     console.log("ayyee lit");
            //   } else {
            //     console.log("nah bih2.0");
            //   }
            // }
        //   });
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
export const index = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch(err) {
        alert(err);
    }
};

export const authenticate = async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    if(!user || !user.validPassword(req.body.password)) {
        return res.json({success: false, message: "Invalid Login"});
    }

    const token = await signToken(user);
    res.json({success: true, message: "Token attached", token});
};

//only function not included from BC 3 is middleware