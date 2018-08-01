const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {
        type: String,
        required: 'Name is required'
    },
    email: {
        type: String,
        unique: [true, 'Email is already used'],
        required: 'Email is required',
        validate: {
          validator: (email) => {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase());
          },
          message: 'Email format is wrong'
        }
    },
    username: {
        type: String,
        unique: [ true, 'Username is already used' ],
        required: [ true, 'Please input username' ]
    },
    password: {
        type: String,
        required: "Password is required"
    },
    question_list: [{
      type: Schema.Types.ObjectId,
      ref: "questions"
    }]

}, { timestamps: true })

  const User = mongoose.model("Users", userSchema);
  
  module.exports = User;