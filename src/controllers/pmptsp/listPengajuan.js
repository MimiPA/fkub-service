const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Pengguna } = require('../../models');

const listPengajuan = async (req, res) => {
    try {
        const { jenis_pembangunan } = req.query;

        if (!jenis_pembangunan) {
            return errorResponse(req, res, 400, 'Required jenis_pembangunan in request parameter');
        }

        const data = await Pengajuan.findAll({
            where: {
                jenis_pembangunan: jenis_pembangunan
            },
            include: [{
                model: Pengguna,
                attributes: ["nik", "nama_depan", "nama_belakang", "agama", "telepon"]
            }]
        });

        if (data == null) {
            return successResponse(req, res, 'Tidak Ada Data Tersedia');
        }

        return successResponse(req, res, 'Daftar Proposal Pemohon Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = listPengajuan;