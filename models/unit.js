module.exports = function(sequelize, DataTypes) {

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