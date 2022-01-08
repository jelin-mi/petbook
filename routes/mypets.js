const express = require('express');
const User = require('../models/user');
const MyPet = require('../models/MyPet');
const fileUploader = require('../config/cloudinary.config');
const async = require('hbs/lib/async');

function myPetsRoutes() {
  const router = express.Router();

  router.get('/list', async (req, res, next) => {
    try {
      const { _id } = req.session.currentUser;
      const user = await User.find({ _id }).populate('myPets');// TODO change the find when change relation
      res.render('pets/list', { user, myPets: 'myPets' });
    } catch (e) {
      next(e);
    }
  });

  router.get('/add', async (req, res, next) => {
    try {
      const pets = await MyPet.find(); // TODO if not need it delete it
      res.render('pets/create-pet', { pets, active: { pets: true } }); // TODO remove all variable that we send to views if we don't use it
    } catch (e) {
      next(e);
    }
  });

  router.post('/add', fileUploader.single('pet-picture'), async (req, res, next) => {
    const { _id } = req.session.currentUser;
    const { petsName, race, sex, age, color, existingImage } = req.body;

    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }

    try {
      const pet = await MyPet.create({ petsName, race, sex, age, color, imageUrl });
      const userEdited = await User.findByIdAndUpdate(_id, { $push: { myPets: pet._id } }, { new: true }).populate(
        'myPets',
      );// TODO change realation and we will simplify this logic only one access to DB
      req.session.currentUser = userEdited;
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

  router.post('/:petId/edit', fileUploader.single('pet-picture'), async (req, res, next) => {
    const { petId } = req.params;
    const { petsName, race, sex, age, color, existingImage } = req.body;

    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }

    try {
      await MyPet.findByIdAndUpdate(petId, { petsName, race, sex, age, color, imageUrl }, { new: true });
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
