const { DataTypes, Sequelize } = require('sequelize');

const sequelize = require('../db');


const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  todo: {
    type: DataTypes.STRING,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
});

module.exports = Item;
