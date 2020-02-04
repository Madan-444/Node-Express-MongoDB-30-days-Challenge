const mongoose = require('mongoose')

var Schema = mongoose.Schema;

var User = new Schema({
    username: {
        type:String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    admin : {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User',User)