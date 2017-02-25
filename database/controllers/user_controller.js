"use strict"
var db = require('../config');
var Promise = require('bluebird');
var sequelize = require('sequelize');
var User = require('../models/db_models').User;

module.exports.UserLogin = (userInfo) => {
  return new Promise ((resolve, reject) => {
    User.findOrCreate({
      where : {
        email : userInfo.email
      },
      defaults : {
        name : userInfo.name
      }
    }).then(user => {
      resolve(user[0].dataValues.id);
    }).catch(error => {
      reject(error);
    })
  })
}