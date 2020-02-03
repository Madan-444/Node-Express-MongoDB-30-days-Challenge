const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    rating: {
        type:Number,
        min:1,
        max:5,
        require: true
    },
    comment: {
        type:String,
        require: true
    },
    author: {
        type:String,
        require: true
    }
},{
    timestamps: true
})

const dishSchema = new Schema({
    name: {
        type: String,
        require:true,
        unique: true
    },
    description: {
        type: String,
        require: true
    },
    comments: [commentSchema]
}, {
    timestamps:true
});

var Dishes = mongoose.model('Dish',dishSchema)

module.exports = Dishes