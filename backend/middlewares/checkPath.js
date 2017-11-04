const { URL } = require('url');

module.exports = (req, res, next) => {
  const url = new URL(req.headers.referer);

  req.session.returnTo = url.pathname;

  next();
};
