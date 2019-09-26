
module.exports = function(sequelize, DataTypes) {
  var Landlord = sequelize.define("Landlord", {
    firstName: DataTypes.STRING(80),
    lastName: DataTypes.STRING(80),
    email: DataTypes.STRING(100),
    password: DataTypes.STRING(32),
    companyName: DataTypes.STRING(60),
    phone: DataTypes.STRING(25)
  });
  return Landlord;
};

