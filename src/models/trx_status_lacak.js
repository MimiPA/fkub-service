'use strict';
const moment = require('moment');

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
        idUser_create: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        idUser_update: {
            type: DataTypes.STRING(16),
        },
        duration: {
            type: DataTypes.VIRTUAL,
            get() {
                const createdAt = moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
                const updatedAt = moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
                const duration = moment.duration(moment(updatedAt).diff(moment(createdAt)));
                return `${duration.days()} Hari, ${duration.hours()}:${duration.minutes()}:${duration.seconds()}`;
            },
            set(value) {
                throw new Error("Do not try to set the `duration` value!");
            },
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