const express = require('express');
const MyPet = require('../models/MyPet');
const Pet = require('../models/pet');
const User = require('../models/user');

function petsRoutes() {
  const router = express.Router();
  router.get('/', async (req, res, next) => {
    try {
      const pet = await Pet.find();
      const myPet = await MyPet.find();
      res.render('pets/zoo', { pet, myPet });
    } catch (e) {
      next(e);
    }
  });
  return router;
}

module.exports = petsRoutes;
