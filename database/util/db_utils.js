"use strict"
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');

module.exports.comparePassword = (enteredPassword, savedPassword) => {
  return new Promise ((resolve, reject) => {
    return bcrypt.compare(enteredPassword, savedPassword, (err, isMatch)=>{
      if (err) {
        return reject(err);
      } else {
        return resolve(isMatch);
      }
    })
  })
};

module.exports.cipher = (enteredPassword) => {
  return new Promise ((resolve, reject) => {
    return bcrypt.hash(enteredPassword, null, null, (error, result) => {
      if(error) {
        return reject(error);
      } else {
        return resolve(result);
      }
    })
  })
}

