var mongoose = require('mongoose');
const Assistant = require('./assistant.model');
const Contact = require('./contact.model');
const Message = require('./message.model');

var Schema = mongoose.Schema;


var TiketSchema = Schema({
    contact: {type:Schema.ObjectId, ref:Contact},  
    number:Number,  
    problemDescription:String,
    assistant:{type:Schema.ObjectId, ref:Assistant},
    messages:[{type:Schema.ObjectId, ref:Message}],
    state:Number,
    createdAt:Date,
    updatedAt:Date
},
{ timestamps: true });

module.exports = mongoose.model('Tiket', TiketSchema);