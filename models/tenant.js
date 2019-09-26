
module.exports = function(sequelize, DataTypes) {
  var Tenant = sequelize.define("Tenant", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING
  });
  return Tenant;
};

