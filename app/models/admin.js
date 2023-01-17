'use strict';

const mongoose = require('mongoose');
mongoose.promise = global.Promise;
const Schema = mongoose.Schema;

let AdminSchema = new Schema({
    givenName:{
        type:String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, 'User Email Required'],
    },
    password:{
        type:String,
        required:[true, 'Password Required']
    },
    isAdmin : {
        type:Boolean,
        required: true,
        default:true
    },
    createdAt:{
        type: Date, 
        default: Date.now()
    }
})

module.exports = mongoose.model('Admins',AdminSchema)