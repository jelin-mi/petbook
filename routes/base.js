const express = require('express');

function baseRoutes() {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    const user = req.session.currentUser;
    try {
      res.render('home.hbs', { name: 'Ironhack', user });
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = baseRoutes;
