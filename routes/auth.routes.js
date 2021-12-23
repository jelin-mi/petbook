const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { use } = require('express/lib/application');
const saltRounds = 10;

function authRoutes() {
  const router = express.Router();

  router.get('/register', (req, res, next) => {
    res.render('auth/register');
  });

  router.post('/register', async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const salt = await bcryptjs.genSalt(saltRounds);
      const hashedPassword = await bcryptjs.hash(password, salt);
      await User.create({ email, hashedPassword });
      res.redirect('/');
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.render('auth/register', { errorMessage: e.message });
      }
      if (e.name === 'MongoServerError' && e.code === 11000) {
        return res.render('auth/register', { errorMessage: 'email exist ' });
      }
      next(e);
    }
  });

  router.get('/login', (req, res, next) => {
    res.render('auth/login');
  });

  router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    if (email === '' || password === '') {
      return res.render('auth/login', { errorMessage: 'Enter correct user and password' });
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.render('auth/login', { errorMessage: 'User not found' });
      }
      if (bcryptjs.compareSync(password, user.hashedPassword)) {
        req.session.currentUser = {
          _id: user._id,
          email: user.email,
        };
        return res.redirect('/');
      }
      return res.render('auth/login', { errorMessage: 'Incorrect password' });
    } catch (e) {
      next(e);
    }
  });
  return router;
}

module.exports = authRoutes;
