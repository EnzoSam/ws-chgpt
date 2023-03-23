var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AssistantSchema = Schema({
    name: String,
    nickNames: [String],
    whatsappId:String,
    state:Number
});

module.exports = mongoose.model('Assistant', AssistantSchema);