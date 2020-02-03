const mongoose = require('mongoose')
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promotionsSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    lable: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        require: true,
        min: 0
    },
    description: {
        type: String,
        require: true,
    },
    featured: {
        type: String,
        default: false
    }

}, {
    timestamps: true
})

var Promotions = mongoose.model('Promotion',promotionsSchema)

module.exports = Promotions 