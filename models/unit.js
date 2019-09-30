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

    // uncomment after getting landlord model going
    // Unit.associate = function(models) {
    //     // We're saying that a Post should belong to an Author
    //     // A Post can't be created without an Author due to the foreign key constraint
    //     Unit.belongsTo(models.Landlord, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return Unit;
};