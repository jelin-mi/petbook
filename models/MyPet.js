const { Schema, model } = require('mongoose');

const myPetSchema = new Schema({
  // MyPet model
  owner: { type: Schema.Types.ObjectId, ref: 'owner' },
  //pet: { type: Schema.Types.ObjectId, ref: 'Pet' },
  petsName: {
    type: String,
    required: true,
  },
  sex: String,
  age: Number,
  color: String,
});

const MyPet = model('MyPet', myPetSchema);

module.exports = MyPet;
