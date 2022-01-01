const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: [true, 'password is required'] },
  myPets: [{ type: Schema.Types.ObjectId, ref: 'MyPet' }],
  name: String,
  age: Number,
  city: String,
  imageUrl: String,
});

const User = model('User', userSchema);

module.exports = User;
