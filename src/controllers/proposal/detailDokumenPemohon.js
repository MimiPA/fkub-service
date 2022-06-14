const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Trx_dokumen_pemohon } = require('../../models');

const detailDokumenPemohon = async (req, res) => {
    try {
        const id_pengajuan = req.params.id;

        const data = await Trx_dokumen_pemohon.findAll({
            where: {
                id_pengajuan: id_pengajuan,
            }
        });

        if (!data) {
            return successResponse(req, res, 'Data Tidak Ditemukan');
        }

        return successResponse(req, res, 'Detail Dokumen Pemohon Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = detailDokumenPemohon;