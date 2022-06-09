'use strict';

module.exports = (sequelize, DataTypes) => {
    const Trx_dokumen_instansi = sequelize.define(
        "Trx_dokumen_instansi", {
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
            type: DataTypes.ENUM('Surat Pengajuan KRK', 'KRK', 'Surat Rekomendasi Kemenag', 'Surat Survey Lapangan', 'Surat Rekomendasi FKUB', 'IMB'),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('Admin', 'PMPTSP', 'FKUB', 'Kemenag', 'Dinas Tata Ruang'),
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
        tableName: "trx_dokumen_instansi",
        timestamps: true,
    });

    Trx_dokumen_instansi.associate = function (models) {
        Trx_dokumen_instansi.belongsTo(models.Pengajuan, {
            foreignKey: {
                name: "id_pengajuan",
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        });
        Trx_dokumen_instansi.belongsTo(models.Pengguna, {
            foreignKey: {
                name: "id_user",
                type: DataTypes.STRING(16),
                allowNull: false,
            },
        });
    }
    return Trx_dokumen_instansi;
};