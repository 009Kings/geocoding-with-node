'use strict';
module.exports = (sequelize, DataTypes) => {
  const traveller = sequelize.define('traveller', {
    firstname: DataTypes.TEXT,
    lastname: DataTypes.TEXT
  }, {});
  traveller.associate = function(models) {
    // associations can be defined here
    models.traveller.belongsToMany(models.city, { through: 'cityTraveller' })
  };
  return traveller;
};