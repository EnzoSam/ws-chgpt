var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BusinessSchema = Schema({
    name: String,
    state: Number
});

module.exports = mongoose.model('Business', BusinessSchema);