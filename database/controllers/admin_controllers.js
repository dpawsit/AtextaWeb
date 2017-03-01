"use strict"
var db = require('../config');
var Promise = require('bluebird');
var sequelize = require('sequelize');
var Models = require('../models/db_models');
var AdminQueries = Models.AdminQueries;

module.exports.getAdminQueries = () => {
  return new Promise ((resolve, reject) => {
    db.query('select * from AdminQueries', {
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
    })
    .then(queryResults => {
      resolve(queryResults)
    })
    .catch(error => {
      console.log('error');
      reject(error);
    })
  })
}

module.exports.createNewAdminQuery = (queryInfo) => {
  return new Promise ((resolve, reject) => {
    AdminQueries.create({
      queryName : queryInfo.name,
      queryString : queryInfo.queryString
    })
    .then(res => {
      console.log('new query!!!!', res.dataValues)
      resolve(res.dataValues);
    })
    .catch(error => {
      console.log('error in query', error)
      reject(error);
    })
  })
}

module.exports.updateAdminQuery = (queryInfo) => {
  return new Promise ((resolve, reject) => {
    db.query(`update AdminQueries set queryString = ${queryInfo.queryString} where id = ${queryInfo.queryId}`,{
      type : sequelize.QueryTypes.UPDATE
    })
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
    let str = (queryId === 'all' ? '' : `where id in (${queryId.join(',')})`)
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

