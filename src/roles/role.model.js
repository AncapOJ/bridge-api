const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const role = {
    name:{type:String, enum:['admin','player']},
    
};

const roleSchema = new Schema(role, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;