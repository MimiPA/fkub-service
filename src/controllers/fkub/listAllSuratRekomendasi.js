const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Trx_dokumen_instansi, Pengajuan } = require('../../models');

const listAllSuratRekomendasi = async (req, res) => {
    try {
        const data = await Trx_dokumen_instansi.findAll({
            where: {
                kategori_dokumen: "Surat Rekomendasi FKUB"
            },
            include: [{
                model: Pengajuan,
            }]
        });

        if (!data) {
            return successResponse(req, res, 'Data Tidak Tersedia');
        }

        return successResponse(req, res, 'Daftar Surat Rekomendasi FKUB Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = listAllSuratRekomendasi;