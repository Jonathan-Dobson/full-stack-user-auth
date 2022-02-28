const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    details: String
})

module.exports = mongoose.model("Todo", todoSchema)


