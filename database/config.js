const Sequelize = require('sequelize');
const cred = require('../keys.js');

var db = new Sequelize('atexta', cred.username, cred.password, {
  host: 'atexta.c1qn5i5sh8u5.us-east-1.rds.amazonaws.com',
  port : 3306,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = db;


// var Sequelize = require('sequelize');
// var db = new Sequelize('mysql://admin:IRVRJIXSFGEBUQOI@aws-us-east-1-portal.25.dblayer.com:17284/compose');
// module.exports = db;
