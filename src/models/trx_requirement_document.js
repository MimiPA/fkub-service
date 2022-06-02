'use strict';

module.exports = (sequelize, DataTypes) => {
    const Trx_requirement_document = sequelize.define(
        "Trx_requirement_document", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            nama_file: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            tipe_file: {
                type: DataTypes.STRING(10),
            },
            status: {
                allowNull: true,
                type: DataTypes.ENUM('Submit', 'Accepted', 'Rejected'),
                defaultValue: 'Submit'
            },
            idUser_create: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            idUser_update: {
                type: DataTypes.INTEGER,
            },
        }, {
            tableName: "trx_requirement_documents",
            timestamps: true,
        }
    );

    Trx_requirement_document.associate = function(models) {
        Trx_requirement_document.belongsTo(models.Pengajuan, {
            foreignKey: {
                name: "id_applicant",
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        });
        Trx_requirement_document.belongsTo(models.Pengguna, {
            foreignKey: {
                name: "id_user",
                type: DataTypes.STRING,
                allowNull: false,
            },
        });
        Trx_requirement_document.belongsTo(models.Master_requirement, {
            foreignKey: {
                name: "id_kategori_berkas",
                type: DataTypes.INTEGER,
            },
        });
        Trx_requirement_document.hasOne(models.Trx_similarity, {
            foreignKey: {
                name: "id_requirement_document",
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        })
    }
    return Trx_requirement_document;
};