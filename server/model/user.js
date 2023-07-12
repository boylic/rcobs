const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  fname: {
    type: String,
    required: true,
  },

  lname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    require: true, 
  },
});


module.exports = mongoose.model("User", User);
