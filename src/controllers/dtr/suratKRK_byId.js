const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Trx_dokumen_instansi, Pengajuan } = require('../../models');

const suratKRKById = async (req, res) => {
    try {
        const data = await Trx_dokumen_instansi.findOne({
            where: {
                id_pengajuan: req.params.id_pengajuan,
                kategori_dokumen: "KRK"
            },
            include: [{
                model: Pengajuan,
            }]
        });

        if (!data) {
            return successResponse(req, res, 'Data Tidak Tersedia', data);
        }

        return successResponse(req, res, 'Detail Surat KRK Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = suratKRKById;