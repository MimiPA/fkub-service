//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Pendukung, Trx_dokumen_penentang } = require('../../models');

const listAllPenentang = async (req, res) => {
    try {
        const dataPenentang = await Trx_dokumen_penentang.findAll({
            where: {
                idUser_create: req.user.nik,
            },
            include: [{
                model: Pendukung,
                include: [{
                    model: Pengajuan,
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
                }]
            }]
        });

        if (!dataPenentang) {
            return successResponse(req, res, 404, 'Data Tidak Ditemukan');
        }

        return successResponse(req, res, 'List Menentang Berhasil Diambil', dataPenentang);

    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = listAllPenentang;