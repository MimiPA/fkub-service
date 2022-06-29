//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Trx_dokumen_pendukung, Trx_dokumen_penentang } = require('../../models');

const listAllDukungan = async (req, res) => {
    try {
        const dataPendukung = await Trx_dokumen_pendukung.findAll({
            where: {
                id_user: req.user.nik
            },
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
        });

        const dataPenentang = await Trx_dokumen_penentang.findAll({
            where: {
                id_user: req.user.nik
            },
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
        });

        if (!dataPenentang || !dataPendukung) {
            return successResponse(req, res, 404, 'Data Tidak Ditemukan');
        }

        const data = {
            dataPendukung,
            dataPenentang,
        };

        return successResponse(req, res, 'List Pendukung & Penentang Berhasil Diambil', data);

    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = listAllDukungan;