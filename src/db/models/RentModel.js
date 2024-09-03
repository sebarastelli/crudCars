const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelizeConfig');

class Rent extends Model {}

Rent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fk_car: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cars',
        key: 'id',
      },
      allowNull: false,
    },
    fk_user: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    finishDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Rent',
    timestamps: true,
  },
);

module.exports = Rent;
