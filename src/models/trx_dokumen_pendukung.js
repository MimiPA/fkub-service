'use strict';

module.exports = (sequelize, DataTypes) => {
    const Trx_dokumen_pendukung = sequelize.define(
        "Trx_dokumen_pendukung", {
        sumber_dukungan: {
            type: DataTypes.ENUM('Jemaat', 'Masyarakat'),
            allowNull: false,
        },
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
        idUser_create: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        idUser_update: {
            type: DataTypes.STRING(16),
            allowNull: true,
        },
    }, {
        tableName: "trx_dokumen_pendukung",
        timestamps: true,
    });

    Trx_dokumen_pendukung.associate = function (models) {
        Trx_dokumen_pendukung.belongsTo(models.Pendukung, {
            foreignKey: {
                name: "id",
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
        });
    }
    return Trx_dokumen_pendukung;
};