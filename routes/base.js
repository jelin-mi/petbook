const express = require('express');

function baseRoutes() {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    const user = req.session.currentUser;
    try {
      res.render('home.hbs', { name: 'Ironhack', user, isAnom: !user });
    } catch (e) {
      next(e);
    }
  });

  router.post('/logout', (req, res, next) => {
    req.session.destroy(err => {
      if (err) {
        next(err);
      }
      res.redirect('/auth/login');
    });
  });

  return router;
}

module.exports = baseRoutes;
