const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengguna, Pengajuan } = require('../../models');

const detailPengajuanById = async (req, res) => {
    try {
        const id_user = req.user.nik;
        const id = req.params.id;

        const data = await Pengajuan.findOne({
            where: {
                id: id,
                id_user: id_user
            },
        });

        if (!data) {
            return successResponse(req, res, 'Data Tidak Ditemukan');
        }

        return successResponse(req, res, 'Detail Pengajuan Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = detailPengajuanById;