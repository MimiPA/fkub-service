//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Trx_dokumen_penentang } = require('../../models');

const uploadAlasan = async (req, res) => {
    try {
        const { id } = req.params;
        const { alasan } = req.body;

        if (!alasan) {
            return errorResponse(req, res, 400, 'Alasan Perlu Diisi');
        }
        else if (!id) {
            return errorResponse(req, res, 400, 'ID Dibutuhkan Di Request Parameter');
        }

        const dataPenentang = await Trx_dokumen_penentang.findOne({
            where: {
                id: id
            }
        });

        if (dataPenentang.alasan != "-") {
            return errorResponse(req, res, 400, 'Anda Sudah Pernah Memberikan Alasan Penolakan');
        }

        const updateAlasan = await Trx_dokumen_penentang.update(
            { alasan: alasan },
            { where: { id: id } },
        );

        if (!updateAlasan) {
            return errorResponse(req, res, 400, 'Upload Gagal. Mohon Coba Lagi');
        }

        return successResponse(req, res, 'Upload Berhasil.', updateAlasan);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = uploadAlasan;