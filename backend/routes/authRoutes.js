const passport = require('passport');
const checkPath = require('../middlewares/checkPath');

module.exports = app => {
  app.get(
    '/auth/google',
    checkPath,
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect(req.session.returnTo);
    delete req.session.returnTo;
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect(req.session.returnTo);
  });
};
