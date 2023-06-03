var mongoose = require('mongoose');
const Contact = require('./contact.model');

var Schema = mongoose.Schema;

var MessageSchema = Schema({
    text: String,
    date:Date,
    from:{type:Schema.ObjectId, ref:Contact},
    to:{type:Schema.ObjectId, ref:Contact},
    role:String,
    type:String,
    referenceId:String
});

module.exports = mongoose.model('Message', MessageSchema);