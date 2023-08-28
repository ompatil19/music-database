const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,

  },
  name: {
    type: String,
    required: true,
    // unique:true,
  }
});

const usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;