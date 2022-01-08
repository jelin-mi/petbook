const { Schema, model } = require('mongoose');

const myPetSchema = new Schema({
  // owner: { type: Schema.Types.ObjectId, ref: 'owner' },

  // check validations if need it
  petsName: {
    type: String,
    required: true,
  },
  race: String,
  sex: String, // enum maybe 
  age: Number,
  color: String,
  imageUrl: String,
});

// COMPOUND INDEXES - for FAVORITES - following
// To not to add a pet twice to the database:
// Also, it will first find the owner in ascending order, then it will look for the pet.
// myPetSchema.index({ owner: 1, pet: 1 }, { unique: true });

// TODO change name of model and remove unused model
const MyPet = model('MyPet', myPetSchema);

module.exports = MyPet;
