const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Pengguna } = require('../../models');

const pengajuanById = async (req, res) => {
    try {
        const data = await Pengajuan.findOne({
            where: {
                id: req.params.id,
            },
            include: [{
                model: Pengguna,
                attributes: ["nik", "nama_depan", "nama_belakang", "jenis_kelamin", "agama", "telepon"]
            }]
        });

        if (!data) {
            return successResponse(req, res, 'Data Tidak Ditemukan');
        }

        return successResponse(req, res, 'Detail Proposal Pemohon Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = pengajuanById;