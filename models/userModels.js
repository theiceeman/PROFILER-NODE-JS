const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type:String,
        trim:true,
        default:'',
    },
    lastName: {
        type:String,
        trim:true,
        default:'',
    },
    email: {
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    password: {
        type:String,
        trim:true,
        required:true,
    },
    state:{
        type:String,
        trim:true,
        default:'',
    },
})

module.exports = mongoose.model('User', userSchema);