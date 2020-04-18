//function to create a new object
//req is the object to be created
import util from "util";
import Reading from "../models/readingSchema.js";
export const create = async (req, res) => {
    // console.log("find moon called");
    // findMoon();
    let temp = new Reading();
    console.log("body is "+ req.body.house);
    //initializes the required variables
    temp.house = req.body.house;
    temp.sign = req.body.sign;
    temp.moonPhase = req.body.moonPhase;
    temp.article = req.body.article;
    temp.quote = req.body.quote;
    temp.picture = req.body.picture;

    //saves when done
    // if theres an error it prints to the console
    // otherwise it sends the new object out
    temp.save( (err) =>
    {
        if (err) {console.log(err);}
        else {res.send(temp);
        console.log("Reading added to database!")}
    });
};

export const findByUniqueCombo = (req, res) =>
{
    //search for reading based on unique combo of house, sign, moonPhase

    Reading.find({house: req.query.house, sign: req.query.sign, moonPhase: req.query.moonPhase}, (err, data) =>
    {
        //if found, send it
        if (err) {console.log(err);}
        //else { res.send(data);}

        res.send(data);
    })
};

//finds a reading by the moon sign TEMPERORY
export const read = (req, res) =>
{
        Reading.find(req.params, (err, data) =>
    {
        //the problem is I am passing an object so how to fix that 
        //works when I pass one thing, but still cant get one of the things inside the object
        console.log("is it this? %j",JSON.stringify(req.params));
        console.log("is it this! "+req.params);
        if (err) {
            console.log("ERROR BIH!");
            console.log(err);   
        }else{
            console.log("passed " + data + " here");
            res.send(data);
        }
 
    })
};


export const update = (req, res) => {
    console.log(req.body);
    Reading.updateOne({house: req.body.house, sign: req.body.sign, moonPhase: req.body.moonPhase}, req.body, {upsert: true}, (err) => {
        if (err)
        {
            res.status(404).send("Error: Unable to update");
            console.log("Update error");
        }
    });
};


/* Delete a reading */

export const remove = (req, res) => {
    console.log(req.query);
    Reading.deleteOne({house: req.query.house, sign: req.query.sign, moonPhase: req.query.moonPhase}, (err) =>
    {
        if (err)
        {
            res.status(404).send("Error: Reading could not be deleted");
        }
    });
};


/* Retreive all the readings */
export const list = (req, res) => {
    Reading.find({}, (err, readings) =>
    {
        console.log("in list");
                    //get sign only, these 2 dont work
        // console.log(req.body.sign);
        // console.log(readings.sign);
        if (err)
        {
            res.status(404).send('Error: Readings could not be found');
            console.log("ERROR");
        }
        else
        {
            
            console.log((readings));
            const data = readings;
            res.send(readings);
        }
    })
};

//only function not included from BC 3 is middleware