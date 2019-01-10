'use strict';
module.exports = (sequelize, DataTypes) => {
  const city = sequelize.define('city', {
    city: DataTypes.TEXT,
    state: DataTypes.TEXT,
    lat: DataTypes.NUMERIC,
    long: DataTypes.NUMERIC
  }, {});
  city.associate = function(models) {
    // associations can be defined here
    models.city.belongsToMany(models.traveller, { through: 'cityTraveller' });
  };
  return city;
};