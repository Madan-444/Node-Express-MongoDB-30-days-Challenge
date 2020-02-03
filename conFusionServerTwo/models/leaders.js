const mongoose = require('mongoose')
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const leaderSchema = new Schema({
    name: {
        type:String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    designation: {
        type: String,
        require: true
    },
    abbr: {
        type: String,
        require: true
    }, 
    description: {
        type: String,
        require: true
    },
    featured: {
        type: String,
        default: false
    }
}, {
    timestamps: true
})

var Leaders = mongoose.model('Leader',leaderSchema)

module.exports = Leaders