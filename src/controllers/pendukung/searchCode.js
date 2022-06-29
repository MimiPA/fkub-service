const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Trx_dokumen_pendukung } = require('../../models');

const searchCode = async (req, res) => {
    try {
        const { referral_code } = req.params;

        if (!referral_code) {
            return errorResponse(req, res, 400, 'Referral Code Perlu Diisi');
        }

        const data = await Pengajuan.findOne({
            where: {
                referral_code: referral_code,
                status: "Proses",
            },
            attributes: [
                "id",
                "referral_code",
                "jenis_pembangunan",
                "nama_tempat",
                "tempat_ibadah",
                "alamat",
                "rt",
                "rw",
            ]
        });

        if (!data) {
            return errorResponse(req, res, 404, 'Referral Code Tidak Ditemukan');
        }

        return successResponse(req, res, 'Detail Pengajuan Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = searchCode;