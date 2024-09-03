const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeConfig.js');

const Car = sequelize.define(
  'Car',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    brand: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    model: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    kms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ac: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    passengers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transmission: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    picture: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timestamps: true,
  },
  {
    tableName: 'cars',
  },
);

Car.hasOne(require('./RentModel'), { foreignKey: 'fk_car' });

module.exports = Car;
