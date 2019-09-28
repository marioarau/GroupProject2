module.exports = function(sequelize, DataTypes) {
    var Unit = sequelize.define("Unit", {
        landLordId: DataTypes.INTEGER,
        bedrooms: DataTypes.STRING,
        baths: DataTypes.STRING,
        avgSqFt: DataTypes.INTEGER,
        availability: DataTypes.STRING,
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip: DataTypes.STRING,
        phone: DataTypes.STRING,
        desc: DataTypes.STRING,
        type: DataTypes.STRING
    });
    return Unit;
};