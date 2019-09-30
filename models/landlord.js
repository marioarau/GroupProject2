module.exports = function(sequelize, DataTypes) {
    var Landlord = sequelize.define("Landlord", {
        firstName: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                isEmail: true
            },
            unique: {
                args: true,
                msg: 'Email address already in use!'
            }
        },
        password: {
            type: DataTypes.STRING(32),
            allowNull: false,
            validate: {
                len: {
                    args: 8
                }
            }
        },
        companyName: DataTypes.STRING(60),
        phone: {
            type: DataTypes.STRING(25),
            allowNull: false,
        }
    });
    return Landlord;
};