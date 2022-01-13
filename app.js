const express = require('express');
const handlebars = require('hbs');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

const { MONGO_URI } = require('./db/index');

const baseRoutes = require('./routes/base');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const zooRoutes = require('./routes/zoo');
const petsRoutes = require('./routes/pets');
const { isLoggedIn } = require('./middlewares');
const { isAnomUser } = require('./middlewares');

handlebars.registerPartials(path.join(__dirname + '/views/partials'));

function setupApp() {
  const app = express();
  app.set('view engine', 'hbs');
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(cookieParser());
  app.use(morgan('dev'));
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: MONGO_URI,
        ttl: 24 * 60 * 60,
      }),
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
      },
    }),
  );

  app.use('/', baseRoutes());
  app.use('/auth', isAnomUser, authRoutes());
  app.use('/zoo', zooRoutes());
  app.use('/my-pets', isLoggedIn, petsRoutes());
  app.use('/user', isLoggedIn, userRoutes());

  app.use((req, res) => {
    res.render('404.hbs');
  });

  app.use((error, req, res, next) => {
    let err;
    if (req.app.get('env') === 'development') {
      err = error;
      res.render('error', { message: error.message, error: err });
    } else {
      err = {};
      res.render('500.hbs');
    }
  });

  return app;
}

module.exports = setupApp;
