const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  }
  return res.redirect('/auth/login');
};

module.exports = {
  isLoggedIn,
};
