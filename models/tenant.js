
module.exports = function(sequelize, DataTypes) {
  var Tenant = sequelize.define("Tenant", {
    firstName: DataTypes.STRING(80),
    lastName: DataTypes.STRING(80),
    email: DataTypes.STRING(100),
    password: DataTypes.STRING(32),
    phone: DataTypes.STRING(25)
  });
  return Tenant;
};

