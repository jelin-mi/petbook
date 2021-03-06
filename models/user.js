const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'] },
  hashedPassword: { type: String, required: [true, 'password is required'] },
  name: String,
  age: Number,
  city: String,
  imageUrl: String,
});

const User = model('User', userSchema);

module.exports = User;
