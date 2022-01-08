const express = require('express');
const User = require('../models/user');
const Pets = require('../models/pets');
const fileUploader = require('../config/cloudinary.config');
const async = require('hbs/lib/async');

function petsRoutes() {
  const router = express.Router();

  router.get('/list', async (req, res, next) => {
    try {
      const { _id } = req.session.currentUser;
      const pets = await Pets.find({ owner: _id });
      res.render('pets/list', { pets });
    } catch (e) {
      next(e);
    }
  });

  router.get('/add', async (req, res, next) => {
    try {
      res.render('pets/create-pet');
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
      await Pets.create({ owner: _id, petsName, race, sex, age, color, imageUrl });
      res.redirect('/zoo');
    } catch (e) {
      next(e);
    }
  });

  // Pet details page = Pet profile
  router.get('/:petId', async (req, res, next) => {
    try {
      const { petId } = req.params;
      const foundPet = await Pets.findById(petId);
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
      const pet = await Pets.findById(petId);
      res.render('pets/edit-pet', { pet });
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
      await Pets.findByIdAndUpdate(petId, { petsName, race, sex, age, color, imageUrl }, { new: true });
      res.redirect('/my-pets/list');
    } catch (error) {
      next(error);
    }
  });

  // DELETE a pet
  router.post('/:petId/delete', async (req, res, next) => {
    const { petId } = req.params;
    try {
      await Pets.findByIdAndDelete(petId);
      res.redirect('/my-pets/list');
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = petsRoutes;
