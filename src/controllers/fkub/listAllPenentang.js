const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Trx_dokumen_penentang, Pendukung, Pengguna } = require('../../models');

const listAllPenentang = async (req, res) => {
    try {
        const id_pengajuan = req.params.id;

        const dataPenentang = await Trx_dokumen_penentang.findAll({
            include: [{
                model: Pendukung,
                where: {
                    id_pengajuan: id_pengajuan,
                },
            }]
        });

        if (!dataPenentang) {
            return successResponse(req, res, 'Data Tidak Ditemukan');
        }

        return successResponse(req, res, 'Detail Berhasil Diambil', { dataPenentang });
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = listAllPenentang;