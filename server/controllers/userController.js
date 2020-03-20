import mongoose from 'mongoose';
import User from '../models/userSchema.js';
import axios from 'axios'
import config from '../config/config.js'
//import findMoon from '../../client/src/api/getMoonData.js'

mongoose.connect(config.db.uri, {useNewUrlParser: true}); //user db connection
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
    addNonRequired(req,temp);
    findZodiac(req, temp);

    temp.save( (err) =>
    {
        if (err) {console.log(err);}
        else {res.send(temp);
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

            addNonRequired(req,temp);
            
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
}


//sets the zodiac sign for the user
export const findZodiac = (req, res) => {
    if(req.brithday.getMonth()  ==  0)
    {
        if(req.birthday.getDay() <=  19)
        {req.zodiac   = "Capricorn";}

        else
        {
            req.zodiac   = "Aquarius";
        }
    }

    else if (req.brithday.getMonth()   == 1)
    {
        if(req.brithday.getDay()<= 18)
            {req.zodiac  =   "Aquarius";}
        else  
            {req.zodiac  =  "Pisces";}
    }
    
    else if (req.brithday.getMonth()   == 2)
    {
        if(req.brithday.getDay()<= 20)
            {req.zodiac  =   "Pisces";}
        else  
            {req.zodiac  =  "Aries";}
    }
    
    else if (req.brithday.getMonth()   == 3)
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
