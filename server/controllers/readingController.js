//function to create a new object
//req is the object to be created
import Reading from '../models/readingSchema.js';
export const create = async (req, res) => {
    // console.log("find moon called");
    // findMoon();
    let temp = new Reading();

    //initializes the required variables
    temp.house = req.body.house;
    temp.sign = req.body.sign;
    temp.moonPhase = req.body.moonPhase;
    temp.text = req.body.text;

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
    Schema.find({house: req.body.house, sign: req.body.sign, moonPhase: req.body.moonPhase}, (err, data) =>
    {
        //if found, send it
        if (err) {console.log(err)}
        //else { res.send(data);}
        res.send(data);
    })
};

//finds a reading by the id
export const read = (req, res) =>
{
    Schema.findById(req.params.readingId, (err, data) =>
    {
        if (err) {console.log(err);}
        //else { res.send(data);}
        res.send(data);
    })
};


export const update = (req, res) => {

    User.findById(req.params.readingId, (err, updatedReading) => {
        if (err)
        {
            res.status(404).send("Error: Unable to update");
            console.log("Update error");
        }
        else{

            /* Replace the user's properties with the new required properties found in req.body */
            updatedReading.firstName = req.body.firstName;
            updatedReading.lastName = req.body.lastName;
            updatedReading.birthday = req.body.birthday;
            updatedReading.email = req.body.email;
            updatedReading.username = req.body.username;
            updatedReading.password = req.body.password;

            /* Save the user */
            updatedReading.save( (err) => {
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


/* Delete a reading */

export const remove = (req, res) => {
    User.findByIdAndDelete(req.params.readingId, (err, removedReading) =>
    {
        if (err)
        {
            res.status(404).send("Error: User could not be deleted");
        }
        else
        {
            res.send(removedReading);
        }
    });
};


/* Retreive all the readings */
export const list = (req, res) => {
    Reading.find({}, (err, readings) =>
    {
        if (err)
        {
            res.status(404).send('Error: User could not be found');
        }
        else
        {
            res.json(readings);
        }
    })
};

//only function not included from BC 3 is middleware