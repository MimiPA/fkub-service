//Response Message
const sequelize = require("sequelize");
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Trx_dokumen_penentang } = require('../../models');

const jumlahPenentang = async (req, res) => {
    try {
        const data = await Trx_dokumen_penentang.count({
            where: {
                id_pengajuan: req.params.id,
            },
        });

        return successResponse(req, res, 'Jumlah Penentang Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = jumlahPenentang;