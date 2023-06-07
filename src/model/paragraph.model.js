var mongoose = require('mongoose');
const IAModelModel = require('./iamodel.model');

var Schema = mongoose.Schema;

var ParagraphSchema = Schema({
    text: String,
    embedding: [],
    model:{type:Schema.ObjectId, ref:IAModelModel},
});

module.exports = mongoose.model('Paragraph', ParagraphSchema);