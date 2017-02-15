const Sequelize = require('sequelize');
const connection = require('../keys.js');

var db = new Sequelize('mysql://admin:KLBMCAMIPBEDXHOV@aws-us-east-1-portal.9.dblayer.com:17114/compose');

module.exports = db;