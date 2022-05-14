'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("master_accounts", [{
            id: 1,
            id_role: 1,
            email: "fkubmksservice@gmail.com",
            password: "$2b$10$xTBa0Oxovx2g/5zFjahfiuLBtslz0IJQn7a/BtD9c0ikfdFHW01/y",
            is_active: "Enable",
            idUser_create: 1,
            idUser_update: null,
            createdAt: new Date(),
            updatedAt: null
        }, ]);
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("master_accounts", null, {});
    },
};