const Sequelize = require('sequelize');
const connection = require('../keys.js');

var db = new Sequelize('mysql://'+connection);

module.exports = db;