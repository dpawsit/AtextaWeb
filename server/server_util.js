"use strict"
const jwt = require('jsonwebtoken');
const secret = require('../keys').secret;
const Promise = require('bluebird');

module.exports.checkUser = (req, res, next) => {
  let token = req.headers.authorization;

  if (req.path === '/auth/login' || 
      req.path === '/' || 
      req.path === '/login' ||
      req.path === '/dashboard' ||
      req.path === '/admin') {
    next();
  } else {
    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
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

module.exports.signToken = (userId) => {
  return new Promise ((resolve, reject) => {
    jwt.sign({userId}, secret, {
      expiresIn : '1h'
    }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token)
      }
    })
  })
}