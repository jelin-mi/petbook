const express = require('express');
const MyPet = require('../models/MyPet');
/* const router = express.Router(); */

// require Pet, User model
const Pet = require('../models/pet');
const User = require('../models/user');

// CREATE - add a pet
// GET
function petsRoutes() {
  const router = express.Router();

  /*  How to link it with a user? Something like this below? */
  /*   router.get('/add', (req, res, next) => {
    User.find().then(usersFromDB => {
      res.render('pets/create-pet', { usersFromDB });
    });
  });

  // POST
  router.post('/add', (req, res, next) => {
    const { petsName, owner, sex, age, color } = req.body;

    Pet.create({ petsName, owner, sex, age, color })
      .then(dbPet => {
        return User.findByIdAndUpdate(owner, { $push: { pets: dbPet._id } });
      })
      .then(() => res.redirect('/zoo/pets-list'))
      .catch(err => {
        console.log(`Err while creating the pet in the DB: ${err}`);
        next(err);
      });
  }); */

  // This is copied from Learning Unit, it needs to be adapted - other way round as we have ObjectId in  Pet model, not in a User model ??

  // READ - user-pets-list: /zoo/pets-list into /pets-list

  router.get('/', async (req, res, next) => {
    try {
      const pet = await Pet.find();
      const myPet = await MyPet.find();
      res.render('pets/zoo', { pet, myPet });
    } catch (e) {
      next(e);
    }
  });

  /*   router.get('/', (req, res, next) => {
    Pet.find({})
     /*  .populate('owner') */
  /*  .then(dbPets => {
       
        res.render('pets/zoo', { pets: dbPets })
        .then MyPet.find({})
        .then(dbMyPets=>{
          res.render('pets/zoo', {dbMyPets})
        })
      })
      .catch(err => {
        console.log(`Err while getting the pets from the DB: ${err}`);
        next(err);
      });
  }); */

  return router;
}

module.exports = petsRoutes;
