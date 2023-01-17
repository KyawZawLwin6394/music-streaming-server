'use strict';

const mongoose = require('mongoose');
mongoose.promise = global.Promise;
const Schema = mongoose.Schema;

let PlayListSchema = new Schema({
    userID: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
     }],
    track: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tracks"
     }],
    sharedBy:[{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
     }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    share: {
        type:String,
        default:null
    }
    
})

module.exports = mongoose.model('PlayLists',PlayListSchema)