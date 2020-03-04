import mongoose from 'mongoose';

//making a schema for the database

const Schema = new mongoose.Schema;

const userSchema = new Schema ({
    name: {type: String, required: true},
    birthTime: {type: Number},
    birthdate: {type: Date, required: true},
    email: {type: String, required:true},
    house: {type: String},
    zodiac: {type: String},
        
    username: {type: String, unique:true},
    password: {type: String}

})