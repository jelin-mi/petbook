const { Schema, model } = require('mongoose');

const petSchema = new Schema({
  petsName: { type: String, required: true },
  race: String,
  sex: String,
  age: Number,
  color: String,
});

const Pet = model('Pet', petSchema);

module.exports = Pet;
