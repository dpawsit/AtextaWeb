"use strict"
const jwt = require('jsonwebtoken');
const config = require('../keys').secret;

module.exports.checkUser = (req, res, next) => {
  let token = req.headers.authorization;

  if (req.path === '/auth/login' || 
      req.path === '/' || 
      req.path === '/login' ||
      req.path === '/dashboard') {
    next();
  } else {
    if (token) {
      jwt.verify(token, config, (error, decoded) => {
        if (error) {
          res.status(403).json({message : 'Failed to authenticate token.'});
        } else {
          next();
        }
      })
    } else {
      res.status(403).json({message : 'No token provided'});
    }
  }
}