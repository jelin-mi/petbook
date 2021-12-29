const express = require('express');
/* const router = express.Router(); */

// require Pet, User model
const Pet = require('../models/pet');
const User = require('../models/user');
const MyPet = require('../models/MyPet');
// para bloquear las rutas/vistas
const { isLoggedIn } = require('../middlewares/index');

function myPetsRoutes() {
  const router = express.Router();

  //
  router.get('/add', async (req, res, next) => {
    try {
      const { _id } = req.session.currentUser;
      
      // My pets  
      /* const myPets = await MyPet.find({ owner: { _id }}).populate('pet');
      res.render('pets/create-pet', { myPets }); */

      const user = await User.findById({ _id }).populate('myPets');
      res.render('pets/create-pet', { user });
    } catch (e) {
      next(e);
    }
  });


  router.post('/add', async (req, res, next) => {
    try {
      const { _id } = req.session.currentUser;
      const { petsName, sex, age, color } = req.body;
      const pet = await MyPet.create(_id, { petsName, sex, age, color });
      const userUpdate = await User.findByIdAndUpdate(_id, { $push: { myPets: pet._id } }, { new: true }).populate(
        'myPets',
      );
      req.session.currentUser = userUpdate;
      res.redirect('/my-pets');
    } catch (e) {
      next(e);
    }
  });
  return router;
}

module.exports = myPetsRoutes;
