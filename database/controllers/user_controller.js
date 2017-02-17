var db = require('../config');
var Promise = require('bluebird');
var sequelize = require('sequelize');
var User = require('../models/db_models').User;

module.exports.UserLogin = (userInfo) => {
  console.log('user info in user controller', userInfo)
  return new Promise ((resolve, reject) => {
    User.findOrCreate({
      where : {
        email : userInfo.email
      },
      defaults : {
        name : userInfo.name,
        authString : JSON.stringify(userInfo)
      }
    }).then(user => {
      resolve(user[0].id);
    }).catch(error => {
      reject(error);
    })
  })
}