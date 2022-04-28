'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('master_accounts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_role: {
                type: Sequelize.INTEGER,
                references: {
                    model: "master_roles",
                    key: "id",
                },
                defaultValue: "2",
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(100),
                unique: true,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(200),
                allowNull: false
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
        await queryInterface.dropTable('master_accounts');
    }
};