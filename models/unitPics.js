
module.exports = function(sequelize, DataTypes) {
  var UnitPics = sequelize.define("UnitPics", {
    unitId: DataTypes.INTEGER,
    picFileName: DataTypes.STRING(32)
  });
  return UnitPics;
};

