//documentation here: https://mongoosejs.com/docs/guide.html

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    telephone:{
        type:Number,
        required:true
    }
},{timestamps:true});     //this property shows the last update 

const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact;
