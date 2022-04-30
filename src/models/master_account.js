'use strict';

module.exports = (sequelize, DataTypes) => {
    const Master_account = sequelize.define(
        "Master_account", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING(100),
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            is_active: {
                type: DataTypes.ENUM("Enable", "Disable"),
                defaultValue: "Disable",
                allowNull: false,
            },
            idUser_create: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            idUser_update: {
                type: DataTypes.INTEGER,
            },
        }, {
            tableName: "master_accounts",
            timestamps: true,
        }
    );

    Master_account.associate = function(models) {
        Master_account.belongsTo(models.Master_role, {
            foreignKey: {
                name: 'id_role',
                type: DataTypes.INTEGER,
                allowNull: false
            }
        });
        Master_account.hasOne(models.Master_user, {
            foreignKey: {
                name: "id",
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        });
        Master_account.hasMany(models.Master_applicant, {
            foreignKey: {
                name: "id_user",
                type: DataTypes.INTEGER,
                allowNull: false,

            },
        });
        Master_account.hasMany(models.Trx_requirement_document, {
            foreignKey: {
                name: "id_user",
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        })
    }

    return Master_account;
};