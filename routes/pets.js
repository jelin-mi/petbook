const express = require('express');
/* const router = express.Router(); */

// require Pet, User model
const Pet = require('../models/pet');
const User = require('../models/user');

// CREATE - add a pet
// GET
function petsRoutes() {
  const router = express.Router();

  /*  How to link it with a user? Something like this below? */
  router.get('/add', (req, res, next) => {
    User.find().then(usersFromDB => {
      res.render('pets/create-pet', { usersFromDB });
    });
  });

  // POST
  router.post('/add', (req, res, next) => {
    const { petsName, owner, sex, age, color } = req.body;

    Pet.create({ petsName, owner, sex, age, color })
      .then(dbPet => {
        return User.findByIdAndUpdate(owner, { $push: { pets: dbPet._id } });
      })
      // /user/pets-list changed to /zoo/pets-list
      .then(() => res.redirect('/zoo/pets-list'))
      /* .catch(() => res.render('pets/create-pet')); */
      .catch(err => {
        console.log(`Err while creating the pet in the DB: ${err}`);
        next(err);
      });
  });

  // This is copied from Learning Unit, it needs to be adapted - other way round as we have ObjectId in  Pet model, not in a User model ??

  // READ - user-pets-list: /zoo/pets-list into /pets-list
  router.get('/pets-list', (req, res, next) => {
    Pet.find()
      .populate('owner')
      .then(dbPets => {
        console.log('Pets from the DB:', dbPets);
        res.render('pets/list', { pets: dbPets });
      })
      .catch(err => {
        console.log(`Err while getting the pets from the DB: ${err}`);
        next(err);
      });
  });

  // Pet details page = Pet profile
  router.get('/:petId', (req, res, next) => {
    const { petId } = req.params;

    Pet.findById(petId)
      .populate('owner')
      .then(foundPet => res.render('pets/profile', foundPet))
      .catch(err => {
        console.log(`Err while getting a single post from the  DB: ${err}`);
        next(err);
      });
  });

  // UPDATE - EDIT pet profile
  router.get('/:petId/edit', (req, res, next) => {
    const { petId } = req.params;

    Pet.findById(petId)
      .then(petToEdit => {
        console.log(petToEdit);
        res.render('pets/edit-pet', { pet: petToEdit });
      })
      .catch(error => next(error));
  });

  router.post('/:petId/edit', (req, res, next) => {
    const { petId } = req.params;
    const { petsName, owner, sex, age, color } = req.body;
    Pet.findByIdAndUpdate(petId, { petsName, owner, sex, age, color })
      .then(() => res.redirect('/zoo/pets-list'))
      .catch(error => {
        next(error);
      });
  });

  // DELETE a pet
  router.post('/:petId/delete', (req, res, next) => {
    const { petId } = req.params;
    Pet.findByIdAndDelete(petId)
      .then(() => res.redirect('/zoo/pets-list'))
      .catch(error => {
        next(error);
      });
  });

  return router;
}

module.exports = petsRoutes;
