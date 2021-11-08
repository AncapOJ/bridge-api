const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = {
    username:{type:String, required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:['admin','player']}
};

const userSchema = new Schema(user, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;