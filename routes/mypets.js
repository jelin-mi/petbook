const express = require('express');
const User = require('../models/user');
const MyPet = require('../models/MyPet');
const { isLoggedIn } = require('../middlewares/index');

function myPetsRoutes() {
  const router = express.Router();

  router.get('/list', async (req, res, next) => {
    try {
      const { _id } = req.session.currentUser;
      const user = await User.find({ _id }).populate('myPets');
      res.render('pets/list', { user, myPets: 'myPets' });
    } catch (e) {
      next(e);
    }
  });

  router.get('/add', async (req, res, next) => {
    try {
      const pets = await MyPet.find();
      res.render('pets/create-pet', { pets, active: { pets: true } });
    } catch (e) {
      next(e);
    }
  });

  router.post('/add', async (req, res, next) => {
    try {
      const { _id } = req.session.currentUser;
      const { petsName, sex, age, color } = req.body;
      const pet = await MyPet.create({ petsName, sex, age, color });
      const userUpdate = await User.findByIdAndUpdate(_id, { $push: { myPets: pet._id } }, { new: true }).populate(
        'myPets',
      );
      req.session.currentUser = userUpdate;
      res.redirect('/');
    } catch (e) {
      next(e);
    }
  });

  // Pet details page = Pet profile
  router.get('/:petId', async (req, res, next) => {
    try {
      const { petId } = req.params;
      const foundPet = await MyPet.findById(petId);
      res.render('pets/profile', foundPet);
    } catch (err) {
      console.log(`Err while getting a single post from the  DB: ${err}`);
      next(err);
    }
  });

  // UPDATE - EDIT pet profile
  router.get('/:petId/edit', async (req, res, next) => {
    try {
      const { petId } = req.params;
      const petToEdit = await MyPet.findById(petId);
      res.render('pets/edit-pet', { pet: petToEdit });
    } catch (error) {
      next(error);
    }
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
