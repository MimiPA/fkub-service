'use strict';

module.exports = (sequelize, DataTypes) => {
    const Trx_dokumen_penentang = sequelize.define(
        "Trx_dokumen_penentang", {
        surat_pernyataan: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        foto_ktp: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        foto_diri: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        tanda_tangan: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        alasan: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Submit', 'Ditolak', 'Diterima'),
            defaultValue: "Submit",
            allowNull: false
        },
        idUser_create: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        idUser_update: {
            type: DataTypes.STRING(16),
            allowNull:true,
        },
    }, {
        tableName: "trx_dokumen_penentang",
        timestamps: true,
    });

    Trx_dokumen_penentang.associate = function (models) {
        Trx_dokumen_penentang.belongsTo(models.Pendukung, {
            foreignKey: {
                name: "id",
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
        });
    }
    return Trx_dokumen_penentang;
};