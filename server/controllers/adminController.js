import mongoose from 'mongoose';
import Tuple from '../models/adminSchema.js';
import axios from 'axios'

//function to create a new object
//req is the object to be created
export const create = async (req, res) => {

    let newItem = new Tuple();

    if(req.natalRisingSign)               {newItem.natalRisingSign = req.body.natalRisingSign;};
    if(req.natalSunSign)                  {newItem.natalSunSign = req.body.natalSunSign;};
    if(req.transitingSunPosition)         {newItem.transitingSunPosition = req.body.transitingSunPosition;}
    if(req.transitingMoonPosition)        {newItem.transitingMoonPosition = req.body.transitingMoonPosition;}
    if(req.moonPhase)                     {newItem.moonPhase = req.body.moonPhase;}
    if(req.transitingMoonSign)            {newItem.transitingMoonSign = req.body.transitingMoonSign;}
    if(req.transitingMoonHouseWithSun)    {newItem.transitingMoonHouseWithSun = req.body.transitingMoonHouseWithSun;}
    if(req.quote)                         {newItem.quote = req.body.quote;}

    newItem.save( (err) =>
    {
        if (err) {console.log(err);}
        else {res.send(newItem);
            console.log("Tuple added to database!");}
    });
};

//IF A REQUIRED TYPE IS MADE, A FIND BY <REQUIRED TYPE> COULD BE ADDED

//finds data by the id
export const read = (req, res) =>
{
    Schema.findById(req.params.adminId, (err, data) =>
    {
        if (err) {console.log(err);}
        //else { res.send(data);}
        res.send(data);
    })
};


export const update = (req, res) => {

    Tuple.findById(req.params.adminId, (err, data) => {
        if (err)
        {
            res.status(404).send("Error: Unable to update");
            console.log("Update error");
        }
        else{

            /* Replace the tuple's properties with the new properties found in req.body */
            if(req.natalRisingSign)               {data.natalRisingSign = req.body.natalRisingSign;};
            if(req.natalSunSign)                  {data.natalSunSign = req.body.natalSunSign;};
            if(req.transitingSunPosition)         {data.transitingSunPosition = req.body.transitingSunPosition;}
            if(req.transitingMoonPosition)        {data.transitingMoonPosition = req.body.transitingMoonPosition;}
            if(req.moonPhase)                     {data.moonPhase = req.body.moonPhase;}
            if(req.transitingMoonSign)            {data.transitingMoonSign = req.body.transitingMoonSign;}
            if(req.transitingMoonHouseWithSun)    {data.transitingMoonHouseWithSun = req.body.transitingMoonHouseWithSun;}
            if(req.quote)                         {data.quote = req.body.quote;}
            
             /* Save the tuple */
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


/* Delete a tuple */

export const remove = (req, res) => {
    Tuple.findByIdAndDelete(req.params.adminId, (err, data) => 
    {
        if (err) 
        {
            res.status(404).send("Error: Tuple could not be deleted");
        }
        else
        {
            res.send(data);
        }
    });
};


/* Retreive the whole directory */
export const list = (req, res) => {
    Tuple.find({}, (err, data) => 
    {
        if (err)
        {
            res.status(404).send('Error: Tuple could not be found');
        }
        else
        {
            res.json(data);
        }
    })
};
