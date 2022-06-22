const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../../helpers");

//Import Model
const { Trx_dokumen_pendukung, Pengguna } = require('../../../models');

const detailDokumenPendukung = async (req, res) => {
    try {
        const id_pengajuan = req.params.id;

        const dataPengguna = await Trx_dokumen_pendukung.findAll({
            where: {
                id_pengajuan: id_pengajuan,
                sumber_dukungan: "Pengguna",
                status: "Diterima",
            },
            include: [{
                model: Pengguna,
                attributes: { exclude: ['role', 'password', 'is_active', 'createdAt', 'updatedAt'] }
            }]
        });

        const dataMasyarakat = await Trx_dokumen_pendukung.findAll({
            where: {
                id_pengajuan: id_pengajuan,
                sumber_dukungan: "Masyarakat",
                status: "Diterima",
            },
            include: [{
                model: Pengguna,
                attributes: { exclude: ['role', 'password', 'is_active', 'createdAt', 'updatedAt'] }
            }]
        });

        if (!(dataPengguna || dataMasyarakat)) {
            return successResponse(req, res, 'Data Tidak Ditemukan');
        }

        const data = {
            dataPengguna,
            dataMasyarakat,
        }

        return successResponse(req, res, 'Detail Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = detailDokumenPendukung;