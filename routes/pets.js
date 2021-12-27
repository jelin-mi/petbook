const express = require('express');
/* const router = express.Router(); */

// require the Pet model
const Pet = require('../models/pet');

// require the User model
const User = require('../models/user');

// CREATE - add a pet
// GET
function petsRoutes() {
  const router = express.Router();

  /*  router.get('/zoo/add', (req, res, next) => {
    res.render('pets/create-pet');
  }); */

  /*  How to link it with a user? Something like this below? */
  router.get('/zoo/add', (req, res, next) => {
    User.find().then(usersFromDB => {
      res.render('pets/create-pet', { usersFromDB });
    });
  });

  // POST
  router.post('/zoo/add', (req, res, next) => {
    const { petsName, owner, sex, age, color } = req.body;

    Pet.create({ petsName, owner, sex, age, color })
      .then(() => res.redirect('/user-pets-list'))
      .catch(() => res.render('pets/create-pet'));
  });

  return router;
}

module.exports = petsRoutes;
