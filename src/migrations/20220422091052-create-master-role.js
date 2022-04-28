'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('master_roles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            role: {
                type: Sequelize.STRING(100),
                unique: true,
                allowNull: false,
            },
            idUser_create: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            idUser_update: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('master_roles');
    }
};