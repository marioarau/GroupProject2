
module.exports = function(sequelize, DataTypes) {
  var UnitPics = sequelize.define("UnitPics", {
    unitId: DataTypes.INTEGER,
    picFileName: DataTypes.STRING
  });
  return UnitPics;
};

