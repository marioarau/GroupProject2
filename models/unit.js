module.exports = function(sequelize, DataTypes) {
    var Unit = sequelize.define("Unit", {
        landLordId: DataTypes.INTEGER,
        rent: DataTypes.DECIMAL(10, 2),
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        bedrooms: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        baths: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        avgSqFt: DataTypes.INTEGER,
        availability: {
            type: DataTypes.ENUM,
            values: ['Available Now', 'Available Soon', 'Waiting List', 'Not Available']
        },
        address: {
            type: DataTypes.STRING(80),
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING(35),
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(2),
            allowNull: false,
        },
        zip: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        desc: DataTypes.TEXT,
        type: {
            type: DataTypes.ENUM,
            values: ['Apartment', 'House', 'Condo', 'Townhouse']
        }
    });
    return Unit;
};