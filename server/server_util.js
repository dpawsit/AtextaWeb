module.exports.checkUser = (req, res, next) => {
  if (req.path === '/auth/login' || req.path === '/') {
    next();
  } else {
    if (!req.sesion.token) {
      res.status(403).send('Unauthorized');
    } else {
      next();
    }
  }
}