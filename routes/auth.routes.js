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

router.get('/login', (req, res, next)=>{
    res.render('/auth/login');
})

router.post('/login', (req, res, next)=>{
    const { user, password} = req.body;
    if (user === '' || password === ''){
        res.render('auth/login',{errorMessage: 'Enter correct user and password'});
    }
    return;
    User.findOne({user})
    .then(user)=>{
        if(!user){
            res.render('auth/login', {errorMessage:'User not found'});
            return;
        } else if (bcryptjs.compareSync(password, user.hashedPassword)){
            res.render('user/user-profile',{user});
        } else {
            res.render('auth/login', {errorMessage:'Incorrect password'})
        }
    }
    .catch(e=>next(e));
})


module.exports = router;