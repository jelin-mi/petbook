const express = require('express');
/* const router = express.Router(); */

// require Pet, User model
const User = require('../models/user');
const MyPet = require('../models/MyPet');
// para bloquear las rutas/vistas
const { isLoggedIn } = require('../middlewares/index');

function myPetsRoutes() {
  const router = express.Router();

  router.get('/list', async (req, res, next) => {
    try {
      const { _id } = req.session.currentUser;
      const user = await User.find({ _id }).populate('myPets');
      res.render('pets/list', { user, myPets: 'myPets' });
      console.log(user);
    } catch (e) {
      next(e);
    }
  });

  router.get('/add', (req, res, next) => {
    MyPet.find()
      .then(pets => {
        res.render('pets/create-pet', { pets, active: { pets: true } });
      })
      .catch(e => {
        next(e);
      });
  });

  router.post('/add', async (req, res, next) => {
    const { _id } = req.session.currentUser;
    const { petsName, sex, age, color } = req.body;
    try {
      const pet = await MyPet.create({ petsName, sex, age, color });
      const userUpdate = await User.findByIdAndUpdate(_id, { $push: { myPets: pet._id } }, { new: true }).populate(
        'myPets',
      );
      req.session.currentUser = userUpdate;
      console.log(userUpdate);
      res.redirect('/');
    } catch (e) {
      next(e);
    }
  });

  // Pet details page = Pet profile
  router.get('/:petId', (req, res, next) => {
    const { petId } = req.params;

    MyPet.findById(petId)
      .then(foundPet => res.render('pets/profile', foundPet))
      .catch(err => {
        console.log(`Err while getting a single post from the  DB: ${err}`);
        next(err);
      });
  });

  // UPDATE - EDIT pet profile
  router.get('/:petId/edit', (req, res, next) => {
    const { petId } = req.params;

    MyPet.findById(petId)
      .then(petToEdit => {
        console.log(petToEdit);
        res.render('pets/edit-pet', { pet: petToEdit });
      })
      .catch(error => next(error));
  });

  router.post('/:petId/edit', (req, res, next) => {
    const { petId } = req.params;
    const { petsName, sex, age, color } = req.body;
    MyPet.findByIdAndUpdate(petId, { petsName, sex, age, color })
      .then(() => res.redirect('/my-pets/list'))
      .catch(error => {
        next(error);
      });
  });

  // DELETE a pet
  router.post('/:petId/delete', (req, res, next) => {
    const { petId } = req.params;
    MyPet.findByIdAndDelete(petId)
      .then(() => res.redirect('/my-pets/list'))
      .catch(error => {
        next(error);
      });
  });

  return router;
}

module.exports = myPetsRoutes;
