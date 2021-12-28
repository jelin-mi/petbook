const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: [true, 'password is required'],
  },
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  city: {
    type: String,
  },
  myPets: [{ type: Schema.Types.ObjectId, ref: 'myPets' }],
});

const User = model('User', userSchema);

module.exports = User;
