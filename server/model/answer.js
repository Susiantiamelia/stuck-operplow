const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    content: String,
    votesUp:[
        {type: Schema.Types.ObjectId,
        ref: "Users"}
    ],
    votesDown:[
        {type: Schema.Types.ObjectId,
        ref: "Users"}
    ],
    questionId: {
        type: Schema.Types.ObjectId,
        ref: "questions"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
},{timestamps:true})

const Answer = mongoose.model("Answer",answerSchema)

module.exports = Answer