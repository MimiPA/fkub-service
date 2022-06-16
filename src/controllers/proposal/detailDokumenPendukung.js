const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengguna, Trx_dokumen_pendukung } = require('../../models');

const detailDokumenPendukung = async (req, res) => {
    try {
        const id_pengajuan = req.params.id;

        const dataPengguna = await Trx_dokumen_pendukung.findAll({
            where: {
                id_pengajuan: id_pengajuan,
                sumber_dukungan: "Pengguna",
            },
            include: [{
                model: Pengguna,
                attributes: ["nik", "email", "nama_depan", "nama_belakang", "jenis_kelamin", "agama", "telepon"]
            }]
        });

        const dataMasyarakat = await Trx_dokumen_pendukung.findAll({
            where: {
                id_pengajuan: id_pengajuan,
                sumber_dukungan: "Masyarakat",
            },
            include: [{
                model: Pengguna,
                attributes: ["nik", "email", "nama_depan", "nama_belakang", "jenis_kelamin", "agama", "telepon"]
            }]
        });

        if (!dataPengguna || !dataMasyarakat) {
            return successResponse(req, res, 'Data Tidak Ditemukan');
        }

        const data = { dataPengguna, dataMasyarakat };

        return successResponse(req, res, 'Detail Dokumen Pendukung Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = detailDokumenPendukung;