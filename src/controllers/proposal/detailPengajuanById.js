const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengguna, Pengajuan } = require('../../models');

const detailPengajuanById = async (req, res) => {
    try {
        const id_user = req.user.nik;
        const id = req.params.id;

        const { jenis_pembangunan } = req.query;

        if (!jenis_pembangunan) {
            return errorResponse(req, res, 400, 'Required jenis_pembangunan in request parameter');
        }

        const data = await Pengajuan.findOne({
            where: {
                id: id,
                jenis_pembangunan: jenis_pembangunan,
                id_user: id_user
            },
            include: [{
                model: Pengguna,
                attributes: ["nik", "email", "nama_depan", "nama_belakang", "jenis_kelamin", "agama", "telepon"]
            }]
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