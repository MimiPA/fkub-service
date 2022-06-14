const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengguna, Trx_dokumen_pendukung } = require('../../models');

const detailDokumenPendukung = async (req, res) => {
    try {
        const id_pengajuan = req.params.id;

        const data = await Trx_dokumen_pendukung.findAll({
            where: {
                id_pengajuan: id_pengajuan,
                kategori_dokumen: "Surat Pernyataan Dukungan",
            },
            include: [{
                model: Pengguna,
                attributes: ["nik", "email", "nama_depan", "nama_belakang", "jenis_kelamin", "agama", "telepon"]
            }]
        });

        if (!data) {
            return successResponse(req, res, 'Data Tidak Ditemukan');
        }

        return successResponse(req, res, 'Detail Dokumen Pendukung Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = detailDokumenPendukung;