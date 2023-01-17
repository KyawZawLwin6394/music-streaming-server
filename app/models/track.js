'use strict';

const mongoose = require('mongoose');
mongoose.promise = global.Promise;
const Schema = mongoose.Schema;

let TrackSchema = new Schema({
    trackName:{
        type:String,
        required:true
    },
    genre: {
        type: String,
        enum: ['Pop', 'Rock', 'Jazz','RNB','HipHop']
    },
    album:{
        type:String,
        required:[true, 'Album Required']
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artists',
        required: true
    },
    path: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    count : {
        type: Number,
        deafult: 0
    }
})

module.exports = mongoose.model('Tracks',TrackSchema)