const { Schema, model } = require('mongoose');

const petsSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  petsName: {
    type: String,
    required: true,
  },
  race: String,
  sex: { type: String, enum: ['Male', 'Female', 'Le'] },
  age: Number,
  color: String,
  imageUrl: String,
});

const Pets = model('Pets', petsSchema);

module.exports = Pets;

// TODO dropdown

// COMPOUND INDEXES - for FAVORITES - following
// To not to add a pet twice to the database:
// Also, it will first find the owner in ascending order, then it will look for the pet.
// myPetSchema.index({ owner: 1, pet: 1 }, { unique: true });
