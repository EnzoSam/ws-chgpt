var mongoose = require('mongoose');
const Assistant = require('./assistant.model');

var Schema = mongoose.Schema;


var TiketSchema = Schema({
    customeWhatsappId: String,    
    customeName: String,
    problemDescription:String,
    assistant:{type:Schema.ObjectId, ref:Assistant},
    state:Number,
    createdAt:Date,
    updatedAt:Date
},
{ timestamps: true });

module.exports = mongoose.model('Tiket', TiketSchema);