'use strict';

module.exports = (sequelize, DataTypes) => {
    const Trx_dokumen_pemohon = sequelize.define(
        "Trx_dokumen_pemohon", {
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
            type: DataTypes.ENUM('SK Panitia Pembangunan', 'Akta Jual Beli', 'Sertifikat Hak Milik', 'Surat Ukur', 'Badan Hukum', 'Rencana Anggaran Biaya', 'Gambar Denah Gedung', 'Surat Lainnya'),
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
        tableName: "trx_dokumen_pemohon",
        timestamps: true,
    }
    );

    Trx_dokumen_pemohon.associate = function (models) {
        Trx_dokumen_pemohon.belongsTo(models.Pengajuan, {
            foreignKey: {
                name: "id_pengajuan",
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        });
    }
    return Trx_dokumen_pemohon;
};