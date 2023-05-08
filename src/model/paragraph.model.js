var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ParagraphSchema = Schema({
    text: String,
    embedding: []
});

module.exports = mongoose.model('Paragraph', ParagraphSchema);