const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');

function userRoutes() {
  const router = express.Router();

  router.get('/user', (req, res, next) => {
    User.find({})
      .then(user => {
        res.render('user/profile', { user: user });
      })
      .catch(e => next(e));
  });

  /* router.get('/user/:id/edit', (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
      .then(user => {
        res.render('user/profile', { user: user });
      })
      .catch(e => next(e));
  }); */
  return router;
}

module.exports = userRoutes;
