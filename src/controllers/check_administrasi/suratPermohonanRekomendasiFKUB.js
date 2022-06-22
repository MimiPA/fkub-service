//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Trx_dokumen_pemohon } = require('../../models');

const suratPermohonanRekomendasiFKUB = async (req, res) => {
    try {
        const id_pengajuan = req.query.id_pengajuan;

        const data = await Trx_dokumen_pemohon.findAll({
            where: {
                id_pengajuan: id_pengajuan,
            },
        });

        if (!data) {
            return successResponse(req, res, 'Data Tidak Tersedia');
        }

        return successResponse(req, res, 'Semua Dokumen Pemohon Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = suratPermohonanRekomendasiFKUB;