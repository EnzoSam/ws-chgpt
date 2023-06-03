var mongoose = require('mongoose');
const Business = require('./business.model');

var Schema = mongoose.Schema;

var ContactSchema = Schema({
    name: String,
    reference:String,
    type:String,
    business:{type:Schema.ObjectId, ref:Business},
    state: Number
});

module.exports = mongoose.model('Contact', ContactSchema);