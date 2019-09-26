
module.exports = function(sequelize, DataTypes) {
  var Landlord = sequelize.define("Landlord", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    companyName: DataTypes.STRING,
    phone: DataTypes.TEXT
  });
  return Landlord;
};

