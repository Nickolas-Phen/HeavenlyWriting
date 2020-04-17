
import Predictoins from "../models/predictionsSchema.js";
export const create = async (req, res) => {
    // console.log("find moon called");
    // findMoon();
    let temp = new Predictoins();
    console.log("body is "+ req.body.house);
    //initializes the required variables
    temp.username = req.body.house;
    temp.moonPhase = req.body.moonPhase;
    temp.quote = req.body.quote;
    temp.article = req.body.article;
    //saves when done
    // if theres an error it prints to the console
    // otherwise it sends the new object out
    temp.save( (err) =>
    {
        if (err) {console.log(err);}
        else {res.send(temp);
        console.log("Predictoins added to database!")}
    });
};

export const findByUniqueCombo = (req, res) =>
{
    //search for reading based on unique combo of house, sign, moonPhase
    Predictoins.find({username: req.body.username,moonPhase: req.body.moonPhase}, (err, data) =>
    {
        //if found, send it
        if (err) {console.log(err);}
        //else { res.send(data);}
        res.send(data);
    })
};

//finds a reading by the username
export const read = (req, res) =>
{
    Predictoins.findById(req.params.username, (err, data) =>
    {
        if (err) {console.log(err);}
        //else { res.send(data);}
        res.send(data);
    })
};


export const update = (req, res) => {

    Predictoins.findById(req.params.username, (err, newPred) => {
        if (err)
        {
            res.status(404).send("Error: Unable to update");
            console.log("Update error");
        }
        else{

            /* Replace the Reading's properties with the new required properties found in req.body */
            // newPred.firstName = req.body.firstName;
            // newPred.lastName = req.body.lastName;
            // newPred.birthday = req.body.birthday;
            // newPred.email = req.body.email;
            // newPred.Readingname = req.body.Readingname;
            // newPred.password = req.body.password;

            /* Save the Reading */
            newPred.save( (err) => {
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
    Predictoins.findByIdAndDelete(req.params.username, (err, removedPred) =>
    {
        if (err)
        {
            res.status(404).send("Error: Reading could not be deleted");
        }
        else
        {
            res.send(removedPred);
        }
    });
};


/* Retreive all the readings */
export const list = (req, res) => {
    Predictoins.find({}, (err, Predictoins) =>
    {
        if (err)
        {
            res.status(404).send('Error: Readings could not be found');
        }
        else
        {
            console.log((Predictoins));
            const data = Predictoins;
            res.send(Predictoins);
        }
    })
};

//only function not included from BC 3 is middleware