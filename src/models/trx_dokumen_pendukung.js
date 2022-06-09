'use strict';

module.exports = (sequelize, DataTypes) => {
    const Trx_dokumen_pendukung = sequelize.define(
        "Trx_dokumen_pendukung", {
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
            type: DataTypes.ENUM('Surat Pernyataan Dukungan', 'Foto KTP', 'Foto Diri'),
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
        },
    }, {
        tableName: "trx_dokumen_pendukung",
        timestamps: true,
    });

    Trx_dokumen_pendukung.associate = function (models) {
        Trx_dokumen_pendukung.belongsTo(models.Pengajuan, {
            foreignKey: {
                name: "id_pengajuan",
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        });
        Trx_dokumen_pendukung.belongsTo(models.Pengguna, {
            foreignKey: {
                name: "id_user",
                type: DataTypes.STRING(16),
                allowNull: false,
            },
        });
    }
    return Trx_dokumen_pendukung;
};