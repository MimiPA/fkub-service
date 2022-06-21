const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Trx_dokumen_instansi, Trx_dokumen_pendukung, Pengguna, Pelacakan, Trx_status_lacak } = require('../../models');

const changeStatusPendukung = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.query;

        if (!id) {
            return errorResponse(req, res, 400, 'Diperlukan ID Pendukung pada parameter request.');
        }
        if (!status) {
            return errorResponse(req, res, 400, 'Diperlukan Perubahan Status Pendukung pada parameter request.');
        }

        const dataPendukung = await Trx_dokumen_pendukung.findOne({
            where: {
                id: id,
            },
        });

        if (!dataPendukung) {
            return errorResponse(req, res, 400, 'Data Tidak Ditemukan.');
        }

        const update = await Trx_dokumen_pendukung.update({ status: status }, { where: { id: id } });

        return successResponse(req, res, `Berhasil Mengubah Status Pendukung`, update);
    
    }
    catch (err) {
    console.log(err.message);
    return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
}
};

module.exports = changeStatusPendukung;