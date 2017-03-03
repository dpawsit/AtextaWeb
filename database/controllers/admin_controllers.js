"use strict"
var db = require('../config');
var Promise = require('bluebird');
var sequelize = require('sequelize');
var Models = require('../models/db_models');
var utils = require('../util/db_utils');
var AdminQueries = Models.AdminQueries;
var AdminCreds = Models.AdminCreds;

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

module.exports.createAdmin = (adminInfo) => {
  return new Promise ((resolve, reject) => {
    utils.cipher(adminInfo.password)
    .then(hashedPassword => {
      AdminCreds.Create({
      username : adminInfo.username,
      password : hashedPassword
      })
      .then(newAdmin => {
        resolve(newAdmin)
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
      chartOption : queryInfo.chartOption
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

