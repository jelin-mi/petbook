const express = require('express');
const async = require('hbs/lib/async');
const mongoose = require('mongoose');
const User = require('../models/user');
const Pets = require('../models/pets');
const fileUploader = require('../config/cloudinary.config');

function userRoutes() {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    try {
      const { _id } = req.session.currentUser;
      const user = await User.findById(_id);
      res.render('user/profile', { user });
    } catch (e) {
      next(e);
    }
  });

  router.get('/edit', async (req, res, next) => {
    const { _id } = req.session.currentUser;
    try {
      const user = await User.findOne({ _id });
      res.render('user/profile.edit.hbs', { user });
    } catch (e) {
      next(e);
    }
  });

  router.post('/edit', fileUploader.single('profile-picture'), async (req, res, next) => {
    const { _id } = req.session.currentUser;
    const { name, email, age, city, existingImage } = req.body;
    console.log(req.file);
    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }

    try {
      const userEdited = await User.findByIdAndUpdate(_id, { name, email, age, city, imageUrl }, { new: true });
      req.session.currentUser = userEdited;
      res.redirect('/user');
    } catch (e) {
      next(e);
    }
  });

  router.post('/:id/delete', async (req, res, next) => {
    const { _id } = req.session.currentUser;
    try {
      await Pets.deleteMany({ owner: _id });
      await User.findByIdAndDelete(_id);
      req.session.destroy();
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = userRoutes;
