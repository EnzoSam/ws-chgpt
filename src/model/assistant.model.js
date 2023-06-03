var mongoose = require('mongoose');
const Contact = require('./contact.model');

var Schema = mongoose.Schema;

var AssistantSchema = Schema({
    name: String,
    nickNames: [String],
    whatsappId:String,
    contacts:[{type:Schema.ObjectId, ref:Contact}],
    role:String,
    state:Number
});

module.exports = mongoose.model('Assistant', AssistantSchema);