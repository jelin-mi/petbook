const express = require('express');
const Pets = require('../models/pets');

function zooRoutes() {
  const router = express.Router();
  router.get('/', async (req, res, next) => {
    try {
      const petsZoo = await Pets.find();
      res.render('pets/zoo', { petsZoo });
    } catch (e) {
      next(e);
    }
  });
  return router;
}

module.exports = zooRoutes;
