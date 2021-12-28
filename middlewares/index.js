const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  }
  return res.redirect('/auth/login');
};

const isLoggedOut = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  next();
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
};
