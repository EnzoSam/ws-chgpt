var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var IAModelSchema = Schema({
    version: Number,
    name: String,
    state:Number
});

module.exports = mongoose.model('IAModel', IAModelSchema);