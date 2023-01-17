'use strict';

const mongoose = require('mongoose');
mongoose.promise = global.Promise;
const Schema = mongoose.Schema;

let ArtistSchema = new Schema({
    givenName:{
        type:String,
        required:true
    },
    Name: {
        type:String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, 'Email Required'],
    },
    password:{
        type:String,
        required:[true, 'Password Required']
    },
    isArtist: {
        type:Boolean,
        required:true,
        default:true
    },
    dateOfBirth: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Artists',ArtistSchema)