const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Trx_dokumen_instansi, Pengajuan } = require('../../models');

const permintaanKRKById = async (req, res) => {
    try {
        const data = await Trx_dokumen_instansi.findOne({
            where: {
                id_pengajuan: req.params.id_pengajuan,
                kategori_dokumen: "Surat Rekomendasi Kemenag"
            },
            include: [{
                model: Pengajuan,
            }]
        });

        if (!data) {
            return successResponse(req, res, 'Data Tidak Tersedia');
        }

        return successResponse(req, res, 'Detail Riwayat Surat Rekomendasi Kemenag Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = permintaanKRKById;