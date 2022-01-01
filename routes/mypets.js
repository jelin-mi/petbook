const express = require('express');
const User = require('../models/user');
const MyPet = require('../models/MyPet');

function myPetsRoutes() {
  const router = express.Router();

  router.get('/list', async (req, res, next) => {
    const { _id } = req.session.currentUser;
    try {
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
    const { _id } = req.session.currentUser;
    const { petsName, race, sex, age, color } = req.body;
    try {
      const pet = await MyPet.create({ petsName, race, sex, age, color });
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
    const { petId } = req.params;
    try {
      const foundPet = await MyPet.findById(petId);
      res.render('pets/profile', foundPet);
    } catch (err) {
      console.log(`Err while getting a single post from the  DB: ${err}`);
      next(err);
    }
  });

  // UPDATE - EDIT pet profile
  router.get('/:petId/edit', async (req, res, next) => {
    const { petId } = req.params;
    try {
      const petToEdit = await MyPet.findById(petId);
      res.render('pets/edit-pet', { pet: petToEdit });
    } catch (error) {
      next(error);
    }
  });

  router.post('/:petId/edit', async (req, res, next) => {
    const { petId } = req.params;
    const { petsName, race, sex, age, color } = req.body;
    try {
      await MyPet.findByIdAndUpdate(petId, { petsName, race, sex, age, color });
      res.redirect('/my-pets/list');
    } catch (error) {
      next(error);
    }
  });

  // DELETE a pet
  router.post('/:petId/delete', async (req, res, next) => {
    const { petId } = req.params;
    try {
      await MyPet.findByIdAndDelete(petId);
      res.redirect('/my-pets/list');
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = myPetsRoutes;
