import mongoose from 'mongoose';

//making a schema for the database

const Schema = new mongoose.Schema;

const userSchema = new Schema ({
    firstName: {type: String, required: true},
    middleName: {type: String},
    lastName: {type: String, required: true},
    birthtime: {type: Number},
    birthday: {type: Date, required: true},
    email: {type: String, required:true},
    house: {type: String},
    zodiac: {type: String},
        
    username: {type: String, required: true, unique:true},
    password: {type: String}

});

export default mongoose.model('User', userSchema);