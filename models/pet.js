const { Schema, model } = require('mongoose');

const petSchema = new Schema({
  petsName: {
    type: String,
    required: true,
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  sex: String,
  age: Number,
  color: String
});

const Pet = model('Pet', petSchema);

module.exports = Pet;