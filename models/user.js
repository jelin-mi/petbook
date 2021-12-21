const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
    type: String,
    require: true,
  }
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: [true, 'password is required'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
