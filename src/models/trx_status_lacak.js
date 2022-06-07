'use strict';

module.exports = (sequelize, DataTypes) => {
    const Trx_status_lacak = sequelize.define(
        "Trx_status_lacak", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        status: {
            type: DataTypes.ENUM('Proses', 'Selesai'),
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
        tableName: "trx_status_lacak",
        timestamps: true,
    });

    Trx_status_lacak.associate = function (models) {
        Trx_status_lacak.belongsTo(models.Pengajuan, {
            foreignKey: {
                name: "id_pengajuan",
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        });
        Trx_status_lacak.belongsTo(models.Pelacakan, {
            foreignKey: {
                name: "id_pelacakan",
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        });
    }
    return Trx_status_lacak;
};