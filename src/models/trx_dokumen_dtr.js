'use strict';

module.exports = (sequelize, DataTypes) => {
    const Trx_dokumen_dtr = sequelize.define(
        "Trx_dokumen_dtr", {
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
        kategori_dokumen: {
            type: DataTypes.ENUM('KRK', 'IMB'),
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
        tableName: "trx_dokumen_dtr",
        timestamps: true,
    });

    Trx_dokumen_dtr.associate = function (models) {
        Trx_dokumen_dtr.belongsTo(models.Pengajuan, {
            foreignKey: {
                name: "id_pengajuan",
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        });
        Trx_dokumen_dtr.belongsTo(models.Pengguna, {
            foreignKey: {
                name: "id_user",
                type: DataTypes.STRING(16),
                allowNull: false,
            },
        });
    }
    return Trx_dokumen_dtr;
};