"use strict"
var db = require('../config');
var Promise = require('bluebird');
var sequelize = require('sequelize');
var Models = require('../models/db_models');
var utils = require('../util/db_utils');
var AdminQueries = Models.AdminQueries;
var AdminCreds = Models.AdminCreds;
var SecretTriggers = Models.SecretTriggers;

module.exports.adminLogin = (adminInfo) => {
  return new Promise ((resolve, reject) => {
    AdminCreds.findOne({where : {
      username : adminInfo.username
    }})
    .then(admin => {
      utils.comparePassword(adminInfo.password, admin.password)
      .then(match => {
        if (match) {
          resolve({admin : true, id : admin.id})
        } else {
          resolve({admin : false})
        }
      })
      .catch(error => {
        reject(error);
      })
    })
    .catch(error => {
      reject(error);
    })
  })
}

module.exports.getAdminQueries = () => {
  return new Promise ((resolve, reject) => {
    db.query('select AQ.*, AC.username from AdminQueries AQ join AdminCreds AC on AQ.createdBy = AC.id', {
      type : sequelize.QueryTypes.SELECT
    })
    .then(queries => {
      resolve(queries)
    })
    .catch(error => {
      reject(error);
    })
  })
}

module.exports.runAdminQuery = (queryString) => {
  return new Promise ((resolve, reject) => {
    db.query(queryString, {
      type : sequelize.QueryTypes.SELECT
    }).then(queryResults => {
      resolve(queryResults)
    }).catch(error => {
      reject(error);
    })
  })
}

module.exports.createNewAdminQuery = (queryInfo) => {
  return new Promise ((resolve, reject) => {
    AdminQueries.create({
      queryName : queryInfo.name,
      queryString : queryInfo.queryString,
      chartOption : queryInfo.chartOption,
      createdBy : queryInfo.adminId
    })
    .then(res => {
      resolve(res.dataValues);
    })
    .catch(error => {
      reject(error);
    })
  })
}

module.exports.updateAdminQuery = (queryInfo) => {
  return new Promise ((resolve, reject) => {
    AdminQueries.update({
      queryName: queryInfo.name,
      queryString : queryInfo.queryString,
      chartOption : queryInfo.chartOption
    },
    {where : { id : queryInfo.id}})
    .then(result => {
      resolve({update : true})
    })
    .catch(error => {
      reject(error);
    })
  })
}

module.exports.deleteAdminQuery = (queryId) => {
  return new Promise ((resolve, reject) => {
  let str = `where id in (${queryId.join(',')})`;
    db.query('delete from AdminQueries ' + str, {
      type : sequelize.QueryTypes.DELETE
    })
    .then(res => {
      resolve({deleted: true})
    })
    .catch(error => {
      reject(error);
    })
  })
}

module.exports.createNewAdmin = (adminInfo) => {
  return new Promise ((resolve, reject) => {
    utils.cipher(adminInfo.password)
    .then(hashedPassword => {
      AdminCreds.create({
      username : adminInfo.username,
      password : hashedPassword,
      createdBy : adminInfo.adminId
      })
      .then(newAdmin => {
        resolve({created : true})
      })
      .catch(error => {
        reject(error);
      })
    })
    .catch(error => {
      reject(error);
    })
  })
}

module.exports.updatePassword = (adminInfo) => {
  return new Promise ((resolve, reject) => {
    AdminCreds.findOne({where : {
      id : adminInfo.id
    }})
    .then(admin => {
      utils.comparePassword(adminInfo.currentPassword, admin.password)
      .then(match => {
        if (match) {
          utils.cipher(adminInfo.newPassword)
          .then(hashedPassword => {
            db.query('update AdminCreds set password = ? where id =?',{
              replacements: [hashedPassword, admin.id], type : sequelize.QueryTypes.UPDATE
            }).then(updatedPassword => {
              resolve({update:true})
            }).catch(error => {
              reject(error);
            })
          })
          .catch(error => {
            reject(error);
          })
        } else {
          resolve({update : false})
        }
      })
      .catch(error => {
        reject(error);
      })
    })
    .catch(error => {
      reject(error);
    })
  })
}

module.exports.getSecretTriggers = () => {
  return new Promise ((resolve, reject) => {
    Promise.all([
      db.query('select ST.*, AC.username from SecretTriggers ST join AdminCreds AC on AC.id = ST.createdBy where ST.status = 1', {
        type : sequelize.QueryTypes.SELECT
      }),
      db.query('select ST.*, AC.username from SecretTriggers ST join AdminCreds AC on AC.id = ST.createdBy where ST.status = 0', {
        type : sequelize.QueryTypes.SELECT
      })
    ])
    .then(result => {
      resolve(result);
    })
    .catch(error => {
      reject(error);
    })
  })
}


module.exports.createSecretTrigger = (secretInfo) => {
  return new Promise ((resolve, reject) => {
    SecretTriggers.create({
      name : secretInfo.name,
      count : 0,
      status : 1,
      createdBy : secretInfo.adminId
    })
    .then(result => {
      resolve({created : true});
    })
    .catch(error => {
      reject(error);
    })
  })
}

module.exports.deActivateSecretTrigger = (secretId) => {
  return new Promise ((resolve, reject) => {
    let str = `where id in (${secretId.join(',')})`;
    db.query('update SecretTriggers set status = 0'+str , {
      type : sequelize.QueryTypes.UPDATE
    })
    .then(result => {
      resolve({deActivated : true})
    })
    .catch(error => {
      reject(error);
    })
  })
}

module.exports.reActivateSecretTrigger = (secretId) => {
  return new Promise ((resolve, reject) => {
    let str = `where id in (${secretId.join(',')})`;
    db.query('update SecretTriggers set status = 1' + str, {
      type : sequelize.QueryTypes.UPDATE
    })
    .then(result => {
      resolve({reActivated : true})
    })
    .catch(error => {
      reject(error);
    })
  })
}
