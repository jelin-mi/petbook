const { Schema, model } = require('mongoose');

const myPetSchema = new Schema({
  // owner: { type: Schema.Types.ObjectId, ref: 'owner' },

  petsName: {
    type: String,
    required: true,
  },
  race: String,
  sex: String,
  age: Number,
  color: String,
});

// COMPOUND INDEXES - for FAVORITES - following
// To not to add a pet twice to the database:
// Also, it will first find the owner in ascending order, then it will look for the pet.
// myPetSchema.index({ owner: 1, pet: 1 }, { unique: true });

const MyPet = model('MyPet', myPetSchema);

module.exports = MyPet;
