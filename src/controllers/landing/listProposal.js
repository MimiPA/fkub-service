const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengguna, Pengajuan } = require('../../models');

const listProposal = async (req, res) => {
    try {

        const data = await Pengajuan.findAll({
            attributes: [
                'id',
                'referral_code',
                'jenis_pembangunan',
                'nama_tempat',
                'tempat_ibadah',
                'alamat',
                'rt',
                'rw',
                'kecamatan',
                'kelurahan',
                'status'
            ],
            include: [{
                model: Pengguna,
                attributes: ["email", "nama_depan", "nama_belakang", "nama_lengkap", "agama", "jenis_kelamin"]
            }]
        });

        if (!data) {
            return successResponse(req, res, 'Data Tidak Tersedia');
        }

        return successResponse(req, res, 'Daftar Semua Proposal Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = listProposal;