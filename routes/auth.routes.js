const { Router } = require('express');
const router = new Router();
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

router.get('/register', (req, res, next)=>{
    res.render('/partials/auth/register')
})

router.post('/register', (req, res, next)=>{
    const { user, email, hashedPassword } = req.body;

    bcryptjs
    .genSalt(saltRounds)
    .then(salt=> bcryptjs.hash(password, salt))
    .then(hashedPassword =>{
        return User.create({
            user, email, password: hashedPassword
        })
        .then(user=>{
            console.log('user created')
        })
    })
    .catch(e => next(e))
})

module.exports = router;