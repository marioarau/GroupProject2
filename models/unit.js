<<<<<<< HEAD
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
=======
module.exports = function(sequelize, DataTypes) {
>>>>>>> c40f80abb5f895f0f4227ca755fbd0571c55fdcf

    var Unit = sequelize.define("Unit", {
        landLordId: DataTypes.INTEGER,
        bedrooms: DataTypes.STRING(10),
        baths: DataTypes.STRING(10),
        avgSqFt: DataTypes.INTEGER,
        availability: DataTypes.STRING(15),
        address: DataTypes.STRING(80),
        city: DataTypes.STRING(35),
        state: DataTypes.STRING(2),
        zip: DataTypes.STRING(10),
        phone: DataTypes.STRING(25),
        desc: DataTypes.TEXT,
        type: DataTypes.STRING(50)
    });
    return Unit;
};