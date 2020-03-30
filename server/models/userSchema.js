import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
//making a schema for the database

//const Schema = new mongoose.Schema;

const userSchema = new mongoose.Schema ({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    birthday: {type: Date, required: true},
    email: {type: String, required:true},
    
    middleName: {type: String},
    birthHour: {type: Number},  //in military time unless we want to add an am/pm attribute
    birthMinute: {type:Number}, //will have default times if none submitted
    house: {type: String},
    zodiac: {type: String},

    //add moon location?
    
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