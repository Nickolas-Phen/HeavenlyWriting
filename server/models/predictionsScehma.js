import mongoose from 'mongoose';

//separate schema for interpretation collection
//reading = another word for the sign interpretations she will enter

const predictionsSchema = new mongoose.Schema ({
    //house: {type: String, required: true},
   // sign: {type: String, required: true},
   username:{type: String, required:true},
   moonPhase: {type: String},
   quote: {type: String, },
    // picture: {type: String/*, required:true*/},
   article: {type: String/*, required:true*/},
    //one reading corresponds to one combination of house, sign, and moonPhase
});

export default mongoose.model('Predictions', predictionsSchema);