'use strict';

module.exports = (sequelize, DataTypes) => {
    const Trx_dokumen_kemenag = sequelize.define(
        "Trx_dokumen_kemenag", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        dokumen: {
            type: DataTypes.STRING(255),
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
        tableName: "trx_dokumen_kemenag",
        timestamps: true,
    });

    Trx_dokumen_kemenag.associate = function (models) {
        Trx_dokumen_kemenag.belongsTo(models.Pengajuan, {
            foreignKey: {
                name: "id_pengajuan",
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        });
        Trx_dokumen_kemenag.belongsTo(models.Pengguna, {
            foreignKey: {
                name: "id_user",
                type: DataTypes.STRING(16),
                allowNull: false,
            },
        });
    }
    return Trx_dokumen_pmptsp;
};