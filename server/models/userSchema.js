import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
//making a schema for the database

//const Schema = new mongoose.Schema;

const userSchema = new mongoose.Schema ({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    birthday: {type: Date /*, required: true*/},
    email: {type: String, required:true},
    phoneNumber: {type: String, required: true},
    placeOfBirth: {type: String, required: true},
    admin: {type: String},

    //middleName: {type: String},
    birthTime: {type: String},
    house: {type: String},
    zodiac: {type: String},

    //add moon location?
   // longitude: {type: Number},
   // latitude: {type: Number},
    
    //find a way to protect this?
    username: {type: String, required: true, unique:true},
    password: {type: String, required: true}

});

// adds method to user to create hashed password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// adds method to user to check if password is correct
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// had to add this, checks if password was changed before saving
userSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        this.password = this.generateHash(this.password);
    }
    next();
});

export default mongoose.model('User', userSchema);