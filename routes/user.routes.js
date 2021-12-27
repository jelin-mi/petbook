const express = require('express');
const async = require('hbs/lib/async');
const mongoose = require('mongoose');
const User = require('../models/user');

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
    /*     const { _id } = req.session.currentUser;
    User.findById(_id)
      .then(user => {
        res.render('user/profile', { user });
      })
      .catch(e => next(e)); */
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

  router.post('/edit', async (req, res, next) => {
    const { _id } = req.session.currentUser;
    const { name, email, age, city } = req.body;
    try {
      const userEdited = await User.findByIdAndUpdate(_id, { name, email, age, city }, { new: true });
      req.session.currentUser = userEdited;
      res.redirect('/user');
    } catch (e) {
      next(e);
    }
    /*     User.findByIdAndUpdate(_id, { name, email, age, city }, { new: true })
      .then(() => {
        res.redirect('/user');
      })
      .catch(e => next(e)); */
  });
  return router;
}

module.exports = userRoutes;
