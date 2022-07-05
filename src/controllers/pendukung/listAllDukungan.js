//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Pendukung, Trx_dokumen_pendukung } = require('../../models');

const listAllDukungan = async (req, res) => {
    try {
        const dataPengguna = await Pendukung.findAll({
            where: {
                id_pengajuan: req.params.id,
            },
            include: [{
                model: Trx_dokumen_pendukung,
                where: {
                    sumber_dukungan: "Pengguna",
                },
            }, {
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

        const dataMasyarakat = await Pendukung.findAll({
            where: {
                id_pengajuan: req.params.id,
            },
            include: [{
                model: Trx_dokumen_pendukung,
                where: {
                    sumber_dukungan: "Masyarakat",
                },
            }, {
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

        if (!(dataPengguna && dataMasyarakat)) {
            return successResponse(req, res, 404, 'Data Tidak Ditemukan');
        }

        return successResponse(req, res, 'List Pendukung Berhasil Diambil', { dataPengguna, dataMasyarakat });

    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = listAllDukungan;