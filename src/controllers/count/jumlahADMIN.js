//Response Message
const sequelize = require("sequelize");
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengguna } = require('../../models');

const jumlahADMIN = async (req, res) => {
    try {
        const jumlahPengguna = await Pengguna.count();

        const jumlahEnable = await Pengguna.count({
            where: {
                is_active: "Enable",
            },
        });

        const jumlahDisable = await Pengguna.count({
            where: {
                is_active: "Disable",
            },
        });

        return successResponse(req, res, 'Jumlah Untuk Admin Berhasil Diambil', { jumlahPengguna, jumlahEnable, jumlahDisable });
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = jumlahADMIN;