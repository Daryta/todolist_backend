const { Sequelize, DataTypes } = require('sequelize');

// Init the .env
require('dotenv').config();


// const sequelize = new Sequelize( process.env.DB_NAME || 'todolist',
// process.env.DB_USERNAME,
// process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//   });

const sequelize = new Sequelize('todolist', '', '', {
  dialect: 'sqlite',
  storage: 'todolist.sqlite',
  logging: false,
});

module.exports = sequelize;