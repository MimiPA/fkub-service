'use strict';

module.exports = (sequelize, DataTypes) => {
    const Trx_alasan_penolakan = sequelize.define(
        "Trx_alasan_penolakan", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        alasan: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
        idUser_create: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        idUser_update: {
            type: DataTypes.STRING(16),
        },
    }, {
        tableName: "trx_alasan_penolakan",
        timestamps: true,
    });

    Trx_alasan_penolakan.associate = function (models) {
        Trx_alasan_penolakan.belongsTo(models.Pendukung, {
            foreignKey: {
                name: "id_pendukung",
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        });
    }
    return Trx_alasan_penolakan;
};