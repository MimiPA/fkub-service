const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengguna, Trx_dokumen_pendukung, Pendukung } = require('../../models');

const detailDokumenPendukung = async (req, res) => {
    try {
        const id_pengajuan = req.params.id;

        const dataPengguna = await Pendukung.findAll({
            where: {
                id_pengajuan: id_pengajuan,
            },
            include: [{
                model: Trx_dokumen_pendukung,
                where: {
                    sumber_dukungan: "Pengguna",
                }
            }]
        });

        const dataMasyarakat = await Pendukung.findAll({
            where: {
                id_pengajuan: id_pengajuan,
            },
            include: [{
                model: Trx_dokumen_pendukung,
                where: {
                    sumber_dukungan: "Masyarakat",
                }
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