module.exports = function (sequelize, DataTypes) {
  var Unit = sequelize.define("Unit", {
    landLordId: DataTypes.INTEGER,
    bedrooms: DataTypes.STRING(10),
    baths: DataTypes.STRING(10),
    avgSqFt: DataTypes.INTEGER,
    availability: {
      type: Sequelize.ENUM,
      values: ['Available Now', 'Available Soon', 'Waiting List', 'Not Available']
    },
    address: DataTypes.STRING(80),
    city: DataTypes.STRING(35),
    state: DataTypes.STRING(2),
    zip: DataTypes.STRING(10),
    phone: DataTypes.STRING(25),
    desc: DataTypes.TEXT,
    type: {
      type: Sequelize.ENUM,
      values: ['Apartment', 'House', 'Condo', 'Townhouse']
    }
  });
  return Unit;
};

