module.exports = function(sequelize, DataTypes) {
    var Unit = sequelize.define("Unit", {
        //landLordId: DataTypes.INTEGER,
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
            type: DataTypes.STRING(),
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
            type: DataTypes.STRING(10),
            values: ['Apartment', 'House', 'Condo', 'Townhouse']
        }
    });

    Unit.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Unit.belongsTo(models.Landlord, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    

    return Unit;
};