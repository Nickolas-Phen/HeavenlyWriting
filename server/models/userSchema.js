import mongoose from 'mongoose';

//making a schema for the database

const Schema = new mongoose.Schema;

const userSchema = new Schema ({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    birthday: {type: Date, required: true},
    email: {type: String, required:true},
    
    middleName: {type: String},
    birthHour: {type: Number},  //in military time unless we want to add an am/pm attribute
    birthMinute: {type:Number},
    house: {type: String},
    zodiac: {type: String},
    
    //find a way to protect this?
    username: {type: String, required: true, unique:true},
    password: {type: String, required: true}

});

export default mongoose.model('User', userSchema);