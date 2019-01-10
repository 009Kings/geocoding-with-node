'use strict';
module.exports = (sequelize, DataTypes) => {
  const cityTraveller = sequelize.define('cityTraveller', {
    cityId: DataTypes.INTEGER,
    travellerId: DataTypes.INTEGER
  }, {});
  cityTraveller.associate = function(models) {
    // associations can be defined here
  };
  return cityTraveller;
};