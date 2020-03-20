import mongoose from 'mongoose';

//making a schema for the admin to manipulate

const adminSchema = new mongoose.Schema ({

    //these are all values taken from the canvas database example

    natalRisingSign: {type: String},
    natalSunSign: {type: String},
    transitingSunPosition: {type: String},
    transitingMoonPosition: {type: String},
    
    moonPhase: {type: String},
    transitingMoonSign: {type: String},  
    transitingMoonHouseWithSun: {type:String},  //transiting moon house in relationship to the natal rising sign or equivalent
    quote: {type: String} //zodiac/house quote
});

export default mongoose.model('Admin', adminSchema);