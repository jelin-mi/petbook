const { Schema, model } = require('mongoose');

const myPetSchema = new Schema({
  // MyPet model
  owner: { type: Schema.Types.ObjectId, ref: 'owner' },
  // pet: { type: Schema.Types.ObjectId, ref: 'Pet' },

  /*  petsName: {
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    pet: { type: Schema.Types.ObjectId, ref: 'Pet' },
  }, */

  // I think the info below is not needed, it will be taken from Pet model.
  petsName: {
    type: String,
    required: true,
  },
  sex: String,
  age: Number,
  color: String,
});

// COMPOUND INDEXES
// To not to add a pet twice to the database:
// Also, it will first find the owner in ascending order, then it will look for the pet.
// myPetSchema.index({ owner: 1, pet: 1 }, { unique: true });

const MyPet = model('MyPet', myPetSchema);

module.exports = MyPet;