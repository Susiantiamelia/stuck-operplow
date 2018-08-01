const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let questionSchema = new Schema({
    title: {
        type:String,
        unique:true
    },
    content: String,
    votes:[{
            type: Schema.Types.ObjectId,
            ref: "Users"
        }],
    answerId:[{
        type: Schema.Types.ObjectId,
        ref: "Answer"
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
}, { timestamps: true });

const question = mongoose.model("questions", questionSchema);

module.exports = question;